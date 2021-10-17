import Action3D, { ActionType } from "../../../../../Common/Action/Action3D";
import PrefabCache from "../../../../../Common/Cache/PrefabCache";
import Debug from "../../../../../Common/Debug";
import UISprite from "../../../../../Common/UIKit/UIImage/UISprite";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIView from "../../../../../Common/UIKit/ViewController/UIView";
import UIView3D from "../../../../../Common/UIKit/ViewController/UIView3D";
import GameLevelParse from "../../../../Main/GameLevelParse";
import GameData from "../../../Data/GameData";
import UIMergeItem from "../UIMergeItem";


export default class UIItemTrail extends UIView3D {
    // public List<UISprite> listItem = new List<UISprite>();
    listItem: UISprite[] = [];
    itemPosZ = -1;
    posInit = new Laya.Vector3(0, 0, 1);

    onAwake() {
        super.onAwake();
        this.LayOut();
        var count = 5;
        for (var i = 0; i < count; i++) {
            var ui = UI.CreateUI3D(UISprite, this, "");
            ui.name = "UISprite";
            // ui.visible = false;
            ui.transform.localPosition = this.posInit;
            this.listItem.push(ui);
        }
    }

    onStart() {
        super.onStart();
        this.LayOut();
    }

    LayOut() {
        super.LayOut();
    }

    RunOneMoveAnimate(uiItem: UISprite, toPos, time) {
        Debug.Log("RunOneMoveAnimate time=" + time);
        var p = new Action3D();
        p.Run(
            {
                ui: uiItem,
                type: ActionType.Move,
                to: new Laya.Vector3(toPos.x, toPos.y, 1),
                easeFun: Laya.Ease.sineInOut,
                time: time,
                success: function (p: any) {
                    uiItem.transform.localPosition = this.posInit;
                    uiItem.visible = false;

                }.bind(this),
            });

        // Laya.timer.clear(this, this.RunOneMoveAnimate);
    }


    RunOneMoveAnimate2(index, toPos) {
      
        var uiItem = this.listItem[index];
        var duration = GameData.DURATION_MOVE;
        var countTrail = this.listItem.length;
        var delayedTimer = (index * duration / countTrail);
        var time = duration - delayedTimer; 
        // time = duration;
        // time = (index+1) * duration / countTrail;
        Debug.Log("RunOneMoveAnimate2 index=" + index+" delayedTimer="+delayedTimer);
        Laya.timer.once(delayedTimer*1000, this, function (): void {
            uiItem.visible = true;
            var p = new Action3D();
            p.Run(
                {
                    ui: uiItem,
                    type: ActionType.Move,
                    to: new Laya.Vector3(toPos.x, toPos.y, 1),
                    easeFun: Laya.Ease.sineInOut,
                    time: time,
                    success: function (p: any) {
                        uiItem.transform.localPosition = this.posInit;
                        uiItem.visible = false;

                    }.bind(this),
                });
        });

    }

    // 
    RunMoveAnimate(toPos, uiMerge: UIMergeItem) {
        this.keyId = uiMerge.keyId;
        var countTrail = this.listItem.length;
        var scaleStart = 1;
        var w = this.listItem[0].GetContentSize().width;
        if (w != 0) {
            scaleStart = (uiMerge.GetBoundSize().width / w) * 0.8;
        }

        var scaleEnd = 0.02;
        var duration = GameData.DURATION_MOVE;

        for (var i = 0; i < 5; i++) {
            var ui = this.listItem[i];
            var key = "TrailCirle" + "_" + GameLevelParse.main.GetIndexById(this.keyId).toString();
            // var key = "TrailCirle" + "_" + "0";
            ui.UpdateImageByKey(key);
            var scale = scaleStart - i * (scaleStart - scaleEnd) / countTrail;
            // scale = 0.5;
            ui.transform.localScale = new Laya.Vector3(scale, scale, 1);
          
            // var time = (i * duration / countTrail);
            // this.RunOneMoveAnimate(ui, toPos,time);
            // var delayedTimer = (i * duration / countTrail);
            // Laya.timer.once(delayedTimer * 1000, this, function (): void {
            //     this.RunOneMoveAnimate2(i, toPos);
            // });

            // Laya.timer.once(delayedTimer * 1000, this, this.RunOneMoveAnimate2, [i, toPos]);
            this.RunOneMoveAnimate2(i,toPos);
 

        }
        return;


        {
            var i = 0; 
            Laya.timer.once(delayedTimer * i, this, function (): void {
              
            });
        }
        {
            var i = 1; 
            Laya.timer.once(delayedTimer * i, this, function (): void {
              
            });
        }

        {
            var i = 0;
            var scale = 0.5;
            var ui = this.listItem[i];
            var delayedTimer = (i * duration / countTrail);
            Debug.Log("RunOneMoveAnimate i=" + i + " delayedTimer=" + delayedTimer);
            // Laya.timer.once(delayedTimer * 1000, this, this.RunOneMoveAnimate, [ui, toPos, duration - delayedTimer]);
            Laya.timer.once(delayedTimer * 1000, this, function (): void {
                // Debug.Log("RunOneMoveAnimate 1000");
                this.RunOneMoveAnimate(this.listItem[0], toPos, duration - delayedTimer);
            });
        }

        {
            var i = 1;
            var scale = 0.5;
            var ui = this.listItem[i];
            var delayedTimer = (i * duration / countTrail);
            Debug.Log("RunOneMoveAnimate i=" + i + " delayedTimer=" + delayedTimer);
            // Laya.timer.once(delayedTimer * 1000, this, this.RunOneMoveAnimate, [ui, toPos, duration - delayedTimer]);
            Laya.timer.once(delayedTimer * 1000, this, function (): void {
                // Debug.Log("RunOneMoveAnimate 1000");
                this.RunOneMoveAnimate(this.listItem[1], toPos, duration - delayedTimer);
            });

        }


        {
            var i = 2;
            var scale = 0.5;
            var ui = this.listItem[i];
            var delayedTimer = (i * duration / countTrail);
            Debug.Log("RunOneMoveAnimate i=" + i + " delayedTimer=" + delayedTimer);
            // Laya.timer.once(delayedTimer * 1000, this, this.RunOneMoveAnimate, [ui, toPos, duration - delayedTimer]);

            Laya.timer.once(delayedTimer * 1000, this, function (): void {
                Debug.Log("RunOneMoveAnimate 1000");
                this.RunOneMoveAnimate(this.listItem[2], toPos, duration - delayedTimer);
            });

        }

        {
            var i = 3;
            var scale = 0.5;
            var ui = this.listItem[i];
            var delayedTimer = (i * duration / countTrail);
            Debug.Log("RunOneMoveAnimate i=" + i + " delayedTimer=" + delayedTimer);
            // Laya.timer.once(delayedTimer * 1000, this, this.RunOneMoveAnimate, [ui, toPos, duration - delayedTimer]);

            Laya.timer.once(delayedTimer * 1000, this, function (): void {

                this.RunOneMoveAnimate(this.listItem[3], toPos, duration - delayedTimer);
            });

        }


        {
            var i = 4;
            var scale = 0.5;
            var ui4 = this.listItem[i];
            var delayedTimer4 = (i * duration / countTrail);
            Debug.Log("RunOneMoveAnimate i=" + i + " delayedTimer4=" + delayedTimer4);
            // Laya.timer.once(delayedTimer * 1000, this, this.RunOneMoveAnimate, [ui, toPos, duration - delayedTimer]);

            Laya.timer.once(delayedTimer * 1000, this, function (): void {

                this.RunOneMoveAnimate(this.listItem[4], toPos, duration - delayedTimer4);
            });

        }

    }

}
