import Debug from "../../Debug";
import UI from "../ViewController/UI";
import LayOutBase from "./LayOutBase";
import LayOutElement from "./LayOutElement";

import { Direction, Align } from "./LayOutUtil";


export default class HorizontalOrVerticalLayoutBase extends LayOutBase {


    //是否控制大小
    childControlHeight = false;
    childControlWidth = false;

    //是否整个区域展开

    childForceExpandHeight = false;
    childForceExpandWidth = false;


    childScaleHeight = false;
    childScaleWidth = false;

    row = 1;//行
    col = 1;//列  


    LayOut() {

        var idx = 0;
        var r = 0, c = 0;
        if (!this.Enable()) {
            return;
        }
        super.LayOut();

        for (var i = 0; i < this.owner.numChildren; i++) {
            var child = this.owner.getChildAt(i);
            if (child == null) {
                // 过滤已经销毁的嵌套子对象 
                continue;
            }

            var le = child.getComponent(LayOutElement);
            if (le != null && le.ignoreLayout) {
                continue;
            }

            if (!this.enableHide) {
                if (!child.active) {
                    //过虑隐藏的
                    continue;
                }
            }



            //  LayoutElement
            //floor 小于等于 x，且与 x 最接近的整数。
            r = Math.floor(idx / this.col);
            c = idx - Math.floor(r * this.col);

            //从顶部往底部显示
            // if (this.directionVertical == Direction.TOP_TO_BOTTOM) {
            //     r = this.row - 1 - r;
            // }

            // //从右往左显示
            // if (this.directionHorizontal == Direction.RIGHT_TO_LEFT) {
            //     c = this.col - 1 - c;
            // }


            var sp = child as Laya.Sprite;
            var pt = this.GetItemPostion(sp, r, c);
            sp.x = pt.x;
            sp.y = pt.y;
            // child.setPosition(pt.x, pt.y);
            idx++;

        }



    }

    // r 行 ; c 列  返回中心位置 Vector2
    GetItemPostion(nodeItem: Laya.Sprite, r: any, c: any) {
        var x, y, w, h;

        var rctran = UI.GetNodeBoundingBox(this.owner);
        w = rctran.width;
        h = rctran.height;
        var item_w = 0, item_h = 0, x_left = 0, y_top = 0, w_total = 0, h_total = 0;
        var pivotX = UI.GetPivotX(nodeItem);
        var pivotY = UI.GetPivotY(nodeItem);
        // var rctranItem =UI.GetNodeBoundingBox(nodeItem); 

        if (this.childControlWidth) {
            item_w = (w - (this.offsetX * (this.col - 1))) / this.col;
            // rctranItem.sizeDelta = new Vector2(item_w, rctranItem.sizeDelta.y);
            nodeItem.width = item_w;
        }
        else {
            item_w = nodeItem.width;
        }

        if (this.childControlHeight) {
            item_h = (h - (this.offsetY * (this.row - 1))) / this.row;
            // rctranItem.sizeDelta = new Vector2(rctranItem.sizeDelta.x, item_h);
            nodeItem.height = item_h;
        }
        else {
            item_h = nodeItem.height;
        }

        w_total = item_w * this.col + (this.offsetX * (this.col - 1));
        h_total = item_h * this.row + (this.offsetY * (this.row - 1));

        if (this.childForceExpandWidth) {
            x_left = 0;// -w / 2;
        }
        else {
            if (this.align == Align.LEFT) {
                x_left = 0;//-w / 2;
            }
            else if (this.align == Align.RIGHT) {
                // x_left = w / 2 - w_total; 
                x_left = w - w_total;
            }
            else {
                //CENTER
                // x_left = -w_total / 2;
                x_left = w / 2 - w_total / 2;
            }
        }

        x = x_left + item_w * c + this.offsetX * c + pivotX;


        if (this.childForceExpandHeight) {
            y_top = 0;//-h / 2;
        }
        else {
            if (this.align == Align.DOWN) {
                y_top = h - h_total;//-h / 2;
            }
            else if (this.align == Align.UP) {
                y_top = 0;
            }
            else {
                //CENTER
                y_top = h / 2 - h_total / 2;
            }
        }
        y = y_top + item_h * r + this.offsetY * r + pivotY;

        // x += pivotX;
        // y += pivotY;
        // x = w/2;
        // y = h/2;
        Debug.Log("x_left=" + x_left + " x=" + x + " w=" + w + " h=" + h + " row=" + this.row + " col=" + this.col + " y_top=" + y_top + " y=" + y + " h_total=" + h_total + " this.align=" + this.align + " r=" + r + " c=" + c);
        return new Laya.Vector2(x, y);

    }

    onAwake() {
        super.onAwake();
    }
    onStart() {

        super.onStart();
        this.LayOut();
    }

}
