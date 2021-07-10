import MusicBgPlay from "../../Common/Audio/MusicBgPlay";
import Common from "../../Common/Common";
import CommonRes from "../../Common/CommonRes";
import Debug from "../../Common/Debug";
import ItemInfo from "../../Common/ItemInfo";
import Language from "../../Common/Language/Language";
import LayOutSize from "../../Common/UIKit/LayOut/LayOutSize";
import AnimateButton from "../../Common/UIKit/UIButton/AnimateButton";
import UIButton from "../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../Common/UIKit/UIImage/UIImage";
import UICellItemBase from "../../Common/UIKit/UITableView/UICellItemBase";
import UIText from "../../Common/UIKit/UIText/UIText";
import UIFind from "../../Common/UIKit/ViewController/UIFind";
import UIView from "../../Common/UIKit/ViewController/UIView";
import LanguageViewController from "./Language/LanguageViewController";
import SettingData, { SettingType } from "./SettingData";
 
 

 
export default class UISettingCellItem extends UIView {  



    textTitle: UIText = null;
    imageBg: UIImage = null;
   
    btnSwitch: UIButton = null;

    info: ItemInfo;

    onAwake() {
        super.onAwake();
        this.imageBg = UIFind.FindUI(this.node, "ImageBg", UIImage,false);
        this.textTitle = UIFind.FindUI(this.node, "textTitle", UIText,false);

        this.btnSwitch = UIFind.FindUI(this.node, "btnSwitch", UIButton);
        this.btnSwitch.SetClick(this, this.OnClickBtnSwitch.bind(this));
       
        var animateButton = this.node.addComponent(AnimateButton);
        animateButton.SetClick(this, this.OnClickItem.bind(this));

        this.LayOut();
        
    }

    onStart() { 
        super.onStart();
        this.UpdateItem();
    } 

 
    OnClickItem() {
        // var uiViewParent = this.GetUIViewParent();//  
   
        var info = SettingData.main.listItem[this.index]; 
        Debug.Log("OnClickItem tag = " + info.tag);
        switch (info.tag) {
            case SettingType.COMMENT:
                {

                }
                break;
            case SettingType.VERSION:
                {

                }
                break;
            case SettingType.LANGUAGE:
                {
                    Debug.Log("OnClickItem LANGUAGE ");
                    if (this.controller != null) {
                        Debug.Log("OnClickItem LANGUAGE 1");
                        var navi = this.controller.naviController;
                        Debug.Log("GotoGame LanguageViewController");
                        navi.Push(LanguageViewController.main);
                    } else {
                        Debug.Log("GotoGame controller = null");
                    }
 
                }
                break;
            case SettingType.BACKGROUND_MUSIC:
                {

                }
                break;
            case SettingType.NOAD:
                {

                }
                break;
            case SettingType.RESTORE_IAP:
                {

                }
                break;

        }
    }


    UpdateItem() { 

        var key = SettingData.main.listImage[this.index%3];
        this.imageBg.UpdateImageByKey(key); 

        var info = SettingData.main.listItem[this.index]; 
        var str = Language.main.GetString(info.keyTitle);
        Debug.Log("UISettingCellItem str="+str+" info.keyTitle="+info.keyTitle);
        this.textTitle.text=str;
        this.btnSwitch.SetActive(false); 
        if (info.tag == SettingType.BACKGROUND_MUSIC) { 
            this.btnSwitch.SetActive(true); 
            var ret = Common.GetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, false);
            this.UpdateBtnSwitch(ret);
        }

        if (info.tag == SettingType.BTN_SOUND) {
            this.btnSwitch.SetActive(true);
            var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);
            this.UpdateBtnSwitch(ret);
        }
 
    }
    UpdateBtnSwitch(isSel) {
        this.btnSwitch.UpdateSwitch(isSel);

    }
 
    OnClickBtnSwitch() {
        var info = SettingData.main.listItem[this.index]; 
        if (info.tag == SettingType.BACKGROUND_MUSIC) {
            var ret = Common.GetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, false);//(AppString.STR_KEY_BACKGROUND_MUSIC);
            Debug.Log("UpdateBtnSwitch read ret=" + ret);
            var v = !ret;
            // var v = true;
            // if (ret == false) {
            //     v = true;
            // } else {
            //     v = false;
            // }

            Debug.Log("UpdateBtnSwitch value=" + v);

            Common.SetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, v);

            this.UpdateBtnSwitch(v);
            if (v) {
                MusicBgPlay.main.PlayBgMusic();
            }
            else {
                MusicBgPlay.main.StopBgMusic();
            }
        }

        if (info.tag == SettingType.BTN_SOUND) {
            var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);//(AppString.STR_KEY_BACKGROUND_MUSIC);
            var v = !ret;
            Common.SetBoolOfKey(CommonRes.KEY_BTN_SOUND, v);
            this.UpdateBtnSwitch(v);
        }


    }

}


