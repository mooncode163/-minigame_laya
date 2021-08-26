

// import { serializable } from 'cc.decorator';

import AdKitCommon from "../../AdKit/AdKitCommon";
import Debug from "../../Debug";
import UI from "../ViewController/UI";
import LayOutBase from "./LayOutBase";
import LayOutSize from "./LayOutSize"; 
 
export default class LayOutSizeH extends LayOutSize {

    // @prop 在基类定义
    /** @prop {name:enableLayout,type:Bool}*/
    /** @prop {name:enableHide,type:Bool}*/
    /** @prop {name:enableLandscape,type:Bool}*/
    /** @prop {name:enableOffsetAdBanner,type:Bool}*/
    /** @prop {name:isOnlyForPortrait,type:Bool}*/
    /** @prop {name:isOnlyForLandscape,type:Bool}*/
 
    /** @prop {name:offsetXLeft,type:Number}*/
    /** @prop {name:offsetXRight,type:Number}*/
    /** @prop {name:offsetYUp,type:Number}*/
    /** @prop {name:offsetYDown,type:Number}*/

    // @prop 在基类定义


    /** @prop {name:ratio,type:number}*/ 
    /** @prop {name:ratioW,type:number}*/ 
    /** @prop {name:ratioH,type:number}*/ 
    /** @prop {name:widthH,type:number}*/ 
    /** @prop {name:heightH,type:number}*/  

 
    /** @prop {name:sideType,type:Option,option:"LEFT,RIGHT,UP,DOWN",default:"LEFT"}*/
   
    /** @prop {name:typeX,type:Option,option:"CONTENT,PARENT,TARGET,PARENT_MIN,PARENT_MAX,WIDTH,HEIGHT,BETWEEN_SIDE_TARGET,BETWEEN_TWO_TARGET,VALUE,VALUE_Canvas",default:"PARENT"}*/
    /** @prop {name:typeY,type:Option,option:"CONTENT,PARENT,TARGET,PARENT_MIN,PARENT_MAX,WIDTH,HEIGHT,BETWEEN_SIDE_TARGET,BETWEEN_TWO_TARGET,VALUE,VALUE_Canvas",default:"PARENT"}*/


    /** @prop {name:targetX,type:Node}*/ 
    /** @prop {name:targetY,type:Node}*/ 

    /** @prop {name:targetX2,type:Node}*/ 
    /** @prop {name:targetY2,type:Node}*/ 


    onAwake() {
        super.onAwake();
        this.isOnlyForLandscape = true;
        this.LayOut();
    }
    onStart() { 
        super.onStart();
        this.LayOut();
    }
}



