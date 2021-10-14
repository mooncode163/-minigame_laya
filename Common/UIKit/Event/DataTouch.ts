




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
import Debug from "../../Debug";
import Platform from "../../Platform";

export default class DataTouch {

    public static TOUCH_DOWN = 0;
    public static TOUCH_MOVE = 1;
    public static TOUCH_UP = 2;
    public static Click = 3;
    public static LongPress = 4;

    isTouchUI = false; 

    get touchPosCanvas(): Laya.Vector2 {
        // 坐标原点在左上角
        var scale = 1;
        if(Platform.isQQ||Platform.isByte)
        {
            //   2,laya bug : 在qq和字节小程序会导致ray区域判断错位,有时候需要手动判断 可能导致物体收不到鼠标事件
            //   transform.localScale 也可能导致物体区域错乱而无法点击,是因为Laya.MouseManager.instance.mouseX,mouseY没有计算缩放因子Laya.Browser.pixelRatio导致的
            scale = Laya.Browser.pixelRatio;
        }
        var x = Laya.MouseManager.instance.mouseX*scale;
        var y = Laya.MouseManager.instance.mouseY*scale;
        return new Laya.Vector2(x, y);
    }
    get touchPosWorld(): Laya.Vector2 {
        // 坐标原点在中心
        var posCanvas = this.touchPosCanvas;
        var x_canvas = posCanvas.x;
        var y_canvas = posCanvas.y;
        var sizeCanvas = Common.sizeCanvas;

        Debug.Log("touchPosWorld posCanvas.x=" + posCanvas.x + " posCanvas.y=" + posCanvas.y+" sizeCanvas.width="+sizeCanvas.width+" sizeCanvas.height="+sizeCanvas.height+" Laya.Browser.pixelRatio="+Laya.Browser.pixelRatio);
        var size = CameraUtil.main.GetWorldSize(AppSceneUtil.mainCamera);
       
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


