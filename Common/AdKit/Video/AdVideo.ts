import { Platform } from "../../Platform";
import { AdVideoMooSnow } from "../../Platform/moosnow/AdKit/AdVideoMooSnow";
import { AdVideoPlatformWrapper } from "./AdVideoPlatformWrapper";

 
export default class AdVideo  {
    public static ADVIDEO_TYPE_INSERT = 0;//插屏视频
    public static ADVIDEO_TYPE_REWARD = 1;//激励视频
 
    platform: AdVideoPlatformWrapper = null;

    static _main: AdVideo;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AdVideo();
            this._main.Init();
        }
        return this._main;
    }
    GetPlatform() {
        var p = null;
        // if (Platform.isWeiXin||Platform.isByte)  {
        //     p = new AdVideoWeiXin();
        // }
        if (Platform.isWeiXin||Platform.isByte)  {
            p = new AdVideoMooSnow();
        }
        return p;
    }

    Init() { 
        this.platform = this.GetPlatform();
    }
    InitAd(source) {

        if (this.platform == null) {
            return;
        }
        // Moonma.AdKit.AdConfig.AdConfig.main.InitPriority(source, AdConfigParser.SOURCE_TYPE_BANNER);
        this.platform.InitAd(source);
    }
    // public const int ADVIDEO_TYPE_INSERT = 0;//插屏视频
    //   public const int ADVIDEO_TYPE_REWARD = 1;//激励视频

    //static bool isHasInit = false;
    SetObjectInfo(objName, objMethod) {
        if (this.platform == null) {
            return;
        }
        this.platform.SetObjectInfo(objName, objMethod);
    }
    SetType(type) {
        if (this.platform == null) {
            return;
        }
        this.platform.SetType(type);
    }
 
    PreLoad(source) {
        if (this.platform == null) {
            return;
        }
        this.platform.PreLoad(source);
    }

    ShowAd() {
        if (this.platform == null) {
            return;
        }
        this.platform.ShowAd();
    }
    OnClickAd() {
        if (this.platform == null) {
            return;
        }
        this.platform.OnClickAd();
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
