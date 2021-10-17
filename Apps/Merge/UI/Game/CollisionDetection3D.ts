
import AudioPlay from "../../../../Common/Audio/AudioPlay";
import Common from "../../../../Common/Common";
import Debug from "../../../../Common/Debug";
import UI from "../../../../Common/UIKit/ViewController/UI";
import UIView from "../../../../Common/UIKit/ViewController/UIView";
import UIView3D from "../../../../Common/UIKit/ViewController/UIView3D";
import GameData from "../../Data/GameData";
import UIMergeItemInternal from "./UIMergeItemInternal";



export default class CollisionDetection3D extends Laya.Script3D {

    isItDetected = true;//定义是否进行碰撞检测后逻辑判断
    playFallingSound = false;//定义是否播放过下落声音 

    isNewItem = false;
    otherCollider = null;
    keyNext = "";

    onAwake() {
        this.isItDetected = true;
        super.onAwake();

        // 还需要body勾选回调接口
        // let collider = this.getComponent(Collider2D);
        // if (collider) {
        //     collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        //     collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        //     collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
        //     collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        // }



    }
    onStart() {
        super.onStart();
    }

    CreateNewItem() {
        // return;
        var keynext = this.keyNext;
        var sp: Laya.Sprite3D = this.otherCollider.owner as Laya.Sprite3D;
        var v2 = sp.transform.localPosition;//UI.GetPosition(other.owner);//保存被碰撞物体的位置
        var _tag = this.otherCollider.owner.name;
        var uiNext = GameData.main.game.CreateItem(keynext);
        uiNext.RunMergeCloudAnimate();
        // UI.SetPosition(uiNext.node, v2);
        uiNext.transform.localPosition = v2;
        uiNext.EnableGravity(true);
        uiNext.hasGoDownDeadLine = true;
        GameData.main.game.ShowMergeParticle(v2, _tag);
        sp = this.owner as Laya.Sprite3D;
        v2 = sp.transform.localPosition;
        GameData.main.game.ShowMergeParticle(v2, _tag);
        //播放合成声音 
        // AudioPlay.main.PlayFile(AppRes.AUDIO_Merge);
        // AudioPlay.main.PlayByKey("Merge");
        AudioPlay.main.PlayByKey("MergeTwoItem");
        //增加分数
        // return;
        var addScore = 10 * GameData.main.game.GetIndexOfItem(keynext);
        GameData.main.score += addScore;
        GameData.main.addScore = addScore;
        GameData.main.fromPosScoreWorld = uiNext.transform.position;

        GameData.main.uiGame.UpdateScore();

          
        GameData.main.game.RemoveItemFromList(this.owner);
        GameData.main.game.RemoveItemFromList(this.otherCollider.owner);


        Debug.Log("OnCollisionEnter2D destroy ");

        // this.owner.destroy();
        // this.otherCollider.owner.destroy();

        // return;

        if (keynext == GameData.main.game.GetLastItem()) {
            //game win 合成了大西瓜
            GameData.main.game.OnGameFinish(false);
        }


    }

    public updateCulling() {
    }

    CheckCollision(other) {
        // var uiNext = GameData.main.game.CreateItem("putao");
        // return;

        var _tag = other.owner.name;//获取被碰撞物体的Tag 

        //播放下落声音
        if (other.owner.name == GameData.NameDeadLine && this.playFallingSound == false) {
            //播放下落声音
            this.playFallingSound = true;
            // AudioPlay.main.PlayFile(AppRes.AUDIO_Down);
            AudioPlay.main.PlayByKey("Down");
        }
        if (other.owner.name != this.owner.name) {
            // Debug.Log("OnCollisionEnter2D other.node.name != this.node.name"+_tag);
            return;
        }


        // 在出生地方不检测
        var enable = false;
        var limity = 10;
        // var stepy = 0;
        // stepy = Math.abs((this.owner as Laya.Sprite).y - GameData.main.game.posYInit);
        // if (stepy < limity) {
        //     Debug.Log("OnCollisionEnter2D stepy 1=" + stepy);
        //     return;
        // }
        // stepy = Math.abs(other.node.position.y - GameData.main.game.posYInit);
        // if (stepy < limity) {
        //     Debug.Log("OnCollisionEnter2D stepy 2=" + stepy);
        //     return;
        // }



        // 检测是否产生新的
        var otherDetect = other.owner.getComponent(CollisionDetection3D).HasTheDeliveryBeenDetected();


        Debug.Log("OnCollisionEnter2D otherDetect=" + otherDetect);
        if (this.isItDetected == true && otherDetect) //判断碰撞物体的tag是否与自身一致和是否应该检测
        {
            this.isItDetected = false;//不进行检测
            other.owner.getComponent(CollisionDetection3D).IgnoreDetection();//停止对方检测

            //   _tag = other.transform.tag;//获取被碰撞物体的Tag
            Debug.Log("OnCollisionEnter2D other=" + _tag);
            //判断是否超出最大水果限制
            // if (Convert.ToInt32(_tag) < Generate.imageKeyFruit.Length)
            var keynext = GameData.main.game.GetNextItem(_tag);

            if (Common.BlankString(keynext)) {
                Debug.Log("OnCollisionEnter2D keynext blank");
                return;
            }
            {
                // Debug.Log("OnCollisionEnter2D keynext=" + keynext + " this.name=" + this.owner.name + " other.name=" + other.node.name + " this.position=" + this.owner.position + " other.position=" + other.node.position);

                this.keyNext = keynext;
                this.otherCollider = other;
                // 创建新的物体需要在主线程里执行
                // this.scheduleOnce(this.CreateNewItem.bind(this));  
                // Laya.timer.once(0, this, this.CreateNewItem);
                this.CreateNewItem();
            }
        }


    }

    /// <summary>
    /// 用来忽略检测
    /// </summary>
    IgnoreDetection()//用于忽略检测
    {
        this.isItDetected = false;//不进行检测
    }

    HasTheDeliveryBeenDetected() {
        return this.isItDetected;
    }




    public onTriggerEnter(other: Laya.PhysicsComponent): void {
        Debug.Log("CollisionDetection3D onTriggerEnter");

        // (((this.owner as Laya.MeshSprite3D).meshRenderer as Laya.MeshRenderer).sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(0.0, 1.0, 0.0, 1.0);
    }

    public onTriggerStay(other: Laya.PhysicsComponent): void {
        // Debug.Log("CollisionDetection3D onTriggerStay");
    }

    public onTriggerExit(other: Laya.PhysicsComponent): void {
        Debug.Log("CollisionDetection3D onTriggerExit");
        // (((this.owner as Laya.MeshSprite3D).meshRenderer as Laya.MeshRenderer).sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(1.0, 1.0, 1.0, 1.0);
    }

    public onCollisionEnter(collision: Laya.Collision): void {
        // Debug.Log("CollisionDetection3D onCollisionEnter"); 
        if (collision.other.owner != null) {
            {
                // 过滤和顶部新生成的碰撞
                var ui1 = this.owner.getComponent(UIMergeItemInternal);
                var ui2 = collision.other.owner.getComponent(UIMergeItemInternal);
    
                if (ui1 != null && ui1.isNew) {
                    Debug.Log("ui1  isNew is ture name="+ui1.name);
                    return;
                }
                if (ui2 != null && ui2.isNew) {
                    Debug.Log("ui2  isNew is ture name="+ui2.name);
                    return;
                    // return;
                }
    
            }
            console.log("CollisionDetection 开始触发", collision.other.owner.name);
            this.CheckCollision(collision.other);
        }
        // if (collision.other.owner === this.kinematicSprite)
        // 	(((this.owner as Laya.MeshSprite3D).meshRenderer as Laya.MeshRenderer).sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(0.0, 0.0, 0.0, 1.0);
    }

    public onCollisionStay(collision: Laya.Collision): void {
        // Debug.Log("CollisionDetection3D onCollisionStay");
    }

    public onCollisionExit(collision: Laya.Collision): void {
        // Debug.Log("CollisionDetection3D onCollisionExit");
    }

}


