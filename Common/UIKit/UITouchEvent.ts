 
export default class UITouchEvent extends Laya.Script {
    public static TOUCH_DOWN = 0;
    public static TOUCH_MOVE = 1;
    public static TOUCH_UP = 2;
    public static STATUS_Click = 3;
    public static STATUS_LongPress = 4;
    public Time_LongPress = 2;//s

    tickPress = 0;
    index = 0;
    callBackTouch = null;
    isTouchDown = false;

   
    enableLongPress = false;

    onAwake() {
        this.Init();
    }

    Init() {

        // node layer 需要设置为UI_2D
        // this.on(Laya.Event.CLICK, this, this.OnClick);
        
   

    }

    OnClick() { 
        
   

    }


    onMouseDown(e){
        // console.log("按下");
        console.log("按下 " + this.owner.name +" mouseX="+e.mouseX+" stageX="+e.stageX+" stageY="+e.stageY);
    }
    onMouseMove(e){
        console.log("移动");
    }
    onMouseOut(e){
        console.log("移出");
    }
    onMouseOver(e){
        console.log("进入");
    }
    onMouseUp(e){
        // console.log("抬起");
        console.log("抬起 " + this.owner.name);
    }
    onClick(e)
    {
        //e.stopPropagation();//阻止事件冒泡/上报
        console.log("点击" + this.owner.name);
    }
    // onStageMouseDown(e){
    //     console.log("舞台中按下");
    // }
    // onStageMouseUp(e){
    //     console.log("舞台中抬起");
    // }
    // onStageMouseMove(e){
    //     // console.log("舞台中移动");
    // }
    // onStageClick(e){
    //     console.log("舞台中点击");
    // } 

    // //屏幕坐标,原点在屏幕左下角 
    // GetPosition(event?: EventTouch) {
    //     return event.getLocation();
    // }

    // //Canvas UI 坐标,原点在Canvas左下角 
    // GetUIPosition(event?: EventTouch) {
    //     return event.getUILocation();
    // }
    // //坐标原点在node的锚点
    // GetPositionOnNode(node: Node, event?: EventTouch) {
    //     var uiTrans = node.getComponent(UITransform);
    //     // var pos = this.GetPosition(event);
    //     var posui = this.GetUIPosition(event);
    //     // pos = event.wo  convertToNodeSpaceAR convertToWorldSpaceAR
    //     const localTouchPos = uiTrans.convertToNodeSpaceAR(new Vec3(posui.x, posui.y, 0));
    //     return localTouchPos;
    //     // return uiTrans.convertToWorldSpaceAR(new Vec3(pos.x, pos.y, 0));//坐标原点在node的锚点
    // }


    // // touch event handler
    // protected _onTouchBegan(event?: EventTouch) {

    //     var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
    //     // var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
    //     // var posnodeAR = this.node.getComponent(UITransform).convertToNodeSpaceAR(pos);//坐标原点在node的锚点
    //     this.isTouchDown = true;
    //     this.tickPress = Common.GetCurrentTime();
    //     if (this.callBackTouch != null) {
    //         this.callBackTouch(this, UITouchEvent.TOUCH_DOWN, event);
    //     }
    // }

    // protected _onTouchMove(event?: EventTouch) {
    //     if (this.callBackTouch != null) {
    //         this.callBackTouch(this, UITouchEvent.TOUCH_MOVE, event);
    //     }
    // }

    // protected _onTouchEnded(event?: EventTouch) {
    //     if (this.callBackTouch != null) {
    //         this.callBackTouch(this, UITouchEvent.TOUCH_UP, event);
    //     }
    //     this.tickPress =Common.GetCurrentTime() - this.tickPress;
    //     if (this.isTouchDown && this.enableLongPress) {

    //         if (this.tickPress > this.Time_LongPress) {
    //             if (this.callBackTouch != null) {
    //                 this.callBackTouch(this, UITouchEvent.STATUS_LongPress, event);
    //             }
    //             this.tickPress = 0;
    //             return;
    //         }
    //     }

    //     if (this.isTouchDown) {
    //         if (this.callBackTouch != null) {
    //             this.callBackTouch(this, UITouchEvent.STATUS_Click, event);
    //         }
    //     }

    //     this.isTouchDown = false;
    // }

    // protected _onTouchCancel(event?: EventTouch) {

    // }

}


