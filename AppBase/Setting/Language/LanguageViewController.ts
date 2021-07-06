import PrefabCache from "../../../Common/Cache/PrefabCache";
import Debug from "../../../Common/Debug";
import UI from "../../../Common/UIKit/ViewController/UI";
import UIViewController from "../../../Common/UIKit/ViewController/UIViewController";
import UILanguage from "./UILanguage";

 

 
export default class LanguageViewController extends UIViewController {

    uiPrefab: Laya.Prefab;
    ui: UILanguage;
    runCount = 0;

    static _main: LanguageViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new LanguageViewController();
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
        var key = "UILanguage"; 
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
        var node = UI.Instantiate(this.uiPrefab);
        this.ui = node.getComponent(UILanguage);
        this.ui.SetController(this);
        this.ui.SetController(this); 
    }

}


