import AppSceneUtil from "../../../../AppBase/Common/AppSceneUtil";
import Debug from "../../../../Common/Debug";
import Language from "../../../../Common/Language/Language";
import LayOutScale from "../../../../Common/UIKit/LayOut/LayOutScale";
import UIViewPop from "../../../../Common/UIKit/PopUp/UIViewPop";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UIImage from "../../../../Common/UIKit/UIImage/UIImage";
import UIText from "../../../../Common/UIKit/UIText/UIText";
import UITouchEvent from "../../../../Common/UIKit/Event/UITouchEvent";
import UI from "../../../../Common/UIKit/ViewController/UI";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind";
import GameLevelParse from "../../../Main/GameLevelParse";
import GameData, { GameStatus } from "../../Data/GameData"; 
// import UIGameMerge from "./UIGameMerge";


export enum PropType {
    Hammer,// 
    Magic,
    Bomb,

}

export default class UIPopProp extends UIViewPop {

    textTitle: UIText | null = null;

    textGuide0: UIText | null = null;


    textGuide1: UIText | null = null;

    textGuideSelect: UIText | null = null;

    imageIcon: UIImage | null = null;


    imageItem0: UIImage | null = null;

    imageItem1: UIImage | null = null;

    imageItem2: UIImage | null = null;

    imageItem3: UIImage | null = null;

    imageItem4: UIImage | null = null;

    imageSelect: UIImage | null = null;

    listItem: UIImage[] = [];


    objItemList: Laya.Node | null = null;


    btnClose: UIButton;
    btnYes: UIButton;
    btnNo: UIButton;

    type: PropType;
    indexSelect = 0;
    idChangeTo = "";
    onAwake() {
        super.onAwake();

        this.objItemList = UIFind.Find(this.node, "ItemList");

        this.textTitle = UIFind.FindUI(this.node, "TextTitleHead", UIText);
        this.textGuide0 = UIFind.FindUI(this.node, "textGuide0", UIText);
        this.textGuide1 = UIFind.FindUI(this.node, "textGuide1", UIText);
        this.textGuideSelect = UIFind.FindUI(this.node, "textGuideSelect", UIText);

        this.imageIcon = UIFind.FindUI(this.node, "imageIcon", UIImage);
        this.imageItem0 = UIFind.FindUI(this.node, "imageItem0", UIImage);
        this.imageItem1 = UIFind.FindUI(this.node, "imageItem1", UIImage);
        this.imageItem2 = UIFind.FindUI(this.node, "imageItem2", UIImage);
        this.imageItem3 = UIFind.FindUI(this.node, "imageItem3", UIImage);
        this.imageItem4 = UIFind.FindUI(this.node, "imageItem4", UIImage);
        this.imageSelect = UIFind.FindUI(this.node, "imageSelect", UIImage);




        this.listItem.push(this.imageItem0);
        this.listItem.push(this.imageItem1);
        this.listItem.push(this.imageItem2);
        this.listItem.push(this.imageItem3);
        this.listItem.push(this.imageItem4);

       

        // var nodeFind = UIFind.FindAll(this.node, "BtnClose");
        // Debug.Log("nodeFind name="+nodeFind.name);

        {
            this.btnClose = UIFind.FindUI(this.node, "BtnClose", UIButton)
            this.btnClose.SetClick(this, this.OnClickBtnClose.bind(this));
        }

        {
            this.btnYes = UIFind.FindUI(this.node, "btnYes", UIButton)
            this.btnYes.SetClick(this, this.OnClickBtnYes.bind(this));
        }

        {
            this.btnNo = UIFind.FindUI(this.node, "btnNo", UIButton)
            this.btnNo.SetClick(this, this.OnClickBtnNo.bind(this));
        }
        for (var i = 0; i < this.listItem.length; i++) {
            {
                var info = GameLevelParse.main.GetLevelItemInfo(i);
                var pic = GameLevelParse.main.GetImagePath(info.id);
                var ui = this.listItem[i];
                ui.index = i;
                ui.keyId = info.id;
                var ev = ui.owner.addComponent(UITouchEvent);
                ev.callBackTouch = this.OnUITouchEvent.bind(this);
                Debug.Log("UIPopProp i = "+i+" pic="+pic);
                ui.UpdateImage(pic);
            }
        }
        this.LayOut();
    }
    onStart() {
        super.onStart();  
        this.LayOut();
    }

     
    onUpdate()
    {
        // if(AppSceneUtil.isNeedLayout)
        // {
           
        //     this.LayOut();
        //     // Laya.timer.once(1000, this, function():void {
        //     //     this.LayOut();
           
		// 	// });
        //     AppSceneUtil.isNeedLayout = false;
        //     Debug.Log("UIPopProp isNeedLayout end");
        // }

        // this.LayOut();

    }

    UpdateType(ty: PropType) { 
        this.type = ty; 
        UI.SetActive(this.objItemList,false);   

        this.textGuideSelect.visible = false; 
        this.textGuide1.visible = true; 
        this.imageSelect.visible = false; 

        var keyImageIcon = "";
        switch (this.type) {
            case PropType.Hammer:
                {
                    keyImageIcon = "Hammer";
                    this.textTitle.text = Language.main.GetString("Prop") + ":" + Language.main.GetString("Prop_Hammer");
                    this.textGuide0.text = Language.main.GetString("Prop_Hammer_Guide0");
                    this.textGuide1.text = Language.main.GetString("Prop_Hammer_Guide1");
                }
                break;
            case PropType.Magic:
                {
                    keyImageIcon = "Magic";
                    // this.objItemList.active = true;
                    UI.SetActive(this.objItemList,true);

                    this.textGuideSelect.visible = true; 
                    this.textGuide1.visible = false; 
                    this.imageSelect.visible = true;  

                    this.textTitle.text = Language.main.GetString("Prop") + ":" + Language.main.GetString("Prop_Magic");

                    this.textGuide0.text = Language.main.GetString("Prop_Magic_Guide0");
                    this.textGuide1.text = Language.main.GetString("Prop_Magic_Guide1");
                    this.textGuideSelect.text = this.textGuide1.text;

                }
                break;
            case PropType.Bomb:
                {
                    keyImageIcon = "BigBomb";
                    this.textTitle.text = Language.main.GetString("Prop") + ":" + Language.main.GetString("Prop_BigBomb");
                    this.textGuide0.text = Language.main.GetString("Prop_BigBomb_Guide0");
                    this.textGuide1.text = Language.main.GetString("Prop_BigBomb_Guide1");
                }
                break;
        }
        this.imageIcon.UpdateImageByKey(keyImageIcon); 
        GameData.main.game.UpdateProp(keyImageIcon);
        this.LayOut();

        this.SetSelectImage(this.imageItem0);
    }

    OnUITouchEvent(ui: UITouchEvent, status: number) {
        switch (status) {

            case UITouchEvent.STATUS_Click:
                {
                    var image = ui.owner.getComponent(UIImage);
                    this.SetSelectImage(image);
                }
                break;

        }
    }

    SetSelectImage(ui: UIImage) {
        this.idChangeTo = ui.keyId;
        Debug.Log("SetSelectImage toId="+this.idChangeTo);
        var pos = UI.GetPosition(ui.node);
        UI.SetPosition(this.imageSelect.node, pos);

        Debug.Log("SetSelectImage pos.x=" + pos.x+" y="+pos.y);
        ui.node.parent.addChild(this.imageSelect.node);
        this.imageSelect.zOrder = -1;
        var lyscale = this.imageSelect.node.getComponent(LayOutScale);
        var ratio = 1;
        if(lyscale!=null)
        {
            ratio = lyscale.ratio;
        }
        var scale = 1.15*ratio;
        // this.imageSelect.owner.scalex = new Vec3(scale, scale, 1); 
        var sp = this.imageSelect.owner as Laya.Sprite;
        if (sp != null) {
            sp.scaleX = scale;
            sp.scaleY = scale;
        }
    }
    LayOut() {
        super.LayOut();
    }


    OnClose() {
        this.Close();

    }
    OnClickBtnClose() {
        GameData.main.status = GameStatus.Play;
        this.OnClose();
    }
    OnClickBtnYes() {
        this.OnClose();
        GameData.main.game.ShowProp(true); 
        GameData.main.uiGame.OnGameProp(this, this.type);

    }
    OnClickBtnNo() {
        this.OnClickBtnClose();
    }

}


