import ItemInfo from "../../../Common/ItemInfo";
import { SysLanguage } from "../../../Common/Language/LanguageUtil";
import UIImage from "../../../Common/UIKit/UIImage/UIImage";
import UITableView from "../../../Common/UIKit/UITableView/UITableView";
import UIText from "../../../Common/UIKit/UIText/UIText";
import UIView from "../../../Common/UIKit/ViewController/UIView";

 

 
export default class UILanguage extends UIView { 
    oneCellNum = 1;
    heightCell = 160;
    listItem: ItemInfo[] = [];
 
    textTitle: UIText = null;
 
    imageBg: UIImage = null;
 
    uiTableView: UITableView = null;

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

    }

    UpdateItem() {
        this.listItem.length = 0;
        {
            var info = new ItemInfo();
            info.title = "中文";
            info.id = SysLanguage.CN;
            this.listItem.push(info);
        }
        {
            var info = new ItemInfo();
            info.title = "English";
            info.id = SysLanguage.EN;
            this.listItem.push(info);
        }
        this.InitList();
    } 
    LayOut() {
        super.LayOut();
    }
    OnClickBtnBack(event: Event, customEventData: string) {
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


