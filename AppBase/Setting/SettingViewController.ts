import { PrefabCache } from "../../Common/Cache/PrefabCache";
import Debug from "../../Common/Debug";
import { UIViewController } from "../../Common/UIKit/ViewController/UIViewController";
import { UISetting } from "./UISetting";

 
export default class SettingViewController extends UIViewController {

    uiPrefab: Prefab;
    ui: UISetting;
    runCount = 0;

    static _main: SettingViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new SettingViewController();
        }
        return this._main;
    }

    ViewDidLoad() {
        Debug.Log("HomeViewController ViewDidLoad");
        super.ViewDidLoad(); 
        this.LoadPrefab();
    }
    ViewDidUnLoad() {
        Debug.Log("HomeViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LoadPrefab() {
        var key = "UISetting"; 
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    this.uiPrefab = data;
                    this.CreateUI();

                },
                fail: () => {

                },
            });
    }
 

    CreateUI() { 
        this.CreateUIInternal();
         
    }
    CreateUIInternal() { 
        // return;
        const newNode = instantiate(this.uiPrefab);
        this.ui = newNode.getComponent(UISetting);
        this.ui.SetController(this); 
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
