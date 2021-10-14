import Platform from "../../Platform";
import AdBannerMooSnow from "../../Platform/moosnow/AdKit/AdBannerMooSnow";
import AdBannerWeiXin from "../../Platform/weixin/AdKit/AdBannerWeiXin";
import AdBannerPlatformWrapper from "./AdBannerPlatformWrapper";

 

 
export default class AdBanner  {

    platform: AdBannerPlatformWrapper = null;

    static _main: AdBanner;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AdBanner();
            this._main.Init();
        }
        return this._main;
    }

    GetPlatform () {
        var p = null;
        if (Platform.isWeiXin||Platform.isByte)  {
            p = new AdBannerWeiXin();
        }
        if (Platform.isWeiXin||Platform.isByte)  {
            // p = new AdBannerMooSnow();
        }
        if (Platform.isQQ) {
            // p = new AdBannerMooSnow();
        } 
        
        return p;
    }

    Init() { 
        this.platform = this.GetPlatform();
    }



    /*
  {
    source:"", 
    success: (p:any,w:any,h:any) => {
        
    }, 
    fail: (p:any) => {
        
    },
  }
  */
    InitAd(obj: any) {

        if (this.platform == null) {
            return;
        }

        this.platform.InitAd(
            {
                source: obj.source,
                success: (p: any, w: any, h: any) => {
                    if (obj.success != null) {
                        obj.success(this, w, h);
                    }
                },
                fail: (p: any) => {

                },
            }
        );


    }

    ShowAd(isShow) {
        if (this.platform == null) {
            return;
        }
        this.platform.ShowAd(isShow);
    }


    SetScreenSize(w, h) {
        if (this.platform == null) {
            return;
        }
        this.platform.SetScreenSize(w, h);

    }
    //y 基于屏幕底部
    SetScreenOffset(x, y) {
        if (this.platform == null) {
            return;
        }
        this.platform.SetScreenOffset(x, y);

    }

    GetHeight() {
        if (this.platform == null) {
            return 0;
        }
        return this.platform.GetHeight();
    }

}



