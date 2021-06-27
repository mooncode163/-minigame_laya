import { AdType } from "../../Common/AdKit/AdConfig/AdInfo";
import AdKitCommon from "../../Common/AdKit/AdKitCommon";
import AdInsert from "../../Common/AdKit/Insert/AdInsert";
import PrefabCache from "../../Common/Cache/PrefabCache";
import Debug from "../../Common/Debug";
import Source from "../../Common/Source";
import UIViewController from "../../Common/UIKit/ViewController/UIViewController";
import UIHomeBase from "./UIHomeBase";
import Config from "../../Common/Config/Config";
import ResManager from "../../Common/Res/ResManager";
import AppSceneUtil from "../Common/AppSceneUtil";



export default class HomeViewController extends UIViewController {

    uiPrefab: Laya.Prefab;
    ui: UIHomeBase;
    runCount = 0;

    static _main: HomeViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new HomeViewController();
        }
        return this._main;
    }

    ViewDidLoad() {
        Debug.Log("HomeViewController ViewDidLoad");
        super.ViewDidLoad();
        //提前加载game prefab
        // if (!HomeViewController.isGameHasInit) {
        //     var game = GameViewController.main();
        //     game.SetLoadFinishCallBack(this.AppPreLoadDidFinish.bind(this), null);
        // } else {
        //     this.LoadPrefab();
        // }
        this.LoadPrefab();

        var filepath = "Resources/Common/Prefab/UIKit/UIImage/UIImage.prefab";
        ResManager.LoadPrefab(
            {
                filepath: filepath,
                success: (p: any, data: any) => {
                    console.log("load prefab:", data);
                    // AppSceneUtil.main.rootNode.addChild(data.create());
                    var ui = this.uiPrefab.create(); 
                    this.objController.addChild(ui); 
                },
                fail: () => {
                    Debug.Log("AppScene fail=");
                },
            });

    }
    ViewDidUnLoad() {
        Debug.Log("HomeViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LoadPrefab() {
        var key = "UIHome" + Config.main.appType;
        // var key = "UIHomeMerge"
        Debug.Log("HomeViewController LoadPrefab key=" + key);
        PrefabCache.main.Load(
            {
                key: key,
                filepath: "Resources/AppCommon/Prefab/Home/UIHomeMerge.prefab",
                success: (p: any, data: any) => {
                    this.uiPrefab = data;
                    var ui = this.uiPrefab.create(); 
                    this.objController.addChild(ui); 
                    this.CreateUI();

                },
                fail: () => {

                },
            });
    }


    CreateUI() {
        Debug.Log("HomeViewController CreateUI");
        this.CreateUIInternal();

    }
    CreateUIInternal() {
        Debug.Log("HomeViewController CreateUIInternal");

        // this.objController.addChild(this.uiPrefab.create());
        // return;
        // const newNode = instantiate(this.uiPrefab);
        // this.ui = newNode.getComponent(UIHomeBase);
        // this.ui.SetController(this);

        // CloudResViewController.main().Show(null, null);
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
        this.runCount++;
    }

}


