import Common from "../Common";
import ColorConfigInternal from "./ColorConfigInternal";
import ConfigBase from "./ConfigBase";

 

 
export default class ColorConfig extends ConfigBase {
    colorApp: ColorConfigInternal = null;

    static _main: ColorConfig;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new ColorConfig();
            this._main.Init();
        }
        return this._main;
    }
    Init() {

        var strDir = Common.RES_CONFIG_DATA + "/Color";
        var fileName = "Color.json";
        { 
            this.colorApp = new ColorConfigInternal();
            this.colorApp.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.colorApp);
        }
   

    }

    GetColor(key:string, def: string="0, 0, 0, 255") {
        return this.colorApp.GetColor(key,def);
     }
 

}


