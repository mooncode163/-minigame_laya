import LocalStorage from "../Core/LocalStorage";
import Debug from "../Debug";
import Platform from "../Platform";
import Source from "../Source";

export default class AppVersion {
    public static KEY_APP_CHECK_FINISHED: string = "app_check_finished";
    static _main: AppVersion;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AppVersion();
            // this._main.Init();
        }
        return this._main;
    }
    static get appCheckHasFinished()
    //app审核完成
    {
        var ret = LocalStorage.GetBool(AppVersion.KEY_APP_CHECK_FINISHED, false);

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

    static set appCheckHasFinished(value) {
        LocalStorage.SetBool(AppVersion.KEY_APP_CHECK_FINISHED, value);
    }


}



