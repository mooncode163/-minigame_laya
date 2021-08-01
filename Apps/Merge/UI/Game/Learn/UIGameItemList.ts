import AppSceneBase from "../../../../../AppBase/Common/AppSceneBase";
import SettingData from "../../../../../AppBase/Setting/SettingData";
import UISettingCellItem from "../../../../../AppBase/Setting/UISettingCellItem";
import PrefabCache from "../../../../../Common/Cache/PrefabCache";
import Debug from "../../../../../Common/Debug";
import UIViewPop from "../../../../../Common/UIKit/PopUp/UIViewPop";
import UIButton from "../../../../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../../../../Common/UIKit/UIImage/UIImage";
import IUIScrollView from "../../../../../Common/UIKit/UIScrollView/IUIScrollView";
import UIScrollView from "../../../../../Common/UIKit/UIScrollView/UIScrollView";
import TableView from "../../../../../Common/UIKit/UITableView/TableView";
import UICellItemBase from "../../../../../Common/UIKit/UITableView/UICellItemBase";
import UITableView from "../../../../../Common/UIKit/UITableView/UITableView";
import UIText from "../../../../../Common/UIKit/UIText/UIText";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIFind from "../../../../../Common/UIKit/ViewController/UIFind";
import UIView from "../../../../../Common/UIKit/ViewController/UIView";
import GameLearnData from "./GameLearnData";
import UIGameItemListCell from "./UIGameItemListCell";
export default class UIGameItemList extends UIViewPop implements IUIScrollView {


    btnClose: UIButton;
    textTitle: UIText;
    cellItemPrefab: Laya.Prefab;
    cellPrefab: Laya.Prefab;
    // public TableView tableView;
    uiTableView: UITableView;
    // uiScrollView: UIScrollView;
    imageBar: UIImage;
    // public RawImage imageBg;
    numRows = 0;
    numInstancesCreated = 0;

    oneCellNum = 0;
    heightCell = 0;
    totalItem = 0;
    listItem: any[] = [];

    // Language languagePlace;
    // HttpRequest httpReqLanguage;
    indexClick = 0;

    onAwake() {
        super.onAwake();
        this.textTitle = UIFind.FindUI(this.node, "textTitle", UIText);
        this.uiTableView = UIFind.FindUI(this.node, "UITableView", UITableView);
        // this.uiScrollView = UIFind.FindUI(this.node, "UIScrollView", UIScrollView);


        {
            this.btnClose = UIFind.FindUI(this.node, "btnClose", UIButton);
            this.btnClose.SetClick(this, this.OnClickBtnBack.bind(this));
        }

        this.heightCell = 192;
    }
    onStart() {
        super.onStart();
        this.uiTableView.uiScrollView.delegate = this;
        this.LoadPrefab();
    }

    LoadPrefab() {
        var key = "UIGameItemListCell";
        // key = "UISettingCellItem";
        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    this.cellItemPrefab = data;
                    for (var i = 0; i < GameLearnData.main.listItem.length; i++) {
                        var node = UI.Instantiate(this.cellItemPrefab);
                        var ui = node.getComponent(UIGameItemListCell);
                        ui.index = i;
                        this.uiTableView.uiScrollView.Add(ui);
                    }

                },
                fail: () => {

                },
            });
    }
    LayOut() {
        super.LayOut();
    }
    OnScrollViewDidClickItem(uiScroll: any, uiItem: any) {
        Debug.Log("UIGameItemList OnScrollViewDidClickItem name=" + uiItem.owner.name + " index=" + uiItem.index);

        var uiCell = uiItem as UIGameItemListCell;
        if (uiCell != null) {
            // uiCell.OnClickItem();
        }
        this.GotoGame(uiItem.index);
        this.Close();
    }

    OnClickBtnBack() {
        this.Close();
    }
    GotoGame(idx) {
        GameLearnData.main.indexItem = idx;
        // this.Close();
    }
    // OnCellItemDidClick(item) {

    //     this.GotoGame(item.index);
    // }
    UpdateTable(isLoad) {
        // Vector2 sizeCanvas = AppSceneBase.main.sizeCanvas;

        // oneCellNum = 1; 
        // total = listItem.Count;
        // totalItem = total;
        // Debug.Log("uiguanka total:" + total + " oneCellNum=" + oneCellNum + " heightCell=" + heightCell);
        // numRows = total / oneCellNum;
        // if (total % oneCellNum != 0) {
        //     numRows++;
        // }

        // if (isLoad) {
        //     tableView.ReloadData();
        // }

    }
    /*

    AddCellItem(cell, tableView, row) {
        Rect rctable = (tableView.transform as RectTransform).rect;

        for (i = 0; i < oneCellNum; i++) {
            itemIndex = row * oneCellNum + i;
            float cell_space = 10;
            UICellItemBase item = (UICellItemBase)GameObject.Instantiate(cellItemPrefab);
            //item.itemDelegate = this;
            Rect rcItem = (item.transform as RectTransform).rect;
            item.width = (rctable.width - cell_space * (oneCellNum - 1)) / oneCellNum;
            item.height = heightCell;
            item.transform.SetParent(cell.transform, false);
            item.index = itemIndex;
            item.totalItem = totalItem;
            item.callbackClick = OnCellItemDidClick;

            cell.AddItem(item);

        }
    }

    //Will be called by the TableView to know how many rows are in this table
    GetNumberOfRowsForTableView(tableView) {
        return this.numRows;
    }

    //Will be called by the TableView to know what is the height of each row
    GetHeightForRow(tableView, row) {
        return this.heightCell;
        //return (cellPrefab.transform as RectTransform).rect.height;
    }

    //Will be called by the TableView when a cell needs to be created for display
    TableViewCell GetCellForRow ableView(tableView, row) {
        UICellBase cell = tableView.GetReusableCell(cellPrefab.reuseIdentifier) as UICellBase;
        if (cell == null) {
            cell = (UICellBase)GameObject.Instantiate(cellPrefab);
            cell.name = "UICellBase" + (++numInstancesCreated).ToString();
            Rect rccell = (cellPrefab.transform as RectTransform).rect;
            Rect rctable = (tableView.transform as RectTransform).rect;
            Vector2 sizeCell = (cellPrefab.transform as RectTransform).sizeDelta;
            Vector2 sizeTable = (tableView.transform as RectTransform).sizeDelta;
            Vector2 sizeCellNew = sizeCell;
            sizeCellNew.x = rctable.width;

            AddCellItem(cell, tableView, row);

        }
        cell.totalItem = totalItem;
        if (oneCellNum != cell.oneCellNum) {
            //relayout
            cell.ClearAllItem();
            AddCellItem(cell, tableView, row);
        }
        cell.oneCellNum = oneCellNum;
        cell.rowIndex = row;
        cell.UpdateItem(listItem);
        return cell;
    }


    */
}


