import UIView from "../ViewController/UIView";

 
export default class UIViewPop extends UIView {  
    onAwake () {
        super.onAwake();
        this.LayOut();
    }
    onStart () {
        super.onStart();
        this.LayOut();
        this.owner.active = false;
        // this.scheduleOnce(this.ShowInitAnimate, 0.1); 
    }
    update () { 
        // this.LayOut();
    }

    OnAnimateFinish() { 
        // var nodePannel =PopUpManager.main.nodePannel;
        // if(nodePannel!=null)
        // {
        //     nodePannel.active = true;
        // }

        this.LayOut();
    }

    ShowInitAnimate () { 
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
       
      //  PopUpManager.main.ClosePopup();
     
    }


    DoClose() { 
       // this.node.destroy();
    }
 
}



