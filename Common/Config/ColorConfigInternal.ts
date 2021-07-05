import Debug from "../Debug";
import ConfigInternalBase from "./ConfigInternalBase";


export default class ColorConfigInternal extends ConfigInternalBase {

    // "0, 0, 0, 255",
    RGBString2ColorA(strrgba: string) {
        var r, g, b, a;
        var strsplit = ",";
        var list = strrgba.split(strsplit);
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
        return color;
    }

    colorRGBtoHex(color) {

    }
    // "0, 0, 0, 255" to  8d2d2c
    RGBString2ColorHexString(strrgba: string) {
        var r, g, b, a;
        var strsplit = ",";
        var list = strrgba.split(strsplit);
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

        // var color = new Laya.Color(r, g, b, a);

        // var hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        var hex = ((r << 16) + (g << 8) + b).toString(16);
        return hex;
    }


    // laya.display.Text#color 如 #8d2d2c
    GetColor(key: string, def: string = "0, 0, 0, 255") {
        var cr = this.RGBString2ColorHexString(def);;
        // key = "PlaceItemTitle";
        // key = "APP_TYPE";
        /*
        js中的变量作为json的key 的语法：https://blog.csdn.net/xiaomanonyo/article/details/78642148
        */
        if (this.rootJson != null) {
            if (this.rootJson[key] != null) {
                var str = this.rootJson[key];
                Debug.Log("ColorConfig key =" + key + " str=" + str);
                cr = this.RGBString2ColorHexString(str);
            }
            else {
                Debug.Log("ColorConfig ContainsKey no key =" + key);
            }
        } else {
            Debug.Log("ColorConfig rootJson null key =" + key + " str=" + str);
        }
        cr = "#" + cr;
        return cr;
    }

}


