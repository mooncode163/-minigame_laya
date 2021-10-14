import GameBase from "../../../../AppBase/Game/GameBase";
import UIHand from "./Hand/UIHand";

 

export default class GameLadder extends GameBase {

    uIHand: UIHand; 
 

    static _main: GameLadder;
    //静态方法
    static get main() {
        return this._main;
    }
    onAwake() {
        super.onAwake();
        GameLadder._main = this; 

    
    }
    onStart() {
        super.onStart();
        this.LayOut();
    }
    LayOut() {
        super.LayOut();
    }
    UpdateLevel(level: number) {
        super.UpdateLevel(level);
    }




    LoadPrefab() {
         

        

    }
 
}


