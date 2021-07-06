
import { ui } from "../../../../ui/layaMaxUI";
import AdKitCommon from "../../AdKit/AdKitCommon";
import Debug from "../../Debug";
import UI from "../ViewController/UI";
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


    /** @prop {name:target,type:Node}*/
    /** @prop {name:target2,type:Node}*/

    /** @prop {name:offsetX,type:Number}*/
    /** @prop {name:offsetY,type:Number}*/
    // @prop 在基类定义

    /** @prop {name:align,type:Option,option:"None,UP,DOWN,LEFT,RIGHT,CENTER,CENTERX,CENTERY,UPLEFT,UPRIGHT,DOWNLEFT,DOWNRIGHT,Horizontal,Vertical,SAMEPOSTION", default:"CENTER"}*/
    
    /** @prop {name:alignX,type:Option,option:"None,LEFT,RIGHT,CENTER,SAMEPOSTION", default:"None"}*/
    alignX: Align = Align.None;

    
    /** @prop {name:alignY,type:Option,option:"None,UP,DOWN,CENTER,SAMEPOSTION", default:"None"}*/
    alignY: Align = Align.None;

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

        this.LayOutXY();
        this.LayOutX();
        this.LayOutY();

        var x, y, w, h;

        var pt = UI.GetNodePosition(this.owner);
        x = pt.x;
        y = pt.y;

        if (this.enableOffsetAdBanner) {
            y -= AdKitCommon.main.heightCanvasAdBanner;
        }

        UI.SetNodePosition(this.owner, x, y);
    }

    LayOutXY() {
        if (!this.Enable()) {
            return;
        }

        var x, y, w, h;
        if (this.align == Align.None) {
            return;
        }
        var pt = UI.GetNodePosition(this.owner);
        x = pt.x;
        y = pt.y;

        // var rctran = this.node.getComponent(cc.RectTransform);
        var size = UI.GetNodeBoundingBox(this.owner);
        var sizeParent = UI.GetNodeBoundingBox(this.owner.parent);
        w = size.width;
        h = size.height;

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        // this.align = Align.RIGHT;
        // x = w_parent - w;

        var pivotX = UI.GetPivotX(this.owner);//*UI.GetScaleX(this.owner);
        var pivotY = UI.GetPivotY(this.owner);
        Debug.Log("LayOutRelation this.align=" + this.align + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX);
        switch (this.type) {
            case RelationType.PARENT:
                {

                    if (this.align == Align.LEFT) {
                        x = this.offsetX;
                        x += pivotX;
                    }
                    if (this.align == Align.RIGHT) {
                        x = w_parent - w - this.offsetX;
                        x += pivotX;
                    }
                    if (this.align == Align.UP) {
                        // Debug.Log("Align.UP this.type=" + this.type + " w_parent=" + w_parent + " h_parent=" + h_parent + " h=" + h);
                        y = this.offsetY;
                        y += pivotY;
                    }
                    if (this.align == Align.DOWN) {
                        y = h_parent - h - this.offsetY;
                        y += pivotY;
                    }
                    if (this.align == Align.DOWNLEFT) {
                        x = this.offsetX;
                        y = h_parent - h - this.offsetY;
                        x += pivotX;
                        y += pivotY;
                    }
                    if (this.align == Align.DOWNRIGHT) {
                        x = w_parent - w - this.offsetX;
                        y = h_parent - h - this.offsetY;
                        x += pivotX;
                        y += pivotY;
                    }
                    if (this.align == Align.UPLEFT) {
                        x = this.offsetX;
                        y = this.offsetY;
                        x += pivotX;
                        y += pivotY;
                    }
                    if (this.align == Align.UPRIGHT) {
                        x = w_parent - w - this.offsetX;
                        y = this.offsetY;
                        x += pivotX;
                        y += pivotY;
                    }
                    if (this.align == Align.CENTER) {
                        size = UI.GetNodeContentSize(this.owner);
                        sizeParent = UI.GetNodeContentSize(this.owner.parent);
                        w = size.width;
                        h = size.height;
                        w_parent = sizeParent.width;
                        h_parent = sizeParent.height;

                        x = w_parent / 2 - w / 2 + this.offsetX;
                        y = h_parent / 2 - h / 2 + this.offsetY;
                        x += pivotX;
                        y += pivotY;
                        Debug.Log("LayOutRelation CENTER=" + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX + " name=" + this.owner.name);

                    }
                    if (this.align == Align.CENTERX) {
                        size = UI.GetNodeContentSize(this.owner);
                        sizeParent = UI.GetNodeContentSize(this.owner.parent);
                        w = size.width;
                        h = size.height;
                        w_parent = sizeParent.width;
                        h_parent = sizeParent.height;

                        x = w_parent / 2 - w / 2 + this.offsetX;
                        x += pivotX;

                        Debug.Log("LayOutRelation CENTER=" + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX + " name=" + this.owner.name);

                    }


                    if (this.align == Align.CENTERY) {
                        size = UI.GetNodeContentSize(this.owner);
                        sizeParent = UI.GetNodeContentSize(this.owner.parent);
                        w = size.width;
                        h = size.height;
                        w_parent = sizeParent.width;
                        h_parent = sizeParent.height;

                        y = h_parent / 2 - h / 2 + this.offsetY;
                        y += pivotY;
                        Debug.Log("LayOutRelation CENTER=" + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX + " name=" + this.owner.name);

                    }


                }
                break;
            case RelationType.TARGET:
                {
                    if (this.target == null) {
                        break;
                    }
                    var sizeTarget = UI.GetNodeBoundingBox(this.target);
                    if (sizeTarget == null) {
                        break;
                    }
                    var ptTarget = UI.GetNodePosition(this.target);
                    // 位于target的左边
                    if (this.align == Align.LEFT) {
                        x = ptTarget.x - w - this.offsetX;
                        x += pivotX;
                    }
                    if (this.align == Align.RIGHT) {
                        x = ptTarget.x + sizeTarget.width + this.offsetX;
                        x += pivotX;
                    }
                    if (this.align == Align.UP) {
                        y = ptTarget.y - h - this.offsetY;
                        y += pivotY;
                    }
                    if (this.align == Align.DOWN) {
                        y = ptTarget.y + sizeTarget.height + this.offsetY;
                        y += pivotY;
                    }

                    //相同位置
                    if (this.align == Align.SAMEPOSTION) {
                        x = ptTarget.x;
                        y = ptTarget.y;
                        x += pivotX;
                        y += pivotY;
                    }

                }
                break;

        }


        UI.SetNodePosition(this.owner, x, y);

    }

    LayOutX() {
        if (!this.Enable()) {
            return;
        }
        var x, y, w, h;
        if (this.alignX == Align.None) {
            return;
        }
        var pt = UI.GetNodePosition(this.owner);
        x = pt.x;
        y = pt.y;

        // var rctran = this.node.getComponent(cc.RectTransform);
        var size = UI.GetNodeBoundingBox(this.owner);
        var sizeParent = UI.GetNodeBoundingBox(this.owner.parent);
        w = size.width;
        h = size.height;

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        // this.align = Align.RIGHT;
        // x = w_parent - w;

        var pivotX = UI.GetPivotX(this.owner);//*UI.GetScaleX(this.owner);
        var pivotY = UI.GetPivotY(this.owner);
        Debug.Log("LayOutRelation this.align=" + this.align + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX);
        switch (this.type) {
            case RelationType.PARENT:
                {

                    if (this.alignX == Align.LEFT) {
                        x = this.offsetX;
                        x += pivotX;
                    }
                    if (this.alignX == Align.RIGHT) {
                        x = w_parent - w - this.offsetX;
                        x += pivotX;
                    }



                    if ((this.alignX == Align.CENTER) || (this.alignX == Align.CENTERX)) {
                        size = UI.GetNodeContentSize(this.owner);
                        sizeParent = UI.GetNodeContentSize(this.owner.parent);
                        w = size.width;
                        h = size.height;
                        w_parent = sizeParent.width;
                        h_parent = sizeParent.height;

                        x = w_parent / 2 - w / 2 + this.offsetX;
                        x += pivotX;

                        Debug.Log("LayOutRelation CENTER=" + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX + " name=" + this.owner.name);

                    }




                }
                break;
            case RelationType.TARGET:
                {
                    if (this.target == null) {
                        break;
                    }
                    var sizeTarget = UI.GetNodeBoundingBox(this.target);
                    if (sizeTarget == null) {
                        break;
                    }
                    var ptTarget = UI.GetNodePosition(this.target);
                    // 位于target的左边
                    if (this.alignX == Align.LEFT) {
                        x = ptTarget.x - w - this.offsetX;
                        x += pivotX;
                    }
                    if (this.alignX == Align.RIGHT) {
                        x = ptTarget.x + sizeTarget.width + this.offsetX;
                        x += pivotX;
                    }


                    //相同位置
                    if (this.alignX == Align.SAMEPOSTION) {
                        x = ptTarget.x;
                        x += pivotX;
                    }

                }
                break;

        }

        // if (this.enableOffsetAdBanner) {
        //     y -= AdKitCommon.main.heightCanvasAdBanner;
        // }

        UI.SetNodePosition(this.owner, x, y);

    }

    LayOutY() {
        if (!this.Enable()) {
            return;
        }
        var x, y, w, h;
        if (this.alignY == Align.None) {
            return;
        }
        var pt = UI.GetNodePosition(this.owner);
        x = pt.x;
        y = pt.y;

        // var rctran = this.node.getComponent(cc.RectTransform);
        var size = UI.GetNodeBoundingBox(this.owner);
        var sizeParent = UI.GetNodeBoundingBox(this.owner.parent);
        w = size.width;
        h = size.height;

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        // this.align = Align.RIGHT;
        // x = w_parent - w;

        var pivotX = UI.GetPivotX(this.owner);//*UI.GetScaleX(this.owner);
        var pivotY = UI.GetPivotY(this.owner);
        Debug.Log("LayOutRelation this.align=" + this.align + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX);
        switch (this.type) {
            case RelationType.PARENT:
                {


                    if (this.alignY == Align.UP) {
                        // Debug.Log("Align.UP this.type=" + this.type + " w_parent=" + w_parent + " h_parent=" + h_parent + " h=" + h);
                        y = this.offsetY;
                        y += pivotY;
                    }
                    if (this.alignY == Align.DOWN) {
                        y = h_parent - h - this.offsetY;
                        y += pivotY;
                    }



                    if ((this.alignY == Align.CENTER) || (this.alignY == Align.CENTERY)) {
                        size = UI.GetNodeContentSize(this.owner);
                        sizeParent = UI.GetNodeContentSize(this.owner.parent);
                        w = size.width;
                        h = size.height;
                        w_parent = sizeParent.width;
                        h_parent = sizeParent.height;

                        y = h_parent / 2 - h / 2 + this.offsetY;
                        y += pivotY;
                        Debug.Log("LayOutRelation alignY CENTER=" + " w_parent=" + w_parent + " h_parent=" + h_parent + " h=" + h + " y=" + y + " pivotY=" + pivotY + " name=" + this.owner.name);

                    }


                }
                break;
            case RelationType.TARGET:
                {
                    if (this.target == null) {
                        break;
                    }
                    var sizeTarget = UI.GetNodeBoundingBox(this.target);
                    if (sizeTarget == null) {
                        break;
                    }
                    var ptTarget = UI.GetNodePosition(this.target);

                    if (this.alignY == Align.UP) {
                        y = ptTarget.y - h - this.offsetY;
                        y += pivotY;
                    }
                    if (this.alignY == Align.DOWN) {
                        y = ptTarget.y + sizeTarget.height + this.offsetY;
                        y += pivotY;
                    }

                    //相同位置
                    if (this.alignY == Align.SAMEPOSTION) {
                        y = ptTarget.y;
                        y += pivotY;
                    }

                }
                break;

        }

        // if (this.enableOffsetAdBanner) {
        //     y -= AdKitCommon.main.heightCanvasAdBanner;
        // }

        UI.SetNodePosition(this.owner, x, y);

    }


}
