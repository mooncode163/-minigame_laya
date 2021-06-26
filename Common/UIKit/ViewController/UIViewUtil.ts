
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



// Laya UI坐标系原点在屏幕左上角

export default class UIViewUtil {


    static GetNodePosition(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var x = 0;
        var y = 0;
        if (sp != null) {
            x = sp.x;
            y = sp.y;
        }
        return new Laya.Vector2(x, y);
    }

    static SetNodePosition(node: Laya.Node, x: any, y: any) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.x = x;
            sp.y = y;
        }
    }

    static GetNodeBoundingBox(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var w = 0;
        var h = 0;
        if (sp != null) {
            w = sp.width * sp.scaleX;
            h = sp.height * sp.scaleY;
        }

        return new Laya.Size(w, h);
    }

    static SetNodeContentSize(node: Laya.Node, w, h) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.width = w;
            sp.height = h;
        }
    }
    static GetNodeContentSize(node:Laya.Node) {
        var sp = node as Laya.Sprite;
        var w = 0;
        var h = 0;
        if (sp != null) {
            w = sp.width;
            h = sp.height;
        }

        return new Laya.Size(w, h);
    }
    static GetNodeWidth(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var w = 0;
        if (sp != null) {
            w = sp.width;
        }

        return w;
    }
    static GetNodeHeight(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var h = 0;
        if (sp != null) {
            h = sp.height;
        }
        return h;
    }
    static SetNodeWidth(node: Laya.Node, w: number) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.width = w;
        }
    }
    static SetNodeHeight(node: Laya.Node, h: number) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.height = h;
        }
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
