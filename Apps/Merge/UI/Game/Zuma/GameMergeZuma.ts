import AppScene from "../../../../../AppBase/AppScene";
import AppSceneUtil from "../../../../../AppBase/Common/AppSceneUtil";
import GameBase from "../../../../../AppBase/Game/GameBase";
import LevelManager from "../../../../../AppBase/Game/LevelManager";
import Action3D, { ActionType } from "../../../../../Common/Action/Action3D";
import AudioPlay from "../../../../../Common/Audio/AudioPlay";
import PrefabCache from "../../../../../Common/Cache/PrefabCache";
import TextureCache from "../../../../../Common/Cache/TextureCache";
import CameraUtil from "../../../../../Common/Camera/CameraUtil";
import CloudRes from "../../../../../Common/CloundRes/CloudRes";
import Common from "../../../../../Common/Common";
import ImageRes from "../../../../../Common/Config/ImageRes";
import Timer from "../../../../../Common/Core/Timer";
import Debug from "../../../../../Common/Debug";
import Device from "../../../../../Common/Device";
import ItemInfo from "../../../../../Common/ItemInfo";
import MathUtil from "../../../../../Common/Math/MathUtil";
import Platform from "../../../../../Common/Platform";
import DataTouch from "../../../../../Common/UIKit/Event/DataTouch";
import UITouchEvent from "../../../../../Common/UIKit/Event/UITouchEvent";
import UITouchEvent3D from "../../../../../Common/UIKit/Event/UITouchEvent3D";
import LayOutScale from "../../../../../Common/UIKit/LayOut/LayOutScale";
import { ScaleType } from "../../../../../Common/UIKit/LayOut/LayOutUtil";
import UISprite from "../../../../../Common/UIKit/UIImage/UISprite";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIView from "../../../../../Common/UIKit/ViewController/UIView";
import GameLevelParse from "../../../../Main/GameLevelParse";
import GameData, { GameStatus } from "../../../Data/GameData";
import GameBaseMerge from "../GameBaseMerge";
import UIMergeItem, { IUIMergeItem } from "../UIMergeItem";
import { PropType } from "../UIPopProp";
import ActionRotationAngle from "./ActionRotationAngle";
import UIItemTrail from "./UIItemTrail";


export default class GameMergeZuma extends GameBaseMerge implements IUIMergeItem {
    public static DURATION_ROTATION_ANGLE = 0.3; 
    public radiusCenter = 1.0;
    public ScaleStart = 0.1;
    private hasItBeenGenerated = false;//定义是否已在游戏中生成物体
    private uiItemCenter: UIMergeItem;//定义用来保存场景中心的水果

    isFirstRun = false;

    public isMouseDown = false;
    public isMouseUp = false;
    public isAutoClick = false;

    itemPosZ = -1.0;

    // Laya.Vectro
    posCenter = new Laya.Vector2(0, 0);
    time = 1;//计时
    timeMerge = 0;
    angleStart = 0;
    isStartCheckCollision = false;
    isCheckCollisionIng = false;

    isAnimating = false;
    countMerge = 0;


    public uiCircle: UISprite;
    public uiCenterItemBg: UISprite;
    public uiItemTrail: UIItemTrail;
    public uiTest: UISprite;
    public uiParticle: Laya.ShuriKenParticle3D;


    uiPrefabTrail: Laya.Prefab;
    uiPrefabItem: Laya.Prefab;


    onAwake() {
        super.onAwake();
        GameData.main.gameZuma = this;
        GameData.main.game = this;

        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        // this.InitTouch();

        this.angleStart = 270;
        this.isStartCheckCollision = false;
        GameData.main.gameId = GameData.GAMAE_ID_ZUMA;
        this.isInitGame = false;




        LevelManager.main.placeLevel = 0;
        // LevelManager.main.ParseGuanka();
        // this.LoadPrefab();


        GameData.main.gameStatus = GameStatus.None;

        // this.LayOut();
    }

    onStart() {
        super.onStart();


    }

    onDestroy() {
        // super.onDestroy();
        Debug.Log("GameMergeZuma onDestroy");
        this.Clear();
        // AppSceneUtil.main.ClearMainWorld();
        if (this.uiCenterItemBg) {
            // this.uiCenterItemBg.visible = false;
            this.uiCenterItemBg.node.destroy();
        }
        if (this.uiCircle) {
            this.uiCircle.node.destroy();
        }

        if (this.uiItemCenter) {
            this.uiItemCenter.node.destroy();
        }

        if (this.uiBg) {
            this.uiBg.node.destroy();
        }
        var parent = this.node;
        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.getChildAt(i);
            Debug.Log("GameMergeZuma onDestroy i=" + i + " child.name=" + child.name);
            if (child == AppSceneUtil.mainScene) {
                continue;
            }
            child.destroy(true);

        }
    }

    InitGame() {
        if (this.isInitGame) {
            return;
        }
        Debug.Log("GameMergeZuma InitGame enter");

        // var sp = this.uiBg.node as Laya.Sprite3D;
        // sp.transform.position = new Laya.Vector3(0, 0, this.itemPosZ - 5);
        this.uiBg = UI.CreateUI3D(UISprite, this, "GameBg"); //GameBg
        this.uiBg.transform.localPosition = new Laya.Vector3(0, 0, this.itemPosZ - 5);//-5
        this.uiBg.name = "uiBg";
        // this.uiBg.visible = false;

        this.uiCircle = UI.CreateUI3D(UISprite, this, "Circle"); //GameWinBg Circle
        this.uiCircle.transform.localPosition = new Laya.Vector3(0, 0, this.itemPosZ - 4);
        this.uiCircle.name = "uiCircle";

        var ly = this.uiCircle.addComponent(LayOutScale);
        ly.type = ScaleType.MIN;
        ly.offsetXLeft = ly.offsetXRight = CameraUtil.main.CanvasToWorldWidth(this.mainCam, 200);

        // this.uiCircle.zOrder = 10;
        this.uiCenterItemBg = UI.CreateUI3D(UISprite, this, "CenterItemBg");
        this.uiCenterItemBg.transform.localPosition = new Laya.Vector3(0, 0, this.itemPosZ - 3);
        this.uiCenterItemBg.name = "uiCenterItemBg";
        // this.uiCenterItemBg.visible = false;

        this.uiItemTrail = UI.CreateUI3D(UIItemTrail, this, ""); //GameBg
        this.uiItemTrail.transform.localPosition = new Laya.Vector3(0, 0, this.itemPosZ - 2);
        this.uiItemTrail.name = "uiItemTrail";

        this.uiProp = UI.CreateUI3D(UISprite, this, ""); //GameBg
        this.uiProp.transform.localPosition = new Laya.Vector3(0, 0, this.itemPosZ + 3);


        {
            this.uiGuide = UI.CreateUI3D(UISprite, this, "GuideLineH"); //GameBg 
            this.uiGuide.transform.localPosition = new Laya.Vector3(0, 0, this.itemPosZ + 1);
            this.ShowGuideLine(false);
        }


        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        // this.radiusCenter = Math.min(size.x, size.y) * 0.5 * 0.5;
        // var box = this.node.addComponent(Laya.BoxCollider);
        // box.width = size.x;
        // box.height = size.y;
        /*
       
     
        this.LayOut();
        */


        Laya.timer.once(100, this, function (): void {
            // this.uiBg.transform.position = new Laya.Vector3(0, 0, this.itemPosZ - 5);
            // this.uiCircle.transform.position = new Laya.Vector3(0, 0, this.itemPosZ - 2);
            // this.uiCenterItemBg.transform.position = new Laya.Vector3(0, 0, this.itemPosZ - 1);

            // this.uiBg.visible = false;
            this.Clear();

            this.UpdateItem();
            this.ReadyGeneratedItem();
            this.isInitGame = true;


            // this.ShowParticle(new Laya.Vector3(0, 0, this.itemPosZ), "yintao");
        });




        this.InitTouchBase();
    }


    // pos 新生成的对象位置
    UpdateGuideLine(angle: number) {
        var x, y, w, h;
        // this.uiGuide.transform.localRotation = Laya.Quaternion.Euler
        // this.uiGuide.transform.rotate(new Laya.Vector3(0, 0, angle), true, false);
        this.uiGuide.transform.localRotationEuler = new Laya.Vector3(0, 0, angle);
        var r = this.radiusCenter * 0.8;
        this.uiGuide.transform.localPosition = this.GetItemPositon(r, angle);
        this.uiGuide.boundSize = new Laya.Size(r * 2, this.uiGuide.contentSize.height);
        this.ShowGuideLine(true);
    }
    ShowGuideLine(isShow) {
        this.uiGuide.visible = isShow;
    }
    // ShowParticle(position: Laya.Vector3, key: string) {

    //     if (this.uiParticle != null) {
    //         // bug 第二次显示先销毁之前的对象 不然不显示 @moon
    //         this.uiParticle.destroy();
    //     }
    //     // 加载3D预设（3D精灵）LayaLizi
    //     Laya.Sprite3D.load(CloudRes.main.rootPath + "/LayaScene_Laya/Conventional/ParticleMergeForLaya.lh", Laya.Handler.create(this, function (sp) {

    //         this.uiParticle = this.node.addChild(sp) as Laya.ShuriKenParticle3D;
    //         Debug.Log("ShowParticle enter key=" + key);
    //         console.log(this.uiParticle);
    //         var fragmentParticles: Laya.ShuriKenParticle3D = this.uiParticle.getChildByName("FragmentParticles") as Laya.ShuriKenParticle3D;

    //         if (fragmentParticles == null) {
    //             console.log("fragmentParticles is null");
    //         }
    //         var material: Laya.ShurikenParticleMaterial = new Laya.ShurikenParticleMaterial();
    //         // material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT; 

    //         if (fragmentParticles.particleRenderer == null) {
    //             console.log("UIMergeItem fragmentParticles.particleRenderer is null");
    //         }
    //         fragmentParticles.particleRenderer.material = material;
    //         var filepath = ImageRes.main.GetImage(key);
    //         Laya.Texture2D.load(filepath, Laya.Handler.create(this, function (tex: Laya.Texture2D) {
    //             material.texture = tex;
    //             // this.uiParticle.
    //             this.uiParticle.transform.position = position;
    //             Debug.Log("UIMergeItem ShowParticle position.x=" + position.x + " position.y=" + position.y + " z=" + position.z);
    //             // this.uiBg.visible = false;
    //         }));

    //     }));
    // }
    onUpdate() {
        // return;
        if (!this.isInitGame) {
            return;
        }
        if (this.isAnimating) {
            Debug.Log("GameMergeZuma onUpdate return isAnimating");
            return;
        }
        if (GameData.main.isFail) {
            Debug.Log("GameMergeZuma GameData isFail");
            return;
        }


        // this.uiBg.position = new Laya.Vector3(0, 0, this.itemPosZ - 5);
        //用作延迟生成物体
        if (this.time < 0.2) {
            this.time += Timer.deltaSecond;
        }
        else {
            //判断场景中没有生成物体
            if (!this.hasItBeenGenerated) {
                var key = this.RandomFruitImageKey();
                this.uiItemCenter = this.CreateItem(key, true);

                // update里LayOut 可能 卡死
                // LayOut();

                this.LayOutBg();
                this.hasItBeenGenerated = true;//更改hasItBeenGenerated状态
            }

            // if (this.isAutoClick)
            // {
            //     int percentx = Common.RandomRange(0, 100);
            //     int percenty = Common.RandomRange(0, 100);
            //     Vector2 size = Common.GetWorldSize(mainCam);
            //     float x = -size.x / 2 + percentx * size.x / 100.0f;
            //     float y = -size.y / 2 + percenty * size.y / 100.0f;
            //     Vector3 pos = new Vector3(x, y, 0);
            //     UpdateEvent(UITouchEvent.STATUS_TOUCH_DOWN, pos);
            // }

        }

        if (this.isStartCheckCollision && !GameData.main.isFail) {
            // Invoke("CheckCollision", 1f);
            // this.CheckCollision();
            // StartCoroutine(CheckCollision());//调用携程函数
        }

        if (this.timeMerge < 0.1) {
            this.timeMerge += Timer.deltaSecond;
        }
        else {

            this.CheckGameOver();
            if (this.IsHaveMergeItem()) {
                if (!this.isAnimating) {
                    this.CheckCollision();
                } else {
                    Debug.Log("CheckCollision IsHaveMergeItem this.isAnimating=" + this.isAnimating);
                }

            }
            this.timeMerge = 0;
        }

    }

    LoadPrefab() {
        var x, y, w, h;
        PrefabCache.main.LoadListByKey(
            {
                listKey: ["UIItemTrail", "UIMergeItem"],
                success: (p: any, listData: any) => {
                    this.uiPrefabTrail = listData[0];
                    this.uiPrefabItem = listData[1];

                    var node = UI.Instantiate(this.uiPrefabTrail);
                    this.uiItemTrail = node.getComponent(UIItemTrail);
                    // this.AddChild(this.uiItemTrail);
                },
                fail: (p: any) => {

                },
            });


    }

    //随机获取水果
    RandomFruitImageKey(): string {
        var rdm = 0;
        if (this.GetTotalItems() >= 4)//判断总水果是否大于4个
        {
            rdm = Common.RandomRange(0, 4);
        }
        else {
            rdm = Common.RandomRange(0, this.GetTotalItems());
        }
        if (this.isFirstRun) {
            this.isFirstRun = false;
            rdm = 0;
        }
        // rdm = 0;
        return this.GetItemId(rdm);
    }
    UpdateItem() {

        var count = 1;
        for (var i = 0; i < count; i++) {
            var key = this.GetItemId(i);
            var ui = this.CreateItem(key, false);
        }

        this.LayOut();

        // Laya.timer.once(1000, this, function (): void {
        //     this.LayOut();
        // });

    }

    Clear() {
        GameData.main.addScore = 0;
        GameData.main.score = 0;
        GameData.main.isFail = false;
        this.isAnimating = false;
        this.timeMerge = 0;

        this.angleStart = 270;
        this.isStartCheckCollision = false;
        this.isCheckCollisionIng = false;
        this.countMerge = 0;

        GameData.main.uiGameZuma.UpdateScore();
        for (var i = 0; i < this.listItem.length; i++) {
            var ui = this.listItem[i];
            if (ui.node != null) {
                ui.node.destroy();
            }
        }
        Common.ListClear(this.listItem);
        if (this.uiItemCenter != null) {
            // DestroyImmediate(this.uiItemCenter.gameObject);
            this.uiItemCenter.node.destroy();
            this.uiItemCenter = null;
        }
        this.angleStart = 270;
        this.isStartCheckCollision = false;
        this.isCheckCollisionIng = false;
        this.countMerge = 0;
    }
    GetTotalItems() {
        return GameLevelParse.main.listGameItems.length;
    }
    GetItemId(idx): string {
        var info = GameLevelParse.main.GetLevelItemInfo(idx);
        return info.id;
    }
    GetNextItem(key): string {
        var ret = "";
        for (var i = 0; i < this.GetTotalItems(); i++) {
            if (key == this.GetItemId(i) && ((i + 1) < this.GetTotalItems())) {
                ret = this.GetItemId(i + 1);
                break;
            }
        }
        return ret;
    }
    GetIndexOfItem(key) {
        for (var i = 0; i < this.GetTotalItems(); i++) {
            if (key == this.GetItemId(i)) {
                return i;
            }
        }
        return 0;
    }
    // angle 0-360度
    GetItemPositon(radius, angle) {
        var x, y, z;
        x = this.posCenter.x + radius * Math.cos(angle * Math.PI * 2 / 360);
        y = this.posCenter.y + radius * Math.sin(angle * Math.PI * 2 / 360);
        z = this.itemPosZ;
        return new Laya.Vector3(x, y, z);

    }
    // 左右的偏移角度
    GetItemOffsetAngle(item, radius) {
        var angle = 0;
        // var w = this.GetBoundSizeOfGameObject(item.sprite.node).width;
        // if (item.sprite == null) {
        //     Debug.Log("GetItemOffsetAngle sprite is null");
        //     return angle;
        // }
        if (item == null) {
            Debug.Log("GetItemOffsetAngle item null");
            return angle;
        }
        var w = item.GetBoundingBox().width;
        // w = 0.2*w;
        angle = (w / radius) / 2;
        angle = angle * 360 / (Math.PI * 2);
        return angle;

    }

    GetItemAngle(idx) {
        var angle = 0;
        if (idx == 0) {
            angle = this.angleStart;
        }
        else {
            var anglelast = this.GetItemAngle(idx - 1);
            var itemlast = this.listItem[idx - 1];
            var item = this.listItem[idx];
            angle = anglelast + this.GetItemOffsetAngle(itemlast, this.radiusCenter) + this.GetItemOffsetAngle(item, this.radiusCenter);
            angle = angle % 360;
        }
        return angle;
    }
    GetItemScale(key) {
        var pic = GameLevelParse.main.GetImagePath(key);
        var tex = TextureCache.main.GetTextureFromCache(pic);
        var ret = 1;
        var ratio = GameData.IMAGE_ITEM_WIDHT * 1.0 / tex.width;
        var scale = (this.ScaleStart + 0.05 * this.GetIndexOfItem(key)) * 0.6;
        // scale = 0.1f;
        if (Device.main.isLandscape) {
            // scale = scale * 2f;
        }
        ret = scale * ratio;
        return ret;

    }
    // // angle 0-360度
    CreateItem(key, isCenter: boolean, callbackFinish: Function = null) {
        // var uiPrefab = this.uiPrefabItem;
        // var node = UI.Instantiate(uiPrefab);
        // var ui = node.getComponent(UIMergeItem);
        var ui = UI.CreateUI3D(UIMergeItem, this);
        // ui.callbackRenderFinish = function ()
        //  {
        ui.delegate = this;
        ui.isZuma = true;
        ui.isNew = true;
        ui.keyId = key;
        ui.isAnimating = false;
        var tex = TextureCache.main.GetTextureFromCacheByKey(key);
        ui.width = tex.width / 100;
        ui.height = tex.height / 100;
        // ui.index = indexItem++; 
        // AppSceneBase.main.AddObjToMainWorld(ui.gameObject); 
        ui.name = key;
        // ui.node.name = key;
        if (isCenter) {
            ui.name = key + "(center)";
        }
        var info = new ItemInfo();
        info.id = key;
        ui.UpdateItem(info);
        // ui.EnablePhysic(false);

        var scale = this.GetItemScale(key);
        ui.transform.localScale = new Laya.Vector3(scale, scale, 1);
        ui.transform.position = new Laya.Vector3(this.posCenter.x, this.posCenter.y, this.itemPosZ);


        // 
        var ac = ui.node.addComponent(ActionRotationAngle);
        ac.duration = GameMergeZuma.DURATION_ROTATION_ANGLE;
        ac.isLoop = false;
        ac.iDelegate = this;
        ac.Pause();
        ac.callbackComplete = this.OnActionRotationAngleFinish.bind(this);
        if (!isCenter) {

            ui.index = this.listItem.length;
            this.listItem.push(ui);
        }

        if (callbackFinish != null) {
            callbackFinish();
        }
        // }.bind(this);


        return ui;

    }
    CheckGameOver() {
        var ret = false;
        var count = this.listItem.length;
        var totalLength = 0;
        for (var i = 0; i < count; i++) {
            var ui = this.listItem[i];
            // totalLength += this.GetBoundSizeOfGameObject(ui.node).width;
            if (ui != null) {
                totalLength += ui.GetBoundSize().width;
            }

        }
        if (totalLength >= Math.PI * 2 * this.radiusCenter) {
            ret = true;
        }

        if (ret) {
            this.isStartCheckCollision = false;
            this.isCheckCollisionIng = true;
            GameData.main.isFail = true;
            var time_step = 0.1;
            // uiItemCenter.isAnimating = true;
            this.isAnimating = true;
            for (var i = 0; i < count; i++) {
                var ui = this.listItem[i];
                ui.keyAudio = "MergeGameOver";
                ui.RunMergeCloudAnimate(time_step * i);

            }
            // Invoke("ShowUIGameOver", UIMergeItem.DURATION_MERGE_CLOUD + time_step * count);
            Laya.timer.once(UIMergeItem.DURATION_MERGE_CLOUD + time_step * count, this, this.ShowUIGameOver);
        }
        return ret;
    }

    ShowUIGameOver() {
        AudioPlay.main.PlayByKey("GameFail");
        GameData.main.uiGameZuma.OnGameFinish(true);
    }
    StartCheckCollision() {
        this.isStartCheckCollision = true;
        // isCheckCollisionIng = true;
        this.countMerge = 0;
    }


    // 延迟一段时间再检测用来显示UI
    MergeUIDidFinish() {
        this.isStartCheckCollision = true;
        this.isAnimating = false;

    }

    // 判断是否存在合并项
    IsHaveMergeItem() {
        var count = this.listItem.length;
        var ret = false;
        for (var i = 0; i < count; i++) {
            var ui = this.listItem[i];
            var uiNext = this.GetMergeItem(i + 1);
            if (uiNext&&ui) {
                if (ui.keyId == uiNext.keyId) {
                    ret = true;
                    break;
                }
            }
        }

        return ret;
    }
    CheckCollision() {
        var count = this.listItem.length;
        var isHasMerge = false;
        var uiDel1 = null;
        var uiDel2 = null;
        var del_index = 0;
        for (var i = 0; i < count; i++) {
            var ui = this.listItem[i];
            var uiNext = this.GetMergeItem(i + 1);
            if (uiNext) {
                if (ui.keyId == uiNext.keyId) {
                    del_index = i;
                    Debug.Log("del_index =" + del_index);
                    uiDel1 = ui;
                    uiDel2 = uiNext;
                    Debug.Log("GameMergeZuma  ListRemoveItem this.listItem.length =" + this.listItem.length);
                    Common.ListRemoveItem(this.listItem, uiDel1);
                    Debug.Log("GameMergeZuma  ListRemoveItem this.listItem.length =" + this.listItem.length);
                    Common.ListRemoveItem(this.listItem, uiDel2);
                    Debug.Log("GameMergeZuma  ListRemoveItem this.listItem.length =" + this.listItem.length);
                    break;
                }
            }
        }


        if ((uiDel1 != null) && (uiDel2 != null)) {
            var isdelcenter = false;
            if ((uiDel1 == this.uiItemCenter) || (uiDel2 == this.uiItemCenter)) {
                isdelcenter = true;
            }
            var keyIdDel = uiDel1.keyId;
            this.DeleteMergeItem(uiDel1);
            // next
            this.DeleteMergeItem(uiDel2);
            if (isdelcenter) {
                Debug.Log("GameMergeZuma  DeleteMergeItem uiItemCenter");
                // 必须清空 不然可能卡住
                this.uiItemCenter = null;
            }

            // 合并
            var uiMerge = this.CreateItem(this.GetNextItem(keyIdDel), true, function () {

            }.bind(this));

            uiMerge.name = uiMerge.keyId;
            this.InsertMergeItem(del_index, uiMerge);
            isHasMerge = true;
            this.isStartCheckCollision = false;
            this.countMerge++;
            uiMerge.keyAudio = "MergeTwoItem";
            // uiMerge.isAnimating = true;




            // 等待sprite显示完成

            Debug.Log("GameMergeZuma  uiMerge this.listItem.length =" + this.listItem.length);
            this.LayOut();


            // uiMerge 位置更新后再显示动画
            this.isAnimating = true;
            uiMerge.RunMergeCloudAnimate();
            Laya.timer.once(UIMergeItem.DURATION_MERGE_CLOUD * 1.01, this, function (): void {
                // 有可能动画结束没有回调 
                // this.OnMergeAnimateDidFinish();
                this.isAnimating = false;
            }.bind(this));
            var indexnext = this.GetIndexOfItem(uiDel2.keyId);
            if (indexnext == 0) {
                indexnext = 1;
            }
            var addScore = 10 * indexnext;

            if (this.countMerge > 1) {
                // 连击
                addScore += this.countMerge * indexnext;
            }
            Debug.Log("addScore = " + addScore + " indexnext=" + indexnext);
            GameData.main.score += addScore;
            GameData.main.addScore = addScore;

            // 
            var posWorld = uiMerge.transform.position;
            GameData.main.fromPosScoreWorld = posWorld;
            GameData.main.uiGameZuma.UpdateScore();

            // StartCoroutine(this.MergeUIDidFinish());
        }


        Debug.Log("GameMergeZuma CheckCollisionInternal isHasMerge =" + isHasMerge);
        if (!isHasMerge) {
            //没有合并项
            // this.isStartCheckCollision = false;
            // this.isCheckCollisionIng = false;
        }
    }

    // 和item之间的夹角
    GetAngleStepWithItem(ui: UIMergeItem, angleTouch) {
        var ret = 0;
        ret = Math.abs(angleTouch - ui.angle);
        if (ret > 180) {
            // 取小的那个
            ret = 360;
        }
        return ret;
    }
    // 发射之后插入目标 0-360

    GetItemInsertTo(angleTouch) {
        var ret = null;
        var count = this.listItem.length;
        for (var i = 0; i < count; i++) {
            var ui = this.listItem[i];
            if (ui == null) {
                Debug.Log("item has Destoryed ");
                continue;
            }
            if (i < count - 1) {
                var uinext = this.listItem[i + 1];
                var step = this.GetAngleStepWithItem(ui, angleTouch);
                var stepnext = this.GetAngleStepWithItem(uinext, angleTouch);
                if (Math.abs((step + stepnext) - Math.abs(ui.angle - uinext.angle)) < 1) {
                    // 夹在两个之间
                    Debug.Log("GetItemInsertTo find i= " + i + " uinext.index=" + uinext.index);
                    uinext.indexInsertTo = i + 1;
                    return uinext;
                }
            } else {
                // 最后一个
                var step = this.GetAngleStepWithItem(ui, angleTouch);
                if (step < this.GetItemOffsetAngle(ui, this.radiusCenter)) {
                    ui.indexInsertTo = i + 1;
                    // 直接在最后一个后面添加而非插入
                    return ui;
                }
            }
        }

        return ret;
    }
    GetItemInsertToOld(angleTouch) {
        var ret = null;
        var count = this.listItem.length;

        // 与圆环相交的坐标
        var ptOnRing = Laya.Vector2.ZERO;
        ptOnRing.x = this.posCenter.x + this.radiusCenter * Math.cos(angleTouch * Math.PI * 2 / 360.0);
        ptOnRing.y = this.posCenter.y + this.radiusCenter * Math.sin(angleTouch * Math.PI * 2 / 360.0);

        for (var i = 0; i < count; i++) {
            var ui = this.listItem[i];
            if (ui == null) {
                Debug.Log("item has Destoryed ");
                continue;
            }
            var x, y;
            var pt = ui.transform.localPosition;
            x = ptOnRing.x - pt.x;
            y = ptOnRing.y - pt.y;
            var distance = Math.sqrt(x * x + y * y);
            var rItem = ui.GetBoundingBox().width / 2;//this.GetBoundSizeOfGameObject(ui.node).width / 2;
            if (distance <= rItem) {
                // 在圆内部
                return ui;
            }

        }


        return ret;
    }
    OnRestPlay() {
        //  Invoke("OnRestPlayInternal",0.2f);
        this.OnRestPlayInternal();
    }

    OnRestPlayInternal() {
        GameData.main.gameStatus = GameStatus.Play;
        GameData.main.uiGameZuma.game.ShowProp(false);
    }

    // 判断场景里是否有掉落下来的球
    IsHasFalledBall() {
        if (Device.main.isScreenShot) {
            return true;
        }
        if (GameData.main.gameStatus == GameStatus.None) {
            return false;
        }
        return true;
    }
    GetMergeItem(idx) {
        if (idx >= this.listItem.length) {
            return null;
        }
        return this.listItem[idx];
    }
    // 改变类型为toId
    ChangeItem(toId) {
        if (this.uiItemCenter != null) {
            this.uiItemCenter.keyId = toId;
            this.uiItemCenter.name = toId;
            var scale = this.GetItemScale(toId);
            this.uiItemCenter.transform.localScale = new Laya.Vector3(scale, scale, 1);
            // string pic = GameLevelParse.main.GetImagePath(toId);
            var info = new ItemInfo();
            info.id = toId;
            this.uiItemCenter.UpdateItem(info);
        }

        this.OnRestPlay();
    }

    DeleteItem(ui: UIMergeItem) {
        Debug.Log("GameMergeZuma DeleteItem keyid=" + ui.keyId);
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = this.listItem[i];
            if (uilist == ui) {
                this.ShowDeleteParticle(ui.transform.position, ui.keyId);
                Common.ListRemoveItem(this.listItem, uilist);
                uilist.node.destroy();
                // this.listItem.splice(i, 1);
                break;
            }
        }

        this.LayOut();
        this.OnRestPlay();
    }
    // 摧毁所有的同类
    DeleteAllItemsOfId(id) {

        for (var i = 0; i < this.listItem.length; i++) {
            var ui = this.listItem[i];
            if (ui.keyId == id) {
                this.ShowDeleteParticle(ui.transform.position, ui.keyId);
                ui.node.destroy();
            }
        }


        for (var i = 0; i < this.listItem.length; i++) {
            var ui = this.listItem[i];
            if (ui.keyId == id) {
                Common.ListRemoveItem(this.listItem, ui);
                // this.listItem.splice(i, 1);
            }
        }
        this.LayOut();
        this.OnRestPlay();
    }

    DeleteMergeItem(uiDelete: UIMergeItem) {
        if (uiDelete == null) {
            return;
        }
        if (uiDelete.transform == null) {
            return;
        }

        this.ShowDeleteParticle(uiDelete.transform.localPosition, uiDelete.keyId);
        // Common.ListRemoveItem(this.listItem, uiDelete);
        // DestroyImmediate(uiDelete.gameObject);
        uiDelete.node.destroy();
        uiDelete = null;
        for (var i = 0; i < this.listItem.length; i++) {
            var ui = this.listItem[i];
            if (ui == null) {
                continue;
            }
            ui.index = i;
        }
    }

    InsertMergeItem(idx, ui: UIMergeItem) {
        if (idx > this.listItem.length) {
            Debug.Log("InsertMergeItem idx=" + idx + " listItem.length=" + this.listItem.length);
            return;
        }
        // if ((listItem.length == 0) && (idx == 0))
        // {
        //     listItem.Add(ui);
        //     ui.index = idx;
        //     return;
        // }
        if (idx == this.listItem.length) {
            this.listItem.push(ui);
            ui.index = idx;
            return;
        }

        for (var i = idx; i < this.listItem.length; i++) {
            var uitmp = this.listItem[i];
            uitmp.index++;
        }
        // this.listItem.push(idx, ui);
        Common.ListInsert(this.listItem, idx, ui);
        ui.index = idx;
    }


    OnUIMergeItemMergeCloudAnimateDidFinish(ui: UIMergeItem) {
        // if (this.uiItemCenter != null) {
        //     this.uiItemCenter.isAnimating = false;
        // }
        Debug.Log("IsHaveMergeItem OnUIMergeItemMergeCloudAnimateDidFinish");
        this.isAnimating = false;
    }
    OnTest() {
        // this.ShowParticle(new Laya.Vector3(0, 0, this.itemPosZ + 10), "putao");
    }

    // 删除粒子特效
    ShowDeleteParticle(positon, strid) {
        // this.ShowParticle(positon, strid);
        this.ShowMergeParticle(positon, strid);
    }

    UpdateProp(keypic: string) {
        this.uiProp.UpdateImageByKey(keypic);
        this.LayOut();
    }


    // 发射之后旋转动画目标角度
    GetItemAngleToActionRotation(angleTouch) {
        var ui = this.listItem[0];
        if (this.IsAddHeadOrEnd(angleTouch)) {
            return ui;
        }
        var uiLast = this.listItem[this.listItem.length - 1];
        return uiLast;
    }


    // 直线距离
    DistanceTwoAngle(angle1, angle2) {
        var pt1 = this.GetItemPositon(this.radiusCenter, angle1);
        var pt2 = this.GetItemPositon(this.radiusCenter, angle2);
        var x = Math.abs(pt1.x - pt2.x);
        var y = Math.abs(pt1.y - pt2.y);
        return Math.sqrt(x * x + y * y);
    }


    // 取离得近的
    // true :head ,逆时针运动    
    // false  :end ,顺时针运动
    public IsAddHeadOrEnd(angleTouch) {

        var uiHead = this.listItem[0];
        if (this.listItem.length == 1) {
            // ret = Math.abs(angleTouch - ui.angle);
            // if (ret > 180) {
            //     // 取小的那个
            //     ret = 360;
            // }

            // 刚开始只有一个
            return true;
        }

        var uiEnd = this.listItem[this.listItem.length - 1];
        // 逆时针距离
        var distanceHead = this.DistanceTwoAngle(angleTouch, uiHead.angle);
        // 顺时针距离
        var distanceEnd = this.DistanceTwoAngle(angleTouch, uiEnd.angle);
        // if (angleTouch < ui.angle && angleTouch > 90)
        if (distanceHead < distanceEnd) {
            return true;
        }
        return false;
    }
    OnUpdateActionRotationAngle(action, angle) {
        var ui = action.node.getComponent(UIMergeItem);
        if (ui == null) {
            return;
        }
        ui.transform.position = this.GetItemPositon(this.radiusCenter, angle);

    }

    OnActionRotationAngleFinish(obj) {
        this.isAnimating = false;
        // 更新开始角度
        this.angleStart = this.listItem[0].angle;
        this.LayOut();
        this.StartCheckCollision();
        this.CheckCollision();
        // this.CheckGameOver();
        Debug.Log("OnActionRotationAngleFinish");
    }


    // 
    RunTrailMoveAnimate(toPos, ui: UIMergeItem) {
        this.uiItemTrail.RunMoveAnimate(toPos, ui);
    }

    LayOutBg() {
        // int count = listItem.length;
        // for (int i = 0; i < count; i++)
        // {
        //     UIMergeItem ui = listItem[i];
        //     float angle = GetItemAngle(i);
        //     ui.angle = angle;
        //     ui.transform.localPosition = this.GetItemPositon(radiusCenter, angle);
        // }


        if (this.uiItemCenter != null) {
            var tex = this.uiCenterItemBg.texture;
            var scale = 1;
            var w_item = 0;
            if (tex.width != 0) {
                w_item = this.uiItemCenter.GetBoundSize().width;
                scale = (w_item / (tex.width / 100.0)) * 1.5;
            }
            Debug.Log("uiCenterItemBg scale = " + scale + " tex.width=" + tex.width + " w_item=" + w_item);
            this.uiCenterItemBg.transform.localScale = new Laya.Vector3(scale, scale, 1);
            // this.uiCenterItemBg.position = new Laya.Vector3(this.posCenter.x, this.posCenter.y, this.uiCenterItemBg.position.z);
            // this.uiCircle.position = new Laya.Vector3(this.posCenter.x, this.posCenter.y, this.uiCircle.position.z);
        }
    }

    LayOut() {
        super.LayOut();

        if (this.uiCircle == null) {
            return;
        }
        var texCircle = TextureCache.main.GetTextureFromCacheByKey("Circle");
        if (texCircle == null) {
            return;
        }
        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        // this.radiusCenter = size.x / 4;
        // this.radiusCenter = Math.min(size.x, size.y) * 0.5 * 0.5;
        // var box = this.node.getComponent(Laya.BoxCollider);
        // box.size = size; GetContentSize


        // GetBoundSize
        this.radiusCenter = this.uiCircle.GetBoundSize().width / 2;// this.GetBoundSizeOfGameObject(this.uiCircle.node).width / 2;
        // 圆环度占比 40/1024 
        var width_ring = 20;
        this.radiusCenter = this.radiusCenter * (1 - width_ring / texCircle.width);
        this.LayOutBg();

        var count = this.listItem.length;
        for (var i = 0; i < count; i++) {
            var ui = this.listItem[i];
            if (ui == null) {
                continue;
            }
            var angle = this.GetItemAngle(i);
            // var angle = 60*i;
            ui.angle = angle;
            if (ui != null) {
                ui.transform.position = this.GetItemPositon(this.radiusCenter, angle);
            }
        }


        var tex = this.uiProp.texture;
        if (tex != null) {

            var scale = 0.3;
            var w_item = 0;
            if (tex.width != 0) {
                w_item = this.uiCenterItemBg.GetBoundSize().width;
                scale = (w_item / (tex.width / 100.0)) * 0.8;
            }
            this.uiProp.transform.localScale = new Laya.Vector3(scale, scale, 1);
        }

    }
    OnUITouchEvent(ui: UITouchEvent3D, status: number, event?: any) {
        // var pos = eventData.pointerCurrentRaycast.worldPosition;
        var pos = DataTouch.main.touchPosWorld;
        switch (status) {
            case DataTouch.TOUCH_DOWN:
                {

                }
                break;
            case DataTouch.TOUCH_UP:
                {
                    Debug.Log("GameMergeZuma up keyId=" + this.keyId);
                    // this.uiBg.visible = false;


                    // this.uiTest = UI.CreateUI3D(UISprite, this, "GameWinBg"); //GameWinBg Circle
                    // this.uiTest.position = new Laya.Vector3(0, 0, this.itemPosZ - 2);
                }
                break;
            case DataTouch.Click:
                {

                }
                break;

        }

        this.UpdateEvent(status, pos);
    }
    UpdateEvent(status, pos) {

        Debug.Log("GameMergeZuma UpdateEvent status=" + status + " GameData.main.gameStatus=" + GameData.main.gameStatus);
        if (GameData.main.gameStatus == GameStatus.Prop) {
            Debug.Log("GameMergeZuma UpdateEvent return GameStatus.Prop");
            if (Platform.isByte || Platform.isQQ) {
                if (DataTouch.TOUCH_UP == status) {
                    // 手动计算
                    // var itemClick = this.GetItemMouseClick(pos);
                    // if (itemClick) {
                    //     itemClick.onMouseUp();
                    // }

                    this.ItemClickByRay();
                } 
            }
            return;
            return;
        }
        if (GameData.main.isFail) {
            Debug.Log("GameMergeZuma UpdateEvent return isFail");
            return;
        }

        if (this.IsHaveMergeItem()) {
            // 
            // this.StartCheckCollision();
            Debug.Log("GameMergeZuma UpdateEvent return IsHaveMergeItem");
            return;
        }

        if (this.isCheckCollisionIng) {
            // 碰撞检测中
            Debug.Log("GameMergeZuma UpdateEvent return isCheckCollisionIng");
            return;
        }

        if (this.isAnimating) {
            Debug.Log("GameMergeZuma UpdateEvent return isAnimating");
            return;
        }
        var angle = MathUtil.GetAngleOfPoint(pos);//pos
        //判断是否点击
        // if (Input.GetMouseButton(0))
        if (DataTouch.TOUCH_DOWN == status) {
            this.isMouseDown = true;
            GameData.main.gameStatus = GameStatus.Play;
            this.UpdateGuideLine(angle);
            return;
        }

        if (DataTouch.TOUCH_MOVE == status) {
            this.UpdateGuideLine(angle);
        }
        if (DataTouch.TOUCH_UP == status) {
            this.ShowGuideLine(false);
        }
        // 动画中
        if (this.uiItemCenter != null) {
            if (this.uiItemCenter.node) {
                var ac = this.uiItemCenter.node.getComponent(ActionRotationAngle);
                if (ac != null && ac.isRunning) {
                    Debug.Log("GameMergeZuma UpdateEvent return ac.isRunning");
                    return;
                }
            }

        }


        {





            if (this.isMouseDown && (GameData.main.gameStatus == GameStatus.Play)) {
                this.isMouseDown = false;
            }

            if ((DataTouch.TOUCH_MOVE == status) && (!this.isAutoClick)) {

            }
            //判断是否完成点击
            // if (Input.GetMouseButtonUp(0))
            if (DataTouch.TOUCH_UP == status) {
                this.isMouseUp = true;
            }

            Debug.Log("GameMergeZuma UpdateEvent angle =" + angle);
            Debug.Log("GameMergeZuma UpdateEvent isMouseUp 1 this.isMouseUp=" + this.isMouseUp + " status=" + status);
            if (this.isMouseUp && (DataTouch.TOUCH_UP == status) && (GameData.main.gameStatus == GameStatus.Play)) {
                this.isMouseUp = false;
                this.time = 0;
                Debug.Log("GameMergeZuma UpdateEvent isMouseUp 2");
                //让水果向圆运动
                if (this.uiItemCenter != null) {
                    // this.uiItemCenter.EnableGravity(true);

                    // ui.transform.localPosition = this.GetItemPositon(radiusCenter, angle);
                    var ptTouch = pos;
                    var angle = MathUtil.GetAngleOfPoint(ptTouch);//pos
                    var duration = GameData.DURATION_MOVE;
                    // this.uiItemCenter.angle = angle;
                    var uiItemCenterInsertTo = this.GetItemInsertTo(angle);
                    AudioPlay.main.PlayByKey("Merge_Click");
                    // angle = 90;
                    var toPos = this.GetItemPositon(this.radiusCenter, angle);
                    this.RunTrailMoveAnimate(toPos, this.uiItemCenter);
                    // this.uiItemCenter.isAnimating = true;
                    this.isAnimating = true;

                    // https://www.it610.com/article/1298108420397801472.htm
                    // Laya.Tween.to(this.uiItemCenter.sprite.sprite3D, { x: toPos.x, y: toPos.y }, duration, Laya.Ease.sineInOut, Laya.Handler.create(this, function () {

                    // }));
                    Debug.Log("GameMergeZuma UpdateEvent toPos x=" + toPos.x + " y=" + toPos.y + " this.radiusCenter=" + this.radiusCenter + " angle=" + angle + " posCenter.x=" + this.posCenter.x + " posCenter.y=" + this.posCenter.y);
                    // this.uiItemCenter.transform.position = toPos;
                    // var p = new Sprite3DMoveContorller();
                    // duration = 2000;
                    Debug.Log("GameMergeZuma start Sprite3DMoveContorller");

                    var p = new Action3D();
                    p.Run(
                        {
                            ui: this.uiItemCenter,
                            type: ActionType.Move,
                            to: toPos,
                            easeFun: Laya.Ease.sineInOut,
                            time: duration,
                            success: function (p: any) {
                                Debug.Log("GameMergeZuma onPositionMoveTo end");
                                // this.uiItemCenter.isAnimating = false;
                                if (!GameData.main.uiGame.uiToolBar.visible) {
                                    GameData.main.uiGame.uiToolBar.visible = this.IsHasFalledBall();
                                }
                                //  GameMerge.main.DeleteItem(this);
                                //  CheckGameOver();

                                if (!uiItemCenterInsertTo) {
                                    var ac = null;
                                    // if (this.uiItemCenter.sprite.node)
                                    {
                                        ac = this.uiItemCenter.node.getComponent(ActionRotationAngle);
                                    }
                                    // return;
                                    if (ac == null) {
                                        this.isAnimating = false;
                                        Debug.Log("GameMergeZuma UpdateEvent uiItemCenterInsertTo ac is null");
                                        return;
                                    }
                                    var uiTo = this.GetItemAngleToActionRotation(angle);
                                    ac.angleFrom = angle;
                                    this.uiItemCenter.name = this.uiItemCenter.keyId;
                                    if (this.IsAddHeadOrEnd(angle)) {

                                        //运动至第一个  逆时针运动 
                                        ac.angleTo = uiTo.angle - this.GetItemOffsetAngle(uiTo, this.radiusCenter) - this.GetItemOffsetAngle(this.uiItemCenter, this.radiusCenter);
                                        for (var i = 0; i < this.listItem.length; i++) {
                                            var ui = this.listItem[i];
                                            ui.index++;
                                        }
                                        // this.listItem.Insert(0, this.uiItemCenter);
                                        Common.ListInsert(this.listItem, 0, this.uiItemCenter);
                                        // Debug.Log("GameMergeZuma ListInsert this.listItem.length=" + this.listItem.length);
                                        this.uiItemCenter.angle = ac.angleTo;
                                        this.uiItemCenter.index = 0;

                                        Debug.Log("GameMergeZuma ActionRotation to head ac.angleFrom=" + ac.angleFrom + " ac.angleTo=" + ac.angleTo);
                                    }
                                    else {
                                        //运动至最后一个  顺时针运动 
                                        ac.angleTo = uiTo.angle + this.GetItemOffsetAngle(uiTo, this.radiusCenter) + this.GetItemOffsetAngle(this.uiItemCenter, this.radiusCenter);
                                        Debug.Log("GameMergeZuma ActionRotation to end 1 ac.angleFrom=" + ac.angleFrom + " ac.angleTo=" + ac.angleTo);
                                        // if (ac.angleFrom < ac.angleTo) 
                                        if (ac.angleTo > 180 && ac.angleFrom < 90) {
                                            ac.angleFrom += 360;
                                        }

                                        this.listItem.push(this.uiItemCenter);
                                        // Debug.Log("GameMergeZuma uiItemCenter this.listItem.length=" + this.listItem.length);
                                        this.uiItemCenter.angle = ac.angleTo;
                                        this.uiItemCenter.index = this.listItem.length;
                                        Debug.Log("GameMergeZuma ActionRotation to end 2 ac.angleFrom=" + ac.angleFrom + " ac.angleTo=" + ac.angleTo);
                                    }
                                    ac.Run();

                                }
                                else {
                                    this.isAnimating = false;
                                    // insert
                                    var indexInsert: number = uiItemCenterInsertTo.indexInsertTo;
                                    Debug.Log("GameMergeZuma uiItemCenter uiItemCenterInsertTo indexInsert=" + indexInsert);
                                    for (var i = indexInsert; i < this.listItem.length; i++) {
                                        var ui = this.listItem[i];
                                        ui.index++;
                                    }
                                    // this.listItem.Insert(indexInsert, this.uiItemCenter);
                                    if (indexInsert == this.length) {
                                        this.listItem.push(this.uiItemCenter);
                                    } else {

                                        Common.ListInsert(this.listItem, indexInsert, this.uiItemCenter);
                                    }
                                    this.LayOut();
                                    this.StartCheckCollision();
                                    // this.CheckGameOver();
                                }

                                this.ReadyGeneratedItem();

                            }.bind(this),
                        });


                    //     p.onPositionMoveTo(this.uiItemCenter.sprite.sprite3D, toPos, duration, Laya.Ease.sineInOut, this, function () 





                    //    .bind(this));

                    /*
                    this.uiItemCenter.transform.DOMove(toPos, duration).OnComplete(() => {
                   
            
            });
            
            */


                    this.uiItemCenter.isNew = false;
                }


            }
        }
    }

    ReadyGeneratedItem() {
        this.hasItBeenGenerated = false;//更改hasItBeenGenerated状态
        Debug.Log("ReadyGeneratedItem enter");
        this.time = 0;
    }
}
