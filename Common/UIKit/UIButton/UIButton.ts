


// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

import AudioPlay from "../../Audio/AudioPlay";
import Common from "../../Common";
import CommonRes from "../../CommonRes";
import Debug from "../../Debug";
import UIImage from "../UIImage/UIImage";
import UIText from "../UIText/UIText";
import UIView from "../ViewController/UIView";
import UIViewUtil from "../ViewController/UIViewUtil";

enum ButtonType {
    IMAGE = 0,//一张背景  
    IMAGE_TEXT,
    IMAGE_ICON,//一张背景 一张Icon 叠加

    IMAGE_SWITCH,//一张背景
    IMAGE_ICON_SWITCH,//一张背景 一张Icon 叠加
}

// UIView
export default class UIButton extends UIView {
    public static ButtonType = ButtonType;

    /** @prop {name:clickHandler,type:Handler}*/
    public clickHandler: Handler;
    btnBg: Laya.Button;

    // content: Laya.Image;
    imageBg: UIImage | null = null;
    imageIcon: UIImage | null = null;
    textTitle: UIText | null = null;

    enableFitTextSize: boolean = false;
    isSwicthSelect: boolean = false;

    // 必须设置两个@type 才能在editor里修改

    private _type = ButtonType.IMAGE;

    duration = 200;//0.2 //ms
    scale1 = 1.2;
    scale2 = 1;

    //get 的用法
    get type() {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._type;
    }
    // set 的用法
    set type(value) {
        this._type = value;
        if (this.btnBg == null) {
            return;
        }
        if (this.textTitle == null) {
            return;
        }
        if (this.imageIcon == null) {
            return;
        }
        // this.imageBg.owner.active = true;
        // switch (this._type) {
        //     case ButtonType.IMAGE:
        //     case ButtonType.IMAGE_SWITCH:
        //         {
        //             this.imageIcon.owner.active = false;
        //             this.textTitle.owner.active = false;

        //         }
        //         break;
        //     case ButtonType.IMAGE_TEXT:
        //         {
        //             this.imageIcon.owner.active = false;
        //             this.textTitle.owner.active = true;
        //         }
        //         break;
        //     case ButtonType.IMAGE_ICON:
        //     case ButtonType.IMAGE_ICON_SWITCH:
        //         {
        //             this.imageIcon.owner.active = true;
        //             this.textTitle.owner.active = false;
        //         }
        //         break;

        // } 

    }


    /*
    用法
     UIButton.SetClickByNode(this.uiButton,this, function (btn:UIButton): void {
            // this.OnBtnClickPlay();
        }.bind(this));
    */

    static SetClickByNode(node: Laya.Node, caller: any, method: Function | null) {
        var uibtn = node.getComponent(UIButton);
        uibtn.SetClickFunction(caller, method);
    }

    onAwake() {
        super.onAwake();

        //只用来点击事件  不显示
        this.btnBg = this.owner.getChildByName("BtnImageBg") as Laya.Button;
        // this.content = this.owner.getChildByName("Content") as Laya.Image;
        
        

        this.imageBg = this.owner.getChildByName("ImageBg").getComponent(UIImage);
        this.imageIcon = this.owner.getChildByName("ImageIcon").getComponent(UIImage);
        this.textTitle = this.owner.getChildByName("TextTitle").getComponent(UIText);

        UIViewUtil.SetNodePivotCenter(this.owner);


        // this.type = this._type;
        this.btnBg.on(Laya.Event.CLICK, this, this.OnBtnClick);

        // this.clickHandler = Laya.Handler.create(this, function (): void {

        //     Debug.Log("UIButton _clickHandler on click");

        // },null,false);

        this.LayOut();

    }

    onStart() {
        // [3]
        super.onStart();

        this.LayOut();
    }


    //text
    get text() {
        if (this.textTitle == null) {
            return "text";
        }
        return this.textTitle.text;
    }
    set text(value) {
        this.textTitle.text = value;
        if (this.enableFitTextSize) {
            // var w = Common.GetTextSize(value, this.fontSize).width + this.fontSize;
            // var size = this.node.getComponent(UITransform)?.contentSize;
            // var h = size.height; 
            // this.node?.getComponent(UITransform)?.setContentSize(new Size(w, h));
        }
        this.LayOut();
    }


    //color
    get color() {
        if (this.textTitle == null) {
            return Laya.Color.BLACK;
        }
        return this.textTitle.color;
    }
    set color(value) {
        // this.textTitle.color = value;
    }



    onTween1Finish() {

        Laya.Tween.clearTween(this.onTween1Finish);
        Laya.Tween.to(this.owner, { scaleX: this.scale2, scaleY: this.scale2 }, this.duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.onTween2Finish));
    }

    onTween2Finish() {
        Laya.Tween.clearTween(this.onTween2Finish);
        this.DoClickItem();
    }
    OnBtnClick() {
        Debug.Log("UIButton OnBtnClick"); 
        Laya.Tween.to(this.owner, { scaleX: this.scale1, scaleY: this.scale1 }, this.duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.onTween1Finish));
        //.to(this.owner, { scaleX: scale2, scaleY: scale2 }, duration / 2, Laya.Ease.sineInOut, Laya.Handler.create(this, this.DoClickItem.bind(this), [this], false));
       
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);
        if (ret) {
            //play sound click
            AudioPlay.main.PlayByKey("BtnClick");
        }


    }


    DoClickItem() {
        Debug.Log("UIButton DoClickItem");
        if (this.clickHandler) {
            Debug.Log("UIButton run");
            this.clickHandler.run();
        }
    }

    DidClickFinish() {
        Debug.Log("UIButton DidClickFinish");

    }

    /*
    // 用法
            uibtn.SetClickFunction(this,function (btn:UIButton): void {
            if(btn!=null)
            {
                
            } 
        }.bind(this));
    */
    // 动画点击回调
    SetClickFunction(caller: any, method: Function | null) {
        // this.clickHandler = Laya.Handler.create(this, function (): void {

        //     Debug.Log("UIHomeMerge UIButton  on click");

        // },null,false);
        this.clickHandler = Laya.Handler.create(this, method, [this], false);
    }


    LayOut() {
        super.LayOut();
    }

    /*
           { 
               bg: "",
               icon:"",
               def: "",
               type:cc.Sprite.Type.SIMPLE,//SLICED
               left:0,
               right:0,
               top:0,
               bottom:0,
               isUpdateSize:true,
               success: function () {
               },
               fail: function () {
               }, 
           }
       */
    // UpdateImage(obj: any) {
    //     var objBg = {
    //         sprite: this.imageBg,
    //         pic: obj.bg,
    //         def: obj.def,
    //         type: obj.type,
    //         left: obj.left,
    //         right: obj.right,
    //         top: obj.top,
    //         bottom: obj.bottom,
    //         success: function () {
    //             this.LayOut();
    //             if (obj.success != null) {
    //                 obj.success();
    //             }
    //         }.bind(this),
    //         fail: obj.fail,
    //     };
    //     TextureUtil.UpdateSpriteImage(objBg);

    //     if (obj.icon) {
    //         var objIcon = {
    //             sprite: this.imageIcon,
    //             pic: obj.icon,
    //             def: obj.def,
    //             success: function () {
    //                 this.LayOut();
    //                 if (obj.success != null) {
    //                     obj.success();
    //                 }
    //             }.bind(this),
    //             fail: obj.fail,
    //         };
    //         TextureUtil.UpdateSpriteImage(objIcon);
    //     }
    // }

    UpdateSwitch(isSel: boolean) {
        this.isSwicthSelect = isSel;
        if (this.isSwicthSelect) {
            // this.imageBg.UpdateImageByKey(this.imageBg.keyImage);
            this.imageIcon.UpdateImageByKey(this.imageIcon.keyImage);
        } else {
            // this.imageBg.UpdateImageByKey(this.imageBg.keyImage2);
            this.imageIcon.UpdateImageByKey(this.imageIcon.keyImage2);
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}


