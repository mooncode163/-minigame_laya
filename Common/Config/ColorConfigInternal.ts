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

    GetColor(key: string, def: string = "0, 0, 0, 255") {
        var cr = this.RGBString2ColorA(def);;
        // key = "PlaceItemTitle";
        // key = "APP_TYPE";
        /*
        js中的变量作为json的key 的语法：https://blog.csdn.net/xiaomanonyo/article/details/78642148
        */
        if (this.rootJson != null) {
            if (this.rootJson[key] != null) {
                var str = this.rootJson[key];
                Debug.Log("ColorConfig key =" + key + " str=" + str);
                cr = this.RGBString2ColorA(str);
            }
            else {
                Debug.Log("ColorConfig ContainsKey no key =" + key);
            }
        } else {
            Debug.Log("ColorConfig rootJson null key =" + key + " str=" + str);
        }
        return cr;
    }

}


