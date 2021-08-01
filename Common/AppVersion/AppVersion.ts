import GameManager from "../../AppBase/Game/GameManager";
import Common from "../Common";
import LocalStorage from "../Core/LocalStorage";
import Debug from "../Debug";
import Device from "../Device";
import ItemInfo from "../ItemInfo";
import Language from "../Language/Language";
import Platform from "../Platform";
import Source from "../Source";
import AppVersionBase from "./AppVersionBase";
import AppVersionHuawei from "./AppVersionHuawei";
import Config from "../Config/Config";

export default class AppVersion {
    

    appVersionBase: AppVersionBase=null;

    static _main: AppVersion;
    static PACKAGE_APPSTORE_TAPTAP: any;
    static PACKAGE_APPSTORE_XIAOMI: any;
    static PACKAGE_APPSTORE_HUAWEI: any;
    callbackFinished: any;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AppVersion();
            this._main.Init();
        }
        return this._main;
    }
 
    public get appCheckHasFinished(): boolean
    //app审核完成
    {
        var ret = LocalStorage.GetBool(AppVersionBase.KEY_APP_CHECK_FINISHED, false);

        if (Platform.isAndroid) {
        }

        if (ret) {
            Debug.Log("appCheckHasFinished:ret=true");
        }
        else {

            Debug.Log("appCheckHasFinished:ret=false");
        }
        return ret;
    }

     


    public get appForPad(): boolean
    //app审核完成
    {
        var str = Common.GetAppPackage();
        var ret = false;
        // if (str.find(".pad") || str.Contains(".ipad")) {
        //     ret = true;
        // }
        // if ([Platform.isWin) {
        //     if (Common.GetAppName().ToLower().Contains("hd")) {
        //         ret = true;
        //     }

        // }


        return ret;
    }

    get appNeedUpdate() {

        var ret = false;
        if (this.appVersionBase != null) {
            ret = this.appVersionBase.appNeedUpdate;
        }
        return ret;
    }

    get strUpdateNote() {
        var ret = "";
        if (this.appVersionBase != null) {
            ret = this.appVersionBase.strUpdateNote;
        }

        if (Common.BlankString(ret)) {
            ret = Language.main.GetString("AppVersion_MSG_UpdateNote");
        }
        return ret;

    }

    get strUrlComment() {
        var ret = "";
        if (this.appVersionBase != null) {
            ret = this.appVersionBase.strUrlComment;
        }
        return ret;

    }
    get strUrlAppstore() {
        var ret = "";
        if (this.appVersionBase != null) {
            ret = this.appVersionBase.strUrlAppstore;
        }
        return ret;
    }




    // public OnUICommentDidClickDelegate callBackCommentClick { get; set; }

    // public OnAppVersionFinishedDelegate callbackFinished { get; set; }



    Init() {
        Debug.Log("AppVersion Init");
        // appNeedUpdate = false;
        // isFirstCreat = false;
        // appCheckForAppstore = false;

        if (Platform.isHuawei) { 
            this.appVersionBase = AppVersionHuawei.main;
        }
        else if (Platform.isiOS) {
            // this.appVersionBase = new AppVersionAppstore();
        }

        else if (Platform.isWin) {
            // this.appVersionBase = new AppVersionWin();
        }
        else {
            // this.appVersionBase = new this.appVersionBase();
        }
        this.appVersionBase = AppVersionHuawei.main;
    }

    GetUrlOfComment(source) {
        var url = "";
        var strappid = Config.main.appId;
        switch (source) {
            case Source.APPSTORE:
                {
                    url = "https://itunes.apple.com/cn/app/id" + strappid;
                    // if (!IPInfo.isInChina) {
                    //     url = "https://itunes.apple.com/us/app/id" + strappid;
                    // }
                }
                break;
            case Source.TAPTAP:
                {
                    url = "https://www.taptap.com/app/" + strappid + "/review";
                }
                break;
            case Source.XIAOMI:
                {
                    url = "http://app.xiaomi.com/details?id=" + Common.GetAppPackage();
                }
                break;
            case Source.HUAWEI:
                {
                    //http://appstore.huawei.com/app/C100270155
                    url = "http://appstore.huawei.com/app/C" + strappid;
                }
                break;


        }
        return url;
    }


    // OnUICommentDidClick(item) {
    //     if (callBackCommentClick != null) {
    //         callBackCommentClick(item);
    //     }
    // }

    OnComment() {
        // if (Config.main.listAppStore.Count > 1) {
        //     CommentViewController.main.callBackClick = OnUICommentDidClick;
        //     CommentViewController.main.Show(null, null);
        //     return;
        // }
        // ItemInfo info = Config.main.listAppStore[0];
        // DoComment(info);
    }
    GotoComment() {
        // var appstorePackage = "";
        // var appstore = Source.APPSTORE;
        // if (Platform.isAndroid) {
        //     if (Config.main.channel == Source.TAPTAP) {
        //         appstore = Source.TAPTAP;
        //         appstorePackage = AppVersion.PACKAGE_APPSTORE_TAPTAP;
        //     }

        //     if (Config.main.channel == Source.XIAOMI) {
        //         appstore = Source.XIAOMI;
        //         appstorePackage = AppVersion.PACKAGE_APPSTORE_XIAOMI;
        //     }
        //     if (Config.main.channel == Source.HUAWEI) {
        //         appstore = Source.HUAWEI;
        //         appstorePackage = AppVersion.PACKAGE_APPSTORE_HUAWEI;
        //     }

        // }

        // this.GotoToAppstoreApp(appstore, Common.GetAppPackage(), appstorePackage, GetUrlOfComment(appstore));
    }

    /*
    //https://blog.csdn.net/pz789as/article/details/78223517
    //跳转到appstore写评论
    GotoToAppstoreApp(string appstore, string appPackage, string marketPkg, string url) {
        Debug.Log("GotoToAppstoreApp appstore=" + appstore + " appPackage=" + appPackage + " marketPkg=" + marketPkg + " url" + url);
        if (Common.isAndroid) {
            if (appstore != Source.TAPTAP) {
                AndroidJavaClass intentClass = new AndroidJavaClass("android.content.Intent");
                AndroidJavaObject intentObject = new AndroidJavaObject("android.content.Intent");
                intentObject.Call<AndroidJavaObject>("setAction", intentClass.GetStatic<string>("ACTION_VIEW"));
                AndroidJavaClass uriClass = new AndroidJavaClass("android.net.Uri");
                AndroidJavaObject uriObject = uriClass.CallStatic<AndroidJavaObject>("parse", "market://details?id=" + appPackage);
                intentObject.Call<AndroidJavaObject>("setData", uriObject);
                intentObject.Call<AndroidJavaObject>("setPackage", marketPkg);
                AndroidJavaClass unity = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
                AndroidJavaObject currentActivity = unity.GetStatic<AndroidJavaObject>("currentActivity");
                currentActivity.Call("startActivity", intentObject);

                return;
            }

        }


        if (!Common.BlankString(url)) {
            Application.OpenURL(url);
        }

    }
    DoComment(ItemInfo info) {
        string strappid = Config.main.GetAppIdOfStore(info.source);
        string strUrlComment = "";
        string appstorePackage = "";
        switch (info.source) {
            case Source.APPSTORE:
                {
                    strUrlComment = "https://itunes.apple.com/cn/app/id" + strappid;
                    if (!IPInfo.isInChina) {
                        strUrlComment = "https://itunes.apple.com/us/app/id" + strappid;
                    }
                }
                break;
            case Source.TAPTAP:
                {
                    strUrlComment = "https://www.taptap.com/app/" + strappid + "/review";
                    appstorePackage = PACKAGE_APPSTORE_TAPTAP;
                }
                break;
            case Source.XIAOMI:
                {
                    strUrlComment = "http://app.xiaomi.com/details?id=" + Common.GetAppPackage();
                    appstorePackage = PACKAGE_APPSTORE_XIAOMI;
                }
                break;
            case Source.HUAWEI:
                {
                    //http://appstore.huawei.com/app/C100270155
                    strUrlComment = "http://appstore.huawei.com/app/C" + strappid;
                    appstorePackage = PACKAGE_APPSTORE_HUAWEI;
                }
                break;


        }



        string url = strUrlComment;
        if (!Common.BlankString(url)) {
            OnUICommentDidClick(null);
            Debug.Log("strUrlComment::" + url);
        }
        else {
            Debug.Log("strUrlComment is Empty");
        }
        GotoToAppstoreApp(info.source, Common.GetAppPackage(), appstorePackage, url);

    }

    */


    /*
    {  
      success: (p:any) => {
          
      }, 
      fail: (p:any) => {
          
      },
      finish: (p:any) => {
          
      },
    }
    */
    StartParseVersion(obj: any) { 
        if(this.appVersionBase==null)
        {
            if(obj.finish!=null)
            {
                obj.finish(this);
            }
            return;
        }
 
       
        this.appVersionBase.StartParseVersion({
            success: (p: any, version: string) => {
                if(obj.success!=null)
                {
                    obj.success(this);
                }

                if(obj.finish!=null)
                {
                    obj.finish(this);
                }
            },
            fail: (p: any) => {
                if(obj.fail!=null)
                {
                    obj.fail(this);
                }

                if(obj.finish!=null)
                {
                    obj.finish(this);
                }
            },
        });
    }



}



