import Common from "../../Common/Common";
import ItemInfo from "../../Common/ItemInfo";
 
export default class LevelData {

    placeLevel = 0;
    objGuanka=null;
    static _main: LevelData;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new LevelData();
        }
        return this._main;
    }

    //get 的用法
    get gameLevel() {
        var key = "KEY_GAME_LEVEL_PLACE" + this.placeLevel;
        return Common.GetIntOfKey(key, 0);
    }
    // set 的用法
    set gameLevel(value) {
        var key = "KEY_GAME_LEVEL_PLACE" + this.placeLevel;
        Common.SetItemOfKey(key, value);
    }


    //get 的用法
    get gameLevelFinish() {
        var key = "KEY_GAME_LEVEL_PLACE_FINISH" + this.placeLevel;
        return Common.GetIntOfKey(key, 0);
    }
    // set 的用法
    set gameLevelFinish(value) {
        var key = "KEY_GAME_LEVEL_PLACE_FINISH" + this.placeLevel;
        Common.SetItemOfKey(key, value);
    }
    //get 的用法
    get placeTotal() { 
        return this.listPlace.length;;
    }
   
    listPlace: ItemInfo[] = [];
    Init() {
        //this.ParseGuanka();
    }
 
    GetPlaceItemInfo(idx) {
        // var game = GameViewController.main.gameBase;
        var info = this.listPlace[idx];
        // Debug.Log("GetPlaceItemInfo idx=" + idx + " LevelManager.listPlace.length=" + this.listPlace.length);
        return info;
    }
}


