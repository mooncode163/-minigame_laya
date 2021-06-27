import UIView from "../../Common/UIKit/ViewController/UIView";

 
export default class GameBase extends UIView {
    gameStatus = 0;
    objGameFinish = null;

    onAwake() {
        super.onAwake(); 
        this.LayOut();
    }
    onStart() {
        super.onStart();
        this.LayOut();
    }
    UpdateLevel (level:number) { 
    } 
    OnGameFail () {
        if (this.objGameFinish != null) {
            if (this.objGameFinish.onFail != null) {
                this.objGameFinish.onFail(this);
            }
        }
    }

    OnGameWin () {
        if (this.objGameFinish != null) {
            if (this.objGameFinish.onWin != null) {
                this.objGameFinish.onWin(this);
            }
        }
    }

}


