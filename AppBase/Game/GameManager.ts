// import GameViewController from "./GameViewController";
import LocalStorage from "../../Common/Core/LocalStorage";
import LevelData from "./LevelData";


export default class GameManager {
    public static KEY_DISABLE_UIPRIVACY: string = "KEY_DISABLE_UIPRIVACY";

    static gameMode = 0;
    uiPrefab: Laya.Prefab = null;

    static _main: GameManager;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new GameManager();
            this._main.Init();
        }
        return this._main;
    }

    Init() {
        //this.ParseGuanka();
    }
    LoadPrefab() {

    }


    //UIViewController
    GotoGame(fromController) {
        var navi = fromController.naviController;
        if (navi != null) {
            // navi.Push(GameViewController.main);
        }
    }

    GotoPlayAgain() {
        // GameViewController.main.gameBase.UpdateLevel(LevelData.main.gameLevel);
    }
   


}


