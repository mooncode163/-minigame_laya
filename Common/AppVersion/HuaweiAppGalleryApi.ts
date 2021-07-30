import Common from "../Common";
import ConfigAppStoreAcount from "../Config/ConfigAppStoreAcount";
import ConfigAppStoreAcountInternal from "../Config/ConfigAppStoreAcountInternal";
import Debug from "../Debug";
import JsonUtil from "../File/JsonUtil";
import Source from "../Source";
import Config from "../Config/Config";
import HttpRequest from "../Http/HttpRequest";

export default class HuaweiAppGalleryApi {


    ClientId = "";
    ClientSecret = "";
    accessToken = "";
    appVersion = "";
    objApp: any;
    static _main: HuaweiAppGalleryApi;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new HuaweiAppGalleryApi();
            this._main.Init();
        }
        return this._main;
    }
    Init() {
        this.ClientId = ConfigAppStoreAcount.main.GetAcountInfo(Source.HUAWEI, Config.main.GetAppStoreAcount(Source.HUAWEI), ConfigAppStoreAcount.Type_ClientId);
        this.ClientSecret = ConfigAppStoreAcount.main.GetAcountInfo(Source.HUAWEI, Config.main.GetAppStoreAcount(Source.HUAWEI), ConfigAppStoreAcount.Type_ClientSecret);
    }

    /*
    JSON.stringify()：方法是将一个对象或者数组转换为一个JSON字符串，如果指定了replacer是一个函数，则可以选择性的替换值，或者如果指定了replacer是一个数组，可选择性的仅包含数组指定的属性。
 语法：JSON.stringify(value[, replacer [, space]])

 参数：value（将要序列化成一个JSON字符串的值），replacer（可选），space(可选)

JSON.parse()：方法是将一个JSON字符串转换为对象。 
*/

    StartGetToken() {

        // if (!Common.BlankString(accessToken))
        // {
        //     return;
        // }
        var url = "https://connect-api.cloud.huawei.com/api/oauth2/v1/token";
        // header = {
        //     'Content-Type': 'application/json'
        //       # 'Authorization': 'Bearer %s'%str(token, encoding='utf-8')
        //     # 'Authorization': strauthor
        //     # 'Authorization': 'Bearer %s' % token
        //     # 指定JWT
        // }


        Debug.Log("HuaweiAppGalleryApi GetToken url=" + url);
        // var reqHttp = new HTTPRequest(new Uri(url), HTTPMethods.Post, OnRequestFinishedToken);
        // reqHttp.AddHeader("Content-Type", "application/json");
        var heads = [];

        heads.push("Content-Type");
        heads.push("application/json");

        // var data = new Hashtable();
        var data = {};
        data["grant_type"] = "client_credentials";
        data["client_id"] = this.ClientId;
        data["client_secret"] = this.ClientSecret;

        // var strJson = JsonMapper.ToJson(data);
        var strJson = JSON.stringify(data);
        Debug.Log("HuaweiAppGalleryApi strJson=" + strJson);
        // reqHttp.RawData = Encoding.UTF8.GetBytes(strJson);
        // reqHttp.Send();
        // reqHttpToken = reqHttp;
        var reqHttp = new HttpRequest();
        reqHttp.Post(url, strJson, "json", heads, function (data, isSuccesfull) {
            if (isSuccesfull) {
                // Debug.Log("HuaweiAppGalleryApi Post data=" + data);
                var str = JSON.stringify(data);
                Debug.Log("HuaweiAppGalleryApi Post str=" + str);
                // var root = JSON.parse(data);
                var root = data;
                this.accessToken = root["access_token"];
                Debug.Log("HuaweiAppGalleryApi OnRequestFinishedToken accessToken=" + this.accessToken);
                this.StartParseVersionInternal();
            } else {
                if (this.objApp.fail != null) {
                    this.objApp.fail(this);
                }
            }

        }.bind(this));

    }

    /*
   { 
     appid:"",
     success: (p:any,version:string) => {
         
     }, 
     fail: (p:any) => {
         
     },
   }
   */
    StartParseVersion(obj: any) {
        this.objApp = obj;
        if (Common.BlankString(this.accessToken)) {
            this.StartGetToken();
        } else {
            this.StartParseVersionInternal();
        }
    }


    //  https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/agcapi-app-info_query_v2
    StartParseVersionInternal() {
        var appid = this.objApp.appid;
        Debug.Log("HuaweiAppGalleryApi StartParseVersionInternal appid=" + appid);
        // await Task.Run(() => {
        var url = "https://connect-api.cloud.huawei.com/api/publish/v2/app-info?appId=" + appid;
        //Debug.Log("HuaweiAppGalleryApi GetVersion url=" + url);
        // HTTPRequest reqHttp = new HTTPRequest(new Uri(url), HTTPMethods.Get, OnRequestFinishedVersion);
        // reqHttp.AddHeader("Content-Type", "application/json");
        // reqHttp.AddHeader("client_id", ClientId);
        // reqHttp.AddHeader("Authorization", "Bearer " + accessToken);
        // reqHttp.Send();
        // // Debug.Log("Task Async Executed");
        // while (Common.BlankString(appVersion)) {
        //     // Debug.Log("waiting for appVersion");
        //     Thread.Sleep(10);
        // }


        //   headers: ["Content-Type", "application/json", 'token', token ]
        var heads = [];

        heads.push("Content-Type");
        heads.push("application/json");

        heads.push("client_id");
        heads.push(this.ClientId);

        heads.push("Authorization");
        heads.push("Bearer " + this.accessToken);

        var reqHttp = new HttpRequest();
        reqHttp.Get(url, "json", heads, function (data, isSuccesfull) {
            if (isSuccesfull) {
                var str = JSON.stringify(data);
                // Debug.Log("HuaweiAppGalleryApi StartParseVersionInternal str=" + str);
                // var root = JSON.parse(data);
                var root = data;
                var appInfo = root["appInfo"];
                var releaseState = appInfo["releaseState"];


                Debug.Log("HuaweiAppGalleryApi version releaseState=" + releaseState);

                var key = "versionNumber";
                var version = "1.0.0";
                var versionApi = version;
                if (JsonUtil.ContainsKey(appInfo, key)) {
                    versionApi = appInfo[key];

                }

                if ((Common.GetAppVersion() == versionApi) && (releaseState != 0)) {
                    //提交版本 审核中等或者审核不通过等
                    // releaseState = 0;
                    versionApi = "0.0.0";
                    version = versionApi;
                }


                // if (releaseState == 0)
                {
                    // 已经上架
                    version = versionApi;
                }

                Debug.Log("Task  HuaweiAppGalleryApi version=" + version);
                this.appVersion = version;

                if (this.objApp.success != null) {
                    this.objApp.success(this, this.appVersion);
                }
            } else {
                if (this.objApp.fail != null) {
                    this.objApp.fail(this);
                }
            }

        }.bind(this)); 

    }
 


}



