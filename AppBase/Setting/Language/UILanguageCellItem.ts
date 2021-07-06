import Common from "../../../Common/Common";
import CommonRes from "../../../Common/CommonRes";
import Debug from "../../../Common/Debug";
import ItemInfo from "../../../Common/ItemInfo";
import Language from "../../../Common/Language/Language";
import UIImage from "../../../Common/UIKit/UIImage/UIImage";
import UICellItemBase from "../../../Common/UIKit/UITableView/UICellItemBase";
import UIText from "../../../Common/UIKit/UIText/UIText";
import AppSceneUtil from "../../Common/AppSceneUtil";
import UILanguage from "./UILanguage";

 

 
export default class UILanguageCellItem extends UICellItemBase {

    listImage: string[] = ["IMAGE_CELL_BG_BLUE", "IMAGE_CELL_BG_ORINGE", "IMAGE_CELL_BG_YELLOW"];
 
    textTitle: UIText = null;
 
    imageBg: UIImage = null; 

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
        var lan =Language.main;
       Debug.Log("language id= " + this.info.id);
        lan.SetLanguage(this.info.id);
        AppSceneUtil.main.UpdateLanguage();

       Common.SetItemOfKey(CommonRes.KEY_LANGUAGE, this.info.id); 
       UILanguage.main.OnClickBtnBack(null,null);
    }
    UpdateItem(info) {
        Debug.Log("UISettingCellItem UpdateItem info.title=" + info.title);
        this.textTitle.text = info.title; 

    }
 


}


