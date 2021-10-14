

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
import ImageRes from "../../Config/ImageRes";
import Debug from "../../Debug";
import UIViewController from "./UIViewController";
import AppSceneUtil from "../../../AppBase/Common/AppSceneUtil";
import LayOutBaseInternal from "../LayOut/LayOutBaseInternal";

// 编辑器绑定脚本变量 @prop 如果放在基类 编辑器识别不了  如果是派生类:变量在基类定义 派生类里声明@prop
// type	类型：Int,Number,sNumber,String,Bool,Option,editOption,Check,Color,ColorArray,Node,Nodes,Prefab,SizeGrid,Vec,Vector,Ease
// https://www.jianshu.com/p/411d3cb87325
// https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-3-4-0


// 一个完整的标签主要由下面几个部分：
// type IDE属性类型，此类型是指IDE属性类型，非真正的属性类型，不过大多情况下是一样的
// name IDE内显示的属性名称
// tips IDE内鼠标经过属性名称上后，显示的鼠标提示，如果没有则使用name（可选）
// default 输入框显示的默认值（可选）



// 模板@prop如何使用枚举
// http://ask.layabox.com/question/44695



// laya ui 坐标原点在屏幕左上角  和android ios 的系统UI一致
// laya 的舞台stage 类似于 cocos unity 的canvas
export default class UIView3D extends Laya.Script3D {



    //   public  get keyImage(): string {        
    //         return this._keyImage;
    //     } 
    //       /**@internal */
    //     public set keyImage(value: string) {
    //         this._keyImage = value;
    //     }



    index: number;
    keyId: string;
    tag: string;
    title: string;
    isPivotCenter: boolean = true;
    texture: Laya.Texture2D;

    // 世界坐标大小 tex/100
    width = 0;
    height = 0;


    callbackRenderFinish: Function = null

    public isSprite: boolean = false;
    public get transform(): Laya.Transform3D {
        var sp: Laya.Sprite3D = this.node as Laya.Sprite3D;
        if (sp) {
            return sp.transform;
        }
        Debug.Log("transform Laya.Sprite3D is null ");
        return null;
    }

    addComponent(componentType: typeof Laya.Component): any {
        return this.node.addComponent(componentType);
    }

    getComponent(componentType: typeof Laya.Component): any {
        return this.node.getComponent(componentType);
    }

    public get name(): string {
        return this.node.name;
    }
    public set name(value: string) {
        this.node.name = value;
    }

    public get mainCam(): Laya.Camera {
        return AppSceneUtil.mainCamera;
    }
    public get x(): number {
        return this.transform.localPosition.x;
    }
    public set x(value: number) {

    }


    public get y(): number {
        return this.transform.localPosition.y;
    }
    public set y(value: number) {

    }

    public get node(): Laya.Node {
        return this.owner;
    }

    public get visible(): boolean {
        var sp = this.owner as Laya.Sprite3D;
        var z = 0;
        if (sp != null) {
            return sp.active;
        }
        return false
    }
    public set visible(value: boolean) {
        var sp = this.owner as Laya.Sprite3D;
        var z = 0;
        if (sp != null) {
            sp.active = value;
            AppSceneUtil.isNeedLayout = true;
        }
    }

    public get zOrder(): number {
        var sp = this.owner as Laya.Sprite3D;
        var z = 0;
        if (sp != null) {
            // return sp.zOrder;
        }
        return 0;
    }
    public set zOrder(value: number) {
        var sp = this.owner as Laya.Sprite3D;
        var z = 0;
        if (sp != null) {
            // sp.zOrder = value;
        }
    }


    public get contentSize(): Laya.Size {
        return this.GetContentSize();
    }
    public set contentSize(value: Laya.Size) {
        this.SetContentSize(value.width,value.height);
    }

    public get boundSize(): Laya.Size {
        return this.GetBoundSize();
    }
    public set boundSize(value: Laya.Size) { 
        this.transform.localScale = new Laya.Vector3(value.width/this.contentSize.width,value.height/this.contentSize.height,this.transform.localScale.z);
    }
    
    private _controller: UIViewController | null = null;
    // @type(UIViewController)
    //get 的用法
    get controller(): UIViewController {
        if (this._controller == null) {
            var max = 100;
            var i = 0;
            var nodefind = this.owner;
            while (i < max) {
                i++;
                var par = nodefind.parent;
                // Debug.Log("UIHomeCenterBar controller ");
                if (par == null) {
                    Debug.Log("UIView controller par is null");
                    break;
                } else {
                    Debug.Log("UIView controller par");
                }
                var view = par.getComponent(UIView3D);
                //view = par.view;
                if (view != null) {
                    var type = typeof view;
                    Debug.Log("UIView type=" + type);
                    this._controller = view._controller;
                    if (this._controller != null) {
                        Debug.Log("UIView find _controller");
                        break;
                    } else {
                        nodefind = view.node;
                    }
                } else {
                    break;
                    // continue;
                }

            }
        }
        return this._controller;
    }
    // set 的用法
    set controller(value: UIViewController) {
        this._controller = value;
    }



    onAwake() {
        super.onAwake();
    }

    onStart() {
        // [3]
        super.onStart();
    }

    onDestroy() {
        super.onDestroy();

        var parent = this.node;
        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.getChildAt(i);
            Debug.Log("UIView3D onDestroy i=" + i + " child.name=" + child.name);
            if (child == AppSceneUtil.mainScene) {
                continue;
            }
            child.destroy();

        }

    }

    //UIViewController
    SetController(con: UIViewController) {
        this.controller = con;
        con.objController.addChild(this.owner);
        // con.view = this;

        con.ViewDidAppear();


    }

    SetViewParent(node) {
        // this.owner.parent = node;
        node.addChild(this.node);
    }

    LayOut() {

        //获取所有子对象(第一层)
        var parent = this.node;
        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.getChildAt(i);
            var uiChild = child.getComponent(UIView3D); 
            if(uiChild!=null)
            {
               uiChild.LayOut();
               Debug.Log("UIView3D uiChild LayOut child");
            }
        }
 
        //all LayOutBaseInternal
        this.LayOutInternal();
    }

    LayOutNode(node: Laya.Node) {
        {
            if (node == null) {
                return;
            }
            var list = node.getComponents(LayOutBaseInternal);
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
        if (this.owner == null) {
            return;
        }
        for (var i = 0; i < this.owner.numChildren; i++) {
            var child = this.owner.getChildAt(i);
            this.LayOutNode(child);
        }
    }

    LayOutDidFinish() {

    }
 
 

    SetContentSize(w, h) {
        var w_real = w;
        var h_real = h;
        // laya w,h 为0时 会自动显示成图片大小
        // if (w <= 0) {
        //     w_real = 0.0001;
        // }
        // if (h <= 0) {
        //     h_real = 0.0001;
        // }
        this.width = w_real;
        this.height = h_real;
        // UIView3D.SetNodeContentSize(this.owner, w_real, h_real); 
        this.LayOutInternalChild();
    }

    // Laya.Size
    GetContentSize() {
        var w = this.width;
        var h = this.height;
        return new Laya.Size(w, h);
    }

    GetBoundingBox() {
        return this.GetBoundSize();
    }

    GetBoundSizeOfGameObject(nd: Laya.Node) {

    }

    GetBoundSize() {
        if(this.transform==null)
        {
            // maybe bug
            Debug.Log("GetBoundSize this.transform==null");
            return this.contentSize;
        }
        var w = this.width * this.transform.localScale.x;
        var h = this.height * this.transform.localScale.y;
        return new Laya.Size(w, h);
    }

    // UIView parent
    SetParent(parent: UIView3D) {
        parent.owner.addChild(this.owner);
        this.LayOut();
    }

    GetParent() {
        return this.owner.parent.getComponent(UIView3D);
    }



    OnUIDidFinish() {

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
            var ui = child.getComponent(UIView3D);
            if (ui != null) {
                if (this.owner != ui.owner) {
                    ui.UpdateLanguage();
                }
            }
        }
    }


    AddChild(child: UIView3D) {
        this.owner.addChild(child.owner);
        this.LayOut();
    }


    // 加入世界坐标
    AddNodeToMainWorld(node: Laya.Node) {
        // AppSceneUtil.mainScene.addChild(node);
        this.node.addChild(node);
    }
    AddVideToMainWorld(ui: UIView3D) {
        this.AddNodeToMainWorld(ui.node);
    }
}

