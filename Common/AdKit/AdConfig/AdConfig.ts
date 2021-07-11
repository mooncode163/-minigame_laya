import Common from "../../Common";
import ConfigBase from "../../Config/ConfigBase";
import Device from "../../Device";
import Platform from "../../Platform";
import AdConfigInternal from "./AdConfigInternal";

 

 
export default class AdConfig extends ConfigBase {

    adConfigApp: AdConfigInternal = null;

    static _main: AdConfig;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AdConfig();
            this._main.Init();
        }
        return this._main;
    }
    Init() {

        var strDir = Common.RES_CONFIG_DATA + "/adconfig";
        var fileName = "ad_config_weixin";
        {
            if (Platform.isAndroid) {
                fileName = "ad_config_android";
            }
            if (Platform.isiOS) {
                fileName = "ad_config_ios";
            }

            if (Platform.isWin) {
                // fileName = "ad_config_" + Source.WIN;
                fileName = "ad_config_win";
            }

            if (Platform.isWeiXin) {
                fileName = "ad_config_weixin";
            }
            if (Platform.isQQ) {
                fileName = "ad_config_qq";
            }
            if (Device.main.isLandscape) {
                fileName += "_hd";
            }

            this.adConfigApp = new AdConfigInternal();
            this.adConfigApp.fileJson = strDir + "/" + fileName+".json";
            this.listItem.push(this.adConfigApp);
        }


    }

    GetAppId(source: string) {
        return this.adConfigApp.GetAppId(source);
    }

    GetAdKey(source: string, type: number) {
        return this.adConfigApp.GetAdKey(source, type);
    }


}


