import Debug from "../../Debug";
import LayOutBase from "./LayOutBase";
import LayOutUtil, { Align } from "./LayOutUtil";


export default class LayOutBetween extends LayOutBase {
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


        //左右
        if (this.align == Align.Horizontal) {
            x = LayOutUtil.main.GetBetweenCenterX(this.target as Laya.Sprite, this.target2 as Laya.Sprite) + this.offset.x;
        }
        if (this.align == Align.Vertical) {
            y = LayOutUtil.main.GetBetweenCenterY(this.target as Laya.Sprite, this.target2 as Laya.Sprite) + this.offset.y;
        }

        //屏幕边界
        if ((this.align == Align.LEFT) || (this.align == Align.RIGHT)) {
            x = LayOutUtil.main.GetBetweenScreenCenter(this.target as Laya.Sprite, this.align) + this.offset.x;
        }
        if (this.align == Align.UP) {
            y = LayOutUtil.main.GetBetweenScreenCenter(this.target as Laya.Sprite, this.align) + this.offset.y;

        }
        if (this.align == Align.DOWN) {
            y = LayOutUtil.main.GetBetweenScreenCenter(this.target as Laya.Sprite, this.align, this.enableOffsetAdBanner) + this.offset.y;

        }
        Debug.Log("LayOutBetween x=" + x + " y=" + y + " align=" + this.align);
        
        sp.x = x;
        sp.y = y; 

    }

}

