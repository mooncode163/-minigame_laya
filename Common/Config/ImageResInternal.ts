import Debug from "../Debug"; 
import JsonUtil from "../File/JsonUtil";
import ConfigInternalBase from "./ConfigInternalBase";

 
export default class ImageResInternal extends ConfigInternalBase {
    public KEY_BOARD: string = "board";
    public KEY_PATH: string = "path";
    rootJson: any = null; 
    
    // 255,100,200,255 to color return Vector4 47,47,47,255
    //Vector4 (left,right,top,bottom)
    String2Vec4(str: string) {
        var x, y, z, w;
        if(str=="")
        {
            return Laya.Vector4.ZERO;
        }
        // var rgb = str.Split(',');
        var rgb = str.split(",");
        x = Number(rgb[0]);
        y = Number(rgb[1]);
        z = Number(rgb[2]);
        w = Number(rgb[3]);
        return new Laya.Vector4(x, y, z, w);
    }
    GetBoardKey(key: string) {
        return key + "_BOARD";
    }

    FindKeyByPath(path: string) {
        var str = "";
        {
            if (this.rootJson != null) {
                for (var keytmp in this.rootJson) {
                    if (JsonUtil.GetString(this.rootJson[keytmp], this.KEY_BOARD, "") == path) {
                        str = keytmp;
                        break;
                    }
                }
            }
        }
        return str;
    }

    GetImageBoardString(key: string) {
        var str = "";
        str = JsonUtil.GetString(this.rootJson[key], this.KEY_BOARD, "");
        return str;
    }

    //9宫格图片边框参数 (left,right,top,bottom)
    //cc.Vec4 (left,right,top,bottom)
    GetImageBoard(key: string) {
        var str = JsonUtil.GetString(this.rootJson[key], this.KEY_BOARD, "");
        Debug.Log("GetImageBoard str="+str+ " key="+key);
        return this.String2Vec4(str);
    }

    IsHasKey(key: string) {
        return JsonUtil.ContainsKey(this.rootJson, key);
    }
    IsHasBoard(key: string) {
        if (!this.IsHasKey(key)) {
            return false;
        }
        return JsonUtil.ContainsKey(this.rootJson[key], this.KEY_BOARD);
    }
    GetImage(key: string) {
        if (JsonUtil.ContainsKey(this.rootJson, key)) {
            return JsonUtil.GetString(this.rootJson[key], this.KEY_PATH, "");
        }
        Debug.Log("GetImage _NO_KEY_ =" + key);
        // return "_NO_KEY_";
        return "";
    }

}
 
