import ConfigInternalBase from "../Config/ConfigInternalBase";
import FileUtil from "../File/FileUtil";
import JsonUtil from "../File/JsonUtil";
import ResManager from "../Res/ResManager";
import { SysLanguage } from "./LanguageUtil";
import LTLocalization from "./LTLocalization";

 
 
export default class LanguageInternal extends ConfigInternalBase {
    rootJson: any = null;
    fileJson = "";
    ltLocalization: LTLocalization = null; 
    //get 的用法
    get defaultLanId(): string {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        var ret = SysLanguage.CN;
        // if (sys.platform == sys.MOBILE_BROWSER) {
        //     ret = sys.LANGUAGE_ENGLISH;
        // }
        return ret;
    } 
 
    /*
      { 
        success: (p:any) => {
            
        }, 
        fail: (p:any) => {
            
        },
      }
      */
    Load(obj: any) {
        this.ltLocalization = new LTLocalization();
        var key = FileUtil.GetFileBeforeExtWithOutDot(this.fileJson);
        ResManager.LoadText(
            {
                filepath: key,
                success: (p: any, data: string) => {
                    // this.OnFinish(obj); 
                    this.ltLocalization.ReadData(data);
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
    }
    GetString(key: string) { 
        var str = "";
        if (this.IsContainsKey(key)) {
            // Debug.Log("GetString: IsContainsKey key=" + key);
            str = this.ltLocalization.GetText(key);
        }
        return str;
    }

    IsHaveKey(key: string) {
        return JsonUtil.ContainsKey(this.rootJson, key);
    }
    SetLanguage (lan:string) { 
        this.ltLocalization.SetLanguage(lan);
    }
    GetLanguage() {
     return this.ltLocalization.GetLanguage();
    }
    
    IsContainsKey(key:string) { 
        return this.ltLocalization.IsContainsKey(key);
    }
}
 
