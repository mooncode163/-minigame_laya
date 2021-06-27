 
export default class UIFrendBoard  {
    static _main: UIFrendBoard;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new UIFrendBoard();
            // this._main.Init();
        }
        return this._main;
    }
 

}



