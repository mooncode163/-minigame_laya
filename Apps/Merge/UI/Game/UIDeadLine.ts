import Common from "../../../../Common/Common";
import Timer from "../../../../Common/Core/Timer";
import Debug from "../../../../Common/Debug";
import UIView from "../../../../Common/UIKit/ViewController/UIView";
import GameData from "../../Data/GameData";
import UIMergeItem from "./UIMergeItem";


export default class UIDeadLine extends UIView {
    timeFailMax = 2.0;//seconde
    t = 0;
    isGameFail = false;
    isEnterTrigger = false;
    count = 0;//碰撞个数
    maxCount = 2;
    onAwake() {
        super.onAwake();
        this.owner.name = GameData.NameDeadLine;
        this.t = 0;
        this.count = 0;
        this.isGameFail = false;

    }
    onStart() {
        super.onStart();
    }


    onTriggerEnter(other) {
        if (other.owner != null) {
            console.log("CollisionDetection 开始触发", other.owner.name);
            if (!this.isEnterTrigger) {
                this.t = 0;
                this.count = 0;
                this.isEnterTrigger = true;
            }
        }
    }


    onTriggerStay(other) {
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
                    // this.t = 0;
                    Debug.Log("UIDeadLine isNew this.t=" + this.t);
                    return;
                }
                this.count++;
                Debug.Log("UIDeadLine  this.t=" + this.t + " this.count=" + this.count);
                // if (this.t >= this.timeFailMax)
                if (this.count >= this.maxCount) {
                    // GameObject.Find("CodeControl").GetComponent<ScoreControl>().SaveScore();//保存分数
                    // SceneManager.LoadScene("Over");//切换场景
                    this.t = 0;
                    this.count = 0;
                    this.isEnterTrigger = false;
                    Debug.Log("UIDeadLine  GameFail other.name=" + other.owner.name);
                    if (!this.isGameFail) {
                        this.isGameFail = true;
                        GameData.main.uiGame.OnGameFinish(true);
                    }
                }
            }
        }
    }

    onTriggerExit(other) {
        if (other.owner != null) {
            console.log("UIDeadLine onTriggerExit 结束触发", other.owner.name);
        }

    }

    // 只在两个碰撞体开始接触时被调用一次
    // onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // will be called once when two colliders begin to contact
    //     Debug.Log('UIDeadLine OnCollisionEnter2D on collision enter onBeginContact otherCollider.name=' + otherCollider.node.name + " this.name=" + this.node.name);
    //     this.t = 0;
    // }

    // // 只在两个碰撞体结束接触时被调用一次
    // onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // will be called once when the contact between two colliders just about to end.
    //     // Debug.Log('onEndContact');
    // }

    // // 每次将要处理碰撞体接触逻辑时被调用
    // onPreSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // will be called every time collider contact should be resolved
    //     this.t += director.getDeltaTime();
    //     if (otherCollider.node.name != GameData.NameDeadLine) {
    //         Debug.Log("UIDeadLine onPreSolve enter other.name=" + otherCollider.node.name);

    //         var ui = otherCollider.node.getComponent(UIMergeItem);
    //         if (ui != null)
    //         {
    //             if (ui.isNew)
    //             {
    //                 this.t = 0;
    //             }
    //             if (this.t >= 2.0)
    //             {
    //                 // GameObject.Find("CodeControl").GetComponent<ScoreControl>().SaveScore();//保存分数
    //                 // SceneManager.LoadScene("Over");//切换场景
    //                 this.t = 0;
    //                 if (!this.isGameFail)
    //                 {
    //                     this.isGameFail = true;
    //                     UIGameMerge.main.OnGameFinish(true);
    //                 }
    //             }
    //         }
    //     }
    // }

    // // 每次处理完碰撞体接触逻辑时被调用
    // onPostSolve(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // will be called every time collider contact should be resolved
    //     // Debug.Log('onPostSolve');
    // }


}


