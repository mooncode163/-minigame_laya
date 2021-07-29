import Debug from "../../../../../Common/Debug";
import Device from "../../../../../Common/Device";
import ItemInfo from "../../../../../Common/ItemInfo";
import Language from "../../../../../Common/Language/Language";
import Tts from "../../../../../Common/Tts/Tts";
import PopUpManager from "../../../../../Common/UIKit/PopUp/PopUpManager";
import UIButton from "../../../../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../../../../Common/UIKit/UIImage/UIImage";
import UIText from "../../../../../Common/UIKit/UIText/UIText";
import UIFind from "../../../../../Common/UIKit/ViewController/UIFind";
import UIView from "../../../../../Common/UIKit/ViewController/UIView";
import GameLearnData from "./GameLearnData";

export default class UIGameLearn extends UIView {
    imageItem: UIImage = null;
    textTitle: UIText;
    textPinyin: UIText;

    btnBack: UIButton;
    btnHideText: UIButton;
    btnList: UIButton;
    btnPre: UIButton;
    btnPlay: UIButton;
    btnNext: UIButton;
    infoItem: ItemInfo;
    countItem = 0;
    isFlip: false;

    onAwake() {
        super.onAwake();
        GameLearnData.main.indexItem = 0;
        this.isFlip = false;
        this.imageItem = UIFind.FindUI(this.node, "imageItem", UIImage);
        this.textTitle = UIFind.FindUI(this.node, "TextTitleTopBar", UIText);
        this.textPinyin = UIFind.FindUI(this.node, "textPinyin", UIText);

        {
            this.btnBack = UIFind.FindUI(this.node, "btnBack", UIButton);
            this.btnBack.SetClick(this, this.OnClickBtnBack.bind(this));
        }

        {
            this.btnHideText = UIFind.FindUI(this.node, "btnHideText", UIButton);
            this.btnHideText.SetClick(this, this.OnClickBtnHideText.bind(this));
        }
        {
            this.btnList = UIFind.FindUI(this.node, "btnList", UIButton);
            this.btnList.SetClick(this, this.OnClickBtnList.bind(this));
        }
        {
            this.btnPre = UIFind.FindUI(this.node, "btnPre", UIButton);
            this.btnPre.SetClick(this, this.OnClickBtnPre.bind(this));
        }
        {
            this.btnPlay = UIFind.FindUI(this.node, "btnPlay", UIButton);
            this.btnPlay.SetClick(this, this.OnClickBtnPlay.bind(this));
        }
        {
            this.btnNext = UIFind.FindUI(this.node, "btnNext", UIButton);
            this.btnNext.SetClick(this, this.OnClickBtnNext.bind(this));
        }

        
        this.UpdateItem();
    }
    onStart() {
        super.onStart();
        this.LayOut();
    }

    UpdateItem() {
        this.infoItem = GameLearnData.main.GetItemInfo(GameLearnData.main.indexItem);

        if (Device.main.isLandscape) {
            this.textTitle.text = Language.main.GetString(this.infoItem.id) + "(" + this.infoItem.artist + ")";
            this.textPinyin.text = "";
            this.textPinyin.visible = false;
        }
        else {
            this.textTitle.text = Language.main.GetString(this.infoItem.id);
            this.textPinyin.text = this.infoItem.artist;
            this.textPinyin.visible = true;
        }

        this.countItem = GameLearnData.main.GetTotal();

        var keyId = this.infoItem.id;
        var pic = GameLearnData.main.GetImagePath(keyId);
        this.imageItem.UpdateImage(pic, keyId);
        this.StartAnimate();

    }


    StartAnimate() {
        if (this.isFlip)
            return;

        this.AnimatFlip();
    }
    /// <summary>
    /// 翻转到背面
    /// </summary>
    AnimatFlip() {
        // float animaeTime = 0.2f;//0.3
        // GameObject mFront = imageItem.gameObject;//卡牌正面
        // GameObject mBack = imageItem.gameObject;//卡牌背面
        // mFront.transform.eulerAngles = Vector3.zero; 
        // isFlip = true;
        // mFront.transform.DORotate(new Vector3(0, 90, 0), animaeTime);
        // for (float i = animaeTime; i >= 0; i -= Time.deltaTime)
        //     yield return 0;
        // mBack.transform.DORotate(new Vector3(0, 0, 0), animaeTime);
        // isFlip = false;

    }

    OnClickBtnPlay() {
        if (this.infoItem != null) {
            Tts.main.Speak(Language.main.GetString(this.infoItem.id));
        }

    }
    OnClickBtnNext() {
        GameLearnData.main.indexItem++;
        if (GameLearnData.main.indexItem >= this.countItem) {
            GameLearnData.main.indexItem = 0;
        }
        this.UpdateItem();
    }
    OnClickBtnPre() {
        GameLearnData.main.indexItem--;
        if (GameLearnData.main.indexItem < 0) {
            GameLearnData.main.indexItem = this.countItem - 1;
        }
        this.UpdateItem();
    }
    OnClickBtnList() {
        PopUpManager.main.ShowByKey(
            {
                key: "UIGameItemList",
                open: (ui: any) => {
                    // AudioPlay.main.PlayByKey("Fail");
                },
                close: (ui: any) => {
                    this.UpdateItem();
                },
            });

    }
    OnClickBtnHideText() {
        this.textTitle.visible = !this.textTitle.visible;
    }
    OnClickBtnBack() {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            if (navi != null) {
                navi.Pop();
            }
        }
    }
}


