import UIView from "../../../../Common/UIKit/ViewController/UIView";
import GameData from "../../Data/GameData";
 
 
export default class BoardLine extends UIView {
    
    onLoad () {
        super.onAwake();
        this.keyId = GameData.NameBoardLine;
    }
    start () {
        super.onStart();
    }
    
 

}


