import PrefabCache from "../../Common/Cache/PrefabCache";
import Debug from "../../Common/Debug";
import UI from "../../Common/UIKit/ViewController/UI";
import UIViewController from "../../Common/UIKit/ViewController/UIViewController";
import UISetting from "./UISetting";

 

 
export default class SettingViewController extends UIViewController {

    uiPrefab: Laya.Prefab;
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
        Debug.Log("SettingViewController ViewDidLoad");
        super.ViewDidLoad(); 
        this.LoadPrefab();
    }
    ViewDidUnLoad() {
        Debug.Log("SettingViewController ViewDidUnLoad");
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
        // return;
        const newNode = UI.Instantiate(this.uiPrefab);//UI.I(this.uiPrefab);
        this.ui = newNode.getComponent(UISetting);
        this.ui.SetController(this); 
    }

}


