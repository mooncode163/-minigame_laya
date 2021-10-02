import AppScene from "../../../../../AppBase/AppScene";
import AppSceneUtil from "../../../../../AppBase/Common/AppSceneUtil";
import GameBase from "../../../../../AppBase/Game/GameBase";
import LevelManager from "../../../../../AppBase/Game/LevelManager";
import AudioPlay from "../../../../../Common/Audio/AudioPlay";
import PrefabCache from "../../../../../Common/Cache/PrefabCache";
import TextureCache from "../../../../../Common/Cache/TextureCache";
import CameraUtil from "../../../../../Common/Camera/CameraUtil";
import Common from "../../../../../Common/Common";
import Timer from "../../../../../Common/Core/Timer";
import Debug from "../../../../../Common/Debug";
import Device from "../../../../../Common/Device";
import ItemInfo from "../../../../../Common/ItemInfo";
import UITouchEvent from "../../../../../Common/UIKit/Event/UITouchEvent";
import UISprite from "../../../../../Common/UIKit/UIImage/UISprite";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIView from "../../../../../Common/UIKit/ViewController/UIView";
import GameLevelParse from "../../../../Main/GameLevelParse";
import GameData, { GameStatus } from "../../../Data/GameData";
import UIMergeItem from "../UIMergeItem";
import ActionRotationAngle from "./ActionRotationAngle";
import UIGameMergeZuma from "./UIGameMergeZuma";
import UIItemTrail from "./UIItemTrail";


export default class GameMergeZuma extends GameBase {
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
    posCenter = Laya.Vector2.ZERO;
    time = 1;//计时
    angleStart = 0;
    isStartCheckCollision = false;
    isCheckCollisionIng = false;

    isAnimating = false;
    countMerge = 0;

    public uiCircle: UISprite;
    public uiCenterItemBg: UISprite;
    public uiItemTrail: UIItemTrail;
    public uiProp: UISprite;

    uiPrefabTrail: Laya.Prefab;
    uiPrefabItem: Laya.Prefab;


    onAwake() {
        super.onAwake();

        GameData.main.gameZuma = this;

        var ev = this.node.addComponent(UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);
        ev.timeTouchMin = 1.0;

        this.angleStart = 270;
        this.isStartCheckCollision = false;
        GameData.main.gameId = GameData.GAMAE_ID_ZUMA;



        return;
        LevelManager.main.placeLevel = 0;
        // LevelManager.main.ParseGuanka();
        this.LoadPrefab();


        GameData.main.gameStatus = GameStatus.None;

        this.LayOut();
    }

    onStart() {
        super.onStart();

        /*
        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        this.radiusCenter = Math.min(size.x, size.y) * 0.5 * 0.5;
        var box = this.node.getComponent(Laya.BoxCollider);
        box.size = size;
        this.radiusCenter = this.GetBoundSizeOfGameObject(this.uiCircle.node).width / 2;
        // 圆环度占比 40/1024
        var width_ring = 20;
        this.radiusCenter = this.radiusCenter * (1 - width_ring / this.uiCircle.texture.width);

        Debug.Log("radiusCenter =" + this.radiusCenter);
        this.Clear();
        this.LayOut();
        */

    }

    onUpdate() {
        return;
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
            this.CheckCollisionInternal();
            // StartCoroutine(CheckCollision());//调用携程函数
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
                    this.AddChild(this.uiItemTrail);
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

        return this.GetItemId(rdm);
    }
    UpdateItem() {

        var count = 1;
        for (var i = 0; i < count; i++) {
            var key = this.GetItemId(i);
            var ui = this.CreateItem(key, false);
        }

        this.LayOut();
    }

    Clear() {
        GameData.main.addScore = 0;
        GameData.main.score = 0;
        GameData.main.isFail = false;
        this.isAnimating = false;
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
        var w = this.GetBoundSizeOfGameObject(item.node).width;
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

        TextureCache.main.Load(
            {
                filepath: pic,
                success: (p: any, tex: Laya.Texture2D) => {

                    var ratio = GameData.IMAGE_ITEM_WIDHT * 1.0 / tex.width;

                    var scale = (this.ScaleStart + 0.05 * this.GetIndexOfItem(key)) * 0.6;
                    // scale = 0.1f;
                    if (Device.main.isLandscape) {
                        // scale = scale * 2f;
                    }
                    return scale * ratio;
                },
                fail: (p: any) => {

                },
            });
        return 1;

    }
    // // angle 0-360度
    CreateItem(key, isCenter) {
        var uiPrefab = this.uiPrefabItem;
        var node = UI.Instantiate(uiPrefab);
        var ui = node.getComponent(UIMergeItem);
        this.AddChild(ui);


        ui.iDelegate = this;
        ui.isZuma = true;
        ui.isNew = true;
        ui.id = key;
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

        ui.EnableGravity(false);
        var scale = this.GetItemScale(key);
        ui.transform.localScale = new Laya.Vector3(scale, scale, 1);
        // ui.transform.localPosition = this.GetItemPositon(radiusCenter, angle);
        ui.transform.localPosition = new Laya.Vector3(this.posCenter.x, this.posCenter.y, this.itemPosZ);


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
        return ui;

    }
    CheckGameOver() {
        var ret = false;
        var count = this.listItem.length;
        var totalLength = 0;
        for (var i = 0; i < count; i++) {
            var ui = this.listItem[i];
            totalLength += this.GetBoundSizeOfGameObject(ui.node).width;
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



    CheckCollision() {
        this.CheckCollisionInternal();

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
    CheckCollisionInternal() {
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
                    break;
                }
            }
        }

        if ((uiDel1 != null) && (uiDel2 != null)) {
            this.DeleteMergeItem(uiDel1);
            // next
            this.DeleteMergeItem(uiDel2);
            // 合并
            var uiMerge = this.CreateItem(this.GetNextItem(uiDel1.keyId), true);
            uiMerge.name = uiMerge.keyId;
            this.InsertMergeItem(del_index, uiMerge);
            isHasMerge = true;
            this.isStartCheckCollision = false;
            this.countMerge++;
            uiMerge.keyAudio = "MergeTwoItem";
            // uiMerge.isAnimating = true;
            this.isAnimating = true;
            uiMerge.RunMergeCloudAnimate();
            this.LayOut();

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
            this.isStartCheckCollision = false;
            this.isCheckCollisionIng = false;
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
            var rItem = this.GetBoundSizeOfGameObject(ui.node).width / 2;
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
                this.ShowDeleteParticle(ui.transform.position, ui.keyId);
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
                this.ShowDeleteParticle(ui.transform.position, ui.keyId);
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

        this.ShowDeleteParticle(uiDelete.transform.position, uiDelete.keyId);
        Common.ListRemoveItem(this.listItem, uiDelete);
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
        this.listItem.push(idx, ui);
        ui.index = idx;
    }


    OnUIMergeItemMergeCloudAnimateDidFinish(ui: UIMergeItem) {
        if (this.uiItemCenter != null) {
            this.uiItemCenter.isAnimating = false;
        }

        this.isAnimating = false;
    }

    // 删除粒子特效
    ShowDeleteParticle(positon, strid) {
        // var uiPrefab = PrefabCache.main.LoadByKey<ParticleMerge>("ParticleMerge");
        // var ui = (ParticleMerge)GameObject.Instantiate(uiPrefab);
        // ui.SetParent(this);
        // ui.transform.position = positon;
        // ui.UpdateItem(id);

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
        // var ui = action.node.AddComponent<UIMergeItem>();
        // ui.transform.localPosition = this.GetItemPositon(this.radiusCenter, angle);

    }

    OnActionRotationAngleFinish(obj) {
        // 更新开始角度
        this.angleStart = this.listItem[0].angle;
        this.LayOut();
        this.StartCheckCollision();
        this.CheckGameOver();
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
            this.uiCenterItemBg.transform.localScale = new Laya.Vector3(scale, scale, 1);
            this.uiCenterItemBg.transform.localPosition = new Laya.Vector3(this.posCenter.x, this.posCenter.y, this.uiCenterItemBg.transform.localPosition.z);
            this.uiCircle.transform.localPosition = new Laya.Vector3(this.posCenter.x, this.posCenter.y, this.uiCircle.transform.localPosition.z);
        }
    }

    LayOut() {
        super.LayOut();
        return;

        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        this.radiusCenter = Math.min(size.x, size.y) * 0.5 * 0.5;
        var box = this.node.getComponent(Laya.BoxCollider);
        box.size = size;
        this.radiusCenter = this.GetBoundSizeOfGameObject(this.uiCircle.node).width / 2;
        // 圆环度占比 40/1024
        var width_ring = 20;
        this.radiusCenter = this.radiusCenter * (1 - width_ring / this.uiCircle.texture.width);
        this.LayOutItmes();

        var count = this.listItem.length;
        for (var i = 0; i < count; i++) {
            var ui = this.listItem[i];
            if (ui == null) {
                continue;
            }
            var angle = this.GetItemAngle(i);
            ui.angle = angle;
            ui.transform.localPosition = this.GetItemPositon(this.radiusCenter, angle);
        }

    }
    OnUITouchEvent(ui: UITouchEvent, status: number, event?: any) {
        // var pos = eventData.pointerCurrentRaycast.worldPosition;
        var pos = Laya.Vector2.ZERO;
        switch (status) {
            case UITouchEvent.TOUCH_DOWN:
                {

                }
                break;
            case UITouchEvent.TOUCH_UP:
                {
                    Debug.Log("GameMergeZuma up keyId=" + this.keyId);
                }
                break;
            case UITouchEvent.STATUS_Click:
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

        // 动画中
        if (this.uiItemCenter != null) {
            if (this.uiItemCenter.isAnimating) {
                // Debug.Log("GameMergeZuma UpdateEvent return isAnimating");
                // return;
            }
            var ac = this.uiItemCenter.node.getComponent(ActionRotationAngle);
            if (ac.isRunning) {
                Debug.Log("GameMergeZuma UpdateEvent return ac.isRunning");
                return;
            }
        }


        {


            //判断是否点击
            // if (Input.GetMouseButton(0))
            if (UITouchEvent.TOUCH_DOWN == status) {
                this.isMouseDown = true;
                GameData.main.gameStatus = GameStatus.Play;
            }



            if (this.isMouseDown && (GameData.main.gameStatus == GameStatus.Play)) {
                this.isMouseDown = false;


            }

            if ((UITouchEvent.TOUCH_MOVE == status) && (!this.isAutoClick)) {

            }
            //判断是否完成点击
            // if (Input.GetMouseButtonUp(0))
            if (UITouchEvent.TOUCH_UP == status) {
                this.isMouseUp = true;
            }

            if (this.isMouseUp && (GameData.main.gameStatus == GameStatus.Play)) {
                this.isMouseUp = false;
                this.time = 0;
                /*
                //让水果向圆运动
                if (this.uiItemCenter != null) {
                    // this.uiItemCenter.EnableGravity(true);

                    // ui.transform.localPosition = this.GetItemPositon(radiusCenter, angle);
                    var ptTouch = Common.GetInputPositionWorld(mainCam);
                    var angle = MathUtil.GetAngleOfPoint(ptTouch);//pos
                    var duration = GameData.DURATION_MOVE;
                    // this.uiItemCenter.angle = angle;
                    var uiItemCenterInsertTo = this.GetItemInsertTo(angle);
                    AudioPlay.main.PlayByKey("Merge_Click");
                    var toPos = this.GetItemPositon(radiusCenter, angle);
                    this.RunTrailMoveAnimate(toPos, this.uiItemCenter);
                    this.uiItemCenter.isAnimating = true;
                    this.isAnimating = true;
                    this.uiItemCenter.transform.DOMove(toPos, duration).OnComplete(() => {
                        this.uiItemCenter.isAnimating = false;
                        this.isAnimating = false;
                        //  GameMerge.main.DeleteItem(this);
                        //  CheckGameOver();

                        if (!uiItemCenterInsertTo) {
                            var ac = this.uiItemCenter.gameObject.GetComponent<ActionRotationAngle>();

                            var uiTo = GetItemAngleToActionRotation(angle);
                            ac.angleFrom = angle;
                            this.uiItemCenter.name = this.uiItemCenter.keyId;
                            if (IsAddHeadOrEnd(angle)) {

                                //运动至第一个  逆时针运动 
                                ac.angleTo = uiTo.angle - GetItemOffsetAngle(uiTo, radiusCenter) - GetItemOffsetAngle(this.uiItemCenter, radiusCenter);
                                for (int i = 0; i < this.listItem.length; i++)
                    {
                        var ui = this.listItem[i];
                        ui.index++;
                    }
                    this.listItem.Insert(0, this.uiItemCenter);
                    this.uiItemCenter.angle = ac.angleTo;
                    this.uiItemCenter.index = 0;
                }
                else {
                    //运动至最后一个  顺时针运动 
                    ac.angleTo = uiTo.angle + GetItemOffsetAngle(uiTo, radiusCenter) + GetItemOffsetAngle(this.uiItemCenter, radiusCenter);
                    if (ac.angleFrom < ac.angleTo) {
                        ac.angleFrom += 360;
                    }

                    this.listItem.Add(this.uiItemCenter);
                    this.uiItemCenter.angle = ac.angleTo;
                    this.uiItemCenter.index = this.listItem.length;
                }
                ac.Run();

            }
            else {
                // insert
                var indexInsert = uiItemCenterInsertTo.index;
                for (var i = indexInsert; i < this.listItem.length; i++) {
                    var ui = this.listItem[i];
                    ui.index++;
                }
                this.listItem.Insert(indexInsert, this.uiItemCenter);
                this.LayOut();
                this.StartCheckCollision();
                this.CheckGameOver();
            }

                this.ReadyGeneratedItem();

            });
            */

                this.uiItemCenter.isNew = false;
            }


        }
    }

    ReadyGeneratedItem() {
        this.hasItBeenGenerated = false;//更改hasItBeenGenerated状态
        Debug.Log("ReadyGeneratedItem enter");
        this.time = 0;
    }
}
