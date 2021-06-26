

// vscode 插件开发 typescript部分报错 Object is possibly 'undefined'.
/*
在tsconfig.js中:

strict设置false状态

{
    "compilerOptions": {
        "strict": false,
        //...
    }

    */

import Common from "../../Common";
import ColorConfig from "../../Config/ColorConfig";
import ImageRes from "../../Config/ImageRes";
import Debug from "../../Debug";
import Language from "../../Language/Language";
import LayOutBase from "../LayOut/LayOutBase";
import UIViewController from "./UIViewController";
import UIViewUtil from "./UIViewUtil";
 

// 编辑器绑定脚本变量 @prop
// https://www.jianshu.com/p/411d3cb87325
// https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-3-4-0
 

// 一个完整的标签主要由下面几个部分：
// type IDE属性类型，此类型是指IDE属性类型，非真正的属性类型，不过大多情况下是一样的
// name IDE内显示的属性名称
// tips IDE内鼠标经过属性名称上后，显示的鼠标提示，如果没有则使用name（可选）
// default 输入框显示的默认值（可选）
 


// 模板@prop如何使用枚举
// http://ask.layabox.com/question/44695


export default class UIView extends Laya.Script {

    keyText: string = "";

    keyColor: string = "";
   
    //   public  get keyImage(): string {        
    //         return this._keyImage;
    //     } 
    //       /**@internal */
    //     public set keyImage(value: string) {
    //         this._keyImage = value;
    //     }



    keyImage2: string = "";


    keyImageH: string = "";//only for landscap 横屏

    keyImageH2: string = "";
    index: number;
    keyId: string;
    tag: string;
    title: string;

    mainCam: Laya.Camera | null = null;
    // frame: Rect | null = null;
    // objTag: CCObject | null = null;  

    // [1]
    // dummy = '';

    // [2]
    // 
    // serializableDummy = 0;


    private _controller: UIViewController | null = null;
    // @type(UIViewController)
    //get 的用法
    get controller(): UIViewController {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        if (this._controller == null) {
            var max = 100;
            var i = 0;
            while (i < max) {
                i++;
                var par = this.owner.parent;
                // Debug.Log("UIHomeCenterBar controller ");
                if (par == null) {
                    Debug.Log("UIView controller par is null");
                    break;
                } else {
                    Debug.Log("UIView controller par");
                }
                var view = par.getComponent(UIView);
                //view = par.view;
                if (view != null) {
                    var type = typeof view;
                    Debug.Log("UIView type=" + type);
                    this._controller = view._controller;
                    if (this._controller != null) {
                        break;
                    }
                } else {
                    break;
                }

            }
        }
        return this._controller;
    }
    // set 的用法
    set controller(value: UIViewController) {
        this._controller = value;
    }


    static SetNodeContentSize(node: Laya.Node, w, h) {
        // var sp = node.getComponent(Laya.Sprite);
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.width = w;
            sp.height = h;
        }
    }

    onAwake() {
    }

    onStart() {
        // [3]
    }

    //UIViewController
    SetController(con: UIViewController) {
        this.controller = con;
        con.objController.addChild(this.owner);
        con.view = this;

        con.ViewDidAppear();


    }

    SetViewParent(node) {
        // this.owner.parent = node;
        node.addChild(this.owner);
    }

    LayOut() {
        this.LayOutInternal();
    }

    LayOutNode(node: Laya.Node) {
        {
            var list = node.getComponents(LayOutBase);
            if (list == null) {
                return;
            }


            for (let ly of list) {
                if (ly) {
                    ly.LayOut();
                }
            }

        }
    }

    LayOutInternal() {
        //self 
        this.LayOutNode(this.owner);
        //child
        this.LayOutInternalChild();
    }


    LayOutInternalChild() {
        //child
        // var children = this.owner.children;
        // for (var i = 0; i < children.length; i++) {
        //     var child = children[i];
        //     this.LayOutNode(child);
        // }
    }

    LayOutDidFinish() {

    }

    //统一按钮状态图片
    UnifyButtonSprite(btn) {
        if (btn != null) {
            btn.pressedSprite = btn.normalSprite;
            btn.hoverSprite = btn.normalSprite;
        }
    }

    SetContentSize(w, h) {
        UIView.SetNodeContentSize(this.owner, w, h);
        // this.owner?.getComponent(UITransform)?.setContentSize(new Size(w, h));
        this.LayOutInternalChild();
    }

    // Laya.Size
    GetContentSize() {
        var sp = this.owner as Laya.Sprite;
        var w = 0;
        var h = 0;
        if (sp != null) {
            w = sp.width;
            h = sp.height;
        }

        return new Laya.Size(w, h);
    }

    GetBoundingBox() {
        return UIViewUtil.GetNodeBoundingBox(this.owner);
    }

    // UIView parent
    SetParent(parent: UIView) {
        parent.owner.addChild(this.owner);
        this.LayOut();
    }

    GetParent() {
        return this.owner.parent.getComponent(UIView);
    }
    SetActive(active: boolean) {
        this.owner.active = active;
    }

    OnUIDidFinish() {

    }
    //js 默认参数方法： https://www.cnblogs.com/luotingliang/p/7250990.html
    GetKeyColor(def: Laya.Color) {
        var ret = Laya.Color.BLACK;
        if (def) {
            ret = def;
        }

        if (!Common.BlankString(this.keyColor)) {
            ret = ColorConfig.main.GetColor(this.keyColor);
            Debug.Log("UIView this.keyColor =" + this.keyColor + " ret=" + ret);
        } else {
            Debug.Log("UIView this.keyColor null");
        }
        return ret;
    }
    GetKeyText() {
        var ret = "";
        if (!Common.BlankString(this.keyText)) {
            ret = Language.main.GetString(this.keyText);
        }
        return ret;
    }



    GetImageOfKey(key) {
        var ret = "";
        if (!Common.BlankString(key)) {
            ret = ImageRes.main.GetImage(key);
        }
        return ret;
    }

    UpdateLanguage() {

        // var list = this.owner.getComponentsInChildren(UIView);
        // list.forEach((ui) => {
        //     if (ui != null) {
        //         var node = ui.node;
        //         if (this.owner != node) {
        //             ui.UpdateLanguage();
        //         }
        //     }

        // });

        for (var i = 0; i < this.owner.numChildren; i++) {
            var child = this.owner.getChildAt(i);
            var ui = child.getComponent(UIView);
            if (ui != null) {
                if (this.owner != ui.owner) {
                    ui.UpdateLanguage();
                }
            }
        }
    }


    AddChild(child: UIView) {
        this.owner.addChild(child.owner);
        this.LayOut();
    }
}
 
