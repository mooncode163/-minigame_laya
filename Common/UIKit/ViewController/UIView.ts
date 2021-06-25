 

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


// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

 
 
 
export default class UIView extends Laya.Script{
    
    keyText: string = "";
    
    keyColor: string = "";

    
    keyImage: string = "";
    
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


    static SetNodeContentSize(node, w, h) {
        // node?.getComponent(UITransform)?.setContentSize(new Size(w, h));
    }

    onAwake() {
    }

    onStart() {
        // [3]
    }

    //UIViewController
    SetController(con: UIViewController) {
        this.controller = con;
        // this.owner.parent = con.objController;
        con.view = this;

        con.ViewDidAppear();
 

    }

    SetViewParent(node) { 
        // this.owner.parent = node;
    }

    LayOut() {
        this.LayOutInternal();
    }

    LayOutNode(node) {
        {
            // var list = node.getComponents(LayOutBase);
            // for (let ly of list) {
            //     if (ly) {
            //         ly.LayOut();
            //     }
            // }
 
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
        // this.owner?.getComponent(UITransform)?.setContentSize(new Size(w, h));
        // this.LayOutInternalChild();
    }
    GetContentSize() {
        // return this.owner?.getComponent(UITransform)?.contentSize;
    }

    GetBoundingBox() {
        // return UIViewUtil.GetNodeBoundingBox(this.owner);
    }

    // UIView parent
    SetParent(parent: UIView) {
        // this.owner.parent = parent.owner;
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
    GetKeyColor(def:Laya.Color) {
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

    GetKeyImage() {
        var ret = "";
        if (!Common.BlankString(this.keyImage)) {
            ret = ImageRes.main.GetImage(this.keyImage);
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
    }


    AddChild(child) {
        child.node.setParent(this.owner);
        this.LayOut();
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
