import Common from "../Common";
import Debug from "../Debug";
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

    GetColor(key: string, def: string = "0, 0, 0, 255") {
        return this.colorApp.GetColor(key, def);
    }


    // Laya.Color(0-255)   to  8d2d2c
    Color2HexString(color: Laya.Color) {
        var r, g, b, a;
        r = color.r;
        g = color.g;
        b = color.b;
        a = color.a;
        // var hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        var hex = ((r << 16) + (g << 8) + b).toString(16);
        // var hex = ((a << 24) +(r << 16) + (g << 8) + b).toString(24);
        Debug.Log("Color2HexString:hex="+hex+" r="+r+" g="+g+" b="+b+" a="+a);
        hex = "#" + hex;
        return hex;
    }

    //  8d2d2c to Laya.Color
    HexString2Color(strcolor: string): Laya.Color {
        let hex = Number(strcolor.replace("#",""))
        var r, g, b, a;
        a = hex >> 24;
        r = hex >> 16;
        g = hex >> 8;
        b = hex >> 0;
        Debug.Log("HexString2Color:hex="+hex+" r="+r+" g="+g+" b="+b+" a="+a+" strcolor="+strcolor);
        return new Laya.Color(r, g, b, a);
    }


    // "0, 0, 0, 255"; to Laya.Color
    RgbString2Color(strcolor: string): Laya.Color { 
        var r, g, b, a;
        var strsplit = ",";
        var list = strcolor.split(strsplit);
        var index = 0;
        //Debug.Log("RGBString2Color:list="+list.length);

        for (let value of list) {
            if (index == 0) {
                r = parseInt(value);
            }
            if (index == 1) {
                g = parseInt(value);
            }
            if (index == 2) {
                b = parseInt(value);
            }
            if (index == 3) {
                a = parseInt(value);
            }
            index++;
        }

        var color = new Laya.Color(r, g, b, a);
        Debug.Log("RgbString2Color:strcolor="+strcolor+" r="+r+" g="+g+" b="+b+" a="+a);
        return color;
    }

}


