 
import ConfigBase from "../Config/ConfigBase";
import Debug from "../Debug"; 
import ConfigCloudRes from "./ConfigCloudRes";
import ImageResCloudRes from "./ImageResCloudRes";
import LanguageCloudRes from "./LanguageCloudRes";

 
export default class CloudResPreLoad  {
    countLoad = 0; 

    listItem: ConfigBase[] = [];

    static _main: CloudResPreLoad;
    //get 的用法
    static get main() {
        if (this._main == null) {
            this._main = new CloudResPreLoad();
            this._main.Init();
        }
        return this._main;
    } 

    Init() {
 
        this.listItem.push(ConfigCloudRes.main);
        // this.listItem.push(LanguageCloudRes.main);
        // this.listItem.push(ImageResCloudRes.main);
        
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
                        Debug.Log("CloudResPreLoad success this.countLoad="+this.countLoad);
                        this.OnFinish(obj,false);
                        
                    },
                    fail: (p:any) => {
                        Debug.Log("CloudResPreLoad fail this.countLoad="+this.countLoad);
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
 