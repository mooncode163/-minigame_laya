

import Common from "../../Common/Common";
import Debug from "../../Common/Debug";
import FileUtil from "../../Common/File/FileUtil";
import UIViewPop from "../../Common/UIKit/PopUp/UIViewPop";
import UIButton from "../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../Common/UIKit/UIImage/UIImage";
import UIText from "../../Common/UIKit/UIText/UIText";
import UITextView from "../../Common/UIKit/UITextView/UITextView";
import UIFind from "../../Common/UIKit/ViewController/UIFind";
import Config from "../../Common/Config/Config";
import ResManager from "../../Common/Res/ResManager";
import LocalStorage from "../../Common/Core/LocalStorage";
import GameManager from "../Game/GameManager";


export default class UIPrivacy extends UIViewPop {
    oneCellNum = 1;
    heightCell = 160;
    btnYes: UIButton = null;
    btnNo: UIButton = null;
    textTitle: UIText = null;
    uiTextView: UITextView = null;
    imageBg: UIImage = null;


    onAwake() {
        super.onAwake();
        this.uiTextView = UIFind.FindUI(this.node, "UITextView", UITextView);

        {
            this.btnYes = UIFind.FindUI(this.node, "BtnYes", UIButton);
            this.btnYes.SetClick(this, this.OnClickBtnYes.bind(this));
        }


        {
            this.btnNo = UIFind.FindUI(this.node, "btnNo", UIButton);
            this.btnNo.SetClick(this, this.OnClickBtnNo.bind(this));
        }
    }


    onStart() {
        // [3]
        super.onStart();


        // this.uiScrollView.Reload();
        this.LayOut();

        this.StartParsePrivacy();
    }
    StartParsePrivacy() {
        var filepath = Common.RES_CONFIG_DATA_COMMON + "/Privacy/" + Config.main.PrivacyPolicy;
        ResManager.LoadText(
            {
                filepath: filepath,
                success: (p: any, data: string) => {
                    this.uiTextView.text = data;
                    this.LayOut();
                },
                fail: () => {

                },
            });

    }


    LayOut() {
        super.LayOut();
    }


    OnClickBtnYes() {
        LocalStorage.SetBool(GameManager.KEY_DISABLE_UIPRIVACY, true);
        this.Close();

        //  Common.OnPrivacyFinish();
    }
    OnClickBtnNo() {
        this.Close();
        // Application.Quit();
    }


}


