import Common from "../../../../Common/Common";
import Timer from "../../../../Common/Core/Timer";
import Debug from "../../../../Common/Debug";
import UIView from "../../../../Common/UIKit/ViewController/UIView";
import UIView3D from "../../../../Common/UIKit/ViewController/UIView3D";
import GameData from "../../Data/GameData";
import UIMergeItem from "./UIMergeItem";


export default class UIDeadLine extends UIView3D {
    timeFailMax = 2.0;//seconde
    t = 0;
    isGameFail = false;
    isEnterTrigger = false;
    count = 0;//碰撞个数
    maxCount = 2;
    maxTime = 4.0;
    onAwake() {
        super.onAwake();
        this.node.name = GameData.NameDeadLine;
        this.t = 0;
        this.count = 0;
        this.isGameFail = false;

    }
    onStart() {
        super.onStart();
    }

   
 

    public onTriggerEnter(other: Laya.PhysicsComponent): void {
        Debug.Log("UIDeadLine onTriggerEnter");

        this.t = 0;
        this.count = 0;

        // if (other.owner != null) {
        //     console.log("UIDeadLine CollisionDetection 开始触发", other.owner.name);
        //     if (!this.isEnterTrigger) {
             
        //         this.isEnterTrigger = true;
        //     }
        // }
        // (((this.owner as Laya.MeshSprite3D).meshRenderer as Laya.MeshRenderer).sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(0.0, 1.0, 0.0, 1.0);
    }

    public onTriggerStay(other: Laya.PhysicsComponent): void {
        // Debug.Log("UIDeadLine onTriggerStay");

        this.t += Timer.deltaSecond;
        if (other != null) {
            return;
        }
        if (other.owner != null) {
            return;
        }

        console.log("UIDeadLine onTriggerStay 持续触发", other.owner.name + " t=" + this.t);
        if (other.owner.name != GameData.NameDeadLine) {
            Debug.Log("UIDeadLine  enter other.name=" + other.owner.name);

            var ui = other.owner.getComponent(UIMergeItem);
            if (ui != null) {
                if (ui.isNew) {
                    this.t = 0;
                    Debug.Log("UIDeadLine isNew this.t=" + this.t);
                    // return;
                }

                if (this.t >= this.maxTime)
                {
                    // GameObject.Find("CodeControl").GetComponent<ScoreControl>().SaveScore();//保存分数
                    // SceneManager.LoadScene("Over");//切换场景
                    this.t = 0;
                    if (!this.isGameFail)
                    {
                        this.isGameFail = true;
                        GameData.main.uiGame.OnGameFinish(true);
                    }
                }

                this.count++;
                Debug.Log("UIDeadLine  this.t=" + this.t + " this.count=" + this.count);
                
            }
        }
 
    }

    public onTriggerExit(other: Laya.PhysicsComponent): void {
        Debug.Log("UIDeadLine onTriggerExit");
        if (other.owner != null) {
            console.log("UIDeadLine onTriggerExit 结束触发", other.owner.name);
        }

        if (other.owner.name != GameData.NameBoardLine)
        {
            this.t = 0;
            Debug.Log("UIDeadLine OnTriggerStay2D exit t=" + this.t + " name=" + other.owner.name);
        }

        // (((this.owner as Laya.MeshSprite3D).meshRenderer as Laya.MeshRenderer).sharedMaterial as Laya.BlinnPhongMaterial).albedoColor = new Laya.Vector4(1.0, 1.0, 1.0, 1.0);
    }

    public onCollisionEnter(collision: Laya.Collision): void {
        Debug.Log("UIDeadLine onCollisionEnter");
        
    }

    public onCollisionStay(collision: Laya.Collision): void {
        // Debug.Log("UIDeadLine onCollisionStay");
    }

    public onCollisionExit(collision: Laya.Collision): void {
        Debug.Log("UIDeadLine onCollisionExit");
    }


}


