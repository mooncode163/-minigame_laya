import Common from "../../../../Common/Common";
import Debug from "../../../../Common/Debug";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UITouchEvent from "../../../../Common/UIKit/UITouchEvent";
import UIView from "../../../../Common/UIKit/ViewController/UIView";
import UI from "../../../../Common/UIKit/ViewController/UI"; 
import TextureUtil from "../../../../Common/Image/TextureUtil";
import Platform from "../../../../Common/Platform";
import TextureCache from "../../../../Common/Cache/TextureCache";
import AppSceneUtil from "../../../../AppBase/Common/AppSceneUtil"; 
import CollisionDetection from "./CollisionDetection";
 


export default class UIMergeItem extends UIView {
    image: Laya.Image;
    imageItem: UIImage = null;
    isNew = false;
    type = 0;
    t = 0;
    hasGoDownDeadLine = false;

    onAwake() {
        super.onAwake();
        this.t = 0;


        var nodetmp = this.FindChild("ImgeItem");
        if (nodetmp != null) {
            this.imageItem = nodetmp.getComponent(UIImage);
        }
        // this.image = this.FindChild("Image") as Laya.Image;

        // this.node.zIndex = 100;
        // var manager = director.getCollisionManager();
        // manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // var collider = this.node.getComponent(PhysicsBoxCollider);
        var ev = this.owner.addComponent(UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);

        var image = new Laya.Image();
        this.image = image;
        image.width = 256;
        image.height = 256;
       
        UI.SetNodePivotCenter(image);
        var sizeparent = UI.GetNodeContentSize(this.node.parent);
        // image.x = sizeparent.width/2-image.width/2;
        // var filepath = "comp/image.png";
        // image.skin = filepath
        var cl = image.addComponent(Laya.CircleCollider);
        cl.radius = image.width / 2;
        var bd = image.addComponent(Laya.RigidBody);

        // laya 物理引擎bug  刚体只能显示全屏的对象上 不然 碰撞体和对象会发生错位的现象
        AppSceneUtil.main.rootNode.addChild(image);

        image.addComponent(CollisionDetection);

    }
    onStart() {
        super.onStart();
    }

    onDestroy()
    {
        if(this.image!=null)
        {
            this.image.destroy();
        }
    }

    onUpdate() {
        if (!this.isNew) {
            // 游戏失败判断  onCollisionEnter 碰撞检测失效 直接判断位置
            this.IsCollisionDeadLine();
            // this.t += director.getDeltaTime();
            // if (this.t > 2.0) {
            // this.t = 0;
            // var pos = GameMerge.main.nodeDeadline.getPosition();
            // var y_top = this.node.getPosition().y + this.node.getBoundingBox().height / 2;
            // if (y_top >= pos.y) {
            //     Debug.Log("UIMergeItem this.hasGoDownDeadLine="+this.hasGoDownDeadLine);
            //     if (this.hasGoDownDeadLine) {
            //         if (!GameData.main.isGameFail) {

            //             GameData.main.isGameFail = true;
            //             Debug.Log("UIMergeItem game over");
            //             UIGameMerge.main.OnGameFinish(true);
            //         }
            //     }

            // } else {
            //     this.hasGoDownDeadLine = true;
            // }


            // }

        }
    }

    // 碰撞线检测
    IsCollisionDeadLine() {
        // var pos =UI.GetPosition(GameMerge.main.nodeDeadline);
        // var posMy =UI.GetPosition(this.owner);
        // var y1 = posMy.y + this.GetBoundingBox().height / 2;
        // var y2 = posMy.y - this.GetBoundingBox().height / 2;
        // if ((pos.y > y2) && (pos.y < y1)) {
        //     this.t += Common.GetCurrentTime();
        //     if (this.t > 2.0) {
        //         this.t = 0;
        //         if (!GameData.main.isGameFail) {
        //             GameData.main.isGameFail = true;
        //             Debug.Log("UIMergeItem game over");
        //             UIGameMerge.main.OnGameFinish(true);
        //         }
        //     }

        //     return true;
        // }
        return false;
    }

    UpdateImage(pic) {
        if (this.imageItem != null) {
            this.imageItem.UpdateImage(pic, "");
        }

        var isCloud = false;
        if (Platform.isCloudRes) {
            isCloud = true;
        }





        TextureCache.main.Load(
            {
                filepath: pic,
                isCloud: isCloud,
                success: (p: any, tex: Laya.Texture) => {
                    TextureUtil.UpdateImageTexture(this.image, tex, false, Laya.Vector4.ZERO);
                    // this.image.x = 128;// this.x;
                    // this.image.x = this.x;
                    this.LayOut();
                },
                fail: (p: any) => {

                },
            });

            this.LayOut();
 
    }
    LayOut() {
        super.LayOut();
        if(this.image!=null)
        {
            this.image.x = this.x;
            this.image.y = this.y;
        }
    }
    EnableGravity(isEnable) {
        // var bd = this.node.getComponent(RigidBody2D);
        // bd.type = isEnable ? ERigidBody2DType.Dynamic : ERigidBody2DType.Static;
        if(this.image!=null)
        {
            var bd = this.image.getComponent(Laya.RigidBody);
            bd.type=isEnable ? "dynamic" : "static";
            // Laya.RigidBody
        }
    }

    OnTouchDown(pos) {
    }
    OnTouchMove(pos) {
    }
    OnTouchUp(pos) {



    }
    OnUITouchEvent(ui: UITouchEvent, status: number, event?: any) {

        // var pos = ui.GetPosition(event);
        // var posnodeAR = ui.GetPositionOnNode(this.node,event);//坐标原点在node的锚点
        // var posui = ui.GetUIPosition(event);

        // var imageProp = UIGameMerge.main.game.imageProp;
        // var duration = 0.5; 

        // // var uiTrans = GameMerge.main.node.getComponent(UITransform);
        // // var toPos = uiTrans.convertToNodeSpaceAR(new Vec3(posui.x, posui.y, 0)); 
        // var toPos =ui.GetPositionOnNode(GameMerge.main.node,event);
        // switch (status) {
        //     case UITouchEvent.TOUCH_DOWN:
        //         this.OnTouchDown(posnodeAR);
        //         break;

        //     case UITouchEvent.TOUCH_MOVE:
        //         this.OnTouchMove(posnodeAR);
        //         break;

        //     case UITouchEvent.TOUCH_UP:
        //         this.OnTouchUp(posnodeAR);
        //         {
        //             if (GameData.main.status == GameStatus.Prop) {
        //                 if (UIGameMerge.main.typeProp == PropType.Hammer) {
        //                     tween(imageProp.node)
        //                         .to(duration / 2, { position: toPos })
        //                         .call(() => {
        //                             GameMerge.main.DeleteItem(this);
        //                         })
        //                         .onStart()
        //                 }

        //                 if (UIGameMerge.main.typeProp == PropType.Bomb) {

        //                     tween(imageProp.node)
        //                         .to(duration / 2, { position: toPos })
        //                         .call(() => {
        //                             GameMerge.main.DeleteAllItemsOfId(this.id);
        //                         })
        //                         .onStart() 

        //                 }
        //             }

        //         }
        //         break;
        // }
    }

}

  
