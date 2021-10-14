import Common from "../Common";
import Debug from "../Debug";
import Config from "../Config/Config";
import Platform from "../Platform";
import LocalStorage from "../Core/LocalStorage";

export default class AppVersionBase {
    public static KEY_APP_CHECK_FINISHED: string = "app_check_finished2";

    appNeedUpdate = false;
    isNetWorkOk = false;
    appCheckForAppstore = false;//app审核中
    strUrlComment = "";
    strUrlAppstore = "";
    strUpdateNote = "";
    strVersionStore = "";
    strVersionLocal = "";
    isFirstCreat = false;
    objApp: any;
    callbackFinished: any;


    GetAppVersionLocal() {
        return Config.main.version;
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
        this.isNetWorkOk = true;
        this.objApp = obj;
        // if (this.callbackFinished != null)
        // {
        //     Debug.Log("Appversion ParseFinished callbackFinished");
        //     this.callbackFinished(this);
        // }
        Debug.Log("AppVersionBase StartParseVersion 1");
        if (obj.finish != null) {
            obj.finish(this);
            Debug.Log("AppVersionBase StartParseVersion 2");
        }
    }

    ParseData(data) {
    }


    ParseFinished(app: AppVersionBase) {

        Debug.Log("Appversion ParseFinished strVersionStore=" + this.strVersionStore);
        this.strVersionLocal = Config.main.version;
        if (Common.BlankString(this.strVersionStore)) {

            if (Platform.isiOS) {
                if (this.isFirstCreat) {
                    this.appCheckForAppstore = true;
                }
            }
            else {
                if (this.isFirstCreat) {
                    this.appCheckForAppstore = true;
                }
                // appCheckForAppstore = true;
            }
        }
        else {


            Debug.Log("Appversion stroe:version:" + this.strVersionStore);
            if (this.strVersionStore > this.strVersionLocal) {
                //需要更新资源 
                //版本更新
                this.appNeedUpdate = true;
                //appCheckVersionDidUpdate 
            }
            else {
                this.appNeedUpdate = false;
                // if (ret > 0)
                if (this.strVersionStore < this.strVersionLocal) {
                    this.appCheckForAppstore = true;
                }

            }

        }


        Debug.Log("Appversion:appCheckForAppstore= 1" + this.appCheckForAppstore + " isNetWorkOk=" + this.isNetWorkOk);
        if (!this.appCheckForAppstore) {
            Debug.Log("Appversion:appCheckForAppstore SetBool KEY_APP_CHECK_FINISHED true");
            LocalStorage.SetBool(AppVersionBase.KEY_APP_CHECK_FINISHED, true);
        }

        if (this.objApp.finish != null) {
            this.objApp.finish(this);
        }
    }

}



