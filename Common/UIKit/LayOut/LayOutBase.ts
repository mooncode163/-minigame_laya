import Device from "../../Device";
import { Align, Direction, RelationType } from "./LayOutUtil";

export default class LayOutBase extends Laya.Script {
 
    align: Align = Align.CENTER;
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

    offsetX:number=0;
    offsetY:number=0;
    

    offsetXLeft:number=0;
    offsetXRight:number=0;
    offsetYUp:number=0;
    offsetYDown:number=0;
    

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

}
