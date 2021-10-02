import AppSceneBase from "../../../../../AppBase/Common/AppSceneBase";
import AppSceneUtil from "../../../../../AppBase/Common/AppSceneUtil";
import LevelData from "../../../../../AppBase/Game/LevelData";
import LevelManager from "../../../../../AppBase/Game/LevelManager";
import UIGameBase from "../../../../../AppBase/Game/UIGameBase";
import AudioPlay from "../../../../../Common/Audio/AudioPlay";
import PrefabCache from "../../../../../Common/Cache/PrefabCache";
import TextureCache from "../../../../../Common/Cache/TextureCache";
import CameraUtil from "../../../../../Common/Camera/CameraUtil";
import ConfigPrefab from "../../../../../Common/Config/ConfigPrefab";
import Debug from "../../../../../Common/Debug";
import Device from "../../../../../Common/Device";
import ItemInfo from "../../../../../Common/ItemInfo";
import Language from "../../../../../Common/Language/Language";
import Platform from "../../../../../Common/Platform";
import PopUpManager from "../../../../../Common/UIKit/PopUp/PopUpManager";
import UISprite from "../../../../../Common/UIKit/UIImage/UISprite";
import UIText from "../../../../../Common/UIKit/UIText/UIText";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIFind from "../../../../../Common/UIKit/ViewController/UIFind";
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

    public textScore: UIText;
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

        this.textScore = UIFind.FindUI(this.node, "textScore", UIText);

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
        // return;
        // GameLevelParrse.main.CleanGuankaList();
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
        AppSceneBase.main.AddObjToMainWorld(node);
        GameData.main.score = 100;

        var node = new Laya.Node();
        var uiSprite = node.addComponent(UISprite);
        uiSprite.keyImage ="GameWinBg";//GameBg GameWinBg
        AppSceneUtil.mainScene.addChild(node);


        // var isCloud = false;
        // if (Platform.isCloudRes) {
        //     isCloud = true;
        // }

        // TextureCache.main.LoadByKey(
        //     {
        //         key: "GameWinBg",
        //         isCloud: isCloud,
        //         isSprite:true,
        //         success: (p: any, tex: Laya.Texture2D) => {
        //             var size = CameraUtil.main.GetWorldSize(this.mainCam);
        //             var w = tex.width / 100 / 4;
        //             var h = tex.height / 100 / 4;
        //             w = size.x;
        //             h = size.y;
        //             //添加自定义模型 
        //             // var box: Laya.MeshSprite3D = AppSceneUtil.mainScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createQuad(w, h))) as Laya.MeshSprite3D;
        //             // ng
        //             // var box: Laya.MeshSprite3D = this.node.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createQuad(w, h))) as Laya.MeshSprite3D;
        //             // var node = new Laya.Node();
        //             // AppSceneUtil.mainScene.addChild(node);
        //             var box: Laya.MeshSprite3D = AppSceneUtil.mainScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createQuad(w, h))) as Laya.MeshSprite3D;
        //             // box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        //             var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        //             material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT;
        //             // res/layabox.png

        //             box.meshRenderer.material = material;
        //             material.albedoTexture = tex;
        //             // box.transform.translate(new Laya.Vector3(0,-1, 0));
        //         },
        //         fail: (p: any) => {

        //         },
        //     });

        // Laya.Texture2D.load("GameWinBg.png", Laya.Handler.create(this, function (tex: Laya.Texture2D) {

        //     var size = CameraUtil.main.GetWorldSize(this.mainCam);
        //     var w = tex.width / 100 / 4;
        //     var h = tex.height / 100 / 4;
        //     w = size.x;
        //     h = size.y;
        //     //添加自定义模型 
        //     // var box: Laya.MeshSprite3D = AppSceneUtil.mainScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createQuad(w, h))) as Laya.MeshSprite3D;
        //     // ng
        //     // var box: Laya.MeshSprite3D = this.node.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createQuad(w, h))) as Laya.MeshSprite3D;
        //     // var node = new Laya.Node();
        //     // AppSceneUtil.mainScene.addChild(node);
        //     var box: Laya.MeshSprite3D = AppSceneUtil.mainScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createQuad(w, h))) as Laya.MeshSprite3D;
        //     // box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        //     var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        //     material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT;
        //     // res/layabox.png

        //     box.meshRenderer.material = material;
        //     material.albedoTexture = tex;
        //     // box.transform.translate(new Laya.Vector3(0,-1, 0));
        // }.bind(this)));

        this.UpdateScore();
    }


    UpdateScore() {
        this.textScore.text = Language.main.GetString("Score") + ":" + GameData.main.score.toString();
        // this.uiScoreNumber.UpdateScore();
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
