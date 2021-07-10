import PrefabCache from "../Cache/PrefabCache";
import ConfigPrefab from "../Config/ConfigPrefab";
import Debug from "../Debug";
import PopViewController from "../UIKit/ViewController/PopViewController";
import UI from "../UIKit/ViewController/UI";
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
   
    LoadPrefab() { 
        var key = "UICloudRes"

        // ConfigPrefab 还没有预先加载 不能用 LoadByKey 直接用路径 filepath
        // var filepath = ConfigPrefab.main.GetPrefab(key);
        // Debug.Log("CloudResViewController filepath="+filepath);
        PrefabCache.main.Load(
            {
                key: key,
                filepath: "Resources/Common/Prefab/CloudRes/UICloudRes.prefab",
                success: (p: any, data: any) => {
                    this.uiPrefab = data;
                    this.CreateUI();
                },
                fail: () => {

                },
            });
    }


    CreateUI() { 
        var node = UI.Instantiate(this.uiPrefab);
        this.ui = node.getComponent(UICloudRes);
        this.ui.SetController(this);
 
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
        super.Close();
    }


}


