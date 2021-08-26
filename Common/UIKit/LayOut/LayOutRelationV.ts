
import { ui } from "../../../../ui/layaMaxUI";
import AdKitCommon from "../../AdKit/AdKitCommon";
import Debug from "../../Debug";
import UI from "../ViewController/UI";
import LayOutBase from "./LayOutBase";
import LayOutRelation from "./LayOutRelation";
import LayOutUtil, { RelationType, Align } from "./LayOutUtil";



export default class LayOutRelationV extends LayOutRelation {


    // @prop 在基类定义
    /** @prop {name:enableLayout,type:Bool}*/
    /** @prop {name:enableHide,type:Bool}*/
    /** @prop {name:enableLandscape,type:Bool}*/
    /** @prop {name:enableOffsetAdBanner,type:Bool}*/
    /** @prop {name:isOnlyForPortrait,type:Bool}*/
    /** @prop {name:isOnlyForLandscape,type:Bool}*/




    /** @prop {name:offsetX,type:Number}*/
    /** @prop {name:offsetY,type:Number}*/
    // @prop 在基类定义


    /** @prop {name:alignX,type:Option,option:"None,LEFT,RIGHT,CENTER,SAMEPOSTION", default:"CENTER"}*/
    alignX: Align = Align.CENTER;
    /** @prop {name:alignY,type:Option,option:"None,UP,DOWN,CENTER,SAMEPOSTION", default:"CENTER"}*/
    alignY: Align = Align.CENTER;

    type: RelationType = RelationType.PARENT;

    /** @prop {name:typeX,type:Option,option:"None,PARENT,TARGET,BETWEEN_SIDE_TARGET,BETWEEN_TWO_TARGET", default:"PARENT"}*/
    typeX: RelationType = RelationType.PARENT;
    /** @prop {name:typeY,type:Option,option:"None,PARENT,TARGET,BETWEEN_SIDE_TARGET,BETWEEN_TWO_TARGET", default:"PARENT"}*/
    typeY: RelationType = RelationType.PARENT;


    /** @prop {name:targetX,type:Node}*/
    targetX: Laya.Node;
    /** @prop {name:targetY,type:Node}*/
    targetY: Laya.Node;

    /** @prop {name:targetX2,type:Node}*/
    targetX2: Laya.Node;
    /** @prop {name:targetY2,type:Node}*/
    targetY2: Laya.Node;


    onAwake() {
        super.onAwake();
        this.isOnlyForPortrait = true;
        this.LayOut();
    }

    onStart() {
        super.onStart();
        this.LayOut();
    }
    LayOut() { 
        super.LayOut();
 
    }

    

}
