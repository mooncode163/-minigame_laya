


// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

import Common from "../../Common";
import Debug from "../../Debug";
import UIImage from "../UIImage/UIImage";
import UIText from "../UIText/UIText";
import UIView from "../ViewController/UIView";

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
    public  clickHandler: Handler;
    /** @prop {name:btnBg,type:Node}*/
    btnBg: Laya.Button;

    /** @prop {name:imageBg,type:Node}*/
    imageBg: UIImage | null = null;
    /** @prop {name:imageIcon,type:Node}*/
    imageIcon: UIImage | null = null;

    /** @prop {name:textTitle,type:Node}*/
    textTitle: UIText | null = null;

    enableFitTextSize: boolean = false;
    isSwicthSelect: boolean = false;

    // 必须设置两个@type 才能在editor里修改

    private _type = ButtonType.IMAGE;

    //get 的用法
    get type() {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._type;
    }
    // set 的用法
    set type(value) {
        this._type = value;
        if (this.imageBg == null) {
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

    static SetClickByNode(node: Laya.Node, caller:any,method:Function|null) {
        var uibtn = node.getComponent(UIButton); 
        uibtn.SetClickFunction(caller,method);
   }

    onAwake() {
        super.onAwake();
        // this.type = this._type;
        this.btnBg.on(Laya.Event.CLICK, this, this.OnBtnClick);

        // this.clickHandler = Laya.Handler.create(this, function (): void {

        //     Debug.Log("UIButton _clickHandler on click");

        // },null,false);

    }

    onStart() {
        // [3]
        // super.onStart();
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


    OnBtnClick() {
        Debug.Log("UIButton OnBtnClick");
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
    SetClickFunction(caller:any,method:Function|null) {
        // this.clickHandler = Laya.Handler.create(this, function (): void {

        //     Debug.Log("UIHomeMerge UIButton  on click");
    
        // },null,false);
        this.clickHandler = Laya.Handler.create(this,method,[this],false);
    }


    LayOut() {
        // super.LayOut();
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


