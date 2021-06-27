import Debug from "../Debug"; 
import FileUtil from "../File/FileUtil";
import JsonUtil from "../File/JsonUtil";
import ResManager from "../Res/ResManager";
 
export default class ConfigInternalBase  {
    rootJson: any = null;
    fileJson = "";
    isCloud:boolean = false;

    /*
      { 
        isCloud:false,
        success: (p:any) => {
            
        }, 
        fail: (p:any) => {
            
        },
      }
      */
    Load(obj: any) {
        if (this.isCloud) {
            ResManager.LoadUrl(
                {
                    url: this.fileJson,
                    success: (p: any, data: any) => {
                        this.rootJson = data;
                        this.ParseData();
                        if (obj.success != null) {
                            obj.success(this);
                        }
                    },
                    fail: () => {
                        if (obj.fail != null) {
                            obj.fail(this);
                        }
                    },
                });
        } else {

            var key = FileUtil.GetFileBeforeExtWithOutDot(this.fileJson);
            ResManager.LoadJson(
                {
                    filepath: key,
                    success: (p: any, data: any) => {
                        Debug.Log("ConfigInternalBase success key=" + key);
                        // this.OnFinish(obj);
                        this.rootJson = data;
                        this.ParseData();
                        if (obj.success != null) {
                            obj.success(this);
                        }
                    },
                    fail: () => {
                        Debug.Log("ConfigInternalBase fail ");
                        // this.OnFinish(obj);
                        if (obj.fail != null) {
                            // Debug.Log("ConfigInternalBase fail this");
                            obj.fail(this);
                        }
                    },
                });
        }

    }
    GetString(key: string, def: string) {
        return JsonUtil.GetItem(this.rootJson, key, def);
    }

    IsHaveKey(key: string) {
        return JsonUtil.ContainsKey(this.rootJson, key);
    }

    ParseData() {
        Debug.Log("ConfigInternalBase ParseData");
    }
}


