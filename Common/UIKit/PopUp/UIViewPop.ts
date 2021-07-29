
import Debug from "../../Debug";
import UI from "../ViewController/UI";
import UIView from "../ViewController/UIView";
import PopUpData from "./PopUpData";


export default class UIViewPop extends UIView {

    duration = 800;//0.2 //ms
    scale1 = 1.2;
    scale2 = 1;

    onAwake() {
        super.onAwake();
        this.LayOut();
        
 
    }
    onStart() {
        super.onStart();
        this.LayOut();
        // this.owner.active = false; 

        // ms
        Laya.timer.once(100, this, this.ShowInitAnimate);
 
    }

  


    
    LayOut() {
        super.LayOut();
        UI.SetNodePivotCenter(this.node);
    }
    OnAnimateFinish() {
        var nodePannel =PopUpData.main.manager.nodePannel;
        if(nodePannel!=null)
        {
            nodePannel.active = true;
        }

        this.LayOut();
    }
    onTween1Finish() {

        Laya.Tween.clearTween(this.onTween1Finish);
        Laya.Tween.to(this.owner, { scaleX: this.scale2, scaleY: this.scale2 }, this.duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.onTween2Finish));
    }

    onTween2Finish() {
        Laya.Tween.clearTween(this.onTween2Finish);

        if (this.scale2 == 0) {
            this.DoClose();
        }

    }
    ShowInitAnimate() {
        Debug.Log("UIButton OnBtnClick");
        this.scale2 = 1;
        Laya.Tween.to(this.owner, { scaleX: this.scale1, scaleY: this.scale1 }, this.duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.onTween1Finish));
        //.to(this.owner, { scaleX: scale2, scaleY: scale2 }, duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.DoClickItem.bind(this), [this], false));




    }

    ShowInitAnimate2() {
        // var nodePop = this.node;
        // this.node.active = true; 
        // nodePop.scale = new Vec3(0,0,1); 
        //    //delay延时
        // // var time = delayTime(2);
        // var duration = PopUpManager.ANIMATE_DURATION;

        // var scale1 = 1.2;
        // var scale2 = 1;

        // tween(nodePop) 
        //     .to(duration / 2, { scale: new Vec3(scale1, scale1, 1) })
        //     .to(duration / 2, { scale: new Vec3(scale2, scale2, 1) })
        //     .call(() => {
        //         this.OnAnimateFinish();
        //     })
        //     .onStart() 
    }

    Close() {

        PopUpData.main.manager.ClosePopup();
        this.scale2 = 0;
        Laya.Tween.to(this.owner, { scaleX: this.scale1, scaleY: this.scale1 }, this.duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.onTween1Finish));

    }


    DoClose() {
        this.owner.destroy();
    }

}



