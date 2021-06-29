
import UIHomeBase from "../../../../AppBase/Home/UIHomeBase";
import AdKitCommon from "../../../../Common/AdKit/AdKitCommon";
import ConfigPrefab from "../../../../Common/Config/ConfigPrefab";
import Debug from "../../../../Common/Debug";
import PopUpManager from "../../../../Common/UIKit/PopUp/PopUpManager";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";




export default class UIHomeMerge extends UIHomeBase {

    imageLogo: UIImage = null;

    /** @prop {name:btnPlay,type:Node}*/
    btnPlay: Laya.Button;


    /** @prop {name:uiButton,type:Node}*/
    uiButton: Laya.Node;

    onAwake() {
        super.onAwake();
        Debug.Log("UIHomeMerge uiButton  set click");

        UIButton.SetClickByNode(this.uiButton,this, function (btn:UIButton): void {
            if(btn!=null)
            {
                Debug.Log("UIHomeMerge UIButton  btn not null");
                btn.DidClickFinish();
            }

            Debug.Log("UIHomeMerge UIButton  SetClickFunction on click");
            this.OnBtnClickPlay();
        }.bind(this));

        // UIButton.SetClickByNode(this.uiButton,this, this.OnBtnClickHome.bind(this));

        

        // var uibtn = this.uiButton.getComponent(UIButton);
        // uibtn.clickHandler = Laya.Handler.create(this, function (): void {

        //     Debug.Log("UIHomeMerge UIButton  on click");

        // },null,false);

        // (this.uiButton as UIButton).SetClickFunction(this,function (btn:UIButton): void {
        //     if(btn!=null)
        //     {
        //         Debug.Log("UIHomeMerge UIButton  btn not null");
        //         btn.DidClickFinish();
        //     }

        //     Debug.Log("UIHomeMerge UIButton  SetClickFunction on click");

        // });
        // this.btnPlay.on(Laya.Event.CLICK, this, this.OnBtnClickPlay);
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

    OnBtnClickHome() {
        Debug.Log("OnBtnClickHome");
        this.OnBtnClickPlay();
    }

    OnBtnClickPlay() {
        Debug.Log("OnBtnClickPlay");
        // this.GotoGame();

        // var key = "UIPopProp";
        // var strPrefab = ConfigPrefab.main.GetPrefab(key);

        PopUpManager.main.Show(
            {
                prefab: "Resources/AppCommon/Prefab/Home/PopTest.prefab",
                open: (ui: any) => {
                    
                },
                close: (ui: any) => {
                },
            });

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


