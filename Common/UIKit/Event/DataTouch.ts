




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

export default class DataTouch {

    public static TOUCH_DOWN = 0;
    public static TOUCH_MOVE = 1;
    public static TOUCH_UP = 2;
    public static Click = 3;
    public static LongPress = 4;

    isTouchUI = false; 

    get touchPosCanvas(): Laya.Vector2 {
        // 坐标原点在左上角
        var x = Laya.MouseManager.instance.mouseX;
        var y = Laya.MouseManager.instance.mouseY;
        return new Laya.Vector2(x, y);
    }
    get touchPosWorld(): Laya.Vector2 {
        // 坐标原点在中心
        var x_canvas = Laya.MouseManager.instance.mouseX;
        var y_canvas = Laya.MouseManager.instance.mouseY;
        var size = CameraUtil.main.GetWorldSize(AppSceneUtil.mainCamera);
        var sizeCanvas = Common.sizeCanvas;
        var x = (-size.x / 2) + x_canvas * size.x / sizeCanvas.width;
        var y = (size.y / 2) - y_canvas * size.y / sizeCanvas.height;
        return new Laya.Vector2(x, y);
    }
    static _main: DataTouch;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new DataTouch();
        }
        return this._main;
    }
}


