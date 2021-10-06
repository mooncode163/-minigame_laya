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
import DataTouch from "../../../../../Common/UIKit/Event/DataTouch";
import UITouchEvent from "../../../../../Common/UIKit/Event/UITouchEvent";
import UITouchEvent3D from "../../../../../Common/UIKit/Event/UITouchEvent3D";
import UISprite from "../../../../../Common/UIKit/UIImage/UISprite";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIView from "../../../../../Common/UIKit/ViewController/UIView";
import GameLevelParse from "../../../../Main/GameLevelParse";
import GameData, { GameStatus } from "../../../Data/GameData";
import UIMergeItem, { IUIMergeItem } from "../UIMergeItem";
import ActionRotationAngle from "./ActionRotationAngle";
import UIItemTrail from "./UIItemTrail";


export default class GameMergeZuma extends GameBase implements IUIMergeItem {
    public static DURATION_ROTATION_ANGLE = 0.3;
    public listItem: UIMergeItem[] = [];
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
    isInitGame = false;

    public uiBg: UISprite;
    public uiCircle: UISprite;
    public uiCenterItemBg: UISprite;
    public uiItemTrail: UIItemTrail;
    public uiProp: UISprite;
    public uiTest: UISprite;
    public uiParticle: Laya.ShuriKenParticle3D;

    uiPrefabTrail: Laya.Prefab;
    uiPrefabItem: Laya.Prefab;


    onAwake() {
        super.onAwake();
        GameData.main.gameZuma = this;

        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        this.InitTouch();

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

    InitTouch() {
        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        //平面添加物理碰撞体组件
        var phycol: Laya.PhysicsCollider = this.node.addComponent(Laya.PhysicsCollider);
        //创建盒子形状碰撞器 
        var box: Laya.BoxColliderShape = new Laya.BoxColliderShape(size.x, size.y, 1);
        //物理碰撞体设置形状
        phycol.colliderShape = box;
        var ev = this.node.addComponent(UITouchEvent3D);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);
        // ev.timeTouchMin = 1.0;
    }
    onStart() {
        super.onStart();


        // 提前加载纹理
        var listItemKey = [];
        listItemKey.push("Circle");
        listItemKey.push("CenterItemBg");
        for (var i = 0; i < this.GetTotalItems(); i++) {
            var key = this.GetItemId(i);
            Debug.Log("LoadListByKey   key=" + key);
            listItemKey.push(key);

            key = "MergeCloud" + "_" + i.toString();
            listItemKey.push(key);

            key = "Ring" + "_" + i.toString();
            listItemKey.push(key);

        }

        for (var i = 0; i < 5; i++) {
            var key = "TrailCirle" + "_" + i.toString();
            listItemKey.push(key);

        }

        TextureCache.main.LoadListByKey(
            {
                listKey: listItemKey,
                success: (p: any, listData: any) => {
                    var tex = listData[3];
                    Debug.Log("LoadListByKey   tex.width=" + tex.width);
                    this.InitGame();
                },
                fail: (p: any) => {

                },
            });

    }

    onDestroy() {

        Debug.Log("GameMergeZuma onDestroy");
        this.Clear();
        // AppSceneUtil.main.ClearMainWorld();

        var parent = this.node;
        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.getChildAt(i);
            Debug.Log("GameMergeZuma onDestroy i=" + i + " child.name=" + child.name);
            if (child == AppSceneUtil.mainScene) {
                continue;
            }
            child.destroy();

        }
    }

    InitGame() {
        Debug.Log("InitGame enter");
        this.uiBg = UI.CreateUI3D(UISprite, this, "GameBg"); //GameBg
        this.uiBg.position = new Laya.Vector3(0, 0, this.itemPosZ - 5);
        var sp = this.uiBg.node as Laya.Sprite3D;
        // sp.transform.position = new Laya.Vector3(0, 0, this.itemPosZ - 5);
        // this.uiBg.transform.position = new Laya.Vector3(0, 0, this.itemPosZ - 5);
        // this.uiBg.visible = false;

        this.uiCircle = UI.CreateUI3D(UISprite, this, "Circle"); //GameWinBg Circle
        this.uiCircle.position = new Laya.Vector3(0, 0, this.itemPosZ - 2);
        // this.uiCircle.zOrder = 10;
        this.uiCenterItemBg = UI.CreateUI3D(UISprite, this, "CenterItemBg");
        this.uiCenterItemBg.position = new Laya.Vector3(0, 0, this.itemPosZ - 1);
        // this.uiCenterItemBg.visible = false;

        this.uiItemTrail = UI.CreateUI3D(UIItemTrail, this, ""); //GameBg

        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        this.radiusCenter = Math.min(size.x, size.y) * 0.5 * 0.5;
        // var box = this.node.addComponent(Laya.BoxCollider);
        // box.width = size.x;
        // box.height = size.y;
        /*
       
     
        this.LayOut();
        */


        Laya.timer.once(100, this, function (): void {
            this.uiBg.position = new Laya.Vector3(0, 0, this.itemPosZ - 5);
            this.uiCircle.position = new Laya.Vector3(0, 0, this.itemPosZ - 2);
            this.uiCenterItemBg.position = new Laya.Vector3(0, 0, this.itemPosZ - 1);

            // this.uiBg.visible = false;
            this.Clear();
            this.isInitGame = true;


            // this.ShowParticle(new Laya.Vector3(0, 0, this.itemPosZ), "yintao");
        });

    }

    ShowParticle(position: Laya.Vector3, key: string) {

        if (this.uiParticle != null) {
            // bug 第二次显示先销毁之前的对象 不然不显示 @moon
            this.uiParticle.destroy();
        }
        // 加载3D预设（3D精灵）LayaLizi
        Laya.Sprite3D.load(CloudRes.main.rootPath + "/LayaScene_Laya/Conventional/ParticleMergeForLaya.lh", Laya.Handler.create(this, function (sp) {

            this.uiParticle = this.node.addChild(sp) as Laya.ShuriKenParticle3D;
            Debug.Log("ShowParticle enter key=" + key);
            console.log(this.uiParticle);
            var fragmentParticles: Laya.ShuriKenParticle3D = this.uiParticle.getChildByName("FragmentParticles") as Laya.ShuriKenParticle3D;

            if (fragmentParticles == null) {
                console.log("fragmentParticles is null");
            }
            var material: Laya.ShurikenParticleMaterial = new Laya.ShurikenParticleMaterial();
            // material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT; 

            if (fragmentParticles.particleRenderer == null) {
                console.log("UIMergeItem fragmentParticles.particleRenderer is null");
            }
            fragmentParticles.particleRenderer.material = material;
            var filepath = ImageRes.main.GetImage(key);
            Laya.Texture2D.load(filepath, Laya.Handler.create(this, function (tex: Laya.Texture2D) {
                material.texture = tex;
                // this.uiParticle.
                this.uiParticle.transform.position = position;
                Debug.Log("UIMergeItem ShowParticle position.x=" + position.x + " position.y=" + position.y + " z=" + position.z);
                // this.uiBg.visible = false;
            }));

        }));
    }
    onUpdate() {
        // return;
        if (!this.isInitGame) {
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

                this.LayOutItmes();
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
            if (this.IsHaveMergeItem() && (!this.isAnimating)) {
                // 
                this.CheckCollision();
            } else {
                Debug.Log("CheckCollision this.isAnimating=" + this.isAnimating);
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
        rdm = 0;
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
        GameData.main.uiGameZuma.UpdateScore();
        for (var i = 0; i < this.listItem.length; i++) {
            var ui = this.listItem[i];
            // DestroyImmediate(ui.gameObject);
            ui.destroy();
        }
        Common.ListClear(this.listItem);
        if (this.uiItemCenter != null) {
            // DestroyImmediate(this.uiItemCenter.gameObject);
            this.uiItemCenter.destroy();
            this.uiItemCenter = null;
        }
        this.angleStart = 270;
        this.isStartCheckCollision = false;
        this.isCheckCollisionIng = false;
        this.countMerge = 0;
        this.UpdateItem();
        this.ReadyGeneratedItem();
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
        if (item.sprite == null) {
            Debug.Log("GetItemOffsetAngle sprite is null");
            return angle;
        }
        var w = item.sprite.GetBoundingBox().width;
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
        // ui.index = indexItem++; 
        // AppSceneBase.main.AddObjToMainWorld(ui.gameObject); 
        ui.name = key;
        if (isCenter) {
            ui.name = key + "(center)";
        }
        var info = new ItemInfo();
        info.id = key;
        ui.UpdateItem(info);
        // ui.EnablePhysic(false);

        var scale = this.GetItemScale(key);
        ui.sprite.localScale = new Laya.Vector3(scale, scale, 1);
        ui.sprite.position = new Laya.Vector3(this.posCenter.x, this.posCenter.y, this.itemPosZ);


        // 
        var ac = ui.sprite.node.addComponent(ActionRotationAngle);
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
            totalLength += ui.sprite.GetBoundSize().width;
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
            if (uiNext) {
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
            var keyIdDel = uiDel1.keyId;
            this.DeleteMergeItem(uiDel1);
            // next
            this.DeleteMergeItem(uiDel2);

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
            this.isAnimating = true;



            // 等待sprite显示完成

            Debug.Log("GameMergeZuma  uiMerge this.listItem.length =" + this.listItem.length);
            this.LayOut();


            // uiMerge 位置更新后再显示动画
            uiMerge.RunMergeCloudAnimate();
            // Laya.timer.once(200, this, function (): void {
            //     this.LayOut();
            // }.bind(this));

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
            // var posWorld = uiMerge.transform.position;
            // GameData.main.fromPosScoreWorld = posWorld;
            // GameData.main.uiGameZuma.UpdateScore();

            // StartCoroutine(this.MergeUIDidFinish());
        }


        Debug.Log("GameMergeZuma CheckCollisionInternal isHasMerge =" + isHasMerge);
        if (!isHasMerge) {
            //没有合并项
            // this.isStartCheckCollision = false;
            // this.isCheckCollisionIng = false;
        }
    }
    // 发射之后插入目标 0-360
    GetItemInsertTo(angleTouch) {
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
            var pt = UI.GetPosition(ui.node);
            x = ptOnRing.x - pt.x;
            y = ptOnRing.y - pt.y;
            var distance = Math.sqrt(x * x + y * y);
            if (ui.sprite == null) {
                Debug.Log("GetItemInsertTo item sprite==null ");
                continue;
            }
            var rItem = ui.sprite.GetBoundingBox().width / 2;//this.GetBoundSizeOfGameObject(ui.node).width / 2;
            if (distance <= rItem) {
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
                this.ShowDeleteParticle(ui.sprite.position, ui.keyId);
                uilist.destroy();
                this.listItem.splice(i, 1);
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
                this.ShowDeleteParticle(ui.sprite.position, ui.keyId);
                ui.destroy();
            }
        }


        for (var i = 0; i < this.listItem.length; i++) {
            var ui = this.listItem[i];
            if (ui.keyId == id) {
                this.listItem.splice(i, 1);
            }
        }
        this.LayOut();
        this.OnRestPlay();
    }

    DeleteMergeItem(uiDelete: UIMergeItem) {
        // if (idx >= listItem.length)
        // {
        //     return;
        // }

        this.ShowDeleteParticle(uiDelete.sprite.position, uiDelete.keyId);
        // Common.ListRemoveItem(this.listItem, uiDelete);
        // DestroyImmediate(uiDelete.gameObject);
        uiDelete.destroy();
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

        this.isAnimating = false;
    }
    OnTest() {
        this.ShowParticle(new Laya.Vector3(0, 0, this.itemPosZ + 10), "putao");
    }

    // 删除粒子特效
    ShowDeleteParticle(positon, strid) {
        this.ShowParticle(positon, strid);
    }

    UpdateProp(keypic: string) {
        this.uiProp.UpdateImageByKey(keypic);
    }
    ShowProp(isShow) {
        this.uiProp.visible = isShow;
        if (isShow) {
            var z = this.uiProp.transform.position.z;
            var pos = new Laya.Vector3(0, 0, 0);
            pos.z = z;
            this.uiProp.transform.position = pos;
        }

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

    // true :head ,false :end  取离得近的
    public IsAddHeadOrEnd(angleTouch) {
        var ui = this.listItem[0];
        var uiLast = this.listItem[this.listItem.length - 1];
        // 逆时针距离
        var distanceHead = this.DistanceTwoAngle(angleTouch, ui.angle);
        // 顺时针距离
        var distanceEnd = this.DistanceTwoAngle(angleTouch, uiLast.angle);
        // if (angleTouch < ui.angle && angleTouch > 90)
        if (distanceHead < distanceEnd) {
            return true;
        }
        return false;
    }
    OnUpdateActionRotationAngle(action, angle) {
        var ui = action.node.getComponent(UISprite);
        if (ui == null) {
            return;
        }
        ui.position = this.GetItemPositon(this.radiusCenter, angle);

    }

    OnActionRotationAngleFinish(obj) {
        this.isAnimating = false;
        // 更新开始角度
        this.angleStart = this.listItem[0].angle;
        this.LayOut();
        this.StartCheckCollision();
        this.CheckCollision();
        this.CheckGameOver();
        Debug.Log("OnActionRotationAngleFinish");
    }


    // 
    RunTrailMoveAnimate(toPos, ui: UIMergeItem) {
        this.uiItemTrail.RunMoveAnimate(toPos, ui);
    }

    LayOutItmes() {
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
            // this.uiCenterItemBg.localScale = new Laya.Vector3(scale, scale, 1);
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
        this.radiusCenter = size.x / 4;
        this.radiusCenter = Math.min(size.x, size.y) * 0.5 * 0.5;
        // var box = this.node.getComponent(Laya.BoxCollider);
        // box.size = size; GetContentSize


        // GetBoundSize
        this.radiusCenter = this.uiCircle.GetContentSize().width / 2;// this.GetBoundSizeOfGameObject(this.uiCircle.node).width / 2;
        // 圆环度占比 40/1024 
        var width_ring = 20;
        this.radiusCenter = this.radiusCenter * (1 - width_ring / texCircle.width);
        // this.LayOutItmes();

        var count = this.listItem.length;
        for (var i = 0; i < count; i++) {
            var ui = this.listItem[i];
            if (ui == null) {
                continue;
            }
            var angle = this.GetItemAngle(i);
            // var angle = 60*i;
            ui.angle = angle;
            if (ui.sprite != null) {
                ui.sprite.position = this.GetItemPositon(this.radiusCenter, angle);
            }
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

        Debug.Log("GameMergeZuma UpdateEvent status=" + status);
        if (GameData.main.gameStatus == GameStatus.Prop) {
            Debug.Log("GameMergeZuma UpdateEvent return GameStatus.Prop");
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
        }

        //判断是否点击
        // if (Input.GetMouseButton(0))
        if (DataTouch.TOUCH_DOWN == status) {
            this.isMouseDown = true;
            GameData.main.gameStatus = GameStatus.Play;
            return;
        }


        // 动画中
        if (this.uiItemCenter != null) {
            if (this.uiItemCenter.sprite && this.uiItemCenter.sprite.node) {
                var ac = this.uiItemCenter.sprite.node.getComponent(ActionRotationAngle);
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
            var angle = MathUtil.GetAngleOfPoint(pos);//pos
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
                    // AudioPlay.main.PlayByKey("Merge_Click");
                    // angle = 90;
                    var toPos = this.GetItemPositon(this.radiusCenter, angle);
                    // this.RunTrailMoveAnimate(toPos, this.uiItemCenter);
                    // this.uiItemCenter.isAnimating = true;
                    this.isAnimating = true;

                    // https://www.it610.com/article/1298108420397801472.htm
                    // Laya.Tween.to(this.uiItemCenter.sprite.sprite3D, { x: toPos.x, y: toPos.y }, duration, Laya.Ease.sineInOut, Laya.Handler.create(this, function () {

                    // }));
                    Debug.Log("GameMergeZuma UpdateEvent toPos x=" + toPos.x + " y=" + toPos.y + " this.radiusCenter=" + this.radiusCenter + " angle=" + angle + " posCenter.x=" + this.posCenter.x + " posCenter.y=" + this.posCenter.y);
                    // this.uiItemCenter.sprite.position = toPos;
                    // var p = new Sprite3DMoveContorller();
                    // duration = 2000;
                    Debug.Log("GameMergeZuma start Sprite3DMoveContorller");
                    //   {
                    //     sp: UISprite,
                    //     type:ActionType,
                    //     to:any,
                    //     time:number,
                    //     easeFun: Function,
                    //     objCallback:any
                    //     callbackFinish: Function,
                    //     success: (p:any) => {

                    //     }, 
                    //     fail: (p:any) => {

                    //     },
                    //   } 
                    var p = new Action3D();
                    p.Run(
                        {
                            sp: this.uiItemCenter.sprite,
                            type: ActionType.Move,
                            to: toPos,
                            easeFun: Laya.Ease.sineInOut,
                            time: duration,
                            success: function (p: any) {
                                Debug.Log("GameMergeZuma onPositionMoveTo end");
                                // this.uiItemCenter.isAnimating = false;
                                // this.isAnimating = false;
                                //  GameMerge.main.DeleteItem(this);
                                //  CheckGameOver();

                                if (!uiItemCenterInsertTo) {
                                    var ac = null;
                                    if (this.uiItemCenter.sprite && this.uiItemCenter.sprite.node) {
                                        ac = this.uiItemCenter.sprite.node.getComponent(ActionRotationAngle);
                                    }

                                    if (ac == null) {
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
                                        Debug.Log("GameMergeZuma ListInsert this.listItem.length=" + this.listItem.length);
                                        this.uiItemCenter.angle = ac.angleTo;
                                        this.uiItemCenter.index = 0;
                                    }
                                    else {
                                        //运动至最后一个  顺时针运动 
                                        ac.angleTo = uiTo.angle + this.GetItemOffsetAngle(uiTo, this.radiusCenter) + this.GetItemOffsetAngle(this.uiItemCenter, this.radiusCenter);
                                        if (ac.angleFrom < ac.angleTo) {
                                            ac.angleFrom += 360;
                                        }

                                        this.listItem.push(this.uiItemCenter);
                                        Debug.Log("GameMergeZuma uiItemCenter this.listItem.length=" + this.listItem.length);
                                        this.uiItemCenter.angle = ac.angleTo;
                                        this.uiItemCenter.index = this.listItem.length;
                                    }
                                    ac.Run();

                                }
                                else {
                                    // insert
                                    var indexInsert: number = uiItemCenterInsertTo.index;
                                    for (var i = indexInsert; i < this.listItem.length; i++) {
                                        var ui = this.listItem[i];
                                        ui.index++;
                                    }
                                    // this.listItem.Insert(indexInsert, this.uiItemCenter);
                                    Common.ListInsert(this.listItem, indexInsert, this.uiItemCenter);
                                    this.LayOut();
                                    this.StartCheckCollision();
                                    this.CheckGameOver();
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
