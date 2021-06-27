import Common from "../Common";
import ConfigBase from "./ConfigBase";
import ConfigPrefabInternal from "./ConfigPrefabInternal";

 

export default class ConfigPrefab extends ConfigBase {
    configPrefabApp: ConfigPrefabInternal = null;
    configPrefabAppCommon: ConfigPrefabInternal = null;
    configPrefabCommon: ConfigPrefabInternal = null;


    static _main: ConfigPrefab;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new ConfigPrefab();
            this._main.Init();
        }
        return this._main;
    }
    Init() {
        {
            var strDir = Common.RES_CONFIG_DATA + "/Prefab";
            var fileName = "ConfigPrefabApp.json";
            {
                this.configPrefabApp = new ConfigPrefabInternal();
                this.configPrefabApp.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.configPrefabApp);
            }
        }
        {
            var strDir = Common.RES_CONFIG_DATA + "/Prefab";
            var fileName = "ConfigPrefabAppCommon.json";
            {
                this.configPrefabAppCommon = new ConfigPrefabInternal();
                this.configPrefabAppCommon.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.configPrefabAppCommon);
            }
        }
        {

            var filepath = "Common/Prefab/ConfigPrefab.json";
            {
                this.configPrefabCommon = new ConfigPrefabInternal();
                this.configPrefabCommon.fileJson = filepath;
                this.listItem.push(this.configPrefabCommon);
            }
        }
    }


    IsContainsKey(key: string) {
        var ret = false;
        if (this.configPrefabApp != null) {
            ret = this.configPrefabApp.ContainsKey(key);
        }
        if (!ret) {
            if (this.configPrefabAppCommon != null) {
                ret = this.configPrefabAppCommon.ContainsKey(key);
            }
        }
        if (!ret) {
            if (this.configPrefabCommon != null) {
                ret = this.configPrefabCommon.ContainsKey(key);
            }
        }
        return ret;
    }
    GetPrefab(key: string) {
        var ret = "";
        if (this.configPrefabApp != null) {
            ret = this.configPrefabApp.GetPrefabSync(key);
        }
        if (!ret) {
            if (this.configPrefabAppCommon != null) {
                ret = this.configPrefabAppCommon.GetPrefabSync(key);
            }
        }
        if (!ret) {
            if (this.configPrefabCommon != null) {
                ret = this.configPrefabCommon.GetPrefabSync(key);
            }
        }
        return ret;
    }


}


