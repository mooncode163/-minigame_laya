 
import PrefabCache from "../../Common/Cache/PrefabCache";
import Common from "../../Common/Common";
import CommonRes from "../../Common/CommonRes";
import ImageRes from "../../Common/Config/ImageRes";
import Debug from "../../Common/Debug";
import UIButton from "../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../Common/UIKit/UIImage/UIImage";
import UIText from "../../Common/UIKit/UIText/UIText";
import UIFind from "../../Common/UIKit/ViewController/UIFind";
import UIView from "../../Common/UIKit/ViewController/UIView";
import UIHomeAppCenter from "./UIHomeAppCenter";




export default class UIHomeBase extends UIView {

    textTitle: UIText = null;
    /** @prop {name:nodeTextTitle,type:Node}*/
    nodeTextTitle: Laya.Node;

    imageBg: UIImage = null;


    uiAppCenter: UIHomeAppCenter;

    // UIHomeCenterBar
    uiCenterBar: any;

    // UIHomeSideBar
    uiSideBar: any;

    onAwake() {
        super.onAwake();
        if (this.nodeTextTitle != null) {
            Debug.Log("UIHomeBase nodeTextTitle is not null");
            this.textTitle = this.nodeTextTitle.getComponent(UIText);
            if (this.nodeTextTitle == null) {
                Debug.Log("UIHomeBase textTitle is null");
            } else {
                Debug.Log("UIHomeBase textTitle is not null");
            }

        } else {
            Debug.Log("UIHomeBase nodeTextTitle is null");
        }

        this.imageBg = UIFind.FindUI(this.node, "imageBg", UIImage);
        // this.imageBg.image.renderingOrder = -1;
    }

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



    static UpdateBtnMusic(btn: UIButton) {
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, false);

        if (btn != null) {
            btn.UpdateSwitch(ret);
        }
    }
    static UpdateBtnSound(btn: UIButton) { 
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);
        if (btn != null) {
            btn.UpdateSwitch(ret);
        }
    }

}


