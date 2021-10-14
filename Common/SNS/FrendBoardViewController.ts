import GameManager from "../../AppBase/Game/GameManager";
import UIHomeBase from "../../AppBase/Home/UIHomeBase";
import { AdType } from "../AdKit/AdConfig/AdInfo";
import AdKitCommon from "../AdKit/AdKitCommon";
import AdInsert from "../AdKit/Insert/AdInsert";
import PrefabCache from "../Cache/PrefabCache";
import LocalStorage from "../Core/LocalStorage";
import Debug from "../Debug";
import Platform from "../Platform";
import Source from "../Source";
import PopUpManager from "../UIKit/PopUp/PopUpManager";
import UI from "../UIKit/ViewController/UI";
import UIViewController from "../UIKit/ViewController/UIViewController";
import UIFrendBoard from "./UIFrendBoard";

 


export default class FrendBoardViewController extends UIViewController {

    uiPrefab: Laya.Prefab;
    ui: UIFrendBoard;
    runCount = 0;

    static _main: FrendBoardViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new FrendBoardViewController();
        }
        return this._main;
    }

    ViewDidLoad() {
        Debug.Log("FrendBoardViewController ViewDidLoad");
        super.ViewDidLoad(); 
        this.LoadPrefab();
    }
    ViewDidUnLoad() {
        Debug.Log("FrendBoardViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LoadPrefab() {
        var key = "UIFrendBoard"; 
        PrefabCache.main.LoadByKey(
            {
                key: key, 
                success: (p: any, data: any) => {
                    this.uiPrefab = data;

                    this.CreateUI();

                },
                fail: () => {

                },
            });
    }


    CreateUI() {
        Debug.Log("HomeViewController CreateUI");
// return;
        var node = UI.Instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIFrendBoard);
        this.ui.SetController(this);

        // CloudResViewController.main().Show(null, null);

        if (this.runCount == 0) {
            this.ShowPrivacy();
        }

        this.runCount++;
    }

    ShowAd() {
        if (this.runCount == 0) {
            //至少在home界面显示一次视频广告
            // AdKitCommon.main.callbackAdVideoFinish = OnAdKitAdVideoFinish;
            // if (uiHome != null) {
            //     uiHome.OnClickBtnAdVideo();
            // }

            // 至少在home界面显示一次开机插屏
            var type = AdType.INSERT;
            var source = Source.GDT;
            AdInsert.main.InitAd(source);
            AdKitCommon.main.ShowAdInsert(100);

        }
    }

    ShowPrivacy() {
        // if (GameManager.main.isLoadGameScreenShot)
        // {
        //     return;
        // }

        if (!Platform.isHuawei) {
            this.ShowAd();
            return;
        }

        if (LocalStorage.GetBool(GameManager.KEY_DISABLE_UIPRIVACY)) {
            this.ShowAd();
            return;
        }

        PopUpManager.main.ShowByKey(
            {
                key: "UIPrivacy",
                open: (ui: any) => {
                },
                close: (ui: any) => {
                    this.ShowAd();
                },
            });
    }

}


