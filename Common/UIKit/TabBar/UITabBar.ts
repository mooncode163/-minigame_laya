 
export default class UITabBar  {
    static _main: UITabBar;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new UITabBar();
            // this._main.Init();
        }
        return this._main;
    } 

}



