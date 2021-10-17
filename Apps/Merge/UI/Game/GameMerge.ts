import AppSceneUtil from "../../../../AppBase/Common/AppSceneUtil";
import Common from "../../../../Common/Common";
import Timer from "../../../../Common/Core/Timer";
import Debug from "../../../../Common/Debug";
import ResManager from "../../../../Common/Res/ResManager";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UI from "../../../../Common/UIKit/ViewController/UI";
import GameLevelParse from "../../../Main/GameLevelParse";
import GameData, { GameStatus } from "../../Data/GameData";
// import UIGameMerge from "./UIGameMerge";
import UIMergeItem from "./UIMergeItem";
import { PropType } from "./UIPopProp";
import DataTouch from "../../../../Common/UIKit/Event/DataTouch";
import CameraUtil from "../../../../Common/Camera/CameraUtil";
import GameBaseMerge from "./GameBaseMerge";
import TextureCache from "../../../../Common/Cache/TextureCache";
import UISprite from "../../../../Common/UIKit/UIImage/UISprite";
import Device from "../../../../Common/Device";
import ItemInfo from "../../../../Common/ItemInfo";
import UIBoard from "./UIBoard";
import LayOutSize from "../../../../Common/UIKit/LayOut/LayOutSize";
import { SizeType } from "../../../../Common/UIKit/LayOut/LayOutUtil";
import ImageRes from "../../../../Common/Config/ImageRes";
import AudioPlay from "../../../../Common/Audio/AudioPlay";
import Platform from "../../../../Common/Platform";




export default class GameMerge extends GameBaseMerge {

    nodeDeadline: Laya.Node | null = null;



    // second
    TimeStep = 0.8;//1.2

    ScaleStart = 0.4;
    isFirstRun = false;
    prefabItem = null;
    uiItem: UIMergeItem;
    time = 1.0;
    hasItBeenGenerated = false;
    isMouseDown = false;
    isMouseUp = false;
    isAutoClick = false;
    posYInit: 0;
    particleMerge: Laya.Particle2D;

    uiBoard: UIBoard;

    static _main: GameMerge;
    //静态方法
    static get main() {
        return this._main;
    }
    onAwake() {
        super.onAwake();
        GameMerge._main = this;
        GameData.main.game = this;
        this.isInitGame = false;

        var size = CameraUtil.main.GetWorldSize(this.mainCam);


        // this.imageProp = UIFind.FindUI(this.node, "imageProp", UIImage);
        // this.imageProp.visible = false;
        // this.imageProp.zOrder = 10;
        // AppSceneUtil.main.rootNode.addChild(this.imageProp.node);
        this.time = 0;
        // this.LoadPrefab();
        // this.LayOut();

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
        GameData.main.gameStatus = GameStatus.None;
    }
    onStart() {
        super.onStart();
        // this.LayOut();


    }
    LayOut() {
        super.LayOut();
        if (this.uiProp) {
            var tex = this.uiProp.texture;
            if (tex != null) {

                var scale = 0.3;
                var w_item = 0;
                if (tex.width != 0) {
                    w_item = this.uiItem.GetBoundSize().width;
                    scale = (w_item / (tex.width / 100.0)) * 0.8;
                }
                this.uiProp.transform.localScale = new Laya.Vector3(scale, scale, 1);
            }
        }

    }


    InitGame() {
        Debug.Log("InitGame enter");
        this.uiBg = UI.CreateUI3D(UISprite, this, "GameBg"); //GameBg
        this.uiBg.transform.localPosition = new Laya.Vector3(0, 0, this.itemPosZ - 5);
        this.uiBg.name = "uibg";

        {
            this.uiBoard = UI.CreateUI3D(UIBoard, this, ""); //GameBg
            this.uiBoard.transform.localPosition = new Laya.Vector3(0, 0, this.itemPosZ);
            var size = CameraUtil.main.GetWorldSize(this.mainCam);
            var ly: LayOutSize = this.uiBoard.node.addComponent(LayOutSize);
            ly.typeX = SizeType.PARENT;
            ly.typeY = SizeType.PARENT;
        }

        this.uiProp = UI.CreateUI3D(UISprite, this, ""); //GameBg
        this.uiProp.transform.localPosition = new Laya.Vector3(0, 0, this.itemPosZ + 3);

        this.isInitGame = true;

        this.uiBoard.ShowGuideLine(false);
        // return;
        // Laya.timer.once(100, this, function (): void {
        //     this.uiBg.position = new Laya.Vector3(0, 0, this.itemPosZ - 5);
        //     this.uiCircle.position = new Laya.Vector3(0, 0, this.itemPosZ - 2);
        //     this.uiCenterItemBg.position = new Laya.Vector3(0, 0, this.itemPosZ - 1);

        //     this.Clear();
        //     this.isInitGame = true; 
        // });
        this.InitTouchBase();

    }
    UpdateLevel(level: number) {
        super.UpdateLevel(level);
    }

    LoadPrefab() {
        // PrefabCache.main.LoadByKey(
        //     {
        //         key: "UIMergeItem",
        //         success: (p: any, data: any) => {
        //             this.prefabItem = data;
        //             this.StartGame();

        //         },
        //         fail: () => {

        //         },
        //     });

        // PrefabCache.main.LoadByKey(
        //     {
        //         key: "UIMergeItem",
        //         // filepath: "Resources/AppCommon/Prefab/Game/UIMergeItem.prefab",
        //         success: (p: any, data: any) => {
        //             this.prefabItem = data;
        //             this.StartGame();

        //         },
        //         fail: () => {

        //         },
        //     });

    }

    StartGame() {
        // var ev = this.owner.addComponent(UITouchEvent);
        // ev.callBackTouch = this.OnUITouchEvent.bind(this);
        this.time = this.TimeStep;
    }


    onUpdate() {         //用作延迟生成物体
        // return;
        if (!this.isInitGame) {
            return;
        }
        if (this.time < this.TimeStep) {
            var tick = Timer.deltaSecond;
            this.time += tick;
            Debug.Log("onUpdate tick=" + tick + " this.time=" + this.time);
        }
        else {
            // Debug.Log("onUpdate 1");
            //判断场景中没有生成物体
            if (!this.hasItBeenGenerated)
            // if (isMouseDown)
            {
                Debug.Log("onUpdate 2");
                var key = this.RandomFruitImageKey();
                // key = "putao";
                this.uiItem = this.CreateItem(key);
                this.uiItem.isNew = true;
                // this.GetComponent<SizeChange>().GettingBigger(fruitInTheScene);//使物体缓慢变大


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


                this.hasItBeenGenerated = true;//更改hasItBeenGenerated状态
            }

            // if (isAutoClick) {
            //     UpdateEvent(UITouchEvent.STATUS_TOUCH_DOWN);
            // }

        }


    }
    Clear() {
        for (var i = 0; i < this.listItem.length; i++) {
            var ui = this.listItem[i];
            if (ui.node != null) {
                ui.node.destroy();
            }
        }
        Common.ListClear(this.listItem);

    }
    onDestroy() {
        // super.onDestroy();

        // for (var i = 0; i < this.listItem.length; i++) {
        //     var uilist = this.listItem[i];
        //     uilist.owner.destroy();
        // }
        // this.listItem.splice(0, this.listItem.length);
        this.Clear();
        var parent = this.node;
        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.getChildAt(i);
            Debug.Log("GameMerge onDestroy i=" + i + " child.name=" + child.name);
            if (child == AppSceneUtil.mainScene) {
                continue;
            }
            child.destroy();

        }
        this.uiItem = null;
    }
    GetTotalItems() {
        return GameLevelParse.main.listGameItems.length;
    }
    GetItemId(idx) {
        var info = GameLevelParse.main.GetLevelItemInfo(idx);
        return info.id;
    }

    //随机获取水果
    RandomFruitImageKey() {
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

    // string
    GetIndexOfItem(key) {
        for (var i = 0; i < this.GetTotalItems(); i++) {
            if (key == this.GetItemId(i)) {
                return i;
            }
        }
        return 0;
    }

    // string
    GetNextItem(key) {
        var ret = "";
        for (var i = 0; i < this.GetTotalItems(); i++) {
            if (key == this.GetItemId(i) && ((i + 1) < this.GetTotalItems())) {
                ret = this.GetItemId(i + 1);
                break;
            }
        }
        return ret;
    }

    GetLastItem() {
        var ret = "";
        if (this.GetTotalItems() > 0) {
            ret = this.GetItemId(this.GetTotalItems() - 1);
        }
        return ret;
    }
    OnRestPlay() {
        //  Invoke("OnRestPlayInternal",0.2f);
        this.OnRestPlayInternal();
    }

    OnRestPlayInternal() {
        GameData.main.gameStatus = GameStatus.Play;
        this.ShowProp(false);
    }
    // 改变类型为  string toId
    ChangeItem(toId) {
        if (this.uiItem != null) {
            Debug.Log("ChangeItem toId=" + toId);
            this.uiItem.keyId = toId;
            this.uiItem.name = toId;
            var pic = GameLevelParse.main.GetImagePath(toId);
            this.uiItem.UpdateImage(pic);
        }

        this.OnRestPlay();
    }

    // UIMergeItem ui
    DeleteItem(ui) {
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = this.listItem[i];
            if (uilist == ui) {
                this.ShowMergeParticle(UI.GetNodePosition(ui.node), ui.keyId);
                Common.ListRemoveItem(this.listItem, ui);
                uilist.owner.destroy();
                // this.listItem.splice(i, 1);
                break;
            }
        }
        this.OnRestPlay();
    }

    // Node 
    RemoveItemFromList(objitem) {
        var idx = Common.GetListIndexOfItem(this.listItem, objitem);
        if (idx < 0) {
            // return;
        }

        var item = objitem.getComponent(UIMergeItem);
        if (item == null) {
            return;
        }
        Common.ListRemoveItem(this.listItem, item);


        //@moon item.node.destroy();会导致物理系统异常
        // item.node.destroy();
        item.destroy();


        // for (var i = 0; i < this.listItem.length; i++) {
        //     var uilist = this.listItem[i];
        //     var item = objitem.getComponent(UIMergeItem);
        //     if (uilist == item) {
        //         this.listItem.splice(i, 1);
        //         item.destroy();
        //         break;
        //     }
        // }

        if (this.uiItem == item) {
            this.uiItem = null;
        }

    }

    // 摧毁所有的同类 string
    DeleteAllItemsOfId(id) {
        Debug.Log("DeleteAllItemsOfId id=" + id);
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = this.listItem[i];
            Debug.Log("DeleteAllItemsOfId 1 id=" + id + " uilist.keyId=" + uilist.keyId);
            if (uilist.keyId == id) {
                this.ShowMergeParticle(UI.GetNodePosition(uilist.node), uilist.keyId);
                uilist.owner.destroy();
            }
        }
        for (var i = 0; i < this.listItem.length; i++) {
            var ui = this.listItem[i];
            Debug.Log("DeleteAllItemsOfId 2 id=" + id + " ui.keyId=" + ui.keyId);
            if (ui.keyId == id) {
                // this.listItem.splice(i, 1);
                Common.ListRemoveItem(this.listItem, ui);
            }
        }
        this.OnRestPlay();
    }
    GetItemScale(key) {
        var pic = GameLevelParse.main.GetImagePath(key);
        var tex = TextureCache.main.GetTextureFromCache(pic);
        var ret = 1;
        var ratio = GameData.IMAGE_ITEM_WIDHT * 1.0 / tex.width;
        var scale = (this.ScaleStart + 0.04 * this.GetIndexOfItem(key)) * 0.2;
        // scale = 0.1f;
        if (Device.main.isLandscape) {
            // scale = scale * 2f;
        }
        ret = scale * ratio;
        // ret = 0.125;
        // ret = 1;
        return ret;

    }
    // string return UIMergeItem
    CreateItem(key: string) {
        var keyId = key;
        // keyId ="juzi";
        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        var x, y, w, h;
        // var node = UI.Instantiate(this.prefabItem);
        // var ui = node.getComponent(UIMergeItem);
        var ui = UI.CreateUI3D(UIMergeItem, this);

        var scale = this.GetItemScale(key);
        //   w = 5.12*scale;
        //   h = 5.12*scale; 
        ui.UpdateItemImage(key, w, h);

        ui.transform.localScale = new Laya.Vector3(scale, scale, 1);

        ui.hasGoDownDeadLine = false;
        ui.isNew = false;
        ui.keyId = keyId;
        // ui.index = indexItem++; 
        // AppSceneBase.main.AddObjToMainWorld(ui.gameObject);
        // ui.SetParent(this);
        // laya 物理引擎bug  刚体只能显示全屏的对象上 不然 碰撞体和对象会发生错位的现象
        // AppSceneUtil.main.rootNode.addChild(ui.node);

        ui.name = keyId;
        ui.node.name = keyId;

        var tex = TextureCache.main.GetTextureFromCacheByKey(key);
        ui.width = tex.width / 100;
        ui.height = tex.height / 100;

        // var scale = (this.ScaleStart + 0.05 * this.GetIndexOfItem(key)) * 0.8; 
        // var scale = (this.ScaleStart + 0.2 * this.GetIndexOfItem(key));
        x = 0;
        // y = 512;
        y = size.y / 2 - 1;
        this.posYInit = y;
        // Debug.Log("OnCollisionEnter2D this.posYInit=" + this.posYInit + " key=" + key + " scale=" + scale);
        // ui.node.setPosition(x, y);

        // var pic = GameLevelParse.main.GetImagePath(key);
        // Debug.Log("CreateItem pic=" + pic + " key=" + key);
        // ui.UpdateImage(pic);






        // physic ng
        ui.transform.localPosition = new Laya.Vector3(x, y, this.itemPosZ);


        ui.UpdateItemPhysic(key, scale);
        ui.EnableGravity(false);

        this.listItem.push(ui);
        return ui;
    }

    UpdateProp(keypic: string) {
        this.uiProp.UpdateImageByKey(keypic);
        this.LayOut();
    }
  

    UpdateEvent(status, point) {
        if (this.uiItem == null) {
            Debug.Log("UpdateEvent return this.uiItem == null");
            if (DataTouch.TOUCH_UP == status) {
                this.hasItBeenGenerated = false;
            }

            return;
        }

       
        if (GameData.main.gameStatus == GameStatus.Prop) {
            Debug.Log("UpdateEvent return GameData.main.gameStatus == GameStatus.Prop");

            if (Platform.isByte || Platform.isQQ)
             {
                if (DataTouch.TOUCH_UP == status) {
                    // 手动计算
                    // var itemClick = this.GetItemMouseClick(DataTouch.main.touchPosWorld);
                    // if (itemClick) {
                    //     itemClick.onMouseUpInternal();
                    // }


                    this.ItemClickByRay();
                } 
            }
            return;
        }

        {


            //判断是否点击
            // if (Input.GetMouseButton(0))
            if (DataTouch.TOUCH_DOWN == status) {
                GameData.main.gameStatus = GameStatus.Play;
                this.isMouseDown = true;
            }



            if (this.isMouseDown && (GameData.main.gameStatus == GameStatus.Play)) {
                this.uiBoard.ShowGuideLine(false);
                // string key = RandomFruitImageKey();
                // uiItem = CreateItem(key);

                // Debug.Log("autoclick MouseClickDown isMouseDown ");
                this.isMouseDown = false;
                //// float mousePosition_x = Input.mousePosition.x;//获取点击位置(只需要x轴位置)//这样获取的不是世界坐标系 所以废弃

                // Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);//获取点击位置
                var mousePosition = point;
                if (this.isAutoClick) {
                    mousePosition.x = 0;
                }
                if (this.uiItem != null) {
                    if (this.uiItem.isNew) {
                        // var pos = new Vector3(mousePosition.x, posYInit, 0);//更改水果在场景中的位置
                        mousePosition.y = this.posYInit;
                        var value = 0.5;
                        var ratio = 1;
                        if (this.isAutoClick) {
                            ratio = 1;
                        }
                        // mousePosition.x += Common.RandomRange(-value, value) * ratio;
                        // 生成物体 使用随机防止同地点击无限堆高
                        // uiItem.transform.position = pos + new Vector3(UnityEngine.Random.Range(-value, value) * ratio, UnityEngine.Random.Range(-value, value) * ratio, 0);//!
                        // uiItem.transform.position = pos + new Vector3(UnityEngine.Random.Range(-value, value) * ratio, 0, 0);//!
                        // mousePosition.x = 0;
                        // mousePosition.y = 200;

                        this.uiItem.transform.localPosition = new Laya.Vector3(mousePosition.x, mousePosition.y, this.itemPosZ);
                        this.uiItem.LayOut();

                    }
                }

            }

            if ((DataTouch.TOUCH_MOVE == status) && (!this.isAutoClick)) {
                var mousePosition = point;
                // Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);//获取点击位置
                if (this.uiItem != null) {
                    if (this.uiItem.isNew) {
                        // Vector3 pos = new Vector3(mousePosition.x, posYInit, 0);//更改水果在场景中的位置
                        mousePosition.y = this.posYInit;
                        this.uiItem.transform.localPosition = new Laya.Vector3(mousePosition.x, mousePosition.y, this.itemPosZ);
                        var pos = new Laya.Vector3(this.uiItem.transform.localPosition.x, this.uiItem.transform.localPosition.y - this.uiItem.GetBoundSize().height / 2, this.itemPosZ);
                        // var pos =  new Laya.Vector3(this.uiItem.transform.localPosition.x, this.uiItem.transform.localPosition.y, this.itemPosZ);
                        this.uiBoard.UpdateGuideLine(pos);
                    }
                }
            }
            //判断是否完成点击
            // if (Input.GetMouseButtonUp(0))
            if (DataTouch.TOUCH_UP == status) {
                this.isMouseUp = true;
                this.isMouseDown = false;
                this.uiBoard.ShowGuideLine(false);
            }

            if (this.isMouseUp && (GameData.main.gameStatus == GameStatus.Play)) {
                Debug.Log("  MouseClickUp isMouseUp ");
                this.isMouseUp = false;

                //让水果获得重力下降
                // fruitInTheScene.GetComponent<Rigidbody2D>().simulated = true;
                if (this.uiItem != null && this.uiItem.isNew) {
                    this.uiItem.EnableGravity(true);
                    AudioPlay.main.PlayByKey("Merge_Click");
                    this.uiItem.isNew = false;
                    // this.uiItem = null;//清除保存的水果
                }
                this.hasItBeenGenerated = false;//更改hasItBeenGenerated状态

                this.time = 0;

                if (!GameData.main.uiGame.uiToolBar.visible) {
                    GameData.main.uiGame.uiToolBar.visible = this.IsHasFalledBall();
                }

            }
        }


    }
    // 判断场景里是否有掉落下来的球
    // IsHasFalledBall() {
    //     return this.listItem.length > 1 ? true : false;
    // }
    IsHasFalledBall() {
        if (Device.main.isScreenShot) {
            return true;
        }
        if (GameData.main.gameStatus == GameStatus.None) {
            return false;
        }
        return true;
    }



}


