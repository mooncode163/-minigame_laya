import ConfigPrefab from "../Config/ConfigPrefab";
import ResManager from "../Res/ResManager";




export default class PrefabCache {

    static _main: PrefabCache;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new PrefabCache();
        }
        return this._main;
    }
    /*
    { 
       filepath:"", 
    success: (p:any,data:any) => {
        
    }, 
    fail: (p:any) => {
        
    },
    }
    */
    Load(obj: any) {

        ResManager.LoadPrefab(
            {
                filepath: obj.filepath,
                success: (p: any, data: any) => {
                    if (obj.success != null) {
                        obj.success(this, data);
                    }
                },
                fail: () => {
                    if (obj.fail != null) {
                        obj.fail(this);
                    }
                },
            });
    }


    /*
    { 
       key:"", 
    success: (p:any,data:any) => {
        
    }, 
    fail: (p:any) => {
        
    },
    }
    */
    LoadByKey(obj: any) {
        var filepath = ConfigPrefab.main.GetPrefab(obj.key);
        ResManager.LoadPrefab(
            {
                filepath: filepath,
                success: (p: any, data: any) => {
                    if (obj.success != null) {
                        obj.success(this, data);
                    }
                },
                fail: () => {
                    if (obj.fail != null) {
                        obj.fail(this);
                    }
                },
            });
    }


    /*
   { 
    listKey:["",""], 
   success: (p:any,listData:any) => {
       
   }, 
   fail: (p:any) => {
       
   },
   }
   */
    LoadListByKey(obj: any) {
        var countLoad = 0;
        var listData: any[] = [];

        obj.listKey.forEach((key) => {
            this.LoadByKey(
                {
                    key: key,
                    success: (p: any, data: any) => {
                        var uiPrefab = data;
                        listData.push(data);
                        countLoad++;
                        if ((countLoad >= obj.listKey.length) && (listData.length == obj.listKey.length)) {
                            if (obj.success != null) {
                                obj.success(this, listData);
                            }
                        }

                    },
                    fail: () => {
                        countLoad++;
                        if (countLoad >= obj.listKey.length) {
                            if (obj.fail != null) {
                                obj.fail(this);
                            }
                        }

                    },
                });
        });


    }


    OnFinish(obj: any, isFail: boolean) {

    }


}


