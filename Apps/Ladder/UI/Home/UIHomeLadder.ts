
import AppSceneUtil from "../../../../AppBase/Common/AppSceneUtil";
import GameViewController from "../../../../AppBase/Game/GameViewController";
import UIHomeBase from "../../../../AppBase/Home/UIHomeBase";
import AdKitCommon from "../../../../Common/AdKit/AdKitCommon";
import AppVersion from "../../../../Common/AppVersion/AppVersion";
import HuaweiAppGalleryApi from "../../../../Common/AppVersion/HuaweiAppGalleryApi";
import PrefabCache from "../../../../Common/Cache/PrefabCache";
import Common from "../../../../Common/Common";
import ConfigPrefab from "../../../../Common/Config/ConfigPrefab";
import Debug from "../../../../Common/Debug";
import Device from "../../../../Common/Device";
import Language from "../../../../Common/Language/Language";
import PopUpManager from "../../../../Common/UIKit/PopUp/PopUpManager";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UIText from "../../../../Common/UIKit/UIText/UIText";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind"; 
import GameLevelParse from "../../../Main/GameLevelParse"; 




export default class UIHomeLadder extends UIHomeBase {
 
    imageLogo: UIImage;

    btnMerge: UIButton;

    btnLearn: UIButton;


    onAwake() {
        super.onAwake();
        // return;
        Debug.Log("UIHomeMerge uiButton  set click");

        this.LoadSideBar();
        this.LoadCenterBar();

 
        {
            this.btnMerge = UIFind.FindUI(this.node, "BtnMerge", UIButton);
            this.btnMerge.SetClick(this, this.OnBtnClickPlay.bind(this));
        }
        {
            this.btnLearn = UIFind.FindUI(this.node, "btnLearn", UIButton);
            this.btnLearn.SetClick(this, this.OnBtnClickLearn.bind(this));
        }

        this.textTitle = UIFind.FindUI(this.node, "TextTitleName", UIText);
        this.imageLogo = UIFind.FindUI(this.node, "imageLogo", UIImage);


        // var info = GameLevelParse.main.GetLastItemInfo();
        // var pic = GameLevelParse.main.GetImagePath(info.id);
        // Debug.Log("UIHomeMerge pic=" + pic);
        // this.imageLogo.UpdateImage(pic);

        var name = Language.main.GetString("APP_NAME");
        if (Device.main.isLandscape) {
            name = Language.main.GetString("APP_NAME_HD");
        }
        // name = "w="+Common.sizeCanvas.width+" h="+Common.sizeCanvas.height;
        Debug.Log("UIHomeMerge  appname=" + name);
         
        this.textTitle.text = name; 
        this.LayOut();
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
 

        this.btnLearn.keyText = "HomeBtnLearn";
        this.btnMerge.keyText = "HomeBtnMerge";

        this.btnLearn.visible = true;
        // this.btnMerge.visible = false;
        
        if (AppVersion.main.appCheckHasFinished) {
            this.btnLearn.visible = false;

            this.btnMerge.visible = true;
            this.btnMerge.keyText = "BtnStartGame";
        }


        this.LayOut();

                     //添加3D场景
        // Laya.Scene3D.load("all/LayaScene_Laya/Conventional/Laya.ls", Laya.Handler.create(this, function (s: Laya.Scene3D): void { 
        //     Laya.stage.addChild(s); 
        // }));


        //加载3D预设（3D精灵）
        Laya.Sprite3D.load("LayaScene_Laya/Conventional/Laya.lh", Laya.Handler.create(this, function (sp) {
            // scene.addChild(sp); 
            // this.node.addChild(sp)
            AppSceneUtil.mainScene.addChild(sp);
        }));


    }

    // onUpdate() {
    //     this.LayOut(); 
    // }

    OnBtnClickHome() {
        Debug.Log("OnBtnClickHome");
        this.OnBtnClickPlay();
    }

    OnBtnClickPlay() {
        Debug.Log("OnBtnClickPlay");
        this.GotoGame();

        // var key = "UIPopProp";
        // var strPrefab = ConfigPrefab.main.GetPrefab(key);

        // PopUpManager.main.Show(
        //     {
        //         prefab: "Resources/AppCommon/Prefab/Home/PopTest.prefab",
        //         open: (ui: any) => {

        //         },
        //         close: (ui: any) => {
        //         },
        //     });

    }

    OnBtnClickLearn() {
     
    }


    GotoGame() {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            Debug.Log("GotoGame GameViewController");
            navi.Push(GameViewController.main);
        } else {
            Debug.Log("GotoGame controller = null");
        }
    } 
}


