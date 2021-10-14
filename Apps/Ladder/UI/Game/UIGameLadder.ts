import LevelData from "../../../../AppBase/Game/LevelData";
import UIGameBase from "../../../../AppBase/Game/UIGameBase";
import ConfigPrefab from "../../../../Common/Config/ConfigPrefab";
import Debug from "../../../../Common/Debug";
import PopUpManager from "../../../../Common/UIKit/PopUp/PopUpManager";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind";
import GameData from "../../Data/GameData";

 
export default class UIGameLadder extends UIGameBase {
    /** @prop {name:btnBack,type:Node}*/
 

    static _main: UIGameLadder;
    //静态方法
    static get main() {
        return this._main;
    }


    LayOut() {
        super.LayOut();
    }

    onAwake() {
        super.onAwake();
        UIGameLadder._main = this;
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


