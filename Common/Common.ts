import Debug from "./Debug";
import Device from "./Device";  


export default class Common {
    public static GAME_DATA_DIR = "Resources/GameData";//streamingAssetsPath下的游戏配置等数据
    public static GAME_DATA_DIR_COMMON = "Resources/GameData/common";
    public static GAME_RES_DIR = "Resources/GameRes";//streamingAssetsPath 下的游戏图片等资源
    public static CLOUD_RES_DIR_NAME = "CloudRes";//放在云端的资源
    public static CLOUD_RES_DIR = "Resources/GameRes/CloudRes";//放在云端的资源
    public static RES_CONFIG_DATA = "Resources/ConfigData";
    public static RES_AppCommon = "Resources/AppCommon";
    public static RES_CONFIG_DATA_COMMON = "Resources/ConfigDataCommon";
    public static THUMB_SUFFIX = "_thumb";
    public static TOUCH_MOVE_STEP_MIN = 3.0;//6.0f

    public static sizeCanvas: Laya.Size;
    static isAndroid: any;
    static isiOS: any;
    static isWinUWP: any;


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

    static GetListIndexOfItem(list: any, item: any) {
        for (var i = 0; i < list.length; i++) {
            var ui = list[i];
            if (ui == item) {
                return i;
            }
        }
        return -1;
    }

    static ListRemoveItem(list: any, item: any) {
        var idx = Common.GetListIndexOfItem(list, item);
        Debug.Log("GameMergeZuma  ListRemoveItem GetListIndexOfItem idx=" + idx);
        if (idx >= 0) {
            list.splice(idx, 1);
        }
    }
    static ListClear(list: any) {
        list.splice(0, list.length);
    }
    static ListInsert(list: any, idx: number, item: any) {
        // splice-向数组指定位置添加插入元素 https://blog.csdn.net/cxu123321/article/details/106471206
        //插入 
        // var insert = lang.splice(0,0,"asp"); //从第0个位置开始插入 

        list.splice(idx, 0, item);
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

    // min-max 不包括max
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
        var labelTmp = new Laya.Label();
        labelTmp.fontSize = fontsize;
        labelTmp.text = text;
        var size = new Laya.Size(labelTmp.width, labelTmp.height);
        labelTmp.destroy();
        return size;
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



    static GetAppPackage() {
        return "com.moonma.app";
    }
 


}
