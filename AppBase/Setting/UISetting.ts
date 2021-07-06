import Common from "../../Common/Common";
import ItemInfo from "../../Common/ItemInfo";
import Language from "../../Common/Language/Language";
import Platform from "../../Common/Platform";
import UIImage from "../../Common/UIKit/UIImage/UIImage";
import UITableView from "../../Common/UIKit/UITableView/UITableView";
import UIText from "../../Common/UIKit/UIText/UIText";
import UIView from "../../Common/UIKit/ViewController/UIView";

 
 
export enum SettingType {
    COMMENT =0,//0
    VERSION,//1
    LANGUAGE,//2
    BACKGROUND_MUSIC,//3
    BTN_SOUND,
    NOAD,
    RESTORE_IAP,
    LAST,
} 

 
export default class UISetting extends UIView { 
    oneCellNum = 1;
    heightCell = 160;
    listItem: ItemInfo[] = [];
 
    textTitle: UIText = null;
 
    imageBg: UIImage = null;
 
    uiTableView: UITableView = null;



    onAwake() {
        super.onAwake();

        this.UpdateItem();

    }

    UpdateItem() {
        this.listItem.length = 0;
        //if (AppVersion.main().appCheckHasFinished)
        // if (sys.isNative) {
        //     var info = new ItemInfo();
        //     info.title = Language.main.GetString("STR_SETTING_COMMENT");
        //     info.tag = SettingType.COMMENT;
        //     this.listItem.push(info);
        // }
        //if (AppVersion.main().appCheckHasFinished)
        // if (sys.isNative) {
        //     var info = new ItemInfo();
        //     var strversin = Common.GetAppVersion();
        //     var str = Language.main.GetString("STR_SETTING_VERSION") + "(" + strversin + ")";
        //     info.title = str;
        //     info.tag = SettingType.VERSION;
        //     this.listItem.push(info);
        // }

        {
            var info = new ItemInfo();
            info.title = Language.main.GetString("STR_SETTING_LANGUAGE");
            info.tag = SettingType.LANGUAGE;
            this.listItem.push(info);
        }

        var isHasBgMusic = true;
        // if (Config.main.appType == AppType.SHAPECOLOR) {
        //     isHasBgMusic = false;
        // }
        if (isHasBgMusic) {
            var info = new ItemInfo();
            info.title = Language.main.GetString("STR_SETTING_BACKGROUND_MUSIC");
            info.tag = SettingType.BACKGROUND_MUSIC;
            this.listItem.push(info);
        }

        {
            var info = new ItemInfo();
            info.title = Language.main.GetString("STR_SETTING_BTN_SOUND");
            info.tag = SettingType.BTN_SOUND;
            // this.listItem.push(info);
            // this.listItem.push(info);
            // this.listItem.push(info);
            // this.listItem.push(info);
            // this.listItem.push(info);
            // this.listItem.push(info);
            // this.listItem.push(info);
            // this.listItem.push(info);

            this.listItem.push(info);
        }

        // if (sys.isNative) {


        //     if (Config.main.isHaveRemoveAd) {
        //         var info = new ItemInfo();
        //         info.title = Language.main.GetString("STR_BTN_NOAD");
        //         info.tag = SettingType.NOAD;
        //         this.listItem.push(info);
        //     }
        //     if (Platform.isiOS && Config.main.isHaveRemoveAd) {
        //         var info = new ItemInfo();
        //         info.title = Language.main.GetString("STR_BTN_RESTORE_NOAD");
        //         info.tag = SettingType.RESTORE_IAP;
        //         this.listItem.push(info);
        //     }
        // }
        this.InitList();
    } 
    LayOut() {
        super.LayOut();
    }
    OnBtnClickBack(event: Event, customEventData: string) {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    }

    InitList() {
        // this.uiTableView.tableView.oneCellNum = this.oneCellNum;
        // this.uiTableView.tableView.cellHeight = 256;
        // this.uiTableView.tableView.uiViewParent = this;
        // this.uiTableView.tableView.initTableView(this.listItem.length, { array: this.listItem, target: this });
    }
    //下一页(pageview下有效)
    nextPage() {
        //this.tableView.getComponent(tableView).scrollToNextPage();
    }
    //上一页(pageview下有效)
    lastPage() {
        // this.tableView.getComponent(tableView).scrollToLastPage();
    }

}


