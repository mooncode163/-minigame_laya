 
import AdKitCommon from "../../AdKit/AdKitCommon";
import Debug from "../../Debug";  
import UIViewUtil from "../ViewController/UIViewUtil";
import LayOutBase from "./LayOutBase";
import { RelationType, Align } from "./LayOutUtil";

 
 
export default class LayOutRelation extends LayOutBase {

    // @type(RelationType)
    private _type = RelationType.PARENT;
    // @type(RelationType) 
    /** @prop {name:type,type:Option,option:"None,PARENT", default:PARENT}*/ 
    //get 的用法
    get type() {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._type;
    }
    // set 的用法
    set type(value) {
        this._type = value;
    }

    // private _offset = Vec2.ZERO;
    // @type(Vec2)
    // //get 的用法
    // get offset(): Vec2 {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
    //     return this._offset;
    // }
    // // set 的用法
    // set offset(value: Vec2) {
    //     this._offset = value;
    // }

    // [1]
    // dummy = '';

    // [2]
    //
    // serializableDummy = 0;
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
        w = size?.width;
        h = size?.height;

        var w_parent = sizeParent?.width;
        var h_parent = sizeParent?.height;

        Debug.Log("this.type=" + this.type + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w);
        switch (this.type) {
            case RelationType.PARENT:
                {

                    if (this.align == Align.LEFT) {
                        x = - w_parent / 2 + w / 2 + this.offset.x;
                    }
                    if (this.align == Align.RIGHT) {
                        x = w_parent / 2 - w / 2 - this.offset.x;
                    }
                    if (this.align == Align.UP) {
                        Debug.Log("Align.UP this.type=" + this.type + " w_parent=" + w_parent + " h_parent=" + h_parent + " h=" + h);
                        y = h_parent / 2 - h / 2 - this.offset.y;
                    }
                    if (this.align == Align.DOWN) {
                        y = - h_parent / 2 + h / 2 + this.offset.y;
                        // var sizeCanvas = AppSceneBase.Main().sizeCanvas;
                        // y = - sizeCanvas.height/2  + this.offset.y;
                    }
                    if (this.align == Align.DOWN_LEFT) {
                        x = - w_parent / 2 + w / 2 + this.offset.x;
                        y = - h_parent / 2 + h / 2 + this.offset.y;
                    }
                    if (this.align == Align.DOWN_RIGHT) {
                        x = w_parent / 2 - w / 2 - this.offset.x;
                        y = - h_parent / 2 + h / 2 + this.offset.y;
                    }
                    if (this.align == Align.UP_LEFT) {
                        x = - w_parent / 2 + w / 2 + this.offset.x;
                        y = h_parent / 2 - h / 2 - this.offset.y;
                    }
                    if (this.align == Align.UP_RIGHT) {
                        x = w_parent / 2 - w / 2 - this.offset.x;
                        y = h_parent / 2 - h / 2 - this.offset.y;
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
                        x = ptTarget.x - sizeTarget.width / 2 - w / 2 - this.offset.x;
                    }
                    if (this.align == Align.RIGHT) {
                        x = ptTarget.x + sizeTarget.width / 2 + w / 2 + this.offset.x;
                    }
                    if (this.align == Align.UP) {
                        y = ptTarget.y + sizeTarget.height / 2 + h / 2 + this.offset.y;
                    }
                    if (this.align == Align.DOWN) {
                        y = ptTarget.y - sizeTarget.height / 2 - h / 2 - this.offset.y;
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
            y += AdKitCommon.main.heightCanvasAdBanner;
        } 
        UIViewUtil.SetNodePosition(this.target,x,y);

    }
   
}
 