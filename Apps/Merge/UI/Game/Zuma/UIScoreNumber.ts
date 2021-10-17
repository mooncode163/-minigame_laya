import AppSceneBase from "../../../../../AppBase/Common/AppSceneBase";
import Action3D, { ActionType } from "../../../../../Common/Action/Action3D";
import CameraUtil from "../../../../../Common/Camera/CameraUtil";
import Common from "../../../../../Common/Common";
import Debug from "../../../../../Common/Debug";
import UIImage from "../../../../../Common/UIKit/UIImage/UIImage";
import UIText from "../../../../../Common/UIKit/UIText/UIText";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIFind from "../../../../../Common/UIKit/ViewController/UIFind";
import UIView from "../../../../../Common/UIKit/ViewController/UIView";
import GameData from "../../../Data/GameData";
import UIMergeItem from "../UIMergeItem";


export default class UIScoreNumber extends UIView {
    textScore: UIText;
    imageBg: UIImage;
    onAwake() {
        super.onAwake();
        this.textScore = UIFind.FindUI(this.node, "textScore", UIText);

        this.imageBg = UIFind.FindUI(this.node, "imageBg", UIImage);
        this.imageBg.visible = false;

        this.visible = false;
        this.LayOut();
    }

    onStart() {
        super.onStart();
        this.LayOut();

        // var color:Laya.Color = this.textScore.color;
        // var colorkey = this.textScore.GetKeyColor();
        // Debug.Log("textScore color = "+this.textScore.label.color+" colorkey.r="+colorkey.r+" color.r="+color.r);
    }

    LayOut() {
        super.LayOut();
    }

    onUpdate() {


    }
    UpdateScore() {
        if (GameData.main.addScore > 0) {
            this.textScore.text = "+" + GameData.main.addScore.toString();
            this.RunMoveAnimate(GameData.main.fromPosScoreWorld);
        }

    }
    OnTweenFinish() {
        this.visible = false;
    }
    // 
    RunMoveAnimate(fromPosWorld) {
        // var rctan = this.GetComponent<RectTransform>();
        this.visible = true;

        var duration = 0.5;
        // duration = 3;
        var fromPosCanvas = CameraUtil.main.WorldToCanvasPoint(this.mainCam, fromPosWorld);
        var contentsize = UI.GetNodeContentSize(this.node);
        fromPosCanvas.x = fromPosCanvas.x - contentsize.width / 2;
        fromPosCanvas.y = fromPosCanvas.y - contentsize.height / 2;
        var sizeCanvas = Common.sizeCanvas;
        Debug.Log("UIScoreNumber fromPosCanvas.x=" + fromPosCanvas.x + " fromPosCanvas.y=" + fromPosCanvas.y + " fromPosWorld.x=" + fromPosWorld.x + " fromPosWorld.y=" + fromPosWorld.y + " sizeCanvas.x=" + sizeCanvas.width + " sizeCanvas.y=" + sizeCanvas.height);
        // var fromPosScreen = Common.WorldToScreenPoint(mainCam, fromPosWorld);
        // rctan.position = fromPosScreen;
        this.transform.position = fromPosCanvas;
        var posnow = this.transform.position;
        var ofty = sizeCanvas.height / 5;
        var toPos = new Laya.Vector3(posnow.x, posnow.y - ofty, posnow.z);
        Laya.Tween.to(this.node, { x: toPos.x, y: toPos.y }, duration * 1000, Laya.Ease.sineInOut, Laya.Handler.create(this, this.OnTweenFinish));



        var p = new Action3D();
        p.Run(
            {
                ui: this.textScore,
                type: ActionType.Fade,
                to: 0,
                time: duration,
                success: function (p: any) {


                }.bind(this),
            });
        Laya.Tween.to(this.textScore.label, { alpha: 0 }, duration * 1000, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
            this.textScore.label.alpha = 1;
        }));
        // Laya.Tween.to(this.textScore.label, { color: Laya.Color.BLACK}, duration*1000 / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.OnTweenFinish));

        // Laya.Tween.to(this.node, { color: toPos.x, y: toPos.y }, duration*1000 / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.OnTweenFinish));

        // Vector3 toPos = new Vector3(fromPosScreen.x, fromPosScreen.y + 256, fromPosScreen.z);


        // Tweener tw = rctan.DOLocalMove(toPos, duration).OnComplete(() => {
        //     //   textScore.title.GetComponent<Renderer>().material.DOFade(1, 0.01f);
        //     textScore.title.material.DOFade(1, 0.01f);
        //     textScore.visible = false;
        // }
        // );

        // var color = this.textScore.title.color;
        // // color.a = 0;
        // // textScore.title.DOColor(color, duration);

        // this.textScore.title.material.DOFade(0, duration);

    }
}
