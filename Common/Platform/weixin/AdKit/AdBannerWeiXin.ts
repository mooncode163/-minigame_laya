

// laya 如何调用微信接口
// https://blog.csdn.net/yuer2040/article/details/83339728
/*
  if (Laya.Browser.onMiniGame) {
                var wx = Laya.Browser.window.wx;

                */

import AdConfig from "../../../AdKit/AdConfig/AdConfig";
import { AdType } from "../../../AdKit/AdConfig/AdInfo";
import AdBannerPlatformWrapper from "../../../AdKit/Banner/AdBannerPlatformWrapper";
import Debug from "../../../Debug";
import Source from "../../../Source";

export default class AdBannerWeiXin extends AdBannerPlatformWrapper {
    bannerAd = null;
    width = 0;
    height = 0;
    objAd = null;
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
        let adkey = AdConfig.main.GetAdKey(Source.WEIXIN, AdType.BANNER);
        Debug.Log("AdBannerWeiXin adkey=" + adkey);
        var wx = Laya.Browser.window.wx;
        let winSize = wx.getSystemInfoSync();
        this.objAd = obj;
        console.log(winSize);
        let bannerHeight = 80;
        let bannerWidth = 300;
        this.height = bannerHeight;
        this.bannerAd = wx.createBannerAd({
            adUnitId: adkey, //填写广告id
            style: {
                left: (winSize.windowWidth - bannerWidth) / 2,
                top: winSize.windowHeight - bannerHeight,
                width: bannerWidth,
            }
        });

        this.bannerAd.onError((res) => {

        })
    }



    ShowAd(isShow: boolean) {
        var wx = Laya.Browser.window.wx;
        let winSize = wx.getSystemInfoSync();
        this.bannerAd.show(); //banner 默认隐藏(hide) 要打开
        //微信缩放后得到banner的真实高度，从新设置banner的top 属性
        this.bannerAd.onResize((res) => {
            this.bannerAd.style.top = winSize.windowHeight - this.bannerAd.style.realHeight;

            // 屏幕单位
            this.width = this.bannerAd.style.realWidth * winSize.pixelRatio;
            this.height = this.bannerAd.style.realHeight * winSize.pixelRatio;
            Debug.Log("screen winSize.windowWidth =" + winSize.windowWidth + " winSize.windowHeight =" + winSize.windowHeight + " winSize.pixelRatio=" + winSize.pixelRatio);
            if (this.objAd.success != null) {
                this.objAd.success(this, this.width, this.height);
            }
        })
    }


    GetHeight() {
        return this.height;
    }
    SetScreenSize(w: any, h: any) {

    }
    //y 基于屏幕底部
    SetScreenOffset(w: any, h: any) {

    }
}

