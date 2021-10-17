import ItemInfo from "../../../../../Common/ItemInfo";
import Language from "../../../../../Common/Language/Language";
import UIImage from "../../../../../Common/UIKit/UIImage/UIImage";
import UIText from "../../../../../Common/UIKit/UIText/UIText";
import UIFind from "../../../../../Common/UIKit/ViewController/UIFind";
import UIView from "../../../../../Common/UIKit/ViewController/UIView";
import GameLearnData from "./GameLearnData";
export default class UIGameItemListCell extends UIView {
    imageBg: UIImage = null;
    imageItem: UIImage = null;
    textTitle: UIText;
    onAwake() {
        super.onAwake();
        this.imageBg = UIFind.FindUI(this.node, "imageBg",UIImage);
        this.imageItem = UIFind.FindUI(this.node, "imageItem",UIImage);
        this.textTitle = UIFind.FindUI(this.node, "textTitle",UIText);
    }
    onStart() {
        super.onStart();
        this.UpdateItem();
    }

    UpdateItem() {
        // this.textTitle.fontSize = (int)(height * 0.5f);
        var info = GameLearnData.main.listItem[this.index] as ItemInfo;
        var keyId = info.id;
        // keyId = "putao";
        // keyId = "yintao";
        var pic = GameLearnData.main.GetImagePath(keyId);
        this.imageItem.UpdateImage(pic, keyId);

        this.textTitle.text = Language.main.GetString(info.id);
        // this.textTitle.color = Color.white;
        // if (GameLearnData.main.indexItem == index) {
        //     this.textTitle.color = Color.blue;
        // }
        this.LayOut();
    }

    IsLock() {
        return false;//imageBgLock.gameObject.activeSelf;
    }

    LayOut() {
        super.LayOut();
    }
}


