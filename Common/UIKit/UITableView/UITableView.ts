import UIScrollView from "../UIScrollView/UIScrollView";
import UI from "../ViewController/UI";
import UIFind from "../ViewController/UIFind";
import UIView from "../ViewController/UIView";

export default class UITableView extends UIView {

    uiScrollView: UIScrollView;
    onAwake() {
        super.onAwake();
        this.uiScrollView = UIFind.FindUI(this.node, "UIScrollView",UIScrollView);
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



