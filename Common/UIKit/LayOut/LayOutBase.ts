 
import AppScene from "../../../AppBase/AppScene";
import AppSceneUtil from "../../../AppBase/Common/AppSceneUtil";
import CameraUtil from "../../Camera/CameraUtil";
import Device from "../../Device";
import UI from "../ViewController/UI"; 
import UIView3D from "../ViewController/UIView3D";
import LayOutBaseInternal from "./LayOutBaseInternal";
import { Align, Direction, RelationType } from "./LayOutUtil";

export default class LayOutBase extends LayOutBaseInternal {

    
    public target2: Laya.Node;
    public target: Laya.Node;

    enableLayout = true;
    enableHide = true; //是否包含Hide true 包含 false  不包含
    // 选择横屏配置参数
    enableLandscape = false;
    enableOffsetAdBanner = false;
    isOnlyForPortrait = false;
    isOnlyForLandscape = false;
    // space = new Laya.Vector2(0, 0);



    directionVertical = Direction.TOP_TO_BOTTOM;
    directionHorizontal = Direction.LEFT_TO_RIGHT;

    //({
    //     type: Align,
    //     // displayOrder: 3,
    // })
    // public ali: Align = null!;


    // private _offset = new Laya.Vector2(0, 0); 
    // get offset(): Laya.Vector2 {
    //     return this._offset;
    // } 
    // set offset(value: Laya.Vector2) {
    //     this._offset = value;
    // }

    offsetX: number = 0;
    offsetY: number = 0;


    offsetXLeft: number = 0;
    offsetXRight: number = 0;
    offsetYUp: number = 0;
    offsetYDown: number = 0;


    // // 左下角偏移量
    // private _offsetMin = new Laya.Vector2(0, 0);
    // get offsetMin(): Laya.Vector2 {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
    //     return this._offsetMin;
    // }
    // // set 的用法
    // set offsetMin(value: Laya.Vector2) {
    //     this._offsetMin = value;
    // }

    // private _offsetMax = new Laya.Vector2(0, 0);
    // // 右上角偏移量
    // get offsetMax(): Laya.Vector2 {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
    //     return this._offsetMax;
    // }
    // // set 的用法
    // set offsetMax(value: Laya.Vector2) {
    //     this._offsetMax = value;
    // }
    public get node(): Laya.Node {
        return this.owner;
    }
    get isSprite(): boolean {
        var view = this.node.getComponent(UIView3D);
        if (view != null) {
            return true;
        }
        return false;
    }

    onAwake() {
        this.LayOut();
    }
    onStart() {
        // [3]
        this.LayOut();
    }

    LayOut() {
    }

    IsUseLandscape() {
        var ret = false;
        if (Device.main.isLandscape && this.enableLandscape) {
            ret = true;
        }
        return ret;
    }

    Enable() {
        var ret = true;
        if (!this.enableLayout) {
            ret = false;
        }
        if (this.isOnlyForLandscape) {
            if (!Device.main.isLandscape) {
                ret = false;
            }
        }
        if (this.isOnlyForPortrait) {
            if (Device.main.isLandscape) {
                ret = false;
            }
        }
        return ret;
    }


      GetPivotX(node: Laya.Node) {
        if (this.isSprite) {
            return 0;
        } else {
            return UI.GetPivotX(node);
        }
    }
      GetPivotY(node: Laya.Node) {
        if (this.isSprite) {
            return 0;
        } else {
            return UI.GetPivotY(node);
        }
    }


    GetContentSize(node: Laya.Node) {
        var size;
        if (this.isSprite) {
            size = this.GetContentSize3D(node);
        } else {
            size = UI.GetNodeContentSize(node);

        }
        return size;
    }

    GetContentSize3D(node: Laya.Node) {
        var view = node.getComponent(UIView3D);
        if(view==null)
        {
          return CameraUtil.main.GetWorldSize(AppSceneUtil.mainCamera);
        }
       return view.GetContentSize();
    }

    GetBoundSize3D(node: Laya.Node) {
        var view = node.getComponent(UIView3D);
        if(view==null)
        {
          return CameraUtil.main.GetWorldSize(AppSceneUtil.mainCamera);
        }
       return view.GetBoundSize();
    }

    GetBoundSize(node: Laya.Node) {
        if (this.isSprite) {
            return this.GetBoundSize3D(node);
        } else {
            return UI.GetNodeBoundingBox(node);

        }
    }
 

    SetSize(w, h) {
        if (this.isSprite) {
            this.node.getComponent(UIView3D).SetContentSize(w, h);
        } else {
            UI.SetNodeContentSize(this.node, w, h);

        }
    }

    GetSize() {
        var size;
        if (this.isSprite) {
            size = this.GetContentSize3D(this.node);
        } else {
            size = UI.GetNodeContentSize(this.node);

        }
        return size;
    }

    GetSizeParent() {
        var sizeParent;

        if (this.isSprite) {
            sizeParent = this.GetContentSize3D(this.node.parent);
        } else {
            sizeParent = UI.GetNodeContentSize(this.node.parent);

        }
        return sizeParent;
    }


    GetPosition(node: Laya.Node) {
        
        if (this.isSprite) {
            var ui: Laya.Sprite3D = this.node as Laya.Sprite3D; 
            return ui.transform.localPosition;
        } else {
            return UI.GetNodePosition(node);

        }
    }

    SetPosition(node: Laya.Node, pt: Laya.Vector3) {
        if (this.isSprite) {
            var ui: Laya.Sprite3D = this.node as Laya.Sprite3D; 
            ui.transform.localPosition = pt;
        } else {
            UI.SetNodePosition(node, pt.x, pt.y);

        }
    }


    // 设置猫点在中心
    SetNodePivotCenter(node: Laya.Node) {
        var sp = node as Laya.Sprite;
        if (sp != null) {
            sp.pivotX = sp.width / 2;
            sp.pivotY = sp.height / 2;
        }
    }

}
