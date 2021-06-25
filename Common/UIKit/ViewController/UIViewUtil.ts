  
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


// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

import { UIViewController } from "./UIViewController";
 
export default class UIViewUtil {

    static GetNodeBoundingBox(node: Node) {
        return node.getComponent(UITransform)?.getBoundingBox();
    }

    static SetNodeContentSize(node, w, h) {
        node?.getComponent(UITransform)?.setContentSize(new Size(w, h));
    }
    static GetNodeContentSize(node) {
        return node?.getComponent(UITransform)?.contentSize;
    }
    static GetNodeWidth(node: Node) {
        return node.getComponent(UITransform)?.width;
    }
    static GetNodeHeight(node: Node) {
        return node.getComponent(UITransform)?.height;
    }
    static SetNodeWidth(node: Node,w:number) {
        node.getComponent(UITransform).width = w;
    }
    static SetNodeHeight(node: Node,h:number) {
        node.getComponent(UITransform).height = h;
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
