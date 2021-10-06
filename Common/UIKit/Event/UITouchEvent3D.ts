



/*
// LayaBox 不让子节点的鼠标事件穿透到父节点
A是父节点，B是子节点
A和B都添加了鼠标监听
当点击子节点B的时候，不让鼠标事件穿透到A，那么在B的监听回调函数参数调用stopPropagation函数
 
this.on(Laya.Event.CLICK, this, (e: Laya.Event)=>{
    e.stopPropagation();
  
}
*/

import AppSceneUtil from "../../../AppBase/Common/AppSceneUtil";
import CameraUtil from "../../Camera/CameraUtil";
import Common from "../../Common";
import Timer from "../../Core/Timer";
import DataTouch from "./DataTouch";
import UITouchEvent from "./UITouchEvent";

/*

  需要添加物理碰撞体组件,例如:
        var phycol: Laya.PhysicsCollider = this.node.addComponent(Laya.PhysicsCollider);
        //创建盒子形状碰撞器 
        var box: Laya.BoxColliderShape = new Laya.BoxColliderShape(5, 5, 1);
        //物理碰撞体设置形状
        phycol.colliderShape = box;
*/

export default class UITouchEvent3D extends Laya.Script3D {
 
    public Time_LongPress = 2;//s

    tickPress = 0;
    index = 0;
    callBackTouch = null;
    isTouchDown = false;

    touchPoint: Laya.Vector2;


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


    onMouseDown() {
        if (DataTouch.main.isTouchUI) {
            // DataTouch.main.isTouchUI = false;
            return;
        }
        console.log("UITouchEvent3D onMouseDown " + this.owner.name);
        // var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
        // var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
        // var posnodeAR = this.node.getComponent(UITransform).convertToNodeSpaceAR(pos);//坐标原点在node的锚点
        this.isTouchDown = true;
        this.tickPress = Timer.curTimeSecond;
        if (this.callBackTouch != null) {
            this.callBackTouch(this, DataTouch.TOUCH_DOWN);
        }


    }
    onMouseDrag() {
        // console.log("移动");
        if (DataTouch.main.isTouchUI) {
            // DataTouch.main.isTouchUI = false;
            return;
        }
        if (this.callBackTouch != null) {
            this.callBackTouch(this, DataTouch.TOUCH_MOVE);
        }

    }
    onMouseUp() {
        // console.log("抬起");
        if (DataTouch.main.isTouchUI) {
            // DataTouch.main.isTouchUI = false;
            return;
        }
        console.log("UITouchEvent3D onMouseUp " + this.owner.name);
        if (this.callBackTouch != null) {
            this.callBackTouch(this, DataTouch.TOUCH_UP);
        }
        this.tickPress = Timer.curTimeSecond - this.tickPress;
        if (this.isTouchDown && this.enableLongPress) {

            if (this.tickPress > this.Time_LongPress) {
                if (this.callBackTouch != null) {
                    this.callBackTouch(this, DataTouch.LongPress);
                }
                this.tickPress = 0;
                return;
            }
        }

        if (this.isTouchDown) {
            if (this.callBackTouch != null) {
                this.callBackTouch(this, DataTouch.Click);
            }
        }

        this.isTouchDown = false;


    }


}


