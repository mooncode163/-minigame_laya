import PrefabCache from "../../../../../Common/Cache/PrefabCache";
import Debug from "../../../../../Common/Debug";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIViewController from "../../../../../Common/UIKit/ViewController/UIViewController";
import UIGameMergeZuma from "./UIGameMergeZuma";

export default class GameZumaViewController extends UIViewController {

    uiPrefab: Laya.Prefab;
    ui: UIGameMergeZuma;
    runCount = 0;

    static _main: GameZumaViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new GameZumaViewController();
        }
        return this._main;
    }

    ViewDidLoad() {
        Debug.Log("GameZumaViewController ViewDidLoad");
        super.ViewDidLoad(); 
        this.LoadPrefab();
    }
    ViewDidUnLoad() {
        Debug.Log("GameZumaViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LoadPrefab() { 
        var key = "UIGameMergeZuma" 
        PrefabCache.main.LoadByKey(
            {
                key: key,
                // filepath: "Resources/AppCommon/Prefab/Home/UIHomeMerge.prefab",
                success: (p: any, data: any) => {
                    this.uiPrefab = data;

                    this.CreateUI();

                },
                fail: () => {

                },
            });
    }


    CreateUI() {
        Debug.Log("GameZumaViewController CreateUI");

        var node = UI.Instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIGameMergeZuma);
        this.ui.SetController(this);
    }

}