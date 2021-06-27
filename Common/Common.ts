import Debug from "./Debug";
import Device from "./Device";
 

export default class Common {
    public static GAME_DATA_DIR = "Resources/GameData";//streamingAssetsPath下的游戏配置等数据
    public static GAME_DATA_DIR_COMMON = "Resources/GameData/common";
    public static GAME_RES_DIR = "Resources/GameRes";//streamingAssetsPath 下的游戏图片等资源
    public static CLOUD_RES_DIR_NAME = "Resources/CloudRes";//放在云端的资源
    public static CLOUD_RES_DIR = "Resources/GameRes/CloudRes";//放在云端的资源
    public static RES_CONFIG_DATA = "Resources/ConfigData";
    public static RES_CONFIG_DATA_COMMON = "Resources/ConfigDataCommon";
    public static THUMB_SUFFIX = "_thumb";
    public static TOUCH_MOVE_STEP_MIN = 3.0;//6.0f

    public static sizeCanvas: Laya.Size;
    // return second
    static GetCurrentTime() {
        return this.GetCurrentTimeMs() / 1000;
    }

    static GetCurrentTimeMs() {
        //获取Laya引擎运行的时间(毫秒)
        return Laya.systemTimer.currTimer;
    }

    static get noad() {
        var key = "APP_NO_AD";
        var ret = Common.GetBoolOfKey(key, false);
        return ret;
    }
    static set noad(value) {
        var key = "APP_NO_AD";
        Common.SetItemOfKey(key, value);
        // if (value) {
        //     ret = 1;
        //     AdConfig.main.SetNoAd();
        // }
        // else {
        //     ret = 0;
        // }
        // PlayerPrefs.SetInt(key, ret);
    }

    static CanvasToScreenWidth(canvasSize, w) {
        let screenSize = Device.main.screenSize;
        var ret = w * screenSize.width / canvasSize.width;
        return ret;
    }


    static CanvasToScreenHeight(canvasSize, h) {
        let screenSize = Device.main.screenSize;
        var ret = h * screenSize.height / canvasSize.height;
        return ret;
    }
    static ScreenToCanvasWidth(canvasSize, w) {
        let screenSize = Device.main.screenSize;
        var ret = w * canvasSize.width / screenSize.width;
        return ret;
    }

    static ScreenToCanvasHeigt(canvasSize, h) {
        let screenSize = Device.main.screenSize;
        var ret = h * canvasSize.height / screenSize.height;
        Debug.Log("ScreenToCanvasHeigt canvasSize.height=" + canvasSize.height + " screenSize.height=" + screenSize.height);
        return ret;
    }

    static RandomRange(min: any, max: any) {
        var count = max - min;
        //floor() 方法执行的是向下取整计算，它返回的是小于或等于函数参数，并且与之最接近的整数 
        var rdm = min + Math.floor((Math.random() * count));
        if (rdm >= max) {
            rdm = max - 1;
        }
        if (rdm < min) {
            rdm = min;
        }
        return rdm;
    }
    static IsBlankString(str: string) {
        if (typeof str == "undefined" || str == null || str == "") {
            return true;
        } else {
            return false;
        }
    }
    static BlankString(str: string) {
        return this.IsBlankString(str);
    }
    static GetBestFitScale(w_content, h_content, w_rect, h_rect) {
        if ((w_rect == 0) || (h_rect == 0)) {
            return 1;
        }
        var scalex = w_rect / w_content;
        var scaley = h_rect / h_content;
        var scale = Math.min(scalex, scaley);
        return scale;
    }

    static GetMaxFitScale(w_content, h_content, w_rect, h_rect) {
        if ((w_rect == 0) || (h_rect == 0)) {
            return 1;
        }
        var scalex = w_rect / w_content;
        var scaley = h_rect / h_content;
        var scale = Math.max(scalex, scaley);
        return scale;
    }


    //字符串显示大小
    static GetTextSize(text: string, fontsize: number) {
        // var node = new Laya.Node();
        // var labelTmp = node.addComponent(Label);
        // labelTmp.fontSize = fontsize;
        // labelTmp.string = text;
        // //labelTmp.overflow = cc.Label.Overflow.NONE; 
        // director.getScene().addChild(node);

        // node.active = false;

        // var size = labelTmp.node.getComponent(UITransform)?.contentSize;

        // //Debug.Log("labelTmp size= " + size + " bd=" + labelTmp.node.getBoundingBox());



        // //labelTmp.string = "A我";
        // // labelTmp.overflow = cc.Label.Overflow.RESIZE_HEIGHT;

        // //active 从false变成true 会重新刷新
        // node.active = true;
        // size = labelTmp.node.getComponent(UITransform)?.contentSize;
        // //Debug.Log("labelTmp2 size= " + size + " bd=" + labelTmp.node.getBoundingBox());

        // node.removeFromParent();
        // //Common.GetTextHeight(text, fontsize);
        // return size;
    }

    //判断微信getStorage key是否存在
    static isKeyExistWeiXin(value: any) {
        var type = typeof value;
        if (type == "string") {
            return !Common.BlankString(value);
        }
        if ("boolean" == type) {
            //微信小程序
            return true;
        }

        return true;
    }
    static SetBoolOfKey(key: string, value: boolean) {
        Laya.LocalStorage.setItem(key, value.toString());

    }

    static GetBoolOfKey(key: string, default_value: boolean) {
        var v = Laya.LocalStorage.getItem(key);
        if (Common.BlankString(v)) {
            //Debug.Log("key is null:" + key);
            return default_value;
        }
        if (v == "true") {
            return true;
        } else {
            return false;
        }


    }
    static GetItemOfKey(key: string, default_value: any) {
        var v = Laya.LocalStorage.getItem(key);
        if (Common.BlankString(v)) {
            //Debug.Log("key is null:" + key);
            return default_value;
        }
        return v;
    }
    static SetItemOfKey(key: string, value: any) {
        Laya.LocalStorage.setItem(key, value);
    }

    static GetIntOfKey(key: string, default_value: number) {
        var v = Laya.LocalStorage.getItem(key);
        //微信小程序key不存在的时候返回""而非null
        if (Common.BlankString(v)) {
            Debug.Log("key is null:" + key);
            return default_value;
        }
        var v_int = parseInt(v);
        //Debug.Log("GetIntOfKey key=:" + key + " v=" + v + " v_int=" + v_int);
        return v_int;
    }

    static GetAppVersion() {
        return "1.0.0";
    }
}
 