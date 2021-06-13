import Debug from "./Debug";


export class Device {
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

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
