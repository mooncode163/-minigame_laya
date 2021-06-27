import ConfigInternalBase from "../Config/ConfigInternalBase";
import Device from "../Device";
import JsonUtil from "../File/JsonUtil";

 
export default class ConfigCloudResInternal extends ConfigInternalBase {
   
    GetCloudResUrl () { 
        var key = "url";
        if(Device.main.isLandscape)
        {
            key = "url_hd";
        }
        return JsonUtil.GetItem(this.rootJson.zip, key, ""); 
    }

    GetCloudResVersionUrl () { 
        var key = "url";
        // if(Device.main.isLandscape)
        // {
        //     key = "url_version_hd";
        // }
        return JsonUtil.GetItem(this.rootJson.version, key, ""); 
    }

 
}

 
