import AdConfig from "../../../AdKit/AdConfig/AdConfig";
import { AdType } from "../../../AdKit/AdConfig/AdInfo";
import AdVideoPlatformWrapper from "../../../AdKit/Video/AdVideoPlatformWrapper";
import Debug from "../../../Debug";
import Source from "../../../Source";

 

 
export default class AdVideoWeiXin extends AdVideoPlatformWrapper {
    videoAd = null;

    SetObjectInfo(objName, objMethod) {

    }
    SetType(type) {

    }
    InitAd(source) {
        var wx = Laya.Browser.window.wx;
        var adkey = AdConfig.main.GetAdKey(Source.WEIXIN, AdType.VIDEO);
        Debug.Log("AdVideoWeiXin adkey="+adkey);
        // 在页面中定义激励视频广告 
        // 在页面onLoad回调事件中创建激励视频广告实例
        if (wx.createRewardedVideoAd) {
            this.videoAd = wx.createRewardedVideoAd({
                adUnitId: adkey
            })
  
            this.videoAd.onError((err) => {
             
            })
        }

    }
    PreLoad(source) {

    }

    ShowAd() {

        // 用户触发广告后，显示激励视频广告
        if (this.videoAd) {
            this.videoAd.show().catch(() => {
                // 失败重试
                this.videoAd.load()
                    .then(() => this.videoAd.show())
                    .catch(err => {
                        console.log('激励视频 广告显示失败')
                    })
            })
        }
    }
    OnClickAd() {

    }

}



