import AdConfig from "./AdKit/AdConfig/AdConfig";
import ColorConfig from "./Config/ColorConfig";
import ConfigAudio from "./Config/ConfigAudio";
import ConfigBase from "./Config/ConfigBase";
import ConfigPrefab from "./Config/ConfigPrefab";
import ImageRes from "./Config/ImageRes";
import Debug from "./Debug";
import Language from "./Language/Language";
import Config from "./Config/Config";
import ConfigAppStoreAcount from "./Config/ConfigAppStoreAcount";

 
export default class AppPreLoad  {
    countLoad = 0; 

    listItem: ConfigBase[] = [];

    static _main: AppPreLoad;
    //get 的用法
    static get main() {
        if (this._main == null) {
            this._main = new AppPreLoad();
            this._main.Init();
        }
        return this._main;
    } 

    Init() {
        
        this.listItem.push(Config.main);
        this.listItem.push(ColorConfig.main);
        this.listItem.push(Language.main);
        this.listItem.push(ImageRes.main);
        this.listItem.push(ConfigPrefab.main);
        this.listItem.push(ConfigAudio.main);
        this.listItem.push(AdConfig.main);
        this.listItem.push(ConfigAppStoreAcount.main);

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
        this.countLoad = 0;
        this.listItem.forEach((item) => {
            item.Load(
                {
                    isCloud:false,
                    success: (p: any) => {
                        Debug.Log("AppPreLoad success this.countLoad="+this.countLoad+" this.listItem="+this.listItem.length);
                        this.OnFinish(obj,false);
                        
                    },
                    fail: (p:any) => {
                        Debug.Log("AppPreLoad fail this.countLoad="+this.countLoad);
                        this.OnFinish(obj,true);
                        
                    },
                });
        }); 

     

    } 

    OnFinish(obj: any,isFail:boolean) {
        this.countLoad++;
        if (this.countLoad >= this.listItem.length) {
          
            if(isFail)
            {
                if (obj.fail != null) {
                    obj.fail(this);
                }
            }else{
                if (obj.success != null) {
                    obj.success(this);
                }
            }
        }
    }

}


