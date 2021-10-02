 



/*
// LayaBox 不让子节点的鼠标事件穿透到父节点
A是父节点，B是子节点
A和B都添加了鼠标监听
当点击子节点B的时候，不让鼠标事件穿透到A，那么在B的监听回调函数参数调用stopPropagation函数
 
this.on(Laya.Event.CLICK, this, (e: Laya.Event)=>{
    e.stopPropagation();
  
}
*/

import Timer from "../../Core/Timer";

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


    // 不让子节点的鼠标事件穿透到父节点
    /** @prop {name:isStopTouchOther,type:Bool,tips:"不让子节点的鼠标事件穿透到父节点"}*/
    isStopTouchOther: boolean = false;

    onAwake() {
        this.Init();
    }

    Init() {

        // this.on(Laya.Event.CLICK, this, this.OnClick);
        // var node = this.owner;
        // node.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove1);
        // node.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown1);
        // node.on(Laya.Event.MOUSE_UP, this, this.onMouseUp1);

    }

    OnClick() {



    }


    onMouseDown(e) {
        // console.log("按下");
        console.log("按下 " + this.owner.name + " mouseX=" + e.mouseX + " stageX=" + e.stageX + " stageY=" + e.stageY);

        // var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
        // var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
        // var posnodeAR = this.node.getComponent(UITransform).convertToNodeSpaceAR(pos);//坐标原点在node的锚点
        this.isTouchDown = true;
        this.tickPress = Timer.curTimeSecond;
        if (this.callBackTouch != null) {
            this.callBackTouch(this, UITouchEvent.TOUCH_DOWN);
        }

        if (this.isStopTouchOther) {
            e.stopPropagation();
        }

    }
    onMouseMove(e) {
        // console.log("移动");
        if (this.callBackTouch != null) {
            this.callBackTouch(this, UITouchEvent.TOUCH_MOVE);
        }
        if (this.isStopTouchOther) {
            e.stopPropagation();
        }
    }
    onMouseUp(e) {
        // console.log("抬起");
        console.log("抬起 " + this.owner.name);
        if (this.callBackTouch != null) {
            this.callBackTouch(this, UITouchEvent.TOUCH_UP);
        }
        this.tickPress = Timer.curTimeSecond - this.tickPress;
        if (this.isTouchDown && this.enableLongPress) {

            if (this.tickPress > this.Time_LongPress) {
                if (this.callBackTouch != null) {
                    this.callBackTouch(this, UITouchEvent.STATUS_LongPress);
                }
                this.tickPress = 0;
                return;
            }
        }

        if (this.isTouchDown) {
            if (this.callBackTouch != null) {
                this.callBackTouch(this, UITouchEvent.STATUS_Click);
            }
        }

        this.isTouchDown = false;

        if (this.isStopTouchOther) {
            e.stopPropagation();
        }
    }
    // onClick(e) {
    //     //e.stopPropagation();//阻止事件冒泡/上报
    //     console.log("点击" + this.owner.name);
    // }

    // onMouseOut(e) {
    //     console.log("移出");
    // }
    // onMouseOver(e) {
    //     console.log("进入");
    // }

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






    // protected _onTouchCancel(event?: EventTouch) {

    // }

}


