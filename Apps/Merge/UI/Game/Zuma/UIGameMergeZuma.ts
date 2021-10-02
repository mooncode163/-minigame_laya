import AppSceneBase from "../../../../../AppBase/Common/AppSceneBase";
import LevelData from "../../../../../AppBase/Game/LevelData";
import LevelManager from "../../../../../AppBase/Game/LevelManager";
import UIGameBase from "../../../../../AppBase/Game/UIGameBase";
import AudioPlay from "../../../../../Common/Audio/AudioPlay";
import PrefabCache from "../../../../../Common/Cache/PrefabCache";
import ConfigPrefab from "../../../../../Common/Config/ConfigPrefab";
import Debug from "../../../../../Common/Debug";
import Device from "../../../../../Common/Device";
import ItemInfo from "../../../../../Common/ItemInfo";
import Language from "../../../../../Common/Language/Language";
import PopUpManager from "../../../../../Common/UIKit/PopUp/PopUpManager";
import UIText from "../../../../../Common/UIKit/UIText/UIText";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIView from "../../../../../Common/UIKit/ViewController/UIView";
import UIViewController from "../../../../../Common/UIKit/ViewController/UIViewController";
import GameLevelParse from "../../../../Main/GameLevelParse";
import GameData, { GameStatus } from "../../../Data/GameData";
import UIGameFail from "../GameFinish/UIGameFail";
import UIGameWin from "../GameFinish/UIGameWin";
import UIPopProp, { PropType } from "../UIPopProp";
import UIToolBar from "../UIToolBar";
import GameMergeZuma from "./GameMergeZuma"; 
import UIScoreNumber from "./UIScoreNumber";


export default class UIGameMergeZuma extends UIGameBase {
    autoClickTime = 0.6;//0.2f

    public titleScore: UIText;
    public uiScoreNumber: UIScoreNumber;
    public uiToolBar: UIToolBar;

    public game: GameMergeZuma;
    public typeProp: PropType;

    //  autoClick:AutoClick;
    onAwake() {
        super.onAwake();
        GameData.main.uiGameZuma = this;
        GameData.main.gameStatus = GameStatus.Play;
        GameData.main.controller = this.controller;// GameZumaViewController.main;
        this.LayOut();
    }

    onStart() {
        super.onStart();

        this.UpdateLevel(LevelData.main.gameLevel);
        this.LayOut();
        // InitAutoClick();



        // var isShowProp = false;
        // if (Device.main.isScreenShot)
        // {
        //     if (LevelData.main.gameLevel > 1)
        //     {
        //         isShowProp = true; 
        //         Invoke("ShowProp", autoClickTime * GameData.main.autoClickCount / 3);
        //     }
        // }
        // if (!isShowProp)
        // {

        //     OnUIDidFinish(autoClickTime * GameData.main.autoClickCount * 1.2f);

        // }

        this.LayOut();
    }


    // public   InitAutoClick()
    // {
    //     if (!Device.main.isScreenShot)
    //     {
    //         return;
    //     }
    //     GameMergeZuma.main.isAutoClick = true;

    //     autoClick = this.gameObject.AddComponent<AutoClick>();
    //     autoClick.iDelegate = this;
    //     autoClick.autoClickTime = autoClickTime;
    //     autoClick.autoClickCount = GameData.main.autoClickCount;

    //     autoClick.RunAuto();

    // }
    // public   OnAutoClickDidClick(AutoClick auto)
    // {

    // }
    // public   OnAutoClickClickDown(AutoClick auto)
    // {
    //     GameMergeZuma.main.isMouseDown = true;
    // }
    // OnAutoClickClickUp(AutoClick auto)
    // {
    //     GameMergeZuma.main.isMouseUp = true;
    // }

    ShowProp() {
        this.uiToolBar.OnClickBtnBomb();
        this.OnUIDidFinish();
    }
    LayOut() {
        super.LayOut();
    }

    UpdateLevel(level) {
        super.UpdateLevel(level);

        // GameLevelParse.main.CleanGuankaList();
        // GameLevelParse.main.ParseGuanka(); 
        PrefabCache.main.LoadByKey(
            {
                key: "GameMergeZuma",
                success: (p: any, data: any) => {
                    this.gamePrefab = data;
                    this.CreateGame();

                },
                fail: () => {

                },
            });



    }

    CreateGame() {
        var node = UI.Instantiate(this.gamePrefab);
        this.game = node.getComponent(GameMergeZuma);
        // AppSceneBase.main.AddObjToMainWorld(game.gameObject); 
        GameData.main.score = 0;
        this.UpdateScore();
    }


    UpdateScore() {
        this.titleScore.text = Language.main.GetString("Score") + ":" + GameData.main.score.toString();
        this.uiScoreNumber.UpdateScore();
        this.LayOut();
    }

    OnPlayAgain() {
        if (this.game == null) {
            return;
        }
        this.game.Clear();
    }

    OnGameProp(ui: UIPopProp, type: PropType) {
        this.typeProp = type;
        this.game.ShowProp(true);
        Debug.Log("OnGameProp typeProp=" + this.typeProp);
        switch (type) {
            case PropType.Hammer:
                {

                }
                break;
            case PropType.Magic:
                {
                    this.game.ChangeItem(ui.idChangeTo);
                }
                break;
            case PropType.Bomb:
                {

                }
                break;
        }
    }

    OnGameFinish(isFail: boolean) {
        if (Device.main.isScreenShot) {
            return;
        }
        var infoPlace = LevelData.main.GetPlaceItemInfo(LevelManager.main.placeLevel);
        var key = "UIGameWin";
        var strPrefab = "";
        //show game win
        if (isFail) {
            this.ShowAdInsert(UIGameBase.GAME_AD_INSERT_SHOW_STEP, false);
            // AudioPlay.main.PlayFile(AppRes.AUDIO_Fail); 
            PopUpManager.main.ShowByKey(
                {
                    key: "UIGameFail",
                    open: (ui: any) => {
                    },
                    close: (ui: any) => {

                    },
                });

        }
        else {
            // AudioPlay.main.PlayFile(AppRes.AUDIO_Win);
            Debug.Log("  OnGameWin");
            LevelData.main.gameLevelFinish = LevelData.main.gameLevel;
            // OnGameWinBase(); 

            PopUpManager.main.ShowByKey(
                {
                    key: "UIGameWin",
                    open: (ui: any) => {
                    },
                    close: (ui: any) => {

                    },
                });

        }

    }
}
