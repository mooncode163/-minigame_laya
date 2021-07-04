 
import SettingViewController from "../../../../AppBase/Setting/SettingViewController";
import Share from "../../../../Common/Share/Share";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UI from "../../../../Common/UIKit/ViewController/UI";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind";
import UIView from "../../../../Common/UIKit/ViewController/UIView";

 

 
export default class UIHomeSideBar extends UIView {
        /** @prop {name:uiButton,type:Node}*/
        uiButton: Laya.Node;
        
        btnMusic:UIButton;
        btnSetting:UIButton;

    onAwake() {
        super.onAwake(); 
        this.btnMusic = UIFind.FindButton(this.node,"BtnMusic");
        this.btnMusic.SetClick(this, this.OnBtnClickMusic.bind(this));
   
        this.btnSetting = UIFind.FindButton(this.node,"BtnSetting");
        this.btnSetting.SetClick(this, this.OnBtnClickSetting.bind(this));

    }
    onStart() { 
        super.onStart();
        this.LayOut();
    }
    LayOut () { 
        super.LayOut();
  
    }
    OnBtnClickMusic() {
    
    }

    OnBtnClickShare() {
        // Share.main.ShareImageText("", Config.main.shareTitle, Config.main.shareUrl, "");
    }
    OnBtnClickSetting() {
        if (this.controller != null) {
            var navi = this.controller.naviController; 
            navi.Push(SettingViewController.main);
        } 
    }
}


