import { HomeViewController } from "../../AppBase/Home/HomeViewController";
import { NaviViewController } from "../../Common/UIKit/NaviBar/NaviViewController";

 
export class MainViewController extends NaviViewController {
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

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
