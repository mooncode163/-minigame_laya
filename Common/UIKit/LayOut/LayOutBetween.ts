import Debug from "../../Debug";
import UI from "../ViewController/UI";
import LayOutBase from "./LayOutBase";
import LayOutUtil, { Align } from "./LayOutUtil";


export default class LayOutBetween extends LayOutBase {


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
        Debug.Log("LayOutBetween LayOut");
        var sp = this.owner  as Laya.Sprite;
        // var pt = this.owner.getPosition();
        x = sp.x;
        y = sp.y;
        if (this.target == null) {
            return;
        }
        var size = UI.GetNodeBoundingBox(this.owner); 
        w = size.width;
        h = size.height;
        var pivotX= UI.GetPivotX(this.owner);
        var pivotY= UI.GetPivotY(this.owner);
        //左右
        if (this.align == Align.Horizontal) {
            x = LayOutUtil.main.GetBetweenCenterX(this.target as Laya.Sprite, this.target2 as Laya.Sprite)-w/2 + this.offset.x;
            x+=pivotX;
        }
        if (this.align == Align.Vertical) {
            y = LayOutUtil.main.GetBetweenCenterY(this.target as Laya.Sprite, this.target2 as Laya.Sprite) -h/2+ this.offset.y;
            y+=pivotY;
        }

        //屏幕边界 
        if ((this.align == Align.LEFT) || (this.align == Align.RIGHT)) {
            x = LayOutUtil.main.GetBetweenScreenCenter(this.target as Laya.Sprite, this.align)-w/2 + this.offset.x;
            x+=pivotX;
        }

        if (this.align == Align.UP) {
            y = LayOutUtil.main.GetBetweenScreenCenter(this.target as Laya.Sprite, this.align)-h/2 + this.offset.y;
            y+=pivotY;

        }
        if (this.align == Align.DOWN) {
            y = LayOutUtil.main.GetBetweenScreenCenter(this.target as Laya.Sprite, this.align, this.enableOffsetAdBanner)-h/2 + this.offset.y;
            y+=pivotY;
        }
        Debug.Log("LayOutBetween x=" + x + " y=" + y + " align=" + this.align);
        
        sp.x = x;
        sp.y = y; 

    }

}

