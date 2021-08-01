import AppRes from "../../Apps/Main/AppRes";
import AdKitCommon from "../../Common/AdKit/AdKitCommon";
import MusicBgPlay from "../../Common/Audio/MusicBgPlay";
import PrefabCache from "../../Common/Cache/PrefabCache";
import Common from "../../Common/Common";
import CommonRes from "../../Common/CommonRes";
import Debug from "../../Common/Debug";
import ItemInfo from "../../Common/ItemInfo";
import Language from "../../Common/Language/Language";
import Share from "../../Common/Share/Share";
import FrendBoard from "../../Common/SNS/FrendBoard";
import UIButton from "../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../Common/UIKit/UIImage/UIImage";
import UIText from "../../Common/UIKit/UIText/UIText";
import ViewAlertManager from "../../Common/UIKit/UIViewAlert/ViewAlertManager";
import UIView from "../../Common/UIKit/ViewController/UIView";
import GameManager from "./GameManager";
import LevelData from "./LevelData";
import LevelManager from "./LevelManager";
import Config from "../../Common/Config/Config";
import UIFind from "../../Common/UIKit/ViewController/UIFind";



export default class UIGameBase extends UIView {
    static GAME_AD_INSERT_SHOW_STEP = 2;
    gamePrefab: Laya.Prefab | null = null;

    btnMusic: UIButton | null = null;

    /** @prop {name:btnBack,type:Node}*/
    // btnBack: Laya.Node;
    btnBack:UIButton;

    imageBg: UIImage | null = null;

    textTitle: UIText | null = null;

    listProLoad: ItemInfo[] = [];
    onAwake() {
        super.onAwake();

        // var nodeTopbar = UIFind.Find(this.node, "TopBar");
        // this.btnBack = UIFind.FindUI(this.node, "BtnBack",UIButton);
        // this.btnBack.SetClick(this, this.OnClickBtnBack.bind(this));

        this.LayOut();
        this.LoadGamePrefab();
    }
    onStart() {
        super.onStart();
        this.LayOut();
    }

    OnClickBtnBack() { 
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    }



    Init() {
    }

    LoadGamePrefab() {
        PrefabCache.main.LoadByKey(
            {
                key:"GameMerge",
                // filepath: "Resources/AppCommon/Prefab/Game/GameMerge.prefab",
                success: (p: any, data: any) => {
                    this.gamePrefab = data;
                    this.CreateGame();

                },
                fail: () => {

                },
            });
    }
    LoadGamePrefab2() {
        var key = "Game" + Config.main.appType;
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    this.gamePrefab = data;
                    this.CreateGame();
                },
                fail: () => {
                },
            });


    }
    CreateGame() {
    }


    UpdateBtnMusic() {
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, false);
        this.btnMusic.UpdateSwitch(ret);

    }

    OnClickBtnMusic(event, customEventData) {
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, false);//(AppString.STR_KEY_BACKGROUND_MUSIC);
        var v = !ret;
        Debug.Log("UpdateBtnSwitch value=" + v);
        Common.SetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, v);
        this.UpdateBtnMusic();
        if (v) {
            MusicBgPlay.main.PlayBgMusic();
        }
        else {
            MusicBgPlay.main.StopBgMusic();
        }
    }
    OnClickBtnShare(event, customEventData) {
        //    Share.main.ShareImageText("", Config.main.shareTitle, Config.main.shareUrl, "");
    }

    //guanka  

    UpdateLevel(level: number) {
        var idx = level;
        Debug.Log("UIGameBase::UpdateLevel idx=" + idx);
        if (idx >= 3) {
            var isLock = Common.GetBoolOfKey("KEY_GAME_LOCK", true);
            if (isLock) {
                //AlertLockViewController.main.Show(null, null);
            }
        }

    }
    UpdatePlaceLevel(level) {
    }


    LoadLanguageGameDidFinish(p) {

    }

    LoadLanguageGame() {
        var info = LevelData.main.GetPlaceItemInfo(LevelData.main.placeLevel);


    }

    ShowUserGuide() {
        var key = CommonRes.KEY_USER_GUIDE + Config.main.version;
        var isshowplay = Common.GetBoolOfKey(key, false);
        if (isshowplay == true) {
            return;
        }
        var title = Language.main.GetString("STR_UIVIEWALERT_TITLE_USER_GUIDE");
        var msg = Language.main.GetString("STR_UIVIEWALERT_MSG_USER_GUIDE");
        var yes = Language.main.GetString("STR_UIVIEWALERT_YES_USER_GUIDE");
        var no = yes;
        ViewAlertManager.main.ShowFull(
            {
                title: title,
                msg: msg,
                yes: yes,
                no: no,
                isShowBtnNo: false,
                name: "STR_KEYNAME_VIEWALERT_USER_GUIDE",
                finish: (ui: any, isYes: boolean) => {
                    if (isYes) {
                    } else {

                    }
                    Common.SetBoolOfKey(key, true);
                },
                close: (ui: any) => {
                },
            });


    }

    ShowAdInsert(step) {
        var _step = step;
        if (_step <= 0) {
            _step = 1;
        }
        //GameManager.main.isShowGameAdInsert = false;
        // if ((GameManager.gameLevel != 0) && ((GameManager.gameLevel % _step) == 0))
        if ((LevelData.main.gameLevel % _step) == 0) {
            AdKitCommon.main.InitAdInsert();
            AdKitCommon.main.ShowAdInsert(100);
            //GameManager.main.isShowGameAdInsert = true;
        }
    }

    OnGameWinBase() {
        this.ShowAdInsert(UIGameBase.GAME_AD_INSERT_SHOW_STEP);
        if (LevelData.main.gameLevelFinish < LevelData.main.gameLevel) {
            LevelData.main.gameLevelFinish = LevelData.main.gameLevel;
            //好友排行榜
            let score = LevelData.main.placeLevel + "-" + LevelData.main.gameLevel;
            Debug.Log("OnGameWin score=" + score);
            FrendBoard.main.SaveData(score);
        }

    }

    ShowGameWinAlert() {
        var title = Language.main.GetString("STR_UIVIEWALERT_TITLE_GAME_FINISH");
        var msg = Language.main.GetString("STR_UIVIEWALERT_MSG_GAME_FINISH");
        var yes = Language.main.GetString("STR_UIVIEWALERT_YES_GAME_FINISH");
        var no = Language.main.GetString("STR_UIVIEWALERT_NO_GAME_FINISH");
        Debug.Log("game finish ShowFull");
        ViewAlertManager.main.ShowFull(
            {
                title: title,
                msg: msg,
                yes: yes,
                no: no,
                isShowBtnNo: true,
                name: "STR_KEYNAME_VIEWALERT_GAME_FINISH",
                finish: (ui: any, isYes: boolean) => {
                    if (isYes) {
                        LevelManager.main.GotoNextLevelWithoutPlace();
                    } else {
                        //replay
                        GameManager.main.GotoPlayAgain();
                    }
                },
                close: (ui: any) => {
                },
            });
    }

}


