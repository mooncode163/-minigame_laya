import UIView from "../ViewController/UIView";

 
export default class UITextView extends UIView {
    static _main: UITextView;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new UITextView();
            // this._main.Init();
        }
        return this._main;
    }
 

}



