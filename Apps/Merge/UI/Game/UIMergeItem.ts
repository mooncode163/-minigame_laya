import Common from "../../../../Common/Common";
import Debug from "../../../../Common/Debug";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UITouchEvent from "../../../../Common/UIKit/Event/UITouchEvent";
import UIView from "../../../../Common/UIKit/ViewController/UIView";
import UI from "../../../../Common/UIKit/ViewController/UI";
import Platform from "../../../../Common/Platform";
import GameData, { GameStatus } from "../../Data/GameData";
import { PropType } from "./UIPopProp";
import ItemInfo from "../../../../Common/ItemInfo";
import UISprite from "../../../../Common/UIKit/UIImage/UISprite";
import UITouchEvent3D from "../../../../Common/UIKit/Event/UITouchEvent3D"; 
import GameLevelParse from "../../../Main/GameLevelParse";
import Action3D, { ActionType } from "../../../../Common/Action/Action3D";
import CollisionDetection3D from "./CollisionDetection3D";
import DataTouch from "../../../../Common/UIKit/Event/DataTouch"; 
import CameraUtil from "../../../../Common/Camera/CameraUtil";
import AudioPlay from "../../../../Common/Audio/AudioPlay";
import UIMergeItemInternal from "./UIMergeItemInternal";


export interface IUIMergeItem {

    OnUIMergeItemMergeCloudAnimateDidFinish(ui: any);

}

export default class UIMergeItem extends UIMergeItemInternal {


    public static DURATION_MERGE_CLOUD = 1.0;
    body: Laya.Rigidbody3D;
    delegate: IUIMergeItem;
    uiCloud: UISprite;
    uiRing: UISprite;
    sprite: UISprite = null;
    keyAudio = ""; 
    type = 0;
    t = 0;
    hasGoDownDeadLine = false;
    isAnimating = false;
    angle: number = 0;
    indexInsertTo = 0;

    onAwake() {
        super.onAwake();
        this.t = 0;
        this.sprite = UI.CreateUI3D(UISprite, this, "");
        this.sprite.callbackRenderFinish = this.OnRenderFinish.bind(this);

        this.uiCloud = UI.CreateUI3D(UISprite, this, "");//MergeCloud_0 GameWinBg MergeCloud_0
        this.uiRing = UI.CreateUI3D(UISprite, this, "");

        // this.uiCloud.localScale = new Laya.Vector3(0.25, 0.25, 1);
        // this.uiCloud.color = new Laya.Color(255, 255, 255, 255);

        // var p = new Action3D();
        // p.Run(
        //     {
        //         sp: this.uiCloud,
        //         type: ActionType.Fade,
        //         to: 0,
        //         time: UIMergeItem.DURATION_MERGE_CLOUD,
        //         success: function (p: any) {


        //         }.bind(this),
        //     });
        // this.image = this.Find("Image") as Laya.Image;

        // this.node.zIndex = 100;
        // var manager = director.getCollisionManager();
        // manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // var collider = this.node.getComponent(PhysicsBoxCollider);
        // var ev = this.node.addComponent(UITouchEvent3D);
        // ev.callBackTouch = this.OnUITouchEvent.bind(this);

        this.node.addComponent(CollisionDetection3D);


        // var size = CameraUtil.main.GetWorldSize(this.mainCam);
        // //平面添加物理碰撞体组件
        // var phycol: Laya.PhysicsCollider = this.node.addComponent(Laya.PhysicsCollider);
        // //创建盒子形状碰撞器 
        // var box: Laya.BoxColliderShape = new Laya.BoxColliderShape(size.x, size.y, 1);
        // //物理碰撞体设置形状
        // phycol.colliderShape = box;



        //@moon 有碰撞体的问题销毁时候和UITouchEvent3D会冲突 所以手动处理鼠标事件 mousedown等
        // var ev = this.node.addComponent(UITouchEvent3D);
        // ev.callBackTouch = this.OnUITouchEvent.bind(this);

    }
    onStart() {
        super.onStart();
    }

    onDestroy() {

        // var cd = this.node.getComponent(CollisionDetection3D);
        // if (cd != null) {
        //     cd.destroy();
        // }


        // var ev = this.node.getComponent(UITouchEvent3D);
        // if (ev != null) {
        //     ev.destroy();
        //     // ev.callBackTouch = null;
        // }


        super.onDestroy();


        if (this.body != null) {
            // this.body.colliderShape.destroy();
            // this.body.destroy();
            //@moon:laya bug: 物体销毁之后 碰撞体还残留,this.body.destroy(),会crash, colliderShape设置为null 也会出问题
            var ball: Laya.SphereColliderShape = new Laya.SphereColliderShape(0);//1 
            this.body.colliderShape = ball;
            // this.body.colliderShape = null;
        }
        // this.sprite.node.destroy();
        // this.uiCloud.node.destroy();
        // this.uiRing.node.destroy();
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
        if (this.sprite != null) {
            this.sprite.UpdateImage(pic, "");

        }

        var isCloud = false;
        if (Platform.isCloudRes) {
            isCloud = true;
        }

        this.LayOut();

    }
    LayOut() {
        super.LayOut();

    }
    EnableGravity(isEnable) {
        if (this.node == null) {
            return;
        }
        // var bd = this.node.getComponent(Laya.RigidBody);
        // bd.type = isEnable ? UI.PhysicBodyTypeDynamic : UI.PhysicBodyTypeStatic;
        var body: Laya.Rigidbody3D = this.node.getComponent(Laya.Rigidbody3D);
        if (body != null) {
            body.isKinematic = !isEnable;
        }
    }
 

    OnTweenFinish() {
        if (GameData.main.gameStatus == GameStatus.Prop) {
            if (GameData.main.uiGame.typeProp == PropType.Hammer) {

                GameData.main.game.DeleteItem(this);

            }

            if (GameData.main.uiGame.typeProp == PropType.Bomb) {
                GameData.main.game.DeleteAllItemsOfId(this.keyId);

            }
        }
    }
 
    onMouseDown() {
        if (DataTouch.main.isTouchUI) {
            // DataTouch.main.isTouchUI = false;
            return;
        }
        console.log("UIMergeItem UITouchEvent3D onMouseDown " + this.owner.name);

        this.OnUITouchEvent(null, DataTouch.TOUCH_DOWN, null);
    }
    onMouseDrag() {
        if (DataTouch.main.isTouchUI) {
            // DataTouch.main.isTouchUI = false;
            return;
        }
    }
 
    onMouseUp() {
        this.onMouseUpInternal();
        // GameData.main.game.UpdateEvent(DataTouch.TOUCH_UP, null);
    }
    onMouseUpInternal() {
        // console.log("抬起");
        Debug.Log("UIMergeItem onMouseUp enter");
        if (DataTouch.main.isTouchUI) {
            // DataTouch.main.isTouchUI = false;
            // return;
        }
        Debug.Log("UIMergeItem UITouchEvent3D onMouseUp " + this.owner.name);


        this.OnUITouchEvent(null, DataTouch.TOUCH_UP, null);
    }
    

    OnUITouchEvent(ui: UITouchEvent3D, status: number, event?: any) {

        Debug.Log("UIMergeItem OnUITouchEvent status=" + status);
        // var pos = ui.GetPosition(event);
        // var posnodeAR = ui.GetPositionOnNode(this.node,event);//坐标原点在node的锚点
        // var posui = ui.GetUIPosition(event);


        var duration = 0.5;
        // var uiTrans = GameMerge.main.node.getComponent(UITransform);
        // var toPos = uiTrans.convertToNodeSpaceAR(new Vec3(posui.x, posui.y, 0)); 
        // var toPos =ui.GetPositionOnNode(GameMerge.main.node,event);
        var pos = DataTouch.main.touchPosWorld;
        switch (status) {
            case DataTouch.TOUCH_DOWN:
                // this.OnTouchDown(pos);
                break;

            case DataTouch.TOUCH_MOVE:
                // this.OnTouchMove(pos);
                break;

            case DataTouch.TOUCH_UP:
                // this.OnTouchUp(pos);
                {
                    if (GameData.main.gameStatus == GameStatus.Prop) {
                        if (GameData.main.uiGame.typeProp == PropType.Hammer) {


                            var p = new Action3D();
                            p.Run(
                                {
                                    ui: GameData.main.game.uiProp,
                                    type: ActionType.Move,
                                    to: this.transform.localPosition,
                                    easeFun: Laya.Ease.sineInOut,
                                    time: duration,
                                    success: function (p: any) {
                                        GameData.main.game.DeleteItem(this);

                                    }.bind(this),
                                });
                            // tween(imageProp.node)
                            //     .to(duration / 2, { position: toPos })
                            //     .call(() => {
                            //         GameMerge.main.DeleteItem(this);
                            //     })
                            //     .onStart()
                        }

                        if (GameData.main.uiGame.typeProp == PropType.Bomb) {

                            // tween(imageProp.node)
                            //     .to(duration / 2, { position: toPos })
                            //     .call(() => {
                            //         GameMerge.main.DeleteAllItemsOfId(this.id);
                            //     })
                            //     .onStart() 
                            var p = new Action3D();
                            p.Run(
                                {
                                    ui: GameData.main.game.uiProp,
                                    type: ActionType.Move,
                                    to: this.transform.localPosition,
                                    easeFun: Laya.Ease.sineInOut,
                                    time: duration,
                                    success: function (p: any) {
                                        GameData.main.game.DeleteAllItemsOfId(this.keyId);

                                    }.bind(this),
                                });
                        }
                        return;
                    }

                }
                break;
        }


        GameData.main.game.UpdateEvent(status, pos);
    }


    OnMergeAnimateDidFinish() {
        this.uiCloud.visible = false;
        this.uiRing.visible = false;

        var time = 0.01;
        // uiCloud.objSp.GetComponent<Renderer>().material.DOFade(1, time);
        // uiRing.objSp.GetComponent<Renderer>().material.DOFade(1, time);
        Debug.Log("IsHaveMergeItem OnMergeAnimateDidFinish");
        if (this.delegate != null) {
            this.delegate.OnUIMergeItemMergeCloudAnimateDidFinish(this);
        }
    }


    // delay:second
    RunMergeCloudAnimate(delay = 0) {
        // return ;
        if (delay == 0) {
            this.RunMergeCloudAnimateInternal();
        }
        else {
            Laya.timer.once(delay * 1000, this, function (): void {
                this.RunMergeCloudAnimateInternal();
            });
        }
    }
    RunMergeCloudAnimateInternal() {

        this.uiCloud.visible = true;
        this.uiRing.visible = true;
        // this.uiCloud.position = new Laya.Vector3(this.sprite.position.x, this.sprite.position.y, this.sprite.position.z);
        // this.uiRing.position = this.sprite.position;

        // Debug.Log("UIMergeItem position.x=" + this.sprite.position.x + " position.y=" + this.sprite.position.y);
        {
            var key = "MergeCloud" + "_" + GameLevelParse.main.GetIndexById(this.keyId).toString();
            this.uiCloud.UpdateImageByKey(key);
            var w = this.uiCloud.GetContentSize().width;
            // Debug.Log("uiCloud scale=" + scale + " w=" + w + " dispw=" + this.sprite.GetBoundSize().width);
            if (w != 0) {

                var w_sp = this.sprite.GetContentSize().width;
                var scale = (this.sprite.GetBoundSize().width / w) * 2;
                Debug.Log("uiCloud scale 2=" + scale + " w=" + w + " dispw=" + this.sprite.GetBoundSize().width + " w_sp=" + w_sp);
                this.uiCloud.transform.localScale = new Laya.Vector3(scale, scale, 1);
            }

            var p = new Action3D();
            p.Run(
                {
                    ui: this.uiCloud,
                    type: ActionType.Fade,
                    to: 0,
                    time: UIMergeItem.DURATION_MERGE_CLOUD,
                    success: function (p: any) {


                    }.bind(this),
                });

        }



        {
            var key = "Ring" + "_" + GameLevelParse.main.GetIndexById(this.keyId).toString();
            this.uiRing.UpdateImageByKey(key);
            var w = this.uiRing.GetContentSize().width;
            var scaleStart = 1;
            var scaleEnd = 1;
            if (w != 0) {
                var scale = (this.sprite.GetBoundSize().width / w) * 1.5;
                scaleStart = scale;
                scaleEnd = scaleStart * 2;
                Debug.Log("uiRing scale=" + scale + " w=" + w + " dispw=" + this.sprite.GetBoundSize().width + " key=" + key);
                this.uiRing.transform.localScale = new Laya.Vector3(scale, scale, 1);
            }

            // Fade
            {
                var p = new Action3D();
                p.Run(
                    {
                        ui: this.uiRing,
                        type: ActionType.Fade,
                        to: 0,
                        time: UIMergeItem.DURATION_MERGE_CLOUD,
                        success: function (p: any) {


                        }.bind(this),
                    });

            }

            // scale
            {
                var p = new Action3D();
                p.Run(
                    {
                        ui: this.uiRing,
                        type: ActionType.Scale,
                        to: new Laya.Vector3(scaleEnd, scaleEnd, 1),
                        time: UIMergeItem.DURATION_MERGE_CLOUD,
                        success: function (p: any) {
                            this.OnMergeAnimateDidFinish();

                        }.bind(this),
                    });
            }

        }

        Laya.timer.once(UIMergeItem.DURATION_MERGE_CLOUD * 1.01, this, function (): void {
            // 有可能动画结束没有回调 
            this.OnMergeAnimateDidFinish();
        }.bind(this));
        // AudioPlay.main.PlayByKey(keyAudio);

        AudioPlay.main.PlayByKey(this.keyAudio);
    }

    UpdateItem(info: ItemInfo) {
        // Init();
        // var pic = GameLevelParse.main.GetImagePath(info.id);
        this.sprite.UpdateImageByKey(info.id);

        // return;
        // 平面添加物理碰撞体组件
        var phycol: Laya.PhysicsCollider = this.node.getComponent(Laya.PhysicsCollider);
        if (phycol == null) {
            phycol = this.node.addComponent(Laya.PhysicsCollider);
            //创建盒子形状碰撞器 
            var box: Laya.BoxColliderShape = new Laya.BoxColliderShape(5.12, 5.12, 1);
            //物理碰撞体设置形状
            phycol.colliderShape = box;

        }


    }

    UpdateItemImage(key: string,w,h) {
        // this.sprite.contentSize = new Laya.Size(w,h);
        this.sprite.UpdateImageByKey(key);
    }


    UpdateItemPhysic(key: string,scale:number) {
        if (this.body == null) {
            this.body = this.node.addComponent(Laya.Rigidbody3D);
            // default (0,-10,0)
            Debug.Log(" default gravity.x ="+   this.body.gravity.x+" gravity.y ="+this.body.gravity.y+   " this.body.gravity.z="+   this.body.gravity.z );
            this.body.gravity = new Laya.Vector3(0,-20,0);

            // 每个轴的线性运动缩放因子,如果某一轴的值为0表示冻结在该轴的线性运动。
            // 冻结旋转
            this.body.linearFactor = new Laya.Vector3(1, 1, 0);
            this.body.angularFactor = new Laya.Vector3(0, 0, 0);
            // //物理碰撞体设置摩擦力
            // this.body.friction = 0;
            // //物理碰撞体设置弹力
            // this.body.restitution = 0.3;

            // var body: Laya.RigidBody = this.node.addComponent(Laya.RigidBody);
            // // // Laya.PhysicsCollider 相当于 unity 的静态刚体 Laya.Rigidbody3D 相当于unity的动态刚体

            var radius = this.GetContentSize().width / 2;
            Debug.Log("UIMergeItem 3d radius="+radius);
            radius = 2.56;
            // radius = 2.56*scale;
            var ball: Laya.SphereColliderShape = new Laya.SphereColliderShape(radius);//1
            // ball.radius = 5.12;
            // // // 
            // var box: Laya.BoxColliderShape = new Laya.BoxColliderShape(5.12, 5.12, 1);//1
            // var circle:Laya.CircleCollider =  this.node.addComponent(Laya.CircleCollider);
            // circle.radius = 5.12;
            // //物理碰撞体设置形状
            this.body.colliderShape = ball;

            // var ev = this.node.addComponent(UITouchEvent3D);
            // ev.callBackTouch = this.OnUITouchEvent.bind(this);
        }



    }


    OnRenderFinish() {
        Debug.Log("callbackRenderFinish OnRenderFinish");
        if (this.callbackRenderFinish != null) {
            this.callbackRenderFinish();
        }
    }

}


