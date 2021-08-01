


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
import UI from "../ViewController/UI";
import AnimateButton from "./AnimateButton";
import AppSceneUtil from "../../../AppBase/Common/AppSceneUtil";

enum ButtonType {
    IMAGE = "IMAGE",//一张背景  
    IMAGE_TEXT = "IMAGE_TEXT",
    IMAGE_ICON = "IMAGE_ICON",//一张背景 一张Icon 叠加
    IMAGE_SWITCH = "IMAGE_SWITCH",//一张背景
    IMAGE_ICON_SWITCH = "IMAGE_ICON_SWITCH",//一张背景 一张Icon 叠加
}

// UIView
export default class UIButton extends UIView {
    public static ButtonType = ButtonType;

    /** @prop {name:clickHandler,type:Handler}*/
    public clickHandler: Handler;
    // btnBg: Laya.Button;


    // content: Laya.Image;
    imageBg: UIImage | null = null;
    imageIcon: UIImage | null = null;
    textTitle: UIText | null = null;

    enableFitTextSize: boolean = false;
    isSwicthSelect: boolean = false;


    /** @prop {name:isStopTouchOther,type:Bool,tips:"不让子节点的鼠标事件穿透到父节点"}*/
    isStopTouchOther: boolean = true;

    private _type = ButtonType.IMAGE;
    /** @prop {name:type,type:Option,option:"IMAGE,IMAGE_TEXT,IMAGE_ICON,IMAGE_SWITCH,IMAGE_ICON_SWITCH", default:"IMAGE"}*/
    //get 的用法
    get type() {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._type;
    }
    // set 的用法
    set type(value) {
        this._type = value;
        // this.UpdateType(this._type);
    }

    //text
    get text() {
        if (this.textTitle == null) {
            return "text";
        }
        return this.textTitle.text;
    }
    set text(value) {
        if (this.textTitle == null) {
            return;
        }
        this.textTitle.text = value;

        this.LayOut();
    }


    //keyText
    get keyText() {
        if (this.textTitle == null) {
            return "keyText";
        }
        return this.textTitle.keyText;
    }
    set keyText(value) {
        if (this.textTitle == null) {
            return;
        }
        this.textTitle.keyText = value;

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


    //fontSize
    get fontSize() {
        if (this.textTitle == null) {
            return 12;
        }
        return this.textTitle.fontSize;
    }
    set fontSize(value) {
        if (this.textTitle == null) {
            return;
        }
        this.textTitle.fontSize = value;
        this.LayOut();
    }
    /*
    用法
     UIButton.SetClickByNode(this.uiButton,this, function (btn:UIButton): void {
            // this.OnBtnClickPlay();
        }.bind(this));
    */

    static SetClickByNode(node: Laya.Node, caller: any, method: Function | null) {
        var uibtn = node.getComponent(UIButton);
        uibtn.SetClick(caller, method);
    }

    onAwake() {
        super.onAwake();
        UI.SetNodePivotCenter(this.owner);
        //只用来点击事件  不显示
        // this.btnBg = this.owner.getChildByName("BtnImageBg") as Laya.Button;
        // this.content = this.owner.getChildByName("Content") as Laya.Image;



        this.imageBg = this.owner.getChildByName("ImageBg").getComponent(UIImage);
        this.imageIcon = this.owner.getChildByName("ImageIcon").getComponent(UIImage);
        this.textTitle = this.owner.getChildByName("TextTitle").getComponent(UIText);

        // this.type = this._type;
        // this.btnBg.on(Laya.Event.CLICK, this, this.OnBtnClick);
        var animateButton = this.node.addComponent(AnimateButton);
        animateButton.SetClick(this, this.OnClickAnimateButton.bind(this));
        animateButton.isStopTouchOther = this.isStopTouchOther;

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

    UpdateType(ty) {
        // if (this.btnBg == null) {
        //     return;
        // }
        if (this.textTitle == null) {
            return;
        }
        if (this.imageIcon == null) {
            return;
        } 
        this.imageBg.visible = true; 
        Debug.Log("UIButton UpdateType ty=" + ty); 
        switch (ty) {
            case ButtonType.IMAGE:
            case ButtonType.IMAGE_SWITCH:
                { 

                    this.imageIcon.visible = false; 
                    this.textTitle.visible = false; 

                }
                break;
            case ButtonType.IMAGE_TEXT:
                { 
                    this.imageIcon.visible = false; 
                    this.textTitle.visible = true; 
                }
                break;
            case ButtonType.IMAGE_ICON:
            case ButtonType.IMAGE_ICON_SWITCH:
                { 
                    this.imageIcon.visible = true; 
                    this.textTitle.visible = false; 
                }
                break;

        }
    }

    OnClickAnimateButton(btn: AnimateButton) {
        Debug.Log("UIButton DoClickItem");
        if (this.clickHandler) {
            Debug.Log("UIButton run");
            this.clickHandler.run();
        }
    }


    /*
    // 用法
            uibtn.SetClick(this,function (btn:UIButton): void {
            if(btn!=null)
            {
                
            } 
        }.bind(this));

          OnClickItem(btn:UIButton) {
            }
    
    */
    // 动画点击回调
    SetClick(caller: any, method: Function | null) {
        // this.clickHandler = Laya.Handler.create(this, function (): void {

        //     Debug.Log("UIHomeMerge UIButton  on click");

        // },null,false);
        this.clickHandler = Laya.Handler.create(this, method, [this], false);
    }


    LayOut() {
        super.LayOut();
        this.UpdateType(this.type);
        UI.SetNodePivotCenter(this.owner);

        this.enableFitTextSize = this.textTitle.enableFitTextSize;
        if (this.enableFitTextSize) {
            // var w = Common.GetTextSize(this.text, this.fontSize).width + this.fontSize;
            var sizeText = this.textTitle.GetTextSize();
            if (sizeText != null) {
                var size = UI.GetNodeContentSize(this.node);
                var h = size.height;
                var w = sizeText.width + this.fontSize * 2;

                Debug.Log("uibutton enableFitTextSize w=" + w + " h=" + h);
                UI.SetNodeContentSize(this.node, w, h);
                this.textTitle.LayOut();
                AppSceneUtil.isNeedLayout = true;
            }
        }
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
            this.imageBg.UpdateImageByKey(this.imageBg.keyImage);
            this.imageIcon.UpdateImageByKey(this.imageIcon.keyImage);
        } else {
            this.imageBg.UpdateImageByKey(this.imageBg.keyImage2);
            this.imageIcon.UpdateImageByKey(this.imageIcon.keyImage2);
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}


