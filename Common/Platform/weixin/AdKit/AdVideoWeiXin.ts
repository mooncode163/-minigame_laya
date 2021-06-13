
 
export class AdVideoWeiXin extends AdVideoPlatformWrapper {
    videoAd = null;

    SetObjectInfo(objName, objMethod) {

    }
    SetType(type) {

    }
    InitAd(source) {
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
