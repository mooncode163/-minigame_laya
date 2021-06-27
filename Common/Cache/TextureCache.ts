import Debug from "../Debug"; 
import Dictionary from "../Dictionary";
import ResManager from "../Res/ResManager";
 
export default class TextureCache  {
    dicItem: any;
    static _main: TextureCache;
    //静态方法
    static get main() {
        console.log("TextureCache Main");
        if (this._main == null) {
            this._main = new TextureCache();
            this._main.Init();
        }
        return this._main;
    }
    Init() {
        this.dicItem = new Dictionary();
    }

   
    /*
{ 
     filepath:"", 
     isCloud:false,
  success: (p:any,tex:Texture2D) => {
      
  }, 
  fail: (p:any) => {
      
  },
}
*/
    Load(obj: any) {
        var key = obj.filepath;
        if (this.dicItem.Contains(key) == true) {
            var tex = this.dicItem.Get(key);
            Debug.Log("TextureCache  load  from cache key="+key);
            if (obj.success != null) {
                obj.success(this, tex);
            }
        } else 
        {
            this.LoadNotCache(obj);
        }

        
    }

    LoadFrame(obj: any) {

    }

    /*
{ 
   filepath:"", 
   isCloud:false,
success: (p:any,tex:Texture2D) => {
    
}, 
fail: (p:any) => {
    
},
}
*/
    LoadNotCache(obj: any) {
        // if(obj.isCloud)
        // {
        //     this.LoadWithCloud(obj);
        //     return;
        // }

        ResManager.LoadTexture(
            {
                filepath: obj.filepath,
                success: (p: any, tex: any) => {
                    var key = obj.filepath;
                     this.dicItem.Add(key, tex);
                    if (obj.success != null) {
                        obj.success(this, tex);
                    }
                },
                fail: (p: any) => {
                    // if (obj.fail != null) {
                    //     obj.fail(this);
                    // }
                    if(obj.isCloud)
                    {
                        this.LoadWithCloud(obj);
                    }
                },
            });
    }


    /*
{ 
filepath:"", 
isCloud:false,
success: (p:any,tex:Texture2D) => {
 
}, 
fail: (p:any) => {
 
},
}
*/
    LoadWithCloud(obj: any) {

        if (obj.isCloud) {
            ResManager.LoadUrlTexture(
                {
                    url: obj.filepath,
                    success: (p: any, tex: any) => {
                        var key = obj.filepath;
                        this.dicItem.Add(key, tex);
                        if (obj.success != null) {
                            obj.success(this, tex);
                        }
                    },
                    fail: (p: any) => {
                        if (obj.fail != null) {
                            obj.fail(this);
                        }
                    },
                });
        } else {

            ResManager.LoadTexture(
                {
                    filepath: obj.filepath,
                    success: (p: any, tex: any) => {
                        var key = obj.filepath;
                        this.dicItem.Add(key, tex);
                        if (obj.success != null) {
                            obj.success(this, tex);
                        }
                    },
                    fail: (p: any) => {
                        if (obj.fail != null) {
                            obj.fail(this);
                        }
                    },
                });

        }
    }


}


