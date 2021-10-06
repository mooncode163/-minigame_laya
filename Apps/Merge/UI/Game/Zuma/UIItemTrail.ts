import Action3D, { ActionType } from "../../../../../Common/Action/Action3D";
import PrefabCache from "../../../../../Common/Cache/PrefabCache";
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

    onAwake() {
        super.onAwake();
        this.LayOut();
        var count = 5;
        for (var i = 0; i < count; i++) {
            var ui = UI.CreateUI3D(UISprite, this, "");
            ui.name = "UISprite";
            ui.visible = false;
            ui.position = new Laya.Vector3(0, 0, this.itemPosZ);
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

    RunOneMoveAnimate(ui: UISprite, toPos) {
        var p =new  Action3D();
        p.Run(
            {
                sp: ui,
                type: ActionType.Move,
                to: toPos,
                easeFun: Laya.Ease.sineInOut,
                time: GameData.DURATION_MOVE,
                success: function (p: any) {
                    ui.position = new Laya.Vector3(0, 0, this.itemPosZ);
                    ui.visible = false;

                }.bind(this),
            });
    }

    // 
    RunMoveAnimate(toPos, uiMerge: UIMergeItem) {
        this.keyId = uiMerge.keyId;
        var countTrail = this.listItem.length;
        var scaleStart = 1;
        var w = this.listItem[0].GetContentSize().width;
        if (w != 0) {
            scaleStart = (uiMerge.sprite.GetBoundSize().width / w) * 0.8;
        }

        var scaleEnd = 0.02;
        var duration = GameData.DURATION_MOVE;

        for (var i = 0; i < countTrail; i++) {
            var ui = this.listItem[i];
            var key = "TrailCirle" + "_" + GameLevelParse.main.GetIndexById(this.keyId).toString();
            ui.UpdateImageByKey(key);
            var scale = scaleStart - i * (scaleStart - scaleEnd) / countTrail;
            ui.localScale = new Laya.Vector3(scale, scale, 1);

            var delayedTimer = (i * duration / countTrail) * 1000;
            Laya.timer.once(delayedTimer, this, function (): void {
                ui.visible = true;
                this.RunOneMoveAnimate(ui, toPos);
            });

            //         Sequence seq = DOTween.Sequence();
            //         float delayedTimer = (i * duration / countTrail);
            //         seq.AppendInterval(delayedTimer);
            //         seq.AppendCallback(() =>
            //    {
            //        ui.visible = true;

            //    });
            //         Tweener tw = ui.transform.DOMove(toPos, duration).OnComplete(() =>
            //                         {

            //                         }
            //         );
            //         seq.Append(tw);
            //         seq.AppendCallback(() =>
            //         {
            //             ui.transform.localPosition = new Vector3(0f, 0f, itemPosZ);
            //             ui.visible = false;

            //         });


        }


    }
}
