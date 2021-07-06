
 
export default class PopUpData  {  


    // PopUpManager
    manager:any;
    
    static _main: PopUpData;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new PopUpData(); 
        }
        return this._main;
    }

 

}



