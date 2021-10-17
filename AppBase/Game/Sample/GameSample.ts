import GameData from "../../../Apps/Ladder/Data/GameData";
import UIImage from "../../../Common/UIKit/UIImage/UIImage";
import GameBase from "../GameBase";

 


export default class GameSample extends GameBase {

    nodeDeadline: Laya.Node | null = null;

    imageProp: UIImage | null = null;
 

    // static _main: GameSample;
    // //静态方法
    // static get main() {
    //     return this._main;
    // }
    onAwake() {
        super.onAwake();
        // GameSample._main = this;
        GameData.main.game = this;

    
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


