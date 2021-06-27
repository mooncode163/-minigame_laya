
 
export default class UITabBarItem  {
    static _main: UITabBarItem;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new UITabBarItem();
            // this._main.Init();
        }
        return this._main;
    }
 

}



