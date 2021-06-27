import PrefabCache from "../Cache/PrefabCache";
import Debug from "../Debug";
import PopViewController from "../UIKit/ViewController/PopViewController";
import UICloudRes from "./UICloudRes";

 
 
export default class CloudResViewController extends PopViewController {
    uiPrefab: Laya.Prefab;
    ui: UICloudRes;

    static _main: CloudResViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new CloudResViewController();
        }
        return this._main;
    }

    Init() {
        Debug.Log("CloudResViewController Init");
        //  this.LoadPrefab();
    }
    CreateUI() {
        Debug.Log("CloudResViewController CreateUI");
        // var node = instantiate(this.uiPrefab);
        // this.ui = node.getComponent(UICloudRes);
        // this.ui.SetController(this);
    }

    LoadPrefab() {
        var key = "UICloudRes";
        var filepath = "Common/Prefab/CloudRes/UICloudRes.prefab";
        //  ConfigPrefab 还没下载完成
        PrefabCache.main.Load(
            {
                filepath: filepath,
                success: (p: any, data: any) => {
                    this.uiPrefab = data;
                    this.CreateUI();

                },
                fail: () => {

                },
            });
    }

    ViewDidLoad() {
        Debug.Log("CloudResViewController ViewDidLoad");
        super.ViewDidLoad();
        this.LoadPrefab();
    }
    ViewDidUnLoad() {
        Debug.Log("CloudResViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LayOut() {


    }

    Close() {

        // ImageRes.main.LoadCloudConfig(
        //     {
        //         success: (p: any) => {
        //             super.Close();
        //         },
        //         fail: () => {
        //             super.Close();
        //         },
        //     }); 
        super.Close();
    }


}


