import JsonUtil from "../File/JsonUtil";
import ConfigInternalBase from "./ConfigInternalBase";

 

 
export default class ConfigPrefabInternal extends ConfigInternalBase { 
    ContainsKey(key:string)
    { 
        return JsonUtil.ContainsKey(this.rootJson, key);
    }
    //同步 synchronization
   
    GetPrefabSync(key:string) {
        return JsonUtil.GetItem(this.rootJson, key, ""); 
    }

}


