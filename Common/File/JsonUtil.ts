import Common from "../Common"; 
export default class JsonUtil  {

    //JsonData data, string key,   _defaultf 
    static GetItem(data: any, key: string, _default: string) {
        var ret = _default;
        if (this.ContainsKey(data, key)) {
            ret = data[key];
        } 
        return ret;
    }

    static GetString(data: any, key: string, _default: string) {
        var ret = _default;
        if (this.ContainsKey(data, key)) {
            ret = data[key];
        } 
        return ret;
    }
 
    //bool   //JsonData data, string key
    static ContainsKey(data: any, key: string) {
        if (Common.IsBlankString(key)) {
            return false;
        }
        if (data == null) {
            return false;
        }
        if (data[key] == null) {
            return false;
        }
        return true;
    }

}


