import UIHomeCenterBar from "../../Apps/Merge/UI/Home/UIHomeCenterBar";
import UIHomeSideBar from "../../Apps/Merge/UI/Home/UIHomeSideBar";
import PrefabCache from "../../Common/Cache/PrefabCache";
import UIImage from "../../Common/UIKit/UIImage/UIImage";
import UIText from "../../Common/UIKit/UIText/UIText";
import UIView from "../../Common/UIKit/ViewController/UIView";
import UIHomeAppCenter from "./UIHomeAppCenter";

 

 
export default class UIHomeBase extends UIView {
    
    textTitle: UIText = null;

    
    imageBg: UIImage = null;


    uiAppCenter: UIHomeAppCenter;
    uiCenterBar: UIHomeCenterBar;
    uiSideBar: UIHomeSideBar;


    LoadCenterBar() {
        // var strPrefab = "App/Prefab/Home/UIHome" + cc.Config.main().appType;
        var key = "UIHomeCenterBar";

        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    // var node = instantiate(data);
                    // this.uiCenterBar = node.getComponent(UIHomeCenterBar);
                    // this.uiCenterBar.SetParent(this);
                    this.owner.addChild(data.create());
                },
                fail: () => {

                },
            });



    }

    LoadSideBar() {
        var key = "UIHomeSideBar";

        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    // var node = instantiate(data);
                    // this.uiSideBar = node.getComponent(UIHomeSideBar);
                    // this.uiSideBar.SetParent(this);
                    this.owner.addChild(data.create());
                },
                fail: () => {

                },
            });


    }

    LoadPrefabAppCenter() {
        var key = "UIHomeAppCenter";
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    // var node = instantiate(data);
                    this.owner.addChild(data.create());
                    // this.uiAppCenter = node.getComponent(UIHomeAppCenter);
                    // this.uiAppCenter.SetParent(this);

                },
                fail: () => {

                },
            });
    }
}


