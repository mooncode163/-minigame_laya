
import AdKitCommon from "../../AdKit/AdKitCommon";
import Debug from "../../Debug";
import UIViewUtil from "../ViewController/UIViewUtil";
import LayOutBase from "./LayOutBase";
import { RelationType, Align } from "./LayOutUtil";



export default class LayOutRelation extends LayOutBase {


    // @prop 在基类定义
    /** @prop {name:enableLayout,type:Bool}*/
    /** @prop {name:enableHide,type:Bool}*/
    /** @prop {name:enableLandscape,type:Bool}*/
    /** @prop {name:enableOffsetAdBanner,type:Bool}*/
    /** @prop {name:isOnlyForPortrait,type:Bool}*/
    /** @prop {name:isOnlyForLandscape,type:Bool}*/
    /** @prop {name:space,type:Vector}*/
    /** @prop {name:align,type:Option,option:"UP,DOWN,LEFT,RIGHT,CENTER,UP_LEFT,UP_RIGHT,DOWN_LEFT,DOWN_RIGHT,Horizontal,Vertical,SAME_POSTION", default:"LEFT"}*/
    /** @prop {name:target,type:Node}*/
    /** @prop {name:target2,type:Node}*/
    // @prop 在基类定义


    // @type(RelationType)
    private _type = RelationType.PARENT;
    /** @prop {name:type,type:Option,option:"None,PARENT,TARGET", default:"PARENT"}*/
    //get 的用法
    get type() {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._type;
    }
    // set 的用法
    set type(value) {
        this._type = value;
    }

    onAwake() {
        super.onAwake();
        this.LayOut();
    }

    onStart() {
        super.onStart();
        this.LayOut();
    }
    LayOut() {
        if (!this.Enable()) {
            return;
        }
        super.LayOut();
        var x, y, w, h;

        var pt = UIViewUtil.GetNodePosition(this.owner);
        x = pt.x;
        y = pt.y;

        // var rctran = this.node.getComponent(cc.RectTransform);
        var size = UIViewUtil.GetNodeBoundingBox(this.owner);
        var sizeParent = UIViewUtil.GetNodeBoundingBox(this.owner.parent);
        w = size.width;
        h = size.height;

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        // this.align = Align.RIGHT;
        // x = w_parent - w;

        var sp = this.owner as Laya.Sprite;
        var pivotX = 0;
        var pivotY = 0;
        if(sp!=null)
        {
            pivotX = sp.pivotX;
            pivotY = sp.pivotY;
        }
        Debug.Log("this.align=" + this.align + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x);
        switch (this.type) {
            case RelationType.PARENT:
                {

                    if (this.align == Align.LEFT) {
                        x = this.offset.x;
                        x +=pivotX; 
                    }
                    if (this.align == Align.RIGHT) {
                        x = w_parent - w - this.offset.x;
                        x +=pivotX; 
                    }
                    if (this.align == Align.UP) {
                        // Debug.Log("Align.UP this.type=" + this.type + " w_parent=" + w_parent + " h_parent=" + h_parent + " h=" + h);
                        y = this.offset.y; 
                        y +=pivotY;
                    }
                    if (this.align == Align.DOWN) {
                        y = h_parent - h - this.offset.y;
                        y +=pivotY;
                    }
                    if (this.align == Align.DOWN_LEFT) {
                        x = this.offset.x;
                        y = h_parent - h - this.offset.y;
                        x +=pivotX; 
                        y +=pivotY;
                    }
                    if (this.align == Align.DOWN_RIGHT) {
                        x = w_parent - w - this.offset.x;
                        y = h_parent - h - this.offset.y;
                        x +=pivotX; 
                        y +=pivotY;
                    }
                    if (this.align == Align.UP_LEFT) {
                        x = this.offset.x;
                        y = this.offset.y;
                        x +=pivotX; 
                        y +=pivotY;
                    }
                    if (this.align == Align.UP_RIGHT) {
                        x = w_parent - w - this.offset.x;
                        y = this.offset.y;
                        x +=pivotX; 
                        y +=pivotY;
                    }
           
                }
                break;
            case RelationType.TARGET:
                {
                    if (this.target == null) {
                        break;
                    }
                    var sizeTarget = UIViewUtil.GetNodeBoundingBox(this.target);
                    if (sizeTarget == null) {
                        break;
                    }
                    var ptTarget = UIViewUtil.GetNodePosition(this.target);
                    // 位于target的左边
                    if (this.align == Align.LEFT) {
                        x = ptTarget.x - w - this.offset.x;
                    }
                    if (this.align == Align.RIGHT) {
                        x = ptTarget.x + sizeTarget.width + this.offset.x;
                    }
                    if (this.align == Align.UP) {
                        y = ptTarget.y - h - this.offset.y;
                    }
                    if (this.align == Align.DOWN) {
                        y = ptTarget.y + sizeTarget.height + this.offset.y;
                    }

                    //相同位置
                    if (this.align == Align.SAME_POSTION) {
                        x = ptTarget.x;
                        y = ptTarget.y;
                    }

                }
                break;

        }

        if (this.enableOffsetAdBanner) {
            y -= AdKitCommon.main.heightCanvasAdBanner;
        }
      
        UIViewUtil.SetNodePosition(this.owner, x, y);

    }

}
