import PrefabCache from "../../../Common/Cache/PrefabCache";
import ItemInfo from "../../../Common/ItemInfo";
import { SysLanguage } from "../../../Common/Language/LanguageUtil";
import UIButton from "../../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../../Common/UIKit/UIImage/UIImage";
import UIScrollView from "../../../Common/UIKit/UIScrollView/UIScrollView";
import UITableView from "../../../Common/UIKit/UITableView/UITableView";
import UIText from "../../../Common/UIKit/UIText/UIText";
import UI from "../../../Common/UIKit/ViewController/UI";
import UIFind from "../../../Common/UIKit/ViewController/UIFind";
import UIView from "../../../Common/UIKit/ViewController/UIView";
import SettingData from "../SettingData"; 
import UILanguageCellItem from "./UILanguageCellItem";

 

 
export default class UILanguage extends UIView { 
    oneCellNum = 1;
    heightCell = 160;
    btnBack: UIButton = null;
    textTitle: UIText = null;
    uiScrollView: UIScrollView = null;
    imageBg: UIImage = null;

    uiTableView: UITableView = null;

    uiPrefabCell: Laya.Prefab;

    static _main: UILanguage;
    //静态方法
    static get main() {
        if (this._main == null) {
         
        }
        return this._main;
    }

    onAwake() {
        super.onAwake();
        UILanguage._main = this;
        this.UpdateItem();
        this.btnBack = UIFind.FindUI(this.node, "BtnBack", UIButton);
        this.btnBack.SetClick(this, this.OnClickBtnBack.bind(this));

        this.uiScrollView = UIFind.FindUI(this.node, "UIScrollView", UIScrollView);

        this.UpdateItem();
        this.LoadPrefab();
    }
 
    onStart() {
        // [3]
        super.onStart();

 
        // this.uiScrollView.Reload();
        this.LayOut();
    }
    UpdateItem() {
        // SettingData.main.listItem.length = 0;
        {
            var info = new ItemInfo();
            info.title = "中文";
            info.id = SysLanguage.CN;
            SettingData.main.listItemLan.push(info);
        }
        {
            var info = new ItemInfo();
            info.title = "English";
            info.id = SysLanguage.EN;
            SettingData.main.listItemLan.push(info);
        }
        

        // this.uiScrollView.listItem = this.listItem;


    }

    LoadPrefab() {
        var key = "UILanguageCellItem";
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    this.uiPrefabCell = data;
                    for (var i = 0; i < SettingData.main.listItemLan.length; i++) {
                        var node = UI.Instantiate(this.uiPrefabCell);
                        var ui = node.getComponent(UILanguageCellItem);
                        ui.index = i;
                        this.uiScrollView.Add(ui);
                    }

                },
                fail: () => {

                },
            });
    }
    LayOut() {
        super.LayOut();
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

 
