import GameManager from "../../../../../AppBase/Game/GameManager";
import LevelData from "../../../../../AppBase/Game/LevelData";
import AdKitCommon from "../../../../../Common/AdKit/AdKitCommon";
import UIViewPop from "../../../../../Common/UIKit/PopUp/UIViewPop";
import UIButton from "../../../../../Common/UIKit/UIButton/UIButton";
import UIText from "../../../../../Common/UIKit/UIText/UIText";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIFind from "../../../../../Common/UIKit/ViewController/UIFind";




export default class UIGameFail extends UIViewPop {

    textTitle: UIText | null = null;

    textDetail: UIText | null = null;

    btnRevive: UIButton;
    btnRestart: UIButton;

    btnClose: UIButton;
    onAwake() {
        super.onAwake();
        // UI.SetNodePivotCenter(this.node);
        var button = UIFind.Find(this.node, "Button");
        {
            this.btnRevive = UIFind.FindUI(button, "BtnRevive",UIButton);
            this.btnRevive.SetClick(this, this.OnClickBtnRevive.bind(this));
        }
        {
            this.btnRestart = UIFind.FindUI(button, "BtnRestart",UIButton);
            this.btnRestart.SetClick(this, this.OnClickBtnRestart.bind(this));
        }

        {
            this.btnClose = UIFind.FindUI(this.node, "BtnClose",UIButton);
            this.btnClose.SetClick(this, this.OnClickBtnClose.bind(this));
        }

        this.LayOut();

    }
    onStart() {
        super.onStart();
        this.LayOut();


    } 
    
    LayOut() {
        super.LayOut();
    }
    OnClickBtnRevive() {
        // AdKitCommon.main.callbackAdVideoFinish = OnAdKitAdVideoFinish;
        AdKitCommon.main.ShowAdVideo();
    }

    OnClickBtnRestart() {
        this.Close();
        LevelData.main.gameLevel = 0;
        LevelData.main.gameLevelFinish = -1;
        GameManager.main.GotoPlayAgain();
    }
    OnClickBtnClose() {
        this.Close(); 
    }


}


