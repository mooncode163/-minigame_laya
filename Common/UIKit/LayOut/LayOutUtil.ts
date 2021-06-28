


// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer 
import AdKitCommon from "../../AdKit/AdKitCommon";
import Common from "../../Common";
import Debug from "../../Debug";
import UIViewUtil from "../ViewController/UIViewUtil";
import LayOutElement from "./LayOutElement";


// 微信小程序 const Align = LayOutUtil.Align; 会异常 所以用export enum的方式
export enum Align {
    UP = "UP",//0
    DOWN = "DOWN",//1
    LEFT = "LEFT",//2
    RIGHT = "RIGHT",//3
    CENTER = "CENTER",
    UP_LEFT = "UP_LEFT",
    UP_RIGHT = "UP_RIGHT",
    DOWN_LEFT = "DOWN_LEFT",
    DOWN_RIGHT = "DOWN_RIGHT",
    Horizontal = "Horizontal",
    Vertical = "Vertical",
    SAME_POSTION = "SAME_POSTION",
}

export enum RelationType {
    NONE = "NONE",// 
    PARENT = "PARENT",//相对父窗口 
    TARGET = "TARGET",//相对目标  
}



export enum ScaleType {
    MIN = "MIN",
    MAX = "MAX"
}



export enum DispLayVertical {
    TOP_TO_BOTTOM = "TOP_TO_BOTTOM",
    BOTTOM_TO_TOP = "BOTTOM_TO_TOP",
}


export enum DispLayHorizontal {
    LEFT_TO_RIGHT = "LEFT_TO_RIGHT",
    RIGHT_TO_LEFT = "RIGHT_TO_LEFTF",
}




// weixin小程序 上的enum要用export的方式
export enum Direction {
    //区分大小写
    TOP_TO_BOTTOM = "TOP_TO_BOTTOM",
    BOTTOM_TO_TOP = "BOTTOM_TO_TOP",
    LEFT_TO_RIGHT = "LEFT_TO_RIGHT",
    RIGHT_TO_LEFT = "RIGHT_TO_LEFT",

}


export enum SizeType {
    MATCH_CONTENT = "MATCH_CONTENT",//按内容设置
    MATCH_PARENT = "MATCH_PARENT",//与父窗口等大或者按比例 
    MATCH_TARGET = "MATCH_TARGET",//与目标等大或者按比例 
    MATCH_PARENT_MIN = "MATCH_PARENT_MIN",//父窗口width 和 height 的 min
    MATCH_PARENT_MAX = "MATCH_PARENT_MAX",//父窗口width 和 height 的 max
    MATCH_WIDTH = "MATCH_WIDTH",//width 和 height 相等
    MATCH_HEIGHT = "MATCH_HEIGHT",//width 和 height相等
    BETWEEN_SIDE_TARGET = "BETWEEN_SIDE_TARGET",//夹在边界和target之间
    BETWEEN_TWO_TARGET = "BETWEEN_TWO_TARGET",//夹在两个target之间

    // 和widht height同步
    MATCH_VALUE = "MATCH_VALUE",

    // 和widht height同步 canvas大小
    MATCH_VALUE_Canvas = "MATCH_VALUE_Canvas",
}



export enum SideType {
    LEFT = "LEFT",// 
    RIGHT = "RIGHT",
    UP = "UP",
    DOWN = "DOWN",
}



export default class LayOutUtil {


    static _main: LayOutUtil;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new LayOutUtil();
        }
        return this._main;
    }

    //两个node之间的中心位置x
    GetBetweenCenterX(node1: Laya.Sprite, node2: Laya.Sprite) {
        var nodeleft, noderight;
        if ((node1 as Laya.Sprite).x < (node2 as Laya.Sprite).x) {
            nodeleft = node1;
            noderight = node2;
        } else {
            nodeleft = node2;
            noderight = node1;
        }

        // var rctran = nodeleft.getComponent(UITransform).contentSize;
        var v1 = nodeleft.x + nodeleft.width;
        // rctran = noderight.getComponent(UITransform).contentSize;
        var v2 = noderight.x;
        return (v1 + v2) / 2;

    }
    //两个node之间的中心位置y
    GetBetweenCenterY(node1: Laya.Sprite, node2: Laya.Sprite) {
        var nodeDown, nodeUp;
        if ((node1 as Laya.Sprite).y < (node2 as Laya.Sprite).y) {
            nodeDown = node1;
            nodeUp = node2;
        } else {
            nodeDown = node2;
            nodeUp = node1;
        }

        var v1 = nodeDown.y;
        var v2 = nodeUp.y + nodeUp.height / 2;
        return (v1 + v2) / 2;

    }

    //node和屏幕边界之间的中心位置x或者y
    GetBetweenScreenCenter(node: Laya.Sprite, align: Align, enableAdBanner: boolean = false) {
        var v1 = 0, v2 = 0;

        var sizeCanvas = Common.sizeCanvas;

        // var rctran = node.getComponent(UITransform).contentSize;
        // var rctran = node.getComponent(cc.RectTransform);
        switch (align) {
            case Align.LEFT:
                {
                    //左边界
                    v1 = 0;// -sizeCanvas.width / 2;
                    v2 = node.x;// - node.width / 2;
                }
                break;
            case Align.RIGHT:
                {
                    //右边界
                    v1 = sizeCanvas.width;
                    v2 = node.x + node.width;
                }
                break;
            case Align.UP:
                {
                    //上边界
                    v1 = 0;//sizeCanvas.height / 2;
                    v2 = node.y;//+ node.height / 2;
                }
                break;
            case Align.DOWN:
                {
                    //下边界
                    v1 = sizeCanvas.height;
                    if (enableAdBanner) {
                        // AdKitCommon.main.heightCanvasAdBanner = 256;
                        v1 -= AdKitCommon.main.heightCanvasAdBanner;
                    }
                    v2 = node.y + node.height;
                }
                break;
        }

        return (v1 + v2) / 2;

    }



    //两个对象之间的宽度或者高度 cc.Node
    GetBetweenTwoTargetSize(node1: Laya.Sprite, node2: Laya.Sprite, isHeight) {
        var objDown, objUp;
        // var pos1 = node1.getPosition();
        // var pos2 = node2.getPosition();

        if (isHeight) {
            // 上下
            if (node1.y < node2.y) {
                objDown = node1;
                objUp = node2;
            }
            else {
                objDown = node2;
                objUp = node1;
            }
        } else {
            // 左右
            if (node1.x < node2.x) {
                objDown = node1;
                objUp = node2;
            }
            else {
                objDown = node2;
                objUp = node1;
            }
        }


        // var pos = objDown.getPosition();
        var size = UIViewUtil.GetNodeBoundingBox(objDown); //objDown.getBoundingBox();
        var y1 = objDown.y;// + size.height / 2;

        // 左
        var x1 = objDown.x+size.width;

        // objUp
        // pos = objUp.getPosition();
        size = UIViewUtil.GetNodeBoundingBox(objUp);
        var y2 = objUp.y + size.height;

        // 右
        var x2 = objUp.x;

        var ret = 0;
        if (isHeight) {
            ret = Math.abs(y1 - y2);
        }
        else {
            ret = Math.abs(x1 - x2);
        }

        return ret;


    }


    //边界和对象之间的宽度或者高度 type SizeType
    GetBetweenSideAndTargetSize(node: Laya.Sprite, type) {
        var v1 = 0, v2 = 0;

        var size = UIViewUtil.GetNodeBoundingBox(node);// node.getBoundingBox();
        // var pos = node.getPosition();
        // var sizeParent = node.parent.getBoundingBox();
        var sizeParent = UIViewUtil.GetNodeBoundingBox(node.parent);
        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        Debug.Log("GetBetweenSideAndTargetSize type=" + type);
        switch (type) {
            case SideType.LEFT:
                {
                    //左边界
                    v1 = 0;// -w_parent / 2;
                    v2 = node.x;//- size.width / 2;
                }
                break;
            case SideType.RIGHT:
                {
                    //右边界
                    v1 = w_parent;
                    v2 = node.x + size.width;
                }
                break;
            case SideType.UP:
                {
                    //上边界
                    v1 = 0;
                    v2 = node.y;
                    Debug.Log("GetBetweenSideAndTargetSize h_parent=" + h_parent + " pos.y=" + node.y + " size.height=" + size.height)
                }
                break;
            case SideType.DOWN:
                {
                    //下边界
                    v1 = h_parent;
                    v2 = node.y + size.height;
                }
                break;
        }

        var ret = 0;

        ret = Math.abs(v1 - v2);

        return ret;


    }

    GetChildCount(node: Laya.Node, includeHide = true) {
        var count = 0;
        for (var i = 0; i < node.numChildren; i++) {
            var child = node.getChildAt(i);
            if (child == null) {
                // 过滤已经销毁的嵌套子对象 
                continue;
            }
            //     GameObject objtmp = child.gameObject;
            //     if (this.gameObject == objtmp) {
            //         continue;
            //     }

            if (!includeHide) {
                if (!child.active) {
                    //过虑隐藏的
                    continue;
                }
            }

            var le = child.getComponent(LayOutElement);
            if (le != null && le.ignoreLayout) {
                continue;
            }

            //     if (objtmp.transform.parent != this.gameObject.transform) {
            //         //只找第一层子物体
            //         continue;
            //     }
            count++;
        }

        return count;
    }


}
