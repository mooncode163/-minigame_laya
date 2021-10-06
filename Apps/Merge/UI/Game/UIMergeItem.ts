import Common from "../../../../Common/Common";
import Debug from "../../../../Common/Debug";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UITouchEvent from "../../../../Common/UIKit/Event/UITouchEvent";
import UIView from "../../../../Common/UIKit/ViewController/UIView";
import UI from "../../../../Common/UIKit/ViewController/UI";
import Platform from "../../../../Common/Platform";
import CollisionDetection from "./CollisionDetection";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind";
import GameData, { GameStatus } from "../../Data/GameData";
import { PropType } from "./UIPopProp";
import ItemInfo from "../../../../Common/ItemInfo";
import UISprite from "../../../../Common/UIKit/UIImage/UISprite";
import UITouchEvent3D from "../../../../Common/UIKit/Event/UITouchEvent3D";
import UIView3D from "../../../../Common/UIKit/ViewController/UIView3D";
import GameLevelParse from "../../../Main/GameLevelParse";
import Action3D, { ActionType } from "../../../../Common/Action/Action3D";


export interface IUIMergeItem {

    OnUIMergeItemMergeCloudAnimateDidFinish(ui: any);

}

export default class UIMergeItem extends UIView3D {


    public static DURATION_MERGE_CLOUD = 1.0;

    delegate: IUIMergeItem;
    uiCloud: UISprite;
    uiRing: UISprite;
    sprite: UISprite = null;
    keyAudio = "";
    isNew = false;
    type = 0;
    t = 0;
    hasGoDownDeadLine = false;
    isAnimating = false;
    angle: number = 0;

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
        var ev = this.owner.addComponent(UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);

        this.node.addComponent(CollisionDetection);



    }
    onStart() {
        super.onStart();
    }

    onDestroy() {
        this.sprite.destroy();
        this.uiCloud.destroy();
        this.uiRing.destroy();
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
        var bd = this.node.getComponent(Laya.RigidBody);
        bd.type = isEnable ? UI.PhysicBodyTypeDynamic : UI.PhysicBodyTypeStatic;
    }


    onMouseUp() {
        var imageProp = GameData.main.game.imageProp;
        var duration = 0.5;
        var toPos = UI.GetNodePosition(this.node);
        if (GameData.main.status == GameStatus.Prop) {
            if (GameData.main.uiGame.typeProp == PropType.Hammer) {
                Laya.Tween.to(imageProp.node, { x: toPos.x, y: toPos.y }, duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.OnTweenFinish));
            }

            if (GameData.main.uiGame.typeProp == PropType.Bomb) {
                Laya.Tween.to(imageProp.node, { x: toPos.x, y: toPos.y }, duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.OnTweenFinish));
            }
        }

    }

    OnTweenFinish() {
        if (GameData.main.status == GameStatus.Prop) {
            if (GameData.main.uiGame.typeProp == PropType.Hammer) {

                GameData.main.game.DeleteItem(this);

            }

            if (GameData.main.uiGame.typeProp == PropType.Bomb) {
                GameData.main.game.DeleteAllItemsOfId(this.keyId);

            }
        }
    }

    OnUITouchEvent(ui: UITouchEvent3D, status: number, event?: any) {

        // var pos = ui.GetPosition(event);
        // var posnodeAR = ui.GetPositionOnNode(this.node,event);//坐标原点在node的锚点
        // var posui = ui.GetUIPosition(event);



        // // var uiTrans = GameMerge.main.node.getComponent(UITransform);
        // // var toPos = uiTrans.convertToNodeSpaceAR(new Vec3(posui.x, posui.y, 0)); 
        // var toPos =ui.GetPositionOnNode(GameMerge.main.node,event);
        // switch (status) {
        //     case DataTouch.TOUCH_DOWN:
        //         this.OnTouchDown(posnodeAR);
        //         break;

        //     case DataTouch.TOUCH_MOVE:
        //         this.OnTouchMove(posnodeAR);
        //         break;

        //     case DataTouch.TOUCH_UP:
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


    OnMergeAnimateDidFinish() {
        this.uiCloud.visible = false;
        this.uiRing.visible = false;

        var time = 0.01;
        // uiCloud.objSp.GetComponent<Renderer>().material.DOFade(1, time);
        // uiRing.objSp.GetComponent<Renderer>().material.DOFade(1, time);

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
        this.uiCloud.position = new Laya.Vector3(this.sprite.position.x, this.sprite.position.y, this.sprite.position.z);
        this.uiRing.position = this.sprite.position;

        Debug.Log("UIMergeItem position.x=" + this.sprite.position.x + " position.y=" + this.sprite.position.y);
        {
            var key = "MergeCloud" + "_" + GameLevelParse.main.GetIndexById(this.keyId).toString();
            this.uiCloud.UpdateImageByKey(key);
            var w = this.uiCloud.GetContentSize().width;
            // Debug.Log("uiCloud scale=" + scale + " w=" + w + " dispw=" + this.sprite.GetBoundSize().width);
            if (w != 0) {

                var w_sp = this.sprite.GetContentSize().width;
                var scale = (this.sprite.GetBoundSize().width / w) * 2;
                Debug.Log("uiCloud scale 2=" + scale + " w=" + w + " dispw=" + this.sprite.GetBoundSize().width + " w_sp=" + w_sp + " sp_scale=" + this.sprite.localScale.x);
                this.uiCloud.localScale = new Laya.Vector3(scale, scale, 1);
            }

            var p = new Action3D();
            p.Run(
                {
                    sp: this.uiCloud,
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
                this.uiRing.localScale = new Laya.Vector3(scale, scale, 1);
            }

            // Fade
            {
                var p = new Action3D();
                p.Run(
                    {
                        sp: this.uiRing,
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
                        sp: this.uiRing,
                        type: ActionType.Scale,
                        to: new Laya.Vector3(scaleEnd, scaleEnd, 1),
                        time: UIMergeItem.DURATION_MERGE_CLOUD,
                        success: function (p: any) {
                            this.OnMergeAnimateDidFinish();

                        }.bind(this),
                    });
            }

        }

        // AudioPlay.main.PlayByKey(keyAudio);
    }

    UpdateItem(info: ItemInfo) {
        // Init();
        // var pic = GameLevelParse.main.GetImagePath(info.id);
        this.sprite.UpdateImageByKey(info.id);


        //平面添加物理碰撞体组件
        var phycol: Laya.PhysicsCollider = this.sprite.sprite3D.addComponent(Laya.PhysicsCollider);
        //创建盒子形状碰撞器

        // 
        var box: Laya.BoxColliderShape = new Laya.BoxColliderShape(5.12, 5.12, 1);
        //物理碰撞体设置形状
        phycol.colliderShape = box;
        var ev = this.sprite.sprite3D.addComponent(UITouchEvent3D);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);

    }

    OnRenderFinish() {
        Debug.Log("callbackRenderFinish OnRenderFinish");
        if (this.callbackRenderFinish != null) {
            this.callbackRenderFinish();
        }
    }

}


