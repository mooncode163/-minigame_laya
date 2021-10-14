import Debug from "./Debug";


export default class Device {

     isScreenShot = false;
      isRecordVideo = false;

    static _main: Device;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new Device();
        }
        return this._main;
    }
    //get 的用法
    get isLandscape(): boolean {
        var sz = this.screenSize;//屏幕分辨率
        Debug.Log("screen sz=" + sz);
        if (sz.width > sz.height) {
            return true;
        }
        return false;
    }

    // https://www.jianshu.com/p/b083f8d3948b

/*
设备像素分辨率：Laya.Browser.clientWidth，Laya.Browser.clientHeight;
设备物理分辨率：Laya.Browser.width，Laya.Browser.height;
像素比：Laya.Browser.pixelRatio;



GameConfig配置
使用laya2.0 后，GameConfig.js是由ide自动生成的，并且修改无效
UI页面 按F9   可以修改 GameConfig.js  记得F12 导出哦

设计分辨率:
GameConfig{
    static width:number=1536;
    static height:number=2048;
    static scaleMode:string="fixedwidth";
    
*/

// Laya.Browser.pixelRatio  缩放因子
    get screenSize():Laya.Size { 
        var w = Laya.Browser.width;
        var h = Laya.Browser.height;
        Debug.Log("screen frameSize width=" + w + ",height=" + h);
        // var ratio = view.getDevicePixelRatio();
        var screenSize = new Laya.Size(w, h);
        // let screenSize = director.getWinSizeInPixels(); 
        Debug.Log("screen size width=" + screenSize.width + ",height=" + screenSize.height);
        return screenSize;
    }



}


