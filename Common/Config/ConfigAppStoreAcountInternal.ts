import Debug from "../Debug";
import JsonUtil from "../File/JsonUtil";
import ConfigInternalBase from "./ConfigInternalBase";


export default class ConfigAppStoreAcountInternal extends ConfigInternalBase {

    GetAcountInfo(store, acount, type) {
        var ret = "";
        if (JsonUtil.ContainsKey(this.rootJson, store)) {
            var list = this.rootJson[store];
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var name = item["name"];
                if (name == acount) {
                    ret = item[type];
                    break;
                }
            }

        }
        return ret;
    }

}


