import ConfigInternalBase from "./ConfigInternalBase";

 

 
export default class ConfigBase  {
    countLoad = 0;
    listItem: ConfigInternalBase[] = [];
    rootJson: any = null;
    fileJson = "";

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
        if(this.listItem.length==0)
        {
            if (obj.success != null) {
                obj.success(this);
            }
            return;
        }
        this.listItem.forEach((item) => {
            item.Load(
                {
                    success: (p: any) => {
                        this.OnFinish(obj,false);
                    },
                    fail: () => {
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
 
