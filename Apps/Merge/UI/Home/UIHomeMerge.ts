
import GameViewController from "../../../../AppBase/Game/GameViewController";
import UIHomeBase from "../../../../AppBase/Home/UIHomeBase";
import AdKitCommon from "../../../../Common/AdKit/AdKitCommon";
import AppVersion from "../../../../Common/AppVersion/AppVersion";
import PrefabCache from "../../../../Common/Cache/PrefabCache";
import ConfigPrefab from "../../../../Common/Config/ConfigPrefab";
import Debug from "../../../../Common/Debug";
import Device from "../../../../Common/Device";
import Language from "../../../../Common/Language/Language";
import PopUpManager from "../../../../Common/UIKit/PopUp/PopUpManager";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind";
import GameLevelParse from "../../Data/GameLevelParse";
import GameLearnViewController from "../Game/Learn/GameLearnViewController";




export default class UIHomeMerge extends UIHomeBase {


    /** @prop {name:nodeImageLogo,type:Node}*/
    nodeImageLogo: Laya.Node;

    /** @prop {name:nodeTextTitle,type:Node}*/

    imageLogo: UIImage;

    btnMerge: UIButton;

    btnLearn: UIButton;
 

    onAwake() {
        super.onAwake();
        Debug.Log("UIHomeMerge uiButton  set click");

        this.LoadSideBar();
        this.LoadCenterBar();

        // var button = UIFind.Find(this.node, "Button");
        // if(button!=null)
        {
            this.btnMerge = UIFind.FindUI(this.node, "BtnMerge",UIButton);
            this.btnMerge.SetClick(this, this.OnBtnClickPlay.bind(this));
        }
        {
            this.btnLearn = UIFind.FindUI(this.node, "btnLearn",UIButton);
            this.btnLearn.SetClick(this, this.OnBtnClickLearn.bind(this));
        }


        this.imageLogo = this.nodeImageLogo.getComponent(UIImage);


        var info = GameLevelParse.main.GetLastItemInfo();
        var pic = GameLevelParse.main.GetImagePath(info.id);
        Debug.Log("UIHomeMerge pic=" + pic);
        this.imageLogo.UpdateImage(pic);

        var name = Language.main.GetString("APP_NAME");
        if (Device.main.isLandscape) {
            name = Language.main.GetString("APP_NAME_HD");
        }
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


       
    }



    onStart() {
        super.onStart();
        this.LayOut();

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

        this.btnLearn.visible = true;  

        this.btnLearn.keyText = "HomeBtnLearn";
        this.btnMerge.keyText = "HomeBtnMerge";
        if (AppVersion.appCheckHasFinished)
        {
            this.btnLearn.visible = false;
            this.btnMerge.keyText = "BtnStartGame";
        }


    }

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


    GotoGame() {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            Debug.Log("GotoGame GameViewController");
            navi.Push(GameViewController.main);
        } else {
            Debug.Log("GotoGame controller = null");
        }
    }



    onMouseDown(e) {
        console.log("UIHomeMerge onMouseDown " + this.owner.name + " mouseX=" + e.mouseX + " stageX=" + e.stageX + " stageY=" + e.stageY);
    }
    onMouseMove(e) {
        console.log("UIHomeMerge onMouseMove");
    }
    onMouseUp(e) {
        // console.log("抬起");
        console.log("UIHomeMerge onMouseUp " + this.owner.name);
    }
    onMouseOut(e) {
        console.log("UIHomeMerge onMouseOut 移出");
    }
    onMouseOver(e) {
        console.log("UIHomeMerge onMouseOver 进入");
    }

}


