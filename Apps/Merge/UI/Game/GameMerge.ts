import AppSceneUtil from "../../../../AppBase/Common/AppSceneUtil";
import GameBase from "../../../../AppBase/Game/GameBase";
import PrefabCache from "../../../../Common/Cache/PrefabCache";
import Common from "../../../../Common/Common";
import Debug from "../../../../Common/Debug";
import ResManager from "../../../../Common/Res/ResManager";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UITouchEvent from "../../../../Common/UIKit/UITouchEvent";
import UI from "../../../../Common/UIKit/ViewController/UI";
import GameData, { GameStatus } from "../../Data/GameData";
import GameLevelParse from "../../Data/GameLevelParse";
// import UIGameMerge from "./UIGameMerge";
import UIMergeItem from "./UIMergeItem";




export default class GameMerge extends GameBase {

    nodeDeadline: Laya.Node | null = null;

    imageProp: UIImage | null = null;
    static TimeStep = 0.8;

    ScaleStart = 0.4;
    isFirstRun = false;
    prefabItem = null;
    uiItem = null;
    listItem: UIMergeItem[] = [];

    time = 1.0;
    hasItBeenGenerated = false;
    isMouseDown = false;
    isMouseUp = false;
    isAutoClick = false;
    posYInit: 0;
    particleMerge: Laya.Particle2D;

    static _main: GameMerge;
    //静态方法
    static get main() {
        return this._main;
    }
    onAwake() {
        super.onAwake();
        GameMerge._main = this;
        GameData.main.game = this;
        this.time = 0;
        this.LoadPrefab();
        this.LayOut();

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
    }
    LayOut() {
        super.LayOut();
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

        PrefabCache.main.LoadByKey(
            {
                key: "UIMergeItem",
                // filepath: "Resources/AppCommon/Prefab/Game/UIMergeItem.prefab",
                success: (p: any, data: any) => {
                    this.prefabItem = data;
                    this.StartGame();

                },
                fail: () => {

                },
            });

    }

    StartGame() {
        // var ev = this.owner.addComponent(UITouchEvent);
        // ev.callBackTouch = this.OnUITouchEvent.bind(this);
        this.time = GameMerge.TimeStep;
    }


    onUpdate() {         //用作延迟生成物体

        if(this.prefabItem==null)
        {
            return;
        }
        if (this.time < GameMerge.TimeStep) {
            var tick = Common.GetCurrentTime();
            // Debug.Log("update tick="+tick);
            this.time += tick;
        }
        else {
            //判断场景中没有生成物体
            if (!this.hasItBeenGenerated)
            // if (isMouseDown)
            {
                var key = this.RandomFruitImageKey();
                // key ="juzi";
                this.uiItem = this.CreateItem(key);
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

    OnDestroy() {
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = this.listItem[i];
            uilist.owner.destroy();
        }
        this.listItem.splice(0, this.listItem.length);

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
        GameData.main.status = GameStatus.Play;
        // UIGameMerge.main.game.ShowProp(false);
    }
    // 改变类型为  string toId
    ChangeItem(toId) {
        if (this.uiItem != null) {
            this.uiItem.id = toId;
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
                this.ShowMergeParticle(UI.GetNodePosition(ui.node), ui.id);
                uilist.owner.destroy();
                this.listItem.splice(i, 1);
                break;
            }
        }
        this.OnRestPlay();
    }

    // Node 
    RemoveItemFromList(objitem) {
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = this.listItem[i];
            var item = objitem.getComponent(UIMergeItem);
            if (uilist == item) {
                this.listItem.splice(i, 1);
                break;
            }
        }

    }

    // 摧毁所有的同类 string
    DeleteAllItemsOfId(id) {
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = this.listItem[i];
            if (uilist.id == id) {
                this.ShowMergeParticle(UI.GetNodePosition(uilist.node), uilist.id);
                uilist.owner.destroy();
            }
        }
        for (var i = 0; i < this.listItem.length; i++) {
            var ui = this.listItem[i];
            if (ui.id == id) {
                this.listItem.splice(i, 1);
            }
        }
        this.OnRestPlay();
    }

    // string return UIMergeItem
    CreateItem(key: string) {
        var keyid = key;
        // keyid ="juzi";

        var x, y, w, h;
        var node = UI.Instantiate(this.prefabItem);
        var ui = node.getComponent(UIMergeItem);
        ui.hasGoDownDeadLine = false;
        ui.isNew = true;
        ui.keyid = keyid;
        // ui.index = indexItem++; 
        // AppSceneBase.main.AddObjToMainWorld(ui.gameObject);
        // ui.SetParent(this);
        // laya 物理引擎bug  刚体只能显示全屏的对象上 不然 碰撞体和对象会发生错位的现象
        AppSceneUtil.main.rootNode.addChild(ui.node);

        ui.name = keyid;
        ui.node.name = keyid;



        this.ScaleStart = 0.2;
        // var scale = (this.ScaleStart + 0.05 * this.GetIndexOfItem(key)) * 0.8; 
        var scale = (this.ScaleStart + 0.1 * this.GetIndexOfItem(key));

        UI.SetScaleXY(ui.owner, scale);

        var rectParent = this.GetBoundingBox();
        x = rectParent.width / 2;
        y = rectParent.height / 2 - ui.GetBoundingBox().height / 2;

        // y = 512;
        y = 0;
        this.posYInit = y;
        Debug.Log("OnCollisionEnter2D this.posYInit=" + this.posYInit + " key=" + key + " scale=" + scale);
        // ui.node.setPosition(x, y);
        UI.SetNodePosition(ui.owner, x, y);

        var pic = GameLevelParse.main.GetImagePath(key);
        Debug.Log("CreateItem pic=" + pic + " key=" + key);
        ui.UpdateImage(pic);
        ui.EnableGravity(false);
        // ui.transform.localScale = new Vector3(scale, scale, 1);
        // ui.transform.localPosition = new Vector3(0, posYInit, -1);
        this.listItem.push(ui);
        return ui;
    }
    ShowMergeParticle(pos, id) {
        ResManager.LoadParticle(
            {
                filepath: "Resources/AppCommon/Particle/Merge.part",
                success: (p: any, data: any) => {
                    this.particleMerge = data;
                    AppSceneUtil.main.rootNode.addChild(this.particleMerge);
                    this.particleMerge.x = pos.x;
                    this.particleMerge.y = pos.y;
                    this.particleMerge.play();

                    Laya.timer.once(600, this, function():void {
                        this.particleMerge.destroy();
                    });
                },
                fail: () => {
                },
            });

    }
    ShowProp(isShow: boolean) {
        this.imageProp.SetActive(isShow);
        if (isShow) {
            var z = UI.GetPosition(this.imageProp.owner).z;//   this.imageProp.owner.getPosition().z;
            var pos = new Laya.Vector3(0, 0, 0);
            pos.z = z;
            UI.SetPosition(this.imageProp.owner, pos);
        }
    }
    UpdateProp(keypic: string) {
        this.imageProp.UpdateImageByKey(keypic);
    }


    onMouseDown(e) {
        // Debug.Log("GameMerge down id=" + this.id);
        // var z = this.imageProp.node.getPosition().z;
        // var posnew = new Vec3(pos.x,pos.y,0);
        // posnew.z = z;
        // this.imageProp.node.setPosition(posnew);

        // console.log("按下");
        console.log("GameMerge onMouseDown " + this.owner.name + " mouseX=" + e.mouseX + " stageX=" + e.stageX + " stageY=" + e.stageY);
        this.UpdateEvent(UITouchEvent.TOUCH_DOWN, new Laya.Vector2(e.stageX, e.stageY));
    }
    onMouseMove(e) {
        // console.log("GameMerge onMouseMove");
        this.UpdateEvent(UITouchEvent.TOUCH_MOVE, new Laya.Vector2(e.stageX, e.stageY));
    }
    onMouseUp(e) {
        // console.log("抬起");
        console.log("GameMerge onMouseUp " + this.owner.name);
        this.UpdateEvent(UITouchEvent.TOUCH_UP, new Laya.Vector2(e.stageX, e.stageY));
    }
    onClick(e) {
        //e.stopPropagation();//阻止事件冒泡/上报
        console.log("点击" + this.owner.name);
    }




    UpdateEvent(status, point) {

        if (GameData.main.status == GameStatus.Prop) {
            return;
        }

        {


            //判断是否点击
            // if (Input.GetMouseButton(0))
            if (UITouchEvent.TOUCH_DOWN == status) {
                this.isMouseDown = true;
            }



            if (this.isMouseDown && (GameData.main.status == GameStatus.Play)) {

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
                        var value = 30;
                        var ratio = 1;
                        if (this.isAutoClick) {
                            ratio = 1;
                        }
                        mousePosition.x += Common.RandomRange(-value, value) * ratio;
                        // 生成物体 使用随机防止同地点击无限堆高
                        // uiItem.transform.position = pos + new Vector3(UnityEngine.Random.Range(-value, value) * ratio, UnityEngine.Random.Range(-value, value) * ratio, 0);//!
                        // uiItem.transform.position = pos + new Vector3(UnityEngine.Random.Range(-value, value) * ratio, 0, 0);//!
                        // mousePosition.x = 0;
                        // mousePosition.y = 200;

                        // this.uiItem.node.setPosition(mousePosition);
                        this.uiItem.x = mousePosition.x;
                        this.uiItem.y = mousePosition.y;
                        this.uiItem.LayOut();

                    }
                }

            }

            if ((UITouchEvent.TOUCH_MOVE == status) && (!this.isAutoClick)) {
                var mousePosition = point;
                // Vector3 mousePosition = Camera.main.ScreenToWorldPoint(Input.mousePosition);//获取点击位置
                if (this.uiItem != null) {
                    if (this.uiItem.isNew) {
                        // Vector3 pos = new Vector3(mousePosition.x, posYInit, 0);//更改水果在场景中的位置
                        mousePosition.y = this.posYInit;
                        // this.uiItem.node.setPosition(mousePosition);
                        this.uiItem.x = mousePosition.x;
                        this.uiItem.y = mousePosition.y;
                    }
                }
            }
            //判断是否完成点击
            // if (Input.GetMouseButtonUp(0))
            if (UITouchEvent.TOUCH_UP == status) {
                this.isMouseUp = true;
            }

            if (this.isMouseUp && (GameData.main.status == GameStatus.Play)) {
                // Debug.Log("autoclick MouseClickUp isMouseUp ");
                this.isMouseUp = false;
                //让水果获得重力下降
                // fruitInTheScene.GetComponent<Rigidbody2D>().simulated = true;
                if (this.uiItem != null) {
                    this.uiItem.EnableGravity(true);
                    this.uiItem.isNew = false;
                    // this.uiItem = null;//清除保存的水果
                }
                this.hasItBeenGenerated = false;//更改hasItBeenGenerated状态

                this.time = 0;

            }
        }


    }
    // 判断场景里是否有掉落下来的球
    IsHasFalledBall() {
        return this.listItem.length > 1 ? true : false;
    }
}


