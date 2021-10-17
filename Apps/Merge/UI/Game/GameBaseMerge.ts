
import AppSceneUtil from "../../../../AppBase/Common/AppSceneUtil";
import GameBase from "../../../../AppBase/Game/GameBase";
import TextureCache from "../../../../Common/Cache/TextureCache";
import CameraUtil from "../../../../Common/Camera/CameraUtil";
import CloudRes from "../../../../Common/CloundRes/CloudRes";
import Common from "../../../../Common/Common";
import ImageRes from "../../../../Common/Config/ImageRes";
import Debug from "../../../../Common/Debug";
import Platform from "../../../../Common/Platform";
import DataTouch from "../../../../Common/UIKit/Event/DataTouch";
import UITouchEvent3D from "../../../../Common/UIKit/Event/UITouchEvent3D";
import UISprite from "../../../../Common/UIKit/UIImage/UISprite";
import GameLevelParse from "../../../Main/GameLevelParse";
import GameData from "../../Data/GameData";
import UIMergeItem from "./UIMergeItem";
import { PropType } from "./UIPopProp";



export default class GameBaseMerge extends GameBase {

    public uiParticle: Laya.ShuriKenParticle3D;
    isInitGame = false;
    itemPosZ = -1.0;
    public uiBg: UISprite;
    public uiProp: UISprite;
    uiGuide: UISprite;

    listItem: UIMergeItem[] = [];
    onAwake() {
        super.onAwake();
        // this.InitTouchBase();

        // this.LayOut();

    }
    onStart() {
        super.onStart();
        // this.LayOut();
        this.PreLoad();
    }
    LayOut() {
        super.LayOut();
    }

    PreLoad() {
        // 提前加载纹理
        var listItemKey = [];
        listItemKey.push("Circle");
        listItemKey.push("CenterItemBg");
        listItemKey.push("deadline");
        //   listItemKey.push("BottomBoard");


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
    InitGame() {
        Debug.Log("InitGame Base enter");
    }
    UpdateLevel(level: number) {
        super.UpdateLevel(level);
    }

    InitTouchBase() {
        var size = CameraUtil.main.GetWorldSize(this.mainCam);
        //平面添加物理碰撞体组件
        var phycol: Laya.PhysicsCollider = this.uiBg.node.addComponent(Laya.PhysicsCollider);
        //创建盒子形状碰撞器 
        var box: Laya.BoxColliderShape = new Laya.BoxColliderShape(size.x, size.y, 1);
        //物理碰撞体设置形状
        phycol.colliderShape = box;
        var ev = this.uiBg.node.addComponent(UITouchEvent3D);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);
        // ev.timeTouchMin = 1.0;
        if (Platform.isCloudRes) {
            ev.timeTouchMin = 1.0;
        }
    }
    ShowProp(isShow) {
        this.uiProp.visible = isShow;
        // this.uiBg.visible = !isShow;
        if (GameData.main.uiGame.typeProp == PropType.Magic) {
            this.uiProp.visible = false;
        }
        if (isShow) {
            var z = this.uiProp.transform.localPosition.z;
            var pos = new Laya.Vector3(0, 0, 0);
            pos.z = z;
            this.uiProp.transform.localPosition = pos;
        }

        this.LayOut();
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
        // if (this.isFirstRun) {
        //     this.isFirstRun = false;
        //     rdm = 0;
        // }

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

    UpdateParticleTexture(particle: Laya.ShuriKenParticle3D, position, imagefilepath) {

        if (particle == null) {
            console.log("fragmentParticles is null");
            return;
        }
        var material: Laya.ShurikenParticleMaterial = new Laya.ShurikenParticleMaterial();
        // material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT; 

        if (particle.particleRenderer == null) {
            console.log("UIMergeItem fragmentParticles.particleRenderer is null");
            return;
        }
        particle.particleRenderer.material = material;
        Laya.Texture2D.load(imagefilepath, Laya.Handler.create(this, function (tex: Laya.Texture2D) {
            material.texture = tex;
            this.uiParticle.transform.position = position;
            Debug.Log("UIMergeItem ShowParticle position.x=" + position.x + " position.y=" + position.y + " z=" + position.z);

        }));

    }
    ShowMergeParticle(position, strid) {

        // return;

        if (this.uiParticle != null) {
            // bug 第二次显示先销毁之前的对象 不然不显示 @moon
            this.uiParticle.destroy();
        }
        // 加载3D预设（3D精灵）LayaLizi
        Laya.Sprite3D.load(CloudRes.main.rootPath + "/LayaScene_Laya/Conventional/ParticleMergeForLaya.lh", Laya.Handler.create(this, function (sp) {


            Debug.Log("ShowParticle enter key=" + strid);
            var sp3d = this.node.addChild(sp) as Laya.ShuriKenParticle3D;
            this.uiParticle = sp3d;
            // console.log("ShowParticle sp3d="+sp3d);
            // 打印变量结构
            console.log(sp3d);
            // "GlitterParticles" "Shine" "DustParticle" "ShineParticles"
            {
                var particle: Laya.ShuriKenParticle3D = this.uiParticle.getChildByName("FragmentParticles") as Laya.ShuriKenParticle3D;
                var filepath = ImageRes.main.GetImage(strid);
                this.UpdateParticleTexture(particle, position, filepath);
            }
            {
                var particle: Laya.ShuriKenParticle3D = this.uiParticle.getChildByName("GlitterParticles") as Laya.ShuriKenParticle3D;
                var filepath = ImageRes.main.GetImage(strid);
                this.UpdateParticleTexture(particle, position, filepath);
            }

            {
                var particle: Laya.ShuriKenParticle3D = this.uiParticle.getChildByName("Shine") as Laya.ShuriKenParticle3D;
                var filepath = ImageRes.main.GetImage(filepath);
                this.UpdateParticleTexture(particle, position, filepath);
            }

            {
                var particle: Laya.ShuriKenParticle3D = this.uiParticle.getChildByName("DustParticle") as Laya.ShuriKenParticle3D;
                var filepath = ImageRes.main.GetImage(strid);
                this.UpdateParticleTexture(particle, position, filepath);
            }
            {
                var particle: Laya.ShuriKenParticle3D = this.uiParticle.getChildByName("ShineParticles") as Laya.ShuriKenParticle3D;
                var filepath = ImageRes.main.GetImage(strid);
                this.UpdateParticleTexture(particle, position, filepath);
            }

        }));

        // ResManager.LoadParticle(
        //     {
        //         filepath: "Resources/AppCommon/Particle/Merge.part",
        //         success: (p: any, data: any) => {
        //             this.particleMerge = data;
        //             AppSceneUtil.main.rootNode.addChild(this.particleMerge);
        //             this.particleMerge.zOrder = 2;
        //             this.particleMerge.x = pos.x;
        //             this.particleMerge.y = pos.y;
        //             this.particleMerge.play();

        //             Laya.timer.once(600, this, function (): void {
        //                 this.particleMerge.destroy();
        //             });
        //         },
        //         fail: () => {
        //         },
        //     });

    }


    ShowParticle(position: Laya.Vector3, key: string) {


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
                    Debug.Log("GameBaseMerge up keyId=" + this.keyId);
                }
                break;
            case DataTouch.Click:
                {

                }
                break;

        }

        this.UpdateEvent(status, pos);
    }

    UpdateEvent(status, point) {



    }

    // qq和字节 鼠标事件无法响应的时候用ray检测
    ItemClickByRay() {
        var ret = false;
        //记录点击到舞台上的点
        var point = new Laya.Vector2(0, 0);
        point.x = DataTouch.main.touchPosCanvas.x;
        point.y = DataTouch.main.touchPosCanvas.y;

        var ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(1, 1, 1));


        var outHitResult = new Laya.HitResult();
        var ui = null;
        //产生射线
        AppSceneUtil.mainCamera.viewportPointToRay(point, ray);
        //拿到射线碰撞的物体
        AppSceneUtil.mainScene.physicsSimulation.rayCast(ray, outHitResult);
        //如果碰撞到物体
        if (outHitResult.succeeded) {
            //删除碰撞到的物体 
            console.log("ray name =" + outHitResult.collider.owner.name)
            ui = outHitResult.collider.owner.getComponent(UIMergeItem);
            if (ui != null) {
                console.log("ray get something ");
                ret = true;
            }
        } else {
            console.log("ray has nothing ");
        }

        if (!ret) {
            ui = this.GetItemMouseClick(DataTouch.main.touchPosWorld);
            if (ui == null) {
                Debug.Log("ray ui is null touchPosWorld posCanvas.x=" + DataTouch.main.touchPosCanvas.x + " posCanvas.y=" + DataTouch.main.touchPosCanvas.y + " sizeCanvas.width=" + Common.sizeCanvas.width + " sizeCanvas.height=" + Common.sizeCanvas.height + " Laya.Browser.pixelRatio=" + Laya.Browser.pixelRatio);
            }
        }

        if (ui != null) {
            console.log("ray ui.onMouseUp ");
            ui.onMouseUpInternal();
        }
    }

    // 手动计算鼠标点击
    GetItemMouseClick(postouch) {
        for (var i = 0; i < this.listItem.length; i++) {
            var ui = this.listItem[i];
            if(ui.isNew)
            {
                continue;
            }
            var x, y;
            var pt = ui.transform.position;
            x = postouch.x - pt.x;
            y = postouch.y - pt.y;
            var distance = Math.sqrt(x * x + y * y);
            var rItem = ui.GetBoundingBox().width / 2;//this.GetBoundSizeOfGameObject(ui.node).width / 2;

            //bug: qq 区域太小不好点 手动加大,
            rItem = rItem*2;
            Debug.Log("ray GetItemMouseClick pt.x=" + pt.x + " pt.y=" + pt.y + "  postouch.x =" + postouch.x + " postouch.y=" + postouch.y + " rItem=" + rItem + " distance=" + distance);
            if (distance <= rItem) {
                // 在圆内部
                return ui;
            }

        }
        return null;

    }
}



