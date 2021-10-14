import UIButton from "../UIKit/UIButton/UIButton";
import UIFind from "../UIKit/ViewController/UIFind";
import UIView from "../UIKit/ViewController/UIView";


export default class UIFrendBoard extends UIView {
    btnBack: UIButton;
    uiFrendList: Laya.WXOpenDataViewer;

    onAwake() {
        super.onAwake();

        {
            this.btnBack = UIFind.FindUI(this.node, "btnBack", UIButton);
            this.btnBack.SetClick(this, this.OnClickBtnBack.bind(this));
        }
        this.uiFrendList = UIFind.Find(this.node, "WXOpenDataViewer") as Laya.WXOpenDataViewer;
        this.LayOut();

    }
    onStart() {
        super.onStart();
        this.LayOut();

        this.Open();
    }

    LayOut() {
        super.LayOut();
        // this.uiFrendList.width = this.contentSize.width;
        // this.uiFrendList.height = this.contentSize.height-160;
    }
    OnClickBtnBack() {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    }
    Open() {

        if (Laya.Browser.onMiniGame) {
            Laya.loader.load(["res/atlas/test.atlas"], Laya.Handler.create(this, () => {
                //使用接口将图集透传到子域
                Laya.MiniAdpter.sendAtlasToOpenDataContext("res/atlas/test.atlas");
            }));
        }


        // sendJsonDataToDataContext
    }
}




