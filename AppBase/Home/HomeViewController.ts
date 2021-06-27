import { AdType } from "../../Common/AdKit/AdConfig/AdInfo";
import { AdKitCommon } from "../../Common/AdKit/AdKitCommon";
import { AdInsert } from "../../Common/AdKit/Insert/AdInsert";
import { PrefabCache } from "../../Common/Cache/PrefabCache";
import Debug from "../../Common/Debug";
import { Source } from "../../Common/Source";
import { UIViewController } from "../../Common/UIKit/ViewController/UIViewController";
import { UIHomeBase } from "./UIHomeBase";

 
export default class HomeViewController extends UIViewController {

    uiPrefab: Prefab;
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
    }
    ViewDidUnLoad() {
        Debug.Log("HomeViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LoadPrefab() {
        var key = "UIHome" + Config.main.appType;
        // var key = "UIHomeMerge"
        Debug.Log("HomeViewController LoadPrefab key="+key);
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
        this.CreateUIInternal();
         
    }
    CreateUIInternal() {
        Debug.Log("HomeViewController CreateUIInternal"); 
        // return;
        const newNode = instantiate(this.uiPrefab);
        this.ui = newNode.getComponent(UIHomeBase);
        this.ui.SetController(this);

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


