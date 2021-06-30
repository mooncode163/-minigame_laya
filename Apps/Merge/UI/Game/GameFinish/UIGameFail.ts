import GameManager from "../../../../../AppBase/Game/GameManager";
import LevelData from "../../../../../AppBase/Game/LevelData";
import UIViewPop from "../../../../../Common/UIKit/PopUp/UIViewPop";
import UIText from "../../../../../Common/UIKit/UIText/UIText";

 

 
export default class UIGameFail extends UIViewPop {
 
    textTitle: UIText | null = null; 
 
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


