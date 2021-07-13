

// import { serializable } from 'cc.decorator';

import AdKitCommon from "../../AdKit/AdKitCommon";
import Debug from "../../Debug";
import UI from "../ViewController/UI";
import LayOutBase from "./LayOutBase";
import LayOutUtil, { SideType, SizeType } from "./LayOutUtil";

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer
// const Align = LayOutUtil.Align;
// const SideType = LayOutUtil.SideType;


// export const NetURL = cc.Enum({
//     eLAN : 1,//内网
//     eWAN : 2,//外网
//     })

const layerList = {
    NONE: 0,
    DEFAULT: 2,
    ALL: 0xffffffff,
};

enum TestEum {
    LEFT = 0,// 
    RIGHT,
    UP,
    DOWN,
}
export default class LayOutSize extends LayOutBase {

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
    ratio = 1.0;
    /** @prop {name:ratioW,type:number}*/
    ratioW = 1.0;
    /** @prop {name:ratioH,type:number}*/
    ratioH = 1.0;
    /** @prop {name:widthH,type:number}*/
    widthH = 1.0;//宽
    /** @prop {name:heightH,type:number}*/
    heightH = 1.0;//高  


    _sideType = SideType.LEFT;
    /** @prop {name:sideType,type:Option,option:"LEFT,RIGHT,UP,DOWN",default:"LEFT"}*/
    // @type(SideType) 
    get sideType() {
        return this._sideType;
    }
    set sideType(value) {
        this._sideType = value;
        this.LayOut();
    }


    private _width = 1.0;
    //get 的用法
    get width(): number {
        return this._width;
    }
    // set 的用法
    set width(value: number) {
        this._width = value;
        this.LayOut();
    }

    private _height = 1.0;

    //get 的用法
    get height(): number {
        return this._height;
    }
    // set 的用法
    set height(value: number) {
        this._height = value;
        this.LayOut();
    }

    private _typeX = SizeType.PARENT;
    /** @prop {name:typeX,type:Option,option:"CONTENT,PARENT,TARGET,PARENT_MIN,PARENT_MAX,WIDTH,HEIGHT,BETWEEN_SIDE_TARGET,BETWEEN_TWO_TARGET,VALUE,VALUE_Canvas",default:"PARENT"}*/
    get typeX() {
        return this._typeX;
    }
    set typeX(value) {
        this._typeX = value;
        this.LayOut();
    }


    private _typeY = SizeType.PARENT;
    /** @prop {name:typeY,type:Option,option:"CONTENT,PARENT,TARGET,PARENT_MIN,PARENT_MAX,WIDTH,HEIGHT,BETWEEN_SIDE_TARGET,BETWEEN_TWO_TARGET,VALUE,VALUE_Canvas",default:"PARENT"}*/
    get typeY() {
        return this._typeY;
    }
    set typeY(value) {
        this._typeY = value;
        this.LayOut();
    }


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
        this.LayOut();
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
        
        var x, y, w, h;
        w = 1024;
        h = 512;
        // w = AppSceneBase.Main().sizeCanvas.width;
        // this.node?.getComponent(UITransform)?.setContentSize(new Size(w, h));
        // var sizeParent = this.node.parent.getComponent(UITransform).contentSize;
        this.UpdateSize();
    }
    // update (deltaTime: number) {
    //     // [4]
    // }

    UpdateSizeX() {
        var x, y, w, h;
        if (this.owner == null) {
            return;
        }
        var size = UI.GetNodeContentSize(this.owner);
        var sizeParent = UI.GetNodeContentSize(this.owner.parent);
        w = size.width;
        h = size.height;
        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        // w_parent -= (this.offsetMin.x + this.offsetMax.x);
        // h_parent -= (this.offsetMin.y + this.offsetMax.y);
      

        Debug.Log("UpdateSizeX this.typeX=" + this.typeX + " sizeParent.width=" + sizeParent.width + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " name=" + this.owner.name + " this.ratioW=" + this.ratioW);
        // Debug.Log("w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w);

        // return;
        switch (this.typeX) {
            case SizeType.CONTENT:
                {
                    w = size.width;
                }
                break;
            case SizeType.VALUE:
                {
                    w = this.width;
                }
                break;
            case SizeType.VALUE_Canvas:
                {
                    w = this.width;
                    //  if (IsSprite())
                    // {
                    //     w= Common.CanvasToWorldWidth(AppSceneBase.main.mainCamera, Common.sizeCanvas, width);
                    // }
                    //    x = rctran.anchoredPosition.x;
                }
                break;

            case SizeType.PARENT:
                {
                    w = w_parent * this.ratioW;
                }
                break;
            case SizeType.PARENT_MIN:
                {
                    w = Math.min(w_parent, h_parent) * this.ratioW;

                }
                break;
            case SizeType.PARENT_MAX:
                {
                    w = Math.max(w_parent, h_parent) * this.ratioW;
                }
                break;
            case SizeType.TARGET:
                {
                    if (this.targetX != null) {
                        w = UI.GetNodeContentSize(this.targetX).width * this.ratioW;

                    }

                }
                break;
            case SizeType.HEIGHT:
                {
                    w = size.height;
                }
                break;

            case SizeType.BETWEEN_SIDE_TARGET:
                {

                    if ((this.sideType == SideType.LEFT) || (this.sideType == SideType.RIGHT)) {
                        w = LayOutUtil.main.GetBetweenSideAndTargetSize(this.targetX as Laya.Sprite, this.sideType) * this.ratioW;
                    }

                }
                break;
            case SizeType.BETWEEN_TWO_TARGET:
                {
                    w = LayOutUtil.main.GetBetweenTwoTargetSize(this.targetX as Laya.Sprite, this.targetX2 as Laya.Sprite, false);

                }
                break;
        }
        // w = w_parent;
        // h = h_parent;

        w -= (this.offsetXLeft + this.offsetXRight); 

        Debug.Log("UpdateSizeX w=" + w + " h=" + h + " name=" + this.owner.name);
        UI.SetNodeContentSize(this.owner, w, h);


    }


    UpdateSizeY() {
        var x, y, w, h;
        if (this.owner == null) {
            return;
        }
        var size = UI.GetNodeContentSize(this.owner);
        var sizeParent = UI.GetNodeContentSize(this.owner.parent);
        w = size.width;
        h = size.height;

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        // w_parent -= (this.offsetMin.x + this.offsetMax.x);
        // h_parent -= (this.offsetMin.y + this.offsetMax.y);
      

        Debug.Log("GetBetweenSideAndTargetSize this.sideType=" + this.sideType);
        switch (this.typeY) {
            case SizeType.CONTENT:
                {
                    h = size.height;
                }
                break;
            case SizeType.VALUE:
                {
                    h = this.height;
                }
                break;
            case SizeType.VALUE_Canvas:
                {
                    h = this.height;
                    //  if (IsSprite())
                    // {
                    //     w= Common.CanvasToWorldWidth(AppSceneBase.main.mainCamera, Common.sizeCanvas, width);
                    // }
                    //    x = rctran.anchoredPosition.x;
                }
                break;

            case SizeType.PARENT:
                {
                    h = h_parent * this.ratioH;
                }
                break;
            case SizeType.PARENT_MIN:
                {
                    h = Math.min(w_parent, h_parent) * this.ratioH;

                }
                break;
            case SizeType.PARENT_MAX:
                {
                    h = Math.max(w_parent, h_parent) * this.ratioH;
                }
                break;
            case SizeType.TARGET:
                {
                    if (this.target != null) {
                        h = UI.GetNodeContentSize(this.targetY).height * this.ratioH;

                    }

                }
                break;
            case SizeType.WIDTH:
                {
                    h = size.width;
                }
                break;

            case SizeType.BETWEEN_SIDE_TARGET:
                {

                    if ((this.sideType == SideType.UP) || (this.sideType == SideType.DOWN)) {
                        h = LayOutUtil.main.GetBetweenSideAndTargetSize(this.targetY as Laya.Sprite, this.sideType) * this.ratioH;
                    }

                }
                break;
            case SizeType.BETWEEN_TWO_TARGET:
                {
                    h = LayOutUtil.main.GetBetweenTwoTargetSize(this.targetY as Laya.Sprite, this.targetY2 as Laya.Sprite, true);

                }
                break;
        }
 
        h -= (this.offsetYUp + this.offsetYDown);
        if (this.enableOffsetAdBanner) {
            h -= AdKitCommon.main.heightCanvasAdBanner;
        }
        Debug.Log("UpdateSizeY w=" + w + " h=" + h);
        UI.SetNodeContentSize(this.owner, w, h);

    }
    UpdateSize() {
        this.UpdateSizeX();
        this.UpdateSizeY();
    }
}


