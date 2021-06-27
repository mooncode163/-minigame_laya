 
import UIHomeBase from "../../../../AppBase/Home/UIHomeBase"; 
import Debug from "../../../../Common/Debug"; 
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
 

 
 
export default class UIHomeMerge extends UIHomeBase {
 
    imageLogo: UIImage = null;

    onAwake() {
        super.onAwake();

        // var info = GameLevelParse.main.GetLastItemInfo();
        // var pic = GameLevelParse.main.GetImagePath(info.id);
        // Debug.Log("UIHomeMerge pic=" + pic);
        // this.imageLogo.UpdateImage(pic);

        // var name = Language.main.GetString("APP_NAME");
        // if (Device.main.isLandscape) {
        //     name = Language.main.GetString("APP_NAME_HD");
        // }

        // this.textTitle.text = name;
        // //    var ret = ImageRes.main.GetImageBoard("ScoreBg");
        // //         Debug.Log("UIHomeMerge onLoad ScoreBg ret="+ret);
        // this.LayOut();
        // // this.LoadCenterBar();
        // this.LoadSideBar();
        // let adkey = AdConfig.main.GetAdKey(Source.WEIXIN, AdType.BANNER);
        // // Debug.Log("AdBannerWeiXin adkey="+adkey);
        // AdKitCommon.main.InitAdBanner();
        // AdKitCommon.main.ShowAdBanner(true);

        // //   var AUDIO_Merge = Common.CLOUD_RES_DIR+"/Audio/bg3.ogg";
        // // AudioPlay.main.PlayByKey("bg3");
        // moosnow.platform.login(() => {
        //     console.log('moosnow 登录成功 ')
 
        // })

        // moosnow.ad.getAd((res) => {
        //     console.log('moosnow 广告数据 ', res)
        // })
    }



    onStart() {
        super.onStart();
        this.LayOut();
    }

    OnBtnClickPlay(event: Event, customEventData: string) {
        Debug.Log("OnBtnClickPlay");
        this.GotoGame();
    }

    GotoGame() {
        this.GotoGameByModeInteranl();
        // LevelManager.main().StartParsePlace(function () {

        // }.bind(this)
        // );
    }

    GotoGameByModeInteranl() {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            Debug.Log("GotoGame GameViewController");
            // navi.Push(GameViewController.main);
        } else {
            Debug.Log("GotoGame controller = null");
        }
    }
}


