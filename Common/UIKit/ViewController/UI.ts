
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

import Debug from "../../Debug";



// Laya UI坐标系原点在屏幕左上角

export default class UI {

    static SetPosition(node: Laya.Node, pt: Laya.Vector3) {
        UI.SetNodePosition(node,pt.x,pt.y);
    }
    static GetPosition(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var x = 0;
        var y = 0;
        var z = 0;
        if (sp != null) {
            x = sp.x;
            y = sp.y;
            // z = sp.z;
        }
        return new Laya.Vector3(x, y,z);
    }  
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

    // 设置猫点在中心
    static SetNodePivotCenter(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.pivotX = sp.width/2;
            sp.pivotY = sp.height/2;
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
        }else{
            Debug.Log("SetNodeContentSize sp null");
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
    static SetScaleXY(node: Laya.Node,scale) {
        var sp = node as Laya.Sprite; 
        if (sp != null) { 
            sp.scaleX = scale; 
            sp.scaleY = scale; 
        } 
    }
    static SetScaleX(node: Laya.Node,scale) {
        var sp = node as Laya.Sprite; 
        if (sp != null) { 
            sp.scaleX = scale; 
        } 
    }

    static SetScaleY(node: Laya.Node,scale) {
        var sp = node as Laya.Sprite; 
        if (sp != null) { 
            sp.scaleY = scale; 
        } 
    }
    static GetScaleX(node: Laya.Node) {
        var sp = node as Laya.Sprite; 
        if (sp != null) { 
            return sp.scaleX; 
        } 
        return 1;
    }
    static GetScaleY(node: Laya.Node) {
        var sp = node as Laya.Sprite; 
        if (sp != null) { 
            return sp.scaleY; 
        } 
        return 1;
    }

    static GetPivotX(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var x = 0;
        if (sp != null) {
            x = sp.pivotX;
        }
        return x;
    }
    static GetPivotY(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        var x = 0;
        if (sp != null) {
            x = sp.pivotY;
        }
        return x;
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

// 实例化
    static Instantiate(prefab: Laya.Prefab):Laya.Node {
        var node = prefab.create();
        return node;
    } 
   
    // 按名字查找子对象
    static FindChild(parent:Laya.Node,name:string):Laya.Node {
        return parent.getChildByName(name); 
    } 
}


