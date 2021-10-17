
import AppSceneUtil from "../../../../AppBase/Common/AppSceneUtil";
import LevelData from "../../../../AppBase/Game/LevelData";
import UIGameBase from "../../../../AppBase/Game/UIGameBase";
import PrefabCache from "../../../../Common/Cache/PrefabCache";
import CameraUtil from "../../../../Common/Camera/CameraUtil";
import ConfigPrefab from "../../../../Common/Config/ConfigPrefab";
import Debug from "../../../../Common/Debug";
import Language from "../../../../Common/Language/Language";
import LayOutSize from "../../../../Common/UIKit/LayOut/LayOutSize";
import { SizeType } from "../../../../Common/UIKit/LayOut/LayOutUtil";
import PopUpManager from "../../../../Common/UIKit/PopUp/PopUpManager";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UIText from "../../../../Common/UIKit/UIText/UIText";
import UI from "../../../../Common/UIKit/ViewController/UI";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind";
import GameData from "../../Data/GameData";
import GameMerge from "./GameMerge";
import UIPopProp, { PropType } from "./UIPopProp";
import UIToolBar from "./UIToolBar";
import UIScoreNumber from "./Zuma/UIScoreNumber";


// 微信小程序 wx3e44af039aee1b96
export default class UIGameMerge extends UIGameBase {
    /** @prop {name:btnBack,type:Node}*/
 
    uiScoreNumber: UIScoreNumber;
    game: GameMerge = null;
    // nodeImageBg:Node,
    isShowGame = false;

    uiToolBar: UIToolBar;
    btnScore: UIButton;
    typeProp: PropType;
    LayOut() {
        super.LayOut();
        // if (this.game) {
        //     this.game.LayOut();
        // }
    }

    onAwake() {
        super.onAwake();
        GameData.main.uiGame = this;
        this.LayOut();
        // this.LoadLanguageGame(); 
        // this.textTitle.node.active = false; 
        // var nodeTopbar = UIFind.Find(this.node, "TopBar");
        this.btnBack = UIFind.FindUI(this.node, "BtnBack", UIButton);
        this.btnBack.SetClick(this, this.OnClickBtnBack.bind(this));

        this.btnScore = UIFind.FindUI(this.node, "btnScore", UIButton);
 

        this.uiScoreNumber = UIFind.FindUI(this.node, "ScoreNumber", UIScoreNumber);

        // var image = new Laya.Image();
        // image.width = 256;
        // image.height = 256;
        // image.x = 512;
        // var filepath = "comp/image.png";
        // image.skin = filepath
        // var cl = image.addComponent(Laya.CircleCollider);
        // cl.radius = image.width/2;
        // var bd = image.addComponent(Laya.RigidBody);
        // this.node.addChild(image);

        this.uiToolBar = UIFind.FindUI(this.node, "ToolBar", UIToolBar);
        this.uiToolBar.visible = false;

    }
    onStart() {
        super.onStart();
        this.LayOut();
        this.UpdateLevel(LevelData.main.gameLevel);
        // this.ShowGameWinAlert();
        // this.OnGameFinish(true);
        // this.LoadUIPopProp();
    }
    onDestroy() {
        super.onDestroy();
        Debug.Log("UIGameMerge onDestroy");
        if (this.game) {
            this.game.node.destroy();
        }
    }
    OnClickBtnBack() {
        // if (this.game) {
        //     this.game.destroy();
        // }
        super.OnClickBtnBack();
    }
    LoadUIPopProp() {
        var key = "UIPopProp";
        key = "UIGameFail"
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    var node = UI.Instantiate(data);
                    this.owner.addChild(node);
                },
                fail: () => {
                },
            });


    }

    CreateGame() {

        this.game = UI.CreateUI3D(GameMerge, null);
    }



    private mat1: Laya.BlinnPhongMaterial;
    private newScene: Laya.Scene3D;
    test() {

    }



    CreateGameInteranl() {

        this.game = UI.CreateUI3D(GameMerge, null);
        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        this.game.width = size.x;
        this.game.height = size.y;

        // var ly: LayOutSize = this.game.node.addComponent(LayOutSize);
        // ly.typeX = SizeType.CONTENT;
        // ly.typeY = SizeType.CONTENT;

        // this.test();
        Laya.timer.once(250, this, function (): void {

        });
        this.isShowGame = true;

      
    }
    UpdateScore() {
        var str = Language.main.GetString("Score") + ":" + GameData.main.score.toString();
        Debug.Log("UpdateScore str=" + str); 
        this.btnScore.textTitle.text = str;
        this.uiScoreNumber.UpdateScore();
        this.LayOut();

    }


    UpdateLevel(level: number) {
        super.UpdateLevel(level);
        Debug.Log("UIGameShapeColor::UpdateGuankaLevel");
        // return;

        GameData.main.isGameFail = false;

        GameData.main.score = 0;
        this.CreateGameInteranl();

        this.UpdateScore();
        // this.game.textTitle = this.textTitle;
        // this.textTitle.node.active = false;

        // this.game.objGameFinish = {
        //     onWin (ui) {
        //         this.OnGameWinFinish(ui, false);
        //     }.bind(this),
        //     onFail (ui) {
        //         this.OnGameWinFinish(ui, true);
        //     }.bind(this),
        // };

        // this.game.LoadGame(GameManager.gameMode);
        // this.LoadUIPopProp();

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

    ShowProp() {
        this.uiToolBar.OnClickBtnBomb();
        this.OnUIDidFinish();
    }

    OnGameProp(ui: UIPopProp, type: PropType) {
        this.typeProp = type;

        Debug.Log("OnGameProp typeProp=" + this.typeProp);
        switch (type) {
            case PropType.Hammer:
                {

                }
                break;
            case PropType.Magic:
                {
                    GameMerge.main.ChangeItem(ui.idChangeTo);
                }
                break;
            case PropType.Bomb:
                {

                }
                break;
        }
    }


}


