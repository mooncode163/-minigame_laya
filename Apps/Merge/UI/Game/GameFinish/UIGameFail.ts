import { GameManager } from "../../../../../AppBase/Game/GameManager";
import { LevelData } from "../../../../../AppBase/Game/LevelData";
import { UIViewPop } from "../../../../../Common/UIKit/PopUp/UIViewPop";
import UIText from "../../../../../Common/UIKit/UIText/UIText";

 
export default class UIGameFail extends UIViewPop {

    @type(UIText)
    textTitle: UIText | null = null; 

    @type(UIText)
    textMsg: UIText | null = null; 
  

    onAwake() {
        super.onAwake();
        this.LayOut();
 
    }
    onStart() {
        super.onStart();
        this.LayOut();


    }

    LayOut() {
        super.LayOut();
    }


    OnClickBtnAgain(event: Event, customEventData: string) {
        this.Close();
        LevelData.main.gameLevel = 0;
        LevelData.main.gameLevelFinish = -1;
        GameManager.main.GotoPlayAgain();
    }


}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
