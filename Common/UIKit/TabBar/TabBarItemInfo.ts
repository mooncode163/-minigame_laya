
 
export default class TabBarItemInfo  {
    static _main: TabBarItemInfo;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new TabBarItemInfo();
            // this._main.Init();
        }
        return this._main;
    }
 

}



