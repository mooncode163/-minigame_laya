import LevelData from "../../../AppBase/Game/LevelData";
import Common from "../../../Common/Common";
 
 
export enum GameStatus {
    //区分大小写
    Play = 0,
    Prop,

}
 
 
export default class GameData  {
 
    public static NameDeadLine: string = "DeadLine";
    public static NameBoardLine: string = "BoardLine";
    public static Place_Custom: string = "Custom";

    public static MaxSpeed = 10.0;
    public static MaxBounce = 1.0;
    public static MaxRotation = 360.0;
    public static ShaderCircle:string = "Moonma/ImageCircle";
    
    public isGameFail = false;

    status = GameStatus.Play;
    radiusCustom = 0.4;
    score = 0;

    // GameMerge
    game:any;
    // UIGameMerge
    uiGame:any;

    static _main: GameData;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new GameData();
        }
        return this._main;
    }

    //get 的用法
    get speed() {
        var ret = 0;
        var key = "KEY_GAME_SPEED";
        ret = Common.GetItemOfKey(key, 0);
        return ret;
    }
    // set 的用法
    set speed(value) {
        var key = "KEY_GAME_SPEED";
        Common.SetItemOfKey(key, value);
    }

    //get 的用法
    get rotation() {
        var ret = 0;
        var key = "KEY_GAME_ROTATION";
        ret = Common.GetItemOfKey(key, 0);
        return ret;
    }
    // set 的用法
    set rotation(value) {
        var key = "KEY_GAME_ROTATION";
        Common.SetItemOfKey(key, value);
    }


    //get 的用法
    get bounce() {
        var ret = 0;
        var key = "KEY_GAME_BOUNCE";
        ret = Common.GetItemOfKey(key, 0);
        return ret;
    }
    // set 的用法
    set bounce(value) {
        var key = "KEY_GAME_BOUNCE";
        Common.SetItemOfKey(key, value);
    }

    //  自定义目录
    get CustomImageRootDir() {
        //     string ret = Application.temporaryCachePath + "/CustomImage";
        // FileUtil.CreateDir(ret);
        // return ret;
        return "";
    }



    get HasCustomImage() {
        var ret = 0;
        var key = "KEY_HasCustomImage";
        ret = Common.GetItemOfKey(key, 0);
        return ret;
    }
    // set 的用法
    set HasCustomImage(value) {
        var key = "KEY_HasCustomImage";
        Common.SetItemOfKey(key, value);
    }


    IsCustom() {
        var idx = LevelData.main.placeLevel;
        var infoPlace = LevelData.main.GetPlaceItemInfo(idx);
        if (infoPlace.id == GameData.Place_Custom) {
            return true;
        }
        return false;
    }





}


