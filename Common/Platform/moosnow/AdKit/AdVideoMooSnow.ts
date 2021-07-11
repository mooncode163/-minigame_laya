import AdVideoPlatformWrapper from "../../../AdKit/Video/AdVideoPlatformWrapper";

 
export default class AdVideoMooSnow extends AdVideoPlatformWrapper {
    videoAd = null;

    SetObjectInfo(objName, objMethod) {

    }
    SetType(type) {

    }
    InitAd(source) {


    }
    PreLoad(source) {

    }

    ShowAd() {
        // var moosnow = null;
        // 用户触发广告后，显示激励视频广告
        // if (this.videoAd) {
        //     this.videoAd.show().catch(() => {
        //         // 失败重试
        //         this.videoAd.load()
        //             .then(() => this.videoAd.show())
        //             .catch(err => {
        //                 console.log('激励视频 广告显示失败')
        //             })
        //     })
        // }


        moosnow.platform.showVideo(res => {
            switch (res) {
                case moosnow.VIDEO_STATUS.NOTEND:
                    console.log('视频未观看完成 ')
                    break;
                case moosnow.VIDEO_STATUS.ERR:
                    console.log('获取视频错误 ')
                    break;
                case moosnow.VIDEO_STATUS.END:
                    console.log('观看视频结束 ')
                default:
                    break;
            }
        })

    }
    OnClickAd() {

    }

}



