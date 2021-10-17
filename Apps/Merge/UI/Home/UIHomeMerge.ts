
import AppSceneUtil from "../../../../AppBase/Common/AppSceneUtil";
import GameViewController from "../../../../AppBase/Game/GameViewController";
import UIHomeBase from "../../../../AppBase/Home/UIHomeBase";
import AdKitCommon from "../../../../Common/AdKit/AdKitCommon";
import AppVersion from "../../../../Common/AppVersion/AppVersion";
import HuaweiAppGalleryApi from "../../../../Common/AppVersion/HuaweiAppGalleryApi";
import PrefabCache from "../../../../Common/Cache/PrefabCache";
import CameraUtil from "../../../../Common/Camera/CameraUtil";
import Common from "../../../../Common/Common";
import Config from "../../../../Common/Config/Config";
import ConfigPrefab from "../../../../Common/Config/ConfigPrefab";
import Debug from "../../../../Common/Debug";
import Device from "../../../../Common/Device";
import Language from "../../../../Common/Language/Language";
import Platform from "../../../../Common/Platform";
import PopUpManager from "../../../../Common/UIKit/PopUp/PopUpManager";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind";
import GameLevelParse from "../../../Main/GameLevelParse";
import GameData from "../../Data/GameData"; 
import GameLearnViewController from "../Game/Learn/GameLearnViewController";
import GameZumaViewController from "../Game/Zuma/GameZumaViewController";




export default class UIHomeMerge extends UIHomeBase {


 

    /** @prop {name:nodeTextTitle,type:Node}*/

    imageLogo: UIImage;
    imageBg: UIImage;
    btnMerge: UIButton;

    btnLearn: UIButton;
    btnZuma: UIButton;


    onAwake() {
        super.onAwake();
        Debug.Log("UIHomeMerge uiButton  set click");

        this.LoadSideBar();
        this.LoadCenterBar();

        // var button = UIFind.Find(this.node, "Button");
        // if(button!=null)
        {
            this.btnMerge = UIFind.FindUI(this.node, "BtnMerge", UIButton);
            this.btnMerge.SetClick(this, this.OnBtnClickPlay.bind(this));
        }
        {
            this.btnLearn = UIFind.FindUI(this.node, "btnLearn", UIButton);
            this.btnLearn.SetClick(this, this.OnBtnClickLearn.bind(this));
        }
        {
            this.btnZuma = UIFind.FindUI(this.node, "btnZuma", UIButton);
            this.btnZuma.SetClick(this, this.OnBtnClickZuma.bind(this));
        }
 
        if(Platform.isCloudRes)
        { 
            if(Config.main.appType==GameData.GAMAE_ID_Merge)
            {
                this.btnZuma.visible = false;
            }
            if(Config.main.appType==GameData.GAMAE_ID_ZUMA)
            {
                this.btnMerge.visible = false;
            }
        }
 
        this.imageBg = UIFind.FindUI(this.node, "imageBg", UIImage);
        this.imageLogo = UIFind.FindUI(this.node, "imageLogo", UIImage);

        var info = GameLevelParse.main.GetLastItemInfo();
        var pic = GameLevelParse.main.GetImagePath(info.id);
        // pic = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-850e2487-bb16-4d29-b798-c3f14a71a618/40720046-b0b1-41e2-9edd-09aca079a150.png";
        Debug.Log("UIHomeMerge pic=" + pic);
        this.imageLogo.UpdateImage(pic);


        // {
        //     var filepath = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-850e2487-bb16-4d29-b798-c3f14a71a618/40720046-b0b1-41e2-9edd-09aca079a150.png";
        //     console.log("mergehome ResManager Laya.loader.load before obj.filepath=" + filepath);
        //     Laya.loader.load(filepath, Laya.Handler.create(this, function (data: any): void {
        //         console.log("ResManager Laya.loader.load obj.filepath=" + filepath);
        //         var tex = Laya.loader.getRes(filepath);
                
        //         if (tex == null) {
        //             console.log("ResManager Laya.loader.load texture is null fail");

        //         } else {
        //             console.log("ResManager Laya.loader.load texture is not null");
        //             this.imageLogo.UpdateTexture(tex);
        //         }
        //         // material.albedoTexture = tex;
                

        //     }));
        // }

        // this.imageLogo.UpdateImageByKey("ScoreBg");

        var name = Language.main.GetAppName();
        // name = "w="+Common.sizeCanvas.width+" h="+Common.sizeCanvas.height;
        Debug.Log("UIHomeMerge  appname=" + name);

        this.textTitle.text = name;
        // //    var ret = ImageRes.main.GetImageBoard("ScoreBg");
        // //         Debug.Log("UIHomeMerge onLoad ScoreBg ret="+ret);
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

        // HuaweiAppGalleryApi.main.StartParseVersion(
        //     {
        //         appid: "104557503",
        //         success: (p: any, version: string) => {
        //             Debug.Log("appversion = "+version);

        //         },
        //         fail: (p: any) => {

        //         },
        //     }
        // );



    }



    onStart() {
        super.onStart();
    
        // var key = "UIPopProp";
        // var strPrefab = ConfigPrefab.main.GetPrefab(key);

        // PopUpManager.main.Show(
        //     {
        //         prefab: strPrefab,
        //         open: (ui: any) => {
        //         },
        //         close: (ui: any) => {
        //         },
        //     });


        // this.btnLearn.keyText = "HomeBtnLearn";
        // this.btnMerge.keyText = "HomeBtnMerge";

        this.btnLearn.visible = true;
        // this.btnMerge.visible = false;

        if (AppVersion.main.appCheckHasFinished) {
            this.btnLearn.visible = false;

            this.btnMerge.visible = true;
            // this.btnMerge.keyText = "BtnStartGame";
        }
 
        this.LayOut();
    }

    // onUpdate() {
    //     // this.LayOut();  
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
        if (this.controller != null) {
            var navi = this.controller.naviController;
            navi.Push(GameLearnViewController.main);
        } else {
        }
    }
    OnBtnClickZuma() {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            navi.Push(GameZumaViewController.main);
        }
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


