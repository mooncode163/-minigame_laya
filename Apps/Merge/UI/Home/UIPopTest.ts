import Debug from "../../../../Common/Debug";
import UIViewPop from "../../../../Common/UIKit/PopUp/UIViewPop";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UIView from "../../../../Common/UIKit/ViewController/UIView";

 
export default class UIPopTest extends UIViewPop {
    btnClose: Laya.Button;
    onAwake() {
        super.onAwake(); 

        // UIButton.SetClickByNode(this.btnClose,this, function (btn:UIButton): void {  
        //     this.OnBtnClickClose();
        // }.bind(this));
         //只用来点击事件  不显示
         this.btnClose = this.owner.getChildByName("BtnClose") as Laya.Button; 
         // this.type = this._type;
         this.btnClose.on(Laya.Event.CLICK, this, this.OnBtnClickClose);
    }

    OnBtnClickClose() {
        this.Close();

    }
}


