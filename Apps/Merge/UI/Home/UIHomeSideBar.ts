import { SettingViewController } from "../../../../AppBase/Setting/SettingViewController";
import { Share } from "../../../../Common/Share/Share";
import UIView from "../../../../Common/UIKit/ViewController/UIView";

 
export default class UIHomeSideBar extends UIView {
    onAwake() {
        super.onAwake(); 
        // this.LayOut();
    }
    onStart() { 
        super.onStart();
        this.LayOut();
    }
    LayOut () { 
        super.LayOut();
  
    }
    OnBtnClickShare(event: Event, customEventData: string) {
        Share.main.ShareImageText("", Config.main.shareTitle, Config.main.shareUrl, "");
    }
    OnBtnClickSetting(event: Event, customEventData: string) {
        if (this.controller != null) {
            var navi = this.controller.naviController; 
            navi.Push(SettingViewController.main);
        } 
    }
}


