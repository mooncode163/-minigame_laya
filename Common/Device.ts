import Debug from "./Debug";


export default class Device {
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


设计分辨率:
GameConfig{
    static width:number=1536;
    static height:number=2048;
    static scaleMode:string="fixedwidth";
    
*/
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


