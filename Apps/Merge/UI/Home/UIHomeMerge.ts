 
export class UIHomeMerge extends UIHomeBase {
    @type(UIImage)
    imageLogo: UIImage = null;

    onLoad() {
        super.onLoad();

        var info = GameLevelParse.main.GetLastItemInfo();
        var pic = GameLevelParse.main.GetImagePath(info.id);
        Debug.Log("UIHomeMerge pic=" + pic);
        this.imageLogo.UpdateImage(pic);

        var name = Language.main.GetString("APP_NAME");
        if (Device.main.isLandscape) {
            name = Language.main.GetString("APP_NAME_HD");
        }

        this.textTitle.text = name;
        //    var ret = ImageRes.main.GetImageBoard("ScoreBg");
        //         Debug.Log("UIHomeMerge onLoad ScoreBg ret="+ret);
        this.LayOut();
        // this.LoadCenterBar();
        this.LoadSideBar();
        let adkey = AdConfig.main.GetAdKey(Source.WEIXIN, AdType.BANNER);
        // Debug.Log("AdBannerWeiXin adkey="+adkey);
        AdKitCommon.main.InitAdBanner();
        AdKitCommon.main.ShowAdBanner(true);

        //   var AUDIO_Merge = Common.CLOUD_RES_DIR+"/Audio/bg3.ogg";
        // AudioPlay.main.PlayByKey("bg3");
        moosnow.platform.login(() => {
            console.log('moosnow 登录成功 ')
 
        })

        moosnow.ad.getAd((res) => {
            console.log('moosnow 广告数据 ', res)
        })
    }



    start() {
        super.start();
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
            navi.Push(GameViewController.main);
        } else {
            Debug.Log("GotoGame controller = null");
        }
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
