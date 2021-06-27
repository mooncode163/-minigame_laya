import { HomeViewController } from "../../AppBase/Home/HomeViewController";
import { NaviViewController } from "../../Common/UIKit/NaviBar/NaviViewController";

 
export default class MainViewController extends NaviViewController {
    static _main: MainViewController;
    //静态方法
    static get main() { 
        if (this._main == null) {
            this._main = new MainViewController();
        }
        return this._main;
    }
    ViewDidLoad() {
        super.ViewDidLoad();
        // debug.setDisplayStats(false);
        this.Push(HomeViewController.main);//HomeViewController
    }

     
}


