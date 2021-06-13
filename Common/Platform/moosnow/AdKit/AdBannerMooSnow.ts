

 
export class AdBannerMooSnow extends AdBannerPlatformWrapper {
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
      
    }

    ShowAd(isShow: boolean) {
        console.log('moosnow ShowAd ')
        // let winSize = wx.getSystemInfoSync();
        // this.bannerAd.show(); //banner 默认隐藏(hide) 要打开
        // //微信缩放后得到banner的真实高度，从新设置banner的top 属性
        // this.bannerAd.onResize((res) => {
        //     this.bannerAd.style.top = winSize.windowHeight - this.bannerAd.style.realHeight;

        //     // 屏幕单位
        //     this.width = this.bannerAd.style.realWidth * winSize.pixelRatio;
        //     this.height = this.bannerAd.style.realHeight * winSize.pixelRatio;
        //     Debug.Log("screen winSize.windowWidth =" + winSize.windowWidth + " winSize.windowHeight =" + winSize.windowHeight + " winSize.pixelRatio=" + winSize.pixelRatio);
        //     if (this.objAd.success != null) {
        //         this.objAd.success(this, this.width, this.height);
        //     }
        // })

        /**
 * 显示平台的banner广告
 * @param remoteOn 是否被后台开关控制 默认 true，误触的地方传 true  普通的地方传 false
 * @param callback 点击回调
 * @param horizontal banner的位置，默认底部
 * @param vertical banner的位置，默认底部
 * @param idIndex id顺序 -1 会随机
 * @param style 自定义样式
 */
        moosnow.platform.showBanner(false, (isOpend) => {
            //目前仅支持微信平台
            console.log('moosnow 用户是否点击了banner ', isOpend)
        }, moosnow.BANNER_HORIZONTAL.CENTER, moosnow.BANNER_VERTICAL.BOTTOM);

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


/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting= https=//docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass= https=//docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks= https=//docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
