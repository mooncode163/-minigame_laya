import Common from "../Common";



export default class MathUtil {

    //两点之间的角度 0-360
    static GetAngleOfTwoPoint(ptStart: Laya.Vector2, ptEnd: Laya.Vector2) {
        return this.GetAngleOfPoint(new Laya.Vector2((ptEnd.x - ptStart.x), (ptEnd.y - ptStart.y)));
    }


    //点的角度 0-360
    static GetAngleOfPoint(pt: Laya.Vector2) {
        var angle = 0;
        var a = 0;
        if (pt.x == 0) {
            if (pt.y > 0) {
                return 90;
            } else {
                return 270;
            }

        } else {
            a = 360 * (Math.atan(Math.abs(pt.y) / Math.abs(pt.x))) / (Math.PI * 2);
        }
        // 第一象限
        if ((pt.x > 0) && (pt.y > 0)) {
            angle = a;
        }
        // 第二象限
        if ((pt.x < 0) && (pt.y > 0)) {
            angle = 180 - a;
        }
        // 第三象限
        if ((pt.x < 0) && (pt.y < 0)) {
            angle = 180 + a;
        }
        // 第四象限
        if ((pt.x > 0) && (pt.y < 0)) {
            angle = 360 - a;
        }

        return angle;
    }

}


