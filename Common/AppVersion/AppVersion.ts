 
export default class AppVersion  {
    static _main: AppVersion;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AppVersion();
            // this._main.Init();
        }
        return this._main;
    }
 

}



