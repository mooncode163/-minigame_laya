import GameData from "../../../Apps/Ladder/Data/GameData";
import CameraUtil from "../../../Common/Camera/CameraUtil";
import ConfigPrefab from "../../../Common/Config/ConfigPrefab";
import Debug from "../../../Common/Debug";
import PopUpManager from "../../../Common/UIKit/PopUp/PopUpManager";
import UIButton from "../../../Common/UIKit/UIButton/UIButton";
import UI from "../../../Common/UIKit/ViewController/UI";
import UIFind from "../../../Common/UIKit/ViewController/UIFind";
import LevelData from "../LevelData";
import UIGameBase from "../UIGameBase";
import GameSample from "./GameSample";

 


// 微信小程序 wx3e44af039aee1b96
export default class UIGameSample extends UIGameBase {
    /** @prop {name:btnBack,type:Node}*/
 
    game:GameSample;
    
    // static _main: UIGameSample;
    // //静态方法
    // static get main() {
    //     return this._main;
    // }


    LayOut() {
        super.LayOut();
    }

    onAwake() {
        super.onAwake();
        // UIGameSample._main = this;
        GameData.main.uiGame = this;
        this.LayOut();
        // this.LoadLanguageGame(); 
        // this.textTitle.node.active = false; 
        // var nodeTopbar = UIFind.Find(this.node, "TopBar");
        this.btnBack = UIFind.FindUI(this.node, "BtnBack",UIButton);
        this.btnBack.SetClick(this, this.OnClickBtnBack.bind(this));

       

    }
    onStart() {
        super.onStart();
        this.LayOut();

         
    }
 

    CreateGame() {
        this.UpdateLevel(LevelData.main.gameLevel);


    }
 

    UpdateLevel(level: number) {
        super.UpdateLevel(level);
        Debug.Log("UIGameShapeColor::UpdateGuankaLevel");
        // return;

        GameData.main.isGameFail = false;

        GameData.main.score = 0;

        // 3d
        this.game = UI.CreateUI3D(GameSample, null);
        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        this.game.width = size.x;
        this.game.height = size.y;

    }


    OnGameFinish(isFail: boolean) {
        // var info = GameLevelParse.main.GetLevelItemInfo(LevelData.main.gameLevel);  
        Debug.Log("OnGameFinish enter isFail=" + isFail);
        var key = "UIGameWin";
        var strPrefab = "";
        //show game win
        if (isFail) {
            // this.ShowAdInsert(UIGameBase.GAME_AD_INSERT_SHOW_STEP);

            key = "UIGameFail";
        }

        strPrefab = ConfigPrefab.main.GetPrefab(key);

        PopUpManager.main.Show(
            {
                prefab: strPrefab,
                open: (ui: any) => {
                    // AudioPlay.main.PlayByKey("Fail");
                },
                close: (ui: any) => {
                },
            });
    }

     
}


