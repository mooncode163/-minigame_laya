import AdKitCommon from "../../../../Common/AdKit/AdKitCommon";
import ConfigPrefab from "../../../../Common/Config/ConfigPrefab";
import Debug from "../../../../Common/Debug";
import LayOutUtil from "../../../../Common/UIKit/LayOut/LayOutUtil";
import LayOutVertical from "../../../../Common/UIKit/LayOut/LayOutVertical";
import PopUpManager from "../../../../Common/UIKit/PopUp/PopUpManager";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UI from "../../../../Common/UIKit/ViewController/UI";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind";
import UIView from "../../../../Common/UIKit/ViewController/UIView";
import GameData, { GameStatus } from "../../Data/GameData";
import GameMerge from "./GameMerge";
import { PropType } from "./UIPopProp";



export default class UIToolBar extends UIView {

    imageBg: UIImage | null = null;
    btnHammer: UIButton;
    btnMagic: UIButton;
    btnBomb: UIButton;
    btnImageSelect: UIButton | null = null;
    onAwake() {
        super.onAwake();
        {
            this.btnHammer = UIFind.FindUI(this.node, "BtnHammer",UIButton);
            this.btnHammer.SetClick(this, this.OnClickBtnHammer.bind(this));
        }

        {
            this.btnMagic = UIFind.FindUI(this.node, "BtnMagic",UIButton);
            this.btnMagic.SetClick(this, this.OnClickBtnMagic.bind(this));
        }

        {
            this.btnBomb = UIFind.FindUI(this.node, "BtnBomb",UIButton);
            this.btnBomb.SetClick(this, this.OnClickBtnBomb.bind(this));
        }

    }
    onStart() {
        super.onStart();

        // if (!GameData.main.IsCustom()) {
        //     this.btnImageSelect.SetActive(false);
        // }
        this.LayOut();

    }



    LayOut() {
        super.LayOut();

        var size = this.GetContentSize();
        var w = size.width;
        var h = size.height;
        var child = this.owner.getChildAt(0);
        // var btn = this.owner.getComponentInChildren(UIButton);
        var btn = UI.GetChild(this.node,UIButton,0);
        var sizeBtn = btn.GetContentSize();

        var count = LayOutUtil.main.GetChildCount(this.owner, false);
        var ly = this.owner.getComponent(LayOutVertical);
        // count =10;
        var oft = ly.offsetY * 2;
        // oft = 32;
        h = count * (sizeBtn.height + oft);
        // h = 512;
        this.SetContentSize(w, h);

        super.LayOut();


        // this.imageBg.LayOut();
    }
    ShowPop(type: PropType) {
        if (!GameMerge.main.IsHasFalledBall()) {
            return;
        }
        GameData.main.status = GameStatus.Prop;

        var key = "UIPopProp";
        var strPrefab = ConfigPrefab.main.GetPrefab(key);

        PopUpManager.main.Show(
            {
                prefab: strPrefab,
                open: (ui: any) => {
                    ui.UpdateType(type);
                    AdKitCommon.main.ShowAdVideo();
                },
                close: (ui: any) => {
                },
            });

    }

    ShowImageSelect(isAd: boolean) {
        GameData.main.status = GameStatus.Prop;
        var strPrefab = ConfigPrefab.main.GetPrefab("UIOptionImageSelect");

        PopUpManager.main.Show(
            {
                prefab: strPrefab,
                open: (ui: any) => {
                    if (isAd) {
                        // AdKitCommon.main.ShowAdVideo();
                    }
                },
                close: (ui: any) => {
                },
            });
    }

    // 锤子 摧毁指定球兵获得积分
    OnClickBtnHammer() {
        Debug.Log("PopUpManager OnClickBtnHammer");
        // this.ShowPop(PropType.Hammer);
        GameData.main.uiGameZuma.OnTest();
    }


    //  万能球 将下落的球变为指定类型球
    OnClickBtnMagic() {
        this.ShowPop(PropType.Magic);
    }


    // 大木zhui  摧毁所有的同类球并获得积分
    OnClickBtnBomb() {
        this.ShowPop(PropType.Bomb);
    }
    OnClickBtnOptionImageSelect() {
        this.ShowImageSelect(true);
    }

    OnClickBtnOptiongGame() {
        GameData.main.status = GameStatus.Prop;
        var strPrefab = ConfigPrefab.main.GetPrefab("UIOptionGame");

        PopUpManager.main.Show(
            {
                prefab: strPrefab,
                open: (ui: any) => {

                },
                close: (ui: any) => {
                },
            });
    }

}


