import GameManager from "../../../../../AppBase/Game/GameManager";
import LevelData from "../../../../../AppBase/Game/LevelData";
import UIViewPop from "../../../../../Common/UIKit/PopUp/UIViewPop";
import UIButton from "../../../../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../../../../Common/UIKit/UIImage/UIImage";
import UIText from "../../../../../Common/UIKit/UIText/UIText";
import GameLevelParse from "../../../Data/GameLevelParse";



export default class UIGameWin extends UIViewPop {

    textTitle: UIText | null = null;

    imageBg: UIImage | null = null;

    imageLogo: UIImage | null = null;

    imageItem0: UIImage | null = null;

    imageItem1: UIImage | null = null;

    imageItem2: UIImage | null = null;

    btnRestart: UIButton | null = null;

    listItem: UIImage[] = [];

    onAwake() {
        super.onAwake();

        this.listItem.push(this.imageItem0);
        this.listItem.push(this.imageItem1);
        this.listItem.push(this.imageItem2);

        for (var i = 0; i < this.listItem.length; i++) {
            var info = GameLevelParse.main.GetLevelItemInfo(i);
            var pic = GameLevelParse.main.GetImagePath(info.id);
            var ui = this.listItem[i];
            ui.index = i;
            ui.keyId = info.id;
            ui.UpdateImage(pic);
        }

        {
            var info = GameLevelParse.main.GetLastItemInfo();
            var pic = GameLevelParse.main.GetImagePath(info.id);
            this.imageLogo.UpdateImage(pic);
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



    OnClickBtnRestart(event: Event, customEventData: string) {
        this.Close();

        // placeLevel 不改变
        // LevelManager.main.placeLevel = 0;
        LevelData.main.gameLevel = 0;
        LevelData.main.gameLevelFinish = -1;
        GameManager.main.GotoPlayAgain();
    }


}


