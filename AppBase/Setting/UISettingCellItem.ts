import MusicBgPlay from "../../Common/Audio/MusicBgPlay";
import Common from "../../Common/Common";
import CommonRes from "../../Common/CommonRes";
import Debug from "../../Common/Debug";
import ItemInfo from "../../Common/ItemInfo";
import UIButton from "../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../Common/UIKit/UIImage/UIImage";
import UICellItemBase from "../../Common/UIKit/UITableView/UICellItemBase";
import UIText from "../../Common/UIKit/UIText/UIText";
import LanguageViewController from "./Language/LanguageViewController";
import { SettingType } from "./UISetting";

 

 
export default class UISettingCellItem extends UICellItemBase { 

    listImage: string[] = ["IMAGE_CELL_BG_BLUE", "IMAGE_CELL_BG_ORINGE", "IMAGE_CELL_BG_YELLOW"];
 
    textTitle: UIText = null;

  
    imageBg: UIImage = null;
   
    btnSwitch: UIButton = null;

    info: ItemInfo;

    onAwake() {
        super.onAwake();
    }

    init(index, data, reload, group) {
        this.node.active = true;
        this.index = index;
        if (index >= data.array.length) {
            // this.index.string = '越界';
            // this.group.string = group.toString();
            this.node.active = false;
            return;
        }
        this.target = data.target;
        this.info = data.array[index];
        this.UpdateItem(this.info);
        //KEY_BACKGROUND_MUSIC
    }
    OnClickItem() {
        var uiViewParent = this.GetUIViewParent();//  
        Debug.Log("OnClickItem tag = " + this.info.tag);
        switch (this.info.tag) {
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
                    this.GotoController(LanguageViewController.main);
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


    UpdateItem(info) {
        Debug.Log("UISettingCellItem UpdateItem info.title=" + info.title);
        this.textTitle.text = info.title;
        this.btnSwitch.node.active = false;
        if (info.tag == SettingType.BACKGROUND_MUSIC) {
            this.btnSwitch.node.active = true;
            var ret = Common.GetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, false);
            this.UpdateBtnSwitch(ret);
        }

        if (info.tag == SettingType.BTN_SOUND) {
            this.btnSwitch.node.active = true;
            var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);
            this.UpdateBtnSwitch(ret);
        }

        this.UpdateImageBg(this.listImage[this.index % 3]);
    }
    UpdateBtnSwitch(isSel) {
        this.btnSwitch.UpdateSwitch(isSel);

    }

    UpdateImageBg(pic) {
        // this.imageBg.UpdateImageKey(pic);
    }
    OnClickBtnSwitch(event: Event, customEventData: string) {
        if (this.info.tag == SettingType.BACKGROUND_MUSIC) {
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

        if (this.info.tag == SettingType.BTN_SOUND) {
            var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);//(AppString.STR_KEY_BACKGROUND_MUSIC);
            var v = !ret;
            Common.SetBoolOfKey(CommonRes.KEY_BTN_SOUND, v);
            this.UpdateBtnSwitch(v);
        }


    }

}


