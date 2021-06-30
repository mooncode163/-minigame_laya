import AppSceneBase from "../../../AppBase/Common/AppSceneBase";
import Common from "../../Common";
import Debug from "../../Debug"; 
import UIViewPop from "../PopUp/UIViewPop";
import UIButton from "../UIButton/UIButton";
import UIImage from "../UIImage/UIImage";
import UIText from "../UIText/UIText";

 
export default class UIViewAlert extends UIViewPop {
    imageBg: UIImage;
    textTitle: UIText;
    textMsg: UIText;
    btnYes: UIButton;
    btnNo: UIButton;
    keyName: string = "";

    //callback(UIViewAlert alert, bool isYes);
    callback = null;
    onAwake() {
        super.onAwake();

        this.LayOut();
    }

    LayOut() {
        var ratio = 0.8;
        var x, y, w, h;
        super.LayOut();
        {
            ratio = 0.8;
            var size = Common.sizeCanvas;
            var ratio = 0.8;
            //显示异常
            //this.node.setContentSize(size * ratio);
            //显示异常

            w = Math.min(size.width, size.height) * ratio;
            h = w * 9 / 16;
            // h = w / 2;
            Debug.Log("UIViewAlert setContentSize = w=" + w + " h=" + h);
            this.SetContentSize(w, h);

            super.LayOut();
        }
    }
    SetText(title, msg, yes, no) {
        //Debug.Log("SetText title ="+title+" msg="+msg);
        this.textTitle.text = title;
        this.textMsg.text = msg;

        this.btnYes.enableFitTextSize = true;
        this.btnYes.text = yes;

        this.btnNo.enableFitTextSize = true;
        this.btnNo.text = no;


    }

    ShowBtnNo(isShow) {
        this.btnNo.owner.active = isShow;
    }
    OnClickBtnYes() {
        this.Remove();
        if (this.callback != null) {
            this.callback(this, true);
        }

    }


    OnClickBtnNo() {
        this.Remove();
        if (this.callback != null) {
            this.callback(this, false);
        }
    }

    Remove() {
        // if (this.node != null) {
        //     this.node.destroy();
        //     //this.node = null;
        // }
        this.Close();
    }

    Hide() {
        this.Remove();
    }

}



