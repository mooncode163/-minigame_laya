import AdInsertPlatformWrapper from "../../../AdKit/Insert/AdInsertPlatformWrapper";
 
 
export default class AdInsertMooSnow extends AdInsertPlatformWrapper {

    interstitialAd = null;
    InitAd(source) { 
        // var adkey = AdConfig.main.GetAdKey(Source.WEIXIN, AdType.INSERT);
        // Debug.Log("AdInsertMooSnow adkey="+adkey);
        // 在页面中定义插屏广告 
        // 在页面onLoad回调事件中创建插屏广告实例
        // if (wx.createInterstitialAd) {
        //     this.interstitialAd = wx.createInterstitialAd({
        //         adUnitId: adkey
        //     })

        //     this.interstitialAd.onError(res => {

        //     }) 
        //     this.interstitialAd.onClose(res => {

        //     }) 


        // }

    }
    SetObjectInfo(objName) {

    }

    ShowAd() {
        // var moosnow = null;
        // 在适合的场景显示插屏广告
        // if (this.interstitialAd) {
        //     this.interstitialAd.show().catch((err) => {
        //         console.error(err)
        //     })
        // }
        var moosnow = window["moosnow"];
        moosnow.platform.showInter()
      

    }

}



