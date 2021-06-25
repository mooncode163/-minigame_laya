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

        /*
        var x, y, w, h;
        Debug.Log("LayOutBetween LayOut");
        var pt = this.owner.getPosition();
        x = pt.x;
        y = pt.y;
        if (this.target == null) {
            return;
        }


        //左右
        if (this.align == Align.Horizontal) {
            x = LayOutUtil.main.GetBetweenCenterX(this.target, this.target2) + this.offset.x;
        }
        if (this.align == Align.Vertical) {
            y = LayOutUtil.main.GetBetweenCenterY(this.target, this.target2) + this.offset.y;
        }

        //屏幕边界
        if ((this.align == Align.LEFT) || (this.align == Align.RIGHT)) {
            x = LayOutUtil.main.GetBetweenScreenCenter(this.target, this.align) + this.offset.x;
        }
        if (this.align == Align.UP) {
            y = LayOutUtil.main.GetBetweenScreenCenter(this.target, this.align) + this.offset.y;

        }
        if (this.align == Align.DOWN) {
            y = LayOutUtil.main.GetBetweenScreenCenter(this.target, this.align, this.enableOffsetAdBanner) + this.offset.y;

        }
        Debug.Log("LayOutBetween x=" + x + " y=" + y + " align=" + this.align);
        this.node.setPosition(x, y);
*/
    }

}

