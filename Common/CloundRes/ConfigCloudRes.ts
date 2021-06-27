import Common from "../Common";
import ConfigBase from "../Config/ConfigBase";
import ConfigCloudResInternal from "./ConfigCloudResInternal";

 

 
export default class ConfigCloudRes extends ConfigBase {

    configCloudResCommon: ConfigCloudResInternal = null;

    static _main: ConfigCloudRes;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new ConfigCloudRes();
            this._main.Init();
        }
        return this._main;
    }
    Init() {
        {
            var strDir = Common.RES_CONFIG_DATA + "/config";
            var fileName = "config_cloudres.json";

            this.configCloudResCommon = new ConfigCloudResInternal();
            this.configCloudResCommon.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.configCloudResCommon);
        }


    }
    get cloudResUrl() {
        return this.configCloudResCommon.GetCloudResUrl();
    }
    get cloudResVersionUrl() {
        return this.configCloudResCommon.GetCloudResVersionUrl();
    } 


}


