import Debug from "../../Debug";
import HorizontalOrVerticalLayoutBase from "./HorizontalOrVerticalLayoutBase";
import LayOutUtil from "./LayOutUtil";

export default class LayOutHorizontal extends HorizontalOrVerticalLayoutBase {


    // @prop 在基类定义
    /** @prop {name:enableLayout,type:Bool}*/
    /** @prop {name:enableHide,type:Bool}*/
    /** @prop {name:enableLandscape,type:Bool}*/
    /** @prop {name:enableOffsetAdBanner,type:Bool}*/
    /** @prop {name:isOnlyForPortrait,type:Bool}*/
    /** @prop {name:isOnlyForLandscape,type:Bool}*/
   
    /** @prop {name:align,type:Option,option:"UP,DOWN,LEFT,RIGHT,CENTER,UPLEFT,UPRIGHT,DOWNLEFT,DOWNRIGHT,Horizontal,Vertical,SAMEPOSTION", default:"LEFT"}*/
    /** @prop {name:target,type:Node}*/
    /** @prop {name:target2,type:Node}*/
    // @prop 在基类定义

    
    /** @prop {name:childControlHeight,type:Bool}*/
    /** @prop {name:childControlWidth,type:Bool}*/
    /** @prop {name:childForceExpandHeight,type:Bool}*/
    /** @prop {name:childForceExpandWidth,type:Bool}*/
    /** @prop {name:childScaleHeight,type:Bool}*/
    /** @prop {name:childScaleWidth,type:Bool}*/
    /** @prop {name:col,type:int}*/
    /** @prop {name:row,type:int}*/
    /** @prop {name:offsetX,type:Number}*/
    /** @prop {name:offsetY,type:Number}*/
    onAwake() {
        super.onAwake();
        // this.LayOut();
    }
    onStart() {

        // [3] super.LayOut();
        super.onStart();
        this.LayOut();
    }
    LayOut() {

        if (!this.Enable()) {
            return;
        }
        super.LayOut();
        this.row = 1;
        this.col = LayOutUtil.main.GetChildCount(this.owner, this.enableHide);
        Debug.Log("LayOutHorizontal LayOut");
        super.LayOut();

    }
}


