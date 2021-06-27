
 
export default class TabBarViewController  {
    static _main: TabBarViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new TabBarViewController();
            // this._main.Init();
        }
        return this._main;
    }
 

}



