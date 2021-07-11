import Common from "../../../Common/Common";
import CommonRes from "../../../Common/CommonRes";
import Debug from "../../../Common/Debug"; 
import Language from "../../../Common/Language/Language";
import AnimateButton from "../../../Common/UIKit/UIButton/AnimateButton"; 
import UIImage from "../../../Common/UIKit/UIImage/UIImage"; 
import UIText from "../../../Common/UIKit/UIText/UIText";
import UIFind from "../../../Common/UIKit/ViewController/UIFind";
import UIView from "../../../Common/UIKit/ViewController/UIView";
import AppSceneUtil from "../../Common/AppSceneUtil"; 
import SettingData from "../SettingData";
 




export default class UILanguageCellItem extends UIView {
    textTitle: UIText = null;
    imageBg: UIImage = null;

    onAwake() {
        super.onAwake();
        this.imageBg = UIFind.FindUI(this.node, "ImageBg", UIImage, false);
        this.textTitle = UIFind.FindUI(this.node, "textTitle", UIText, false);
  
        this.LayOut();

    }

    onStart() {
        super.onStart();
        this.UpdateItem();
    }


    UpdateItem() {

        var key = SettingData.main.listImage[this.index % 3];
        this.imageBg.UpdateImageByKey(key);

        var info = SettingData.main.listItemLan[this.index];
        this.textTitle.text = info.title;


    }
    OnClickItem() {
      
        var lan = Language.main;
        var info = SettingData.main.listItemLan[this.index];
        Debug.Log("language id= " + info.id);
        lan.SetLanguage(info.id);
        AppSceneUtil.main.UpdateLanguage();

        Common.SetItemOfKey(CommonRes.KEY_LANGUAGE, info.id);
        this.OnClickBtnBack();
    }
    OnClickBtnBack() {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    }


}


