
import LevelData from "../../../../AppBase/Game/LevelData";
import UIGameBase from "../../../../AppBase/Game/UIGameBase";
import PrefabCache from "../../../../Common/Cache/PrefabCache";
import ConfigPrefab from "../../../../Common/Config/ConfigPrefab";
import Debug from "../../../../Common/Debug";
import Language from "../../../../Common/Language/Language";
import PopUpManager from "../../../../Common/UIKit/PopUp/PopUpManager";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UIText from "../../../../Common/UIKit/UIText/UIText";
import UI from "../../../../Common/UIKit/ViewController/UI";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind";
import GameData from "../../Data/GameData";
import GameMerge from "./GameMerge";
import UIPopProp, { PropType } from "./UIPopProp";
import UIToolBar from "./UIToolBar";



export default class UIGameMerge extends UIGameBase {
    /** @prop {name:btnBack,type:Node}*/

    titleScore: UIText | null = null;

    game: GameMerge = null;
    // nodeImageBg:Node,
    isShowGame = false;

    uiToolBar: UIToolBar;

    typeProp: PropType;

    static _main: UIGameMerge;
    //静态方法
    static get main() {
        return this._main;
    }


    LayOut() {
        super.LayOut();
    }

    onAwake() {
        super.onAwake();
        UIGameMerge._main = this;
        GameData.main.uiGame = this;
        this.LayOut();
        // this.LoadLanguageGame(); 
        // this.textTitle.node.active = false; 
        var nodeTopbar = UIFind.Find(this.node, "TopBar");
        this.btnBack = UIFind.FindButton(nodeTopbar, "BtnBack");
        this.btnBack.SetClick(this, this.OnClickBtnBack.bind(this));

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

    }
    onStart() {
        super.onStart();
        this.LayOut();

        // this.ShowGameWinAlert();
        this.OnGameFinish(true);
        // this.LoadUIPopProp();
    }

    OnClickBtnBack() {
        if (this.game != null) {
            this.game.OnDestroy();
            this.game.destroy();
        }
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
        this.UpdateLevel(LevelData.main.gameLevel);


    }

    CreateGameInteranl() {
        if (this.game != null) {
            this.game.OnDestroy();
            this.game.destroy();
        }
        var node = UI.Instantiate(this.gamePrefab);
        this.game = node.getComponent(GameMerge);
        this.owner.addChild(this.game.owner);
        //zorder  priority 让imageBg 显示在最底层，game显示在UI下面
        // 
        // zIndex priority
        // this.imageBg.node.getComponent(UITransform).priority = -20; 
        // this.game.node.getComponent(UITransform).priority = -10;
        this.isShowGame = true;
        // this.callbackGuankaFinish = null;


    }
    UpdateScore() {
        // var str = Language.main.GetString("Score") + ":" + GameData.main.score.toString();
        // Debug.Log("UpdateScore str="+str);
        // this.titleScore.text = str;
        // this.LayOut();

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
        this.uiToolBar.OnClickBtnBomb(null, null);
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


