 
 
// import { serializable } from 'cc.decorator';
 
import AdKitCommon from "../../AdKit/AdKitCommon";
import Debug from "../../Debug";
import UIViewUtil from "../ViewController/UIViewUtil"; 
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
    DEFAULT:2,
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
    /** @prop {name:space,type:Vector}*/
    /** @prop {name:align,type:Option,option:"UP,DOWN,LEFT,RIGHT,CENTER,UP_LEFT,UP_RIGHT,DOWN_LEFT,DOWN_RIGHT,Horizontal,Vertical,SAME_POSTION", default:"LEFT"}*/
    /** @prop {name:target,type:Node}*/
    /** @prop {name:target2,type:Node}*/
    // @prop 在基类定义
   
    ratio = 1.0;
   
    ratioW = 1.0;
   
    ratioH = 1.0;
   
    widthH = 1.0;//宽
   
    heightH = 1.0;//高  
 
      // 必须设置两个@type 才能在editor里修改
    // @type(SideType) 
    _sideType = SideType.LEFT;
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
 
    private _typeX = SizeType.MATCH_PARENT;
     /** @prop {name:typeX,type:Option,option:"MATCH_CONTENT,MATCH_PARENT,MATCH_TARGET,MATCH_PARENT_MIN,MATCH_PARENT_MAX,MATCH_WIDTH,MATCH_HEIGHT,BETWEEN_SIDE_TARGET,BETWEEN_TWO_TARGET,MATCH_VALUE,MATCH_VALUE_Canvas",default:"MATCH_CONTENT"}*/
    get typeX() {
        return this._typeX;
    }
    set typeX(value) {
        this._typeX = value;
        this.LayOut();
    }
    
 
    private _typeY = SizeType.MATCH_PARENT; 
    /** @prop {name:typeY,type:Option,option:"MATCH_CONTENT,MATCH_PARENT,MATCH_TARGET,MATCH_PARENT_MIN,MATCH_PARENT_MAX,MATCH_WIDTH,MATCH_HEIGHT,BETWEEN_SIDE_TARGET,BETWEEN_TWO_TARGET,MATCH_VALUE,MATCH_VALUE_Canvas",default:"MATCH_CONTENT"}*/
    get typeY() {
        return this._typeY;
    }
    set typeY(value) {
        this._typeY = value;
        this.LayOut();
    }
 

    onAwake() {
        super.onAwake(); 
        // this.LayOut();
    }
    onStart() {
        
        // [3] super.LayOut();
        super.onStart();
        this.LayOut();
    }
    LayOut () { 
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
        if(this.owner==null)
        {
            return;
        }
        var size = UIViewUtil.GetNodeContentSize(this.owner);
        var sizeParent = UIViewUtil.GetNodeContentSize(this.owner.parent); 
        w = size.width;
        h = size.height;
        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        w_parent -= (this.offsetMin.x + this.offsetMax.x);
        h_parent -= (this.offsetMin.y + this.offsetMax.y);
         Debug.Log("this.typeX=" + this.typeX + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w);
        // Debug.Log("w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w);
        
        // return;
        switch (this.typeX) {
            case SizeType.MATCH_CONTENT:
                {
                    w = size.width;
                }
                break;
            case SizeType.MATCH_VALUE:
                {
                    w = this.width;
                }
                break;
            case SizeType.MATCH_VALUE_Canvas:
                {
                    w = this.width;
                    //  if (IsSprite())
                    // {
                    //     w= Common.CanvasToWorldWidth(AppSceneBase.main.mainCamera, Common.sizeCanvas, width);
                    // }
                    //    x = rctran.anchoredPosition.x;
                }
                break;

            case SizeType.MATCH_PARENT:
                {
                    w = w_parent * this.ratioW;
                }
                break;
            case SizeType.MATCH_PARENT_MIN:
                {
                    w = Math.min(w_parent, h_parent) * this.ratioW;

                }
                break;
            case SizeType.MATCH_PARENT_MAX:
                {
                    w = Math.max(w_parent, h_parent) * this.ratioW;
                }
                break;
            case SizeType.MATCH_TARGET:
                {
                    if (this.target != null) { 
                        w = UIViewUtil.GetNodeContentSize(this.target).width * this.ratioW;

                    }

                }
                break;
            case SizeType.MATCH_HEIGHT:
                {
                    w = size.height;
                }
                break;

            case SizeType.BETWEEN_SIDE_TARGET:
                {

                    if ((this.sideType == SideType.LEFT) || (this.sideType == SideType.RIGHT)) {
                        w = LayOutUtil.main.GetBetweenSideAndTargetSize(this.target as Laya.Sprite, this.sideType) * this.ratioW;
                    }

                }
                break;
            case SizeType.BETWEEN_TWO_TARGET:
                {
                    w = LayOutUtil.main.GetBetweenTwoTargetSize(this.target as Laya.Sprite, this.target2 as Laya.Sprite, false);

                }
                break;
        }
        Debug.Log("UpdateSizeX w=" + w + " h=" + h); 
        UIViewUtil.SetNodeContentSize(this.owner,w,h);

        
    }


    UpdateSizeY() {
        var x, y, w, h;
        if(this.owner==null)
        {
            return;
        }
        var size = UIViewUtil.GetNodeContentSize(this.owner);
        var sizeParent = UIViewUtil.GetNodeContentSize(this.owner.parent); 
        w = size.width;
        h = size.height;

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        w_parent -= (this.offsetMin.x + this.offsetMax.x);
        h_parent -= (this.offsetMin.y + this.offsetMax.y);
        Debug.Log("GetBetweenSideAndTargetSize this.sideType="+this.sideType);
        switch (this.typeY) {
            case SizeType.MATCH_CONTENT:
                {
                    h = size.height;
                }
                break;
            case SizeType.MATCH_VALUE:
                {
                    h = this.height;
                }
                break;
            case SizeType.MATCH_VALUE_Canvas:
                {
                    h = this.height;
                    //  if (IsSprite())
                    // {
                    //     w= Common.CanvasToWorldWidth(AppSceneBase.main.mainCamera, Common.sizeCanvas, width);
                    // }
                    //    x = rctran.anchoredPosition.x;
                }
                break;

            case SizeType.MATCH_PARENT:
                {
                    h = h_parent * this.ratioH;
                }
                break;
            case SizeType.MATCH_PARENT_MIN:
                {
                    h = Math.min(w_parent, h_parent) * this.ratioH;

                }
                break;
            case SizeType.MATCH_PARENT_MAX:
                {
                    h = Math.max(w_parent, h_parent) * this.ratioH;
                }
                break;
            case SizeType.MATCH_TARGET:
                {
                    if (this.target != null) {
                        h = UIViewUtil.GetNodeContentSize(this.target).height * this.ratioH;

                    }

                }
                break;
            case SizeType.MATCH_WIDTH:
                {
                    h = size.width;
                }
                break;

            case SizeType.BETWEEN_SIDE_TARGET:
                {
                   
                    if ((this.sideType == SideType.UP) || (this.sideType == SideType.DOWN)) {
                        h = LayOutUtil.main.GetBetweenSideAndTargetSize(this.target as Laya.Sprite, this.sideType) * this.ratioH;
                    }

                }
                break;
            case SizeType.BETWEEN_TWO_TARGET:
                {
                    h = LayOutUtil.main.GetBetweenTwoTargetSize(this.target as Laya.Sprite, this.target2 as Laya.Sprite, true);

                }
                break;
        }

        if (this.enableOffsetAdBanner) { 
            h -= AdKitCommon.main.heightCanvasAdBanner;
        } 
        Debug.Log("UpdateSizeY w=" + w + " h=" + h); 
        UIViewUtil.SetNodeContentSize(this.owner,w,h);
        
    }
    UpdateSize() {
        this.UpdateSizeX();
        this.UpdateSizeY();
    }
}

  
