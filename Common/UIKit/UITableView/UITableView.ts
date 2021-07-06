import UI from "../ViewController/UI";
import UIView from "../ViewController/UIView";

export default class UITableView extends UIView {

    tableView: Laya.List;
    onAwake() {
        super.onAwake();
        UI.SetNodePivotCenter(this.owner);


        this.LayOut();

    }

    onStart() {
        // [3]
        super.onStart();
        this.LayOut();
    }

    LayOut() {
        super.LayOut();
        UI.SetNodePivotCenter(this.owner);



    }
}



