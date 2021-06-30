 
import Common from "../../Common";
import UI from "../ViewController/UI";
import LayOutBase from "./LayOutBase";
 
import { ScaleType } from "./LayOutUtil";

 
export default class LayOutScale extends LayOutBase {

   
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
    
     /** @prop {name:ratio,type:number}*/
    ratio = 1.0;
 
    private _type = ScaleType.MIN;
    /** @prop {name:type,type:Option,option:"MIN,MAX",default:"MIN"}*/
    // @prop 在基类定义
    //get 的用法
    get type() {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._type;
    }
    // set 的用法
    set type(value) {
        this._type = value;
        this.LayOut();

    }


    onAwake() {
        super.onAwake(); 
        // this.type = this._type;
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
        this.UpdateType();
    }


    UpdateType() {
        switch (this.type) {
            case ScaleType.MIN:
                {
                   this.ScaleNode(this.owner, false);
                }
                break;
            case ScaleType.MAX:
                {
                   this.ScaleNode(this.owner, true);
                }
                break;

        }
    }

    ScaleNode(node: Laya.Node, isMaxFit: boolean) {
        var x, y, w, h; 
        if(node==null)
        {
            return;
        } 
        var size = UI.GetNodeContentSize(node);
        var sizeParent = UI.GetNodeContentSize(node.parent); 

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        w_parent = sizeParent.width;
        h_parent = sizeParent.height;
        
        var sizeCanvas = Common.sizeCanvas;
        if (w_parent == 0) {
            w_parent = sizeCanvas.width;
        }
        if (h_parent == 0) {
            h_parent = sizeCanvas.height;
        }
        w_parent -= (this.offsetMin.x + this.offsetMax.x);
        h_parent -= (this.offsetMin.y + this.offsetMax.y);

        w = size.width;
        h = size.height;

        var scale = 0;
        if (isMaxFit == true) {
            scale = Common.GetMaxFitScale(w, h, w_parent, h_parent);
        } else {
            scale = Common.GetBestFitScale(w, h, w_parent, h_parent);
        }
        scale = scale * this.ratio; 

        var sp = node as Laya.Sprite;
        if(sp!=null)
        {
            sp.scaleX = scale;
            sp.scaleY = scale;
        } 
    }
 
}
 