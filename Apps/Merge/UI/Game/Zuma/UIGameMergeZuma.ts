import AppSceneBase from "../../../../../AppBase/Common/AppSceneBase";
import AppSceneUtil from "../../../../../AppBase/Common/AppSceneUtil";
import LevelData from "../../../../../AppBase/Game/LevelData";
import LevelManager from "../../../../../AppBase/Game/LevelManager";
import UIGameBase from "../../../../../AppBase/Game/UIGameBase";
import Action3D, { ActionType } from "../../../../../Common/Action/Action3D";
import AudioPlay from "../../../../../Common/Audio/AudioPlay";
import PrefabCache from "../../../../../Common/Cache/PrefabCache";
import TextureCache from "../../../../../Common/Cache/TextureCache";
import CameraUtil from "../../../../../Common/Camera/CameraUtil";
import Common from "../../../../../Common/Common";
import ConfigPrefab from "../../../../../Common/Config/ConfigPrefab";
import ImageRes from "../../../../../Common/Config/ImageRes";
import Debug from "../../../../../Common/Debug";
import Device from "../../../../../Common/Device";
import ItemInfo from "../../../../../Common/ItemInfo";
import Language from "../../../../../Common/Language/Language";
import Platform from "../../../../../Common/Platform";
import DataTouch from "../../../../../Common/UIKit/Event/DataTouch";
import UITouchEvent from "../../../../../Common/UIKit/Event/UITouchEvent";
import PopUpManager from "../../../../../Common/UIKit/PopUp/PopUpManager";
import UIButton from "../../../../../Common/UIKit/UIButton/UIButton";
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
import UIMergeItem from "../UIMergeItem";
import UIPopProp, { PropType } from "../UIPopProp";
import UIToolBar from "../UIToolBar";
import GameMergeZuma from "./GameMergeZuma";
import UIScoreNumber from "./UIScoreNumber";


export default class UIGameMergeZuma extends UIGameBase {
    autoClickTime = 0.6;//0.2f

    public btnScore: UIButton;
    public uiScoreNumber: UIScoreNumber;
    public uiToolBar: UIToolBar;

    public game: GameMergeZuma;
    public typeProp: PropType;

    //  autoClick:AutoClick;
    onAwake() {
        super.onAwake();
        GameData.main.uiGame = this;
        GameData.main.uiGameZuma = this;
        // GameData.main.gameStatus = GameStatus.Play;
        GameData.main.controller = this.controller;// GameZumaViewController.main;
 
        this.uiScoreNumber = UIFind.FindUI(this.node, "ScoreNumber", UIScoreNumber);

        this.btnScore = UIFind.FindUI(this.node, "btnScore", UIButton);
        // var ev = this.node.addComponent(UITouchEvent);
        // ev.callBackTouch = this.OnUITouchEvent.bind(this);


        // ev.timeTouchMin = 1.0;
        // var box = this.node.addComponent(Laya.BoxCollider);
        // box.width = Common.sizeCanvas.width;
        // box.height =  Common.sizeCanvas.height;

        // var uiBg = UI.CreateUI3D(UISprite, null, "HomeBg"); //GameBg
        // uiBg.position = new Laya.Vector3(0, 0, -1- 5);

        this.btnBack = UIFind.FindUI(this.node, "BtnBack", UIButton);
        this.btnBack.SetClick(this, this.OnClickBtnBack.bind(this));

        this.uiToolBar = UIFind.FindUI(this.node, "ToolBar", UIToolBar);
        this.uiToolBar.visible = false;

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
        // if(this.game)
        // {
        //     this.game.LayOut();
        // }
    }
    onDestroy() {
        super.onDestroy();
        Debug.Log("UIGameMergeZuma onDestroy");
        if (this.game) {
            this.game.node.destroy();
        }
    }
    UpdateLevel(level) {
        super.UpdateLevel(level);
        // return;
        // GameLevelParrse.main.CleanGuankaList();
        // GameLevelParse.main.ParseGuanka(); 
        // PrefabCache.main.LoadByKey(
        //     {
        //         key: "GameMergeZuma",
        //         success: (p: any, data: any) => {
        //             this.gamePrefab = data;
        //             this.CreateGame();

        //         },
        //         fail: () => {

        //         },
        //     });
        this.CreateGame();

    }

    OnTest() {
        // this.game.OnTest();
        // var uiitem:UIMergeItem= UI.CreateUI3D(UIMergeItem, this.game, "");//MergeCloud_0 
        // var sp3d = uiitem.node as Laya.Sprite3D;
        // sp3d.transform.position = new Laya.Vector3(1,2,5);
        
        // var uiCloud = null;

        // uiCloud = UI.CreateUI3D(UISprite, this.game, "GameWinBg");//MergeCloud_0 
        // var node = new Laya.Sprite3D();
        // uiCloud = node.addComponent(UISprite);
        // uiCloud.keyImage = "GameWinBg";//Circle  GameWinBg

        // AppSceneUtil.mainScene.addChild(node);
        // uiCloud.localScale = new Laya.Vector3(0.25, 0.25, 1);
        // uiCloud.color = new Laya.Color(255, 255, 255, 255);

        // var p = new Action3D();
        // p.Run(
        //     {
        //         sp: uiCloud,
        //         type: ActionType.Fade,
        //         to: 0,
        //         time: UIMergeItem.DURATION_MERGE_CLOUD,
        //         success: function (p: any) {


        //         }.bind(this),
        //     });
        // Laya.timer.once(1000, this, function (): void {
        //     uiCloud.color = new Laya.Color(255, 255, 255, 128);
        // });

        // return;
        // var material: Laya.BlinnPhongMaterial = null;
        // var box: Laya.MeshSprite3D = null;
        // TextureCache.main.LoadByKey(
        //     {
        //         key: "GameWinBg",
        //         isSprite: true,
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
        //             box = AppSceneUtil.mainScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createQuad(w, h))) as Laya.MeshSprite3D;
        //             // box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        //             material = new Laya.BlinnPhongMaterial();
        //             material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT;
        //             // res/layabox.png

        //             box.meshRenderer.material = material;
        //             material.albedoTexture = tex;
        //             // box.transform.translate(new Laya.Vector3(0,-1, 0));
        //             box.transform.localScale = new Laya.Vector3(0.25, 0.25, 1);
        //             material.albedoColor = new Laya.Vector4(255 / 255, 255 / 255, 255 / 255, 255 / 255);
        //         },
        //         fail: (p: any) => {

        //         },
        //     });


        // Laya.timer.once(1000, this, function (): void {
        //     // material.albedoColor = new Laya.Vector4(255 / 255, 255 / 255, 255 / 255, 100 / 255);
        //     // material.albedoColor = new Laya.Vector4(255 / 255, 255 / 255, 255 / 255, 100 / 255);
        //     var mat: Laya.BlinnPhongMaterial = box.meshRenderer.material as Laya.BlinnPhongMaterial;
        //     mat.albedoColor = new Laya.Vector4(255 / 255, 255 / 255, 255 / 255, 100 / 255);
        //     mat.albedoColor = new Laya.Vector4(255 / 255, 255 / 255, 255 / 255, 100 / 255);
        // });
    }


    CreateGame() {
        // var node = UI.Instantiate(this.gamePrefab);
        // this.game = node.getComponent(GameMergeZuma);
        // AppSceneBase.main.AddObjToMainWorld(node);
        //    var uiBg = UI.CreateUI(UISprite,null,"GameBg"); 
        //    UI.CreateUI(UISprite,null,"GameBg"); //GameWinBg
        //    UI.CreateUI(UISprite,null,"Circle"); 

        this.game = UI.CreateUI3D(GameMergeZuma, null);
        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        this.game.width = size.x;
        this.game.height = size.y;

        this.OnTest();

        // Laya.timer.once(3000, this, function (): void {
        //     this.Test();
        // });

        GameData.main.score = 100;

 


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
        var filepath = ImageRes.main.GetImage("BtnCommon");
        filepath = ImageRes.main.GetImage("yintao");
        Debug.Log("CreateGame filepath =" + filepath);
        // Laya.Texture2D.load(filepath, Laya.Handler.create(this, function (tex: Laya.Texture2D)
        //  {

        //     var size = CameraUtil.main.GetWorldSize(this.mainCam);
        //     var w = tex.width / 100 ;
        //     var h = tex.height / 100 ;
        //     // w = size.x;
        //     // h = size.y;
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

        // filepath = "BtnCommon.png";
        // filepath = "yintao.png"; 
        // filepath = ImageRes.main.GetImage("yintao");
        // Debug.Log("CreateGame filepath2 ="+filepath);
        // Laya.loader.load(filepath, Laya.Handler.create(this, function (data: any): void {

        //     var tex = Laya.loader.getRes(filepath);
        //     var size = CameraUtil.main.GetWorldSize(this.mainCam);
        //     var w = tex.width / 100 / 4;
        //     var h = tex.height / 100 / 4;
        //     console.log("CreateGame texture is tex.width="+tex.width+" tex.height="+tex.height);
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

        // }));

        this.UpdateScore();
    }
    OnUITouchEvent(ui: UITouchEvent, status: number, event?: any) {
        // var pos = eventData.pointerCurrentRaycast.worldPosition;
        // var x_canvas = Laya.MouseManager.instance.mouseX;
        // var y_canvas = Laya.MouseManager.instance.mouseY;
        // var size = CameraUtil.main.GetWorldSize(this.mainCam);
        // var sizeCanvas = Common.sizeCanvas;
        // var x = (-size.x / 2) + x_canvas * size.x / sizeCanvas.width;
        // var y = (size.y / 2) - y_canvas * size.y / sizeCanvas.height;
        // var pos = new Laya.Vector2(x, y);
        // Debug.Log("x_canvas=" + x_canvas + " y_canvas=" + y_canvas + " x=" + x + " y=" + y);
        switch (status) {
            case DataTouch.TOUCH_DOWN:
                {

                }
                break;
            case DataTouch.TOUCH_UP:
                {

                }
                break;
            case DataTouch.Click:
                {

                }
                break;

        }
        // if(this.game!=null)
        // {
        //     this.game.UpdateEvent(status, pos);
        // }
    }

    UpdateScore() {
        this.btnScore.textTitle.text = Language.main.GetString("Score") + ":" + GameData.main.score.toString();
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

    OnClickBtnBack() {
        // if (this.game != null) { 
        //     this.game.destroy();
        // }
        super.OnClickBtnBack();
    }
}
