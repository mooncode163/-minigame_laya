import PrefabCache from "../../../../../Common/Cache/PrefabCache";
import Debug from "../../../../../Common/Debug";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIViewController from "../../../../../Common/UIKit/ViewController/UIViewController";
import GameLearnData from "./GameLearnData";
import UIGameLearn from "./UIGameLearn";

export default class GameLearnViewController extends UIViewController {

    uiPrefab: Laya.Prefab;
    ui: UIGameLearn;
    runCount = 0;

    static _main: GameLearnViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new GameLearnViewController();
        }
        return this._main;
    }

    ViewDidLoad() {
        Debug.Log("GameLearnViewController ViewDidLoad");
        super.ViewDidLoad();
        GameLearnData.main.StartParseItem({
            success: (p: any) => {
                this.LoadPrefab();
            },
            fail: (p: any) => {
            },
        });
    }
    ViewDidUnLoad() {
        Debug.Log("GameLearnViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LoadPrefab() {
        var key = "UIGameLearn"
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
        Debug.Log("GameLearnViewController CreateUI");

        var node = UI.Instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIGameLearn);
        this.ui.SetController(this);
    }

}