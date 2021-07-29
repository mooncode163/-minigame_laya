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
    reqHttpToken;
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
    GetTokenAsync() {
        Debug.Log("Task start");
        if (!Common.BlankString(this.accessToken)) {
            return this.accessToken;
        }
        this.StartGetToken();
        //  Debug.Log("Task End");
        return this.accessToken;
    }
    GetToken() {

        Debug.Log("Task ExecuteAsync before");
        this.GetTokenAsync(); //新建一个线程执行这个函数
        // t.Wait();//阻塞,一直等待函数执行完成
        Debug.Log("Task ExecuteAsync end");
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
        reqHttp.Post(url, strJson, "json", function (data, isSuccesfull) {
            if (isSuccesfull) {
                // var str = JSON.stringify(data);
                var root = JSON.parse(data);
                this.accessToken = root["access_token"];
                Debug.Log("HuaweiAppGalleryApi OnRequestFinishedToken accessToken=" + this.accessToken);
                Debug.Log("Task OnRequestFinished accessToken=" + this.accessToken);
            }

        }.bind(this));

    }


    //  https://developer.huawei.com/consumer/cn/doc/development/AppGallery-connect-References/agcapi-app-info_query_v2
    GetVersion(appId) {
        var ret = this.GetTokenAsync();
        Debug.Log("Task GetTokenAsync ret=" + ret);
        // await Task.Run(() => {
            var url = "https://connect-api.cloud.huawei.com/api/publish/v2/app-info?appId=" + appId;
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
            reqHttp.Get(url, "json",heads, function (data, isSuccesfull) {
                if (isSuccesfull) {
                    // var str = JSON.stringify(data);
                    var root = JSON.parse(data);  
                    var appInfo = root["appInfo"];
                    var releaseState = appInfo["releaseState"];
        
        
                    Debug.Log("  HuaweiAppGalleryApi version releaseState=" + releaseState);
        
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
                }
    
            }.bind(this));
        // });

        return this.appVersion;

    }

    // OnRequestFinishedVersion(HTTPRequest req, HTTPResponse response) {
    //     Debug.Log("Task HuaweiAppGalleryApi OnRequestFinishedVersion");
    //     if (response != null && response.IsSuccess) {

    //         string str = Encoding.UTF8.GetString(response.Data);
    //         Debug.Log("Task HuaweiAppGalleryApi version str=" + str);

    //         JsonData root = JsonMapper.ToObject(str);
    //         JsonData appInfo = root["appInfo"];
    //         int releaseState = (int)appInfo["releaseState"];


    //         Debug.Log("  HuaweiAppGalleryApi version releaseState=" + releaseState);

    //         string key = "versionNumber";
    //         string version = "1.0.0";
    //         string versionApi = version;
    //         if (JsonUtil.ContainsKey(appInfo, key)) {
    //             versionApi = (string)appInfo[key];

    //         }

    //         if ((Common.GetAppVersion() == versionApi) && (releaseState != 0)) {
    //             //提交版本 审核中等或者审核不通过等
    //             // releaseState = 0;
    //             versionApi = "0.0.0";
    //             version = versionApi;
    //         }


    //         // if (releaseState == 0)
    //         {
    //             // 已经上架
    //             version = versionApi;
    //         }

    //         Debug.Log("Task  HuaweiAppGalleryApi version=" + version);
    //         appVersion = version;

    //     }
    //     else {
    //         appVersion = "0.0.0";
    //         Debug.Log("Task HuaweiAppGalleryApi OnRequestFinishedVersion fail");
    //     }

    // }

    // OnRequestFinishedToken(HTTPRequest req, HTTPResponse response) { 
    //     if (response != null && response.IsSuccess) {
    //         string str = Encoding.UTF8.GetString(response.Data);
    //         JsonData root = JsonMapper.ToObject(str);
    //         accessToken = (string)root["access_token"];
    //         Debug.Log("HuaweiAppGalleryApi OnRequestFinishedToken accessToken=" + accessToken);
    //         Debug.Log("Task OnRequestFinished accessToken=" + accessToken);
    //         // GetVersion(Config.main.appId);
    //         // GetVersion("103066765");
    //     }
    //     else {
    //         accessToken = "access_token";
    //         Debug.Log("HuaweiAppGalleryApi OnRequestFinishedToken fail");
    //     }


    // }


}



