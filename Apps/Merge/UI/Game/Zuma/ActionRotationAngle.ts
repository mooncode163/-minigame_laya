import ActionBase from "../../../../../Common/Action/ActionBase";
import Debug from "../../../../../Common/Debug";

export interface IActionRotationAngle {
    // action:ActionRotationAngle 
    OnUpdateActionRotationAngle(action: any, angle);
}

export default class ActionRotationAngle extends ActionBase {
    iDelegate: IActionRotationAngle;
    // 0-360度
    angleFrom = 0;
    angleTo = 0;
    onAwake() {
        super.onAwake();
        this.LayOut();
    }

    onStart() {
        super.onStart();
        this.LayOut();
    }

    LayOut() {

    }


    InitAction() {
        Debug.Log("ActionRotation360:InitAction");
    }
    UpdateAction() {

        if (this.percentage > 1) {
            this.percentage = 1;
        }

        var angle = 0;
        angle = this.angleFrom + (this.angleTo - this.angleFrom) * this.percentage;
        if (this.iDelegate != null) { 
                this.iDelegate.OnUpdateActionRotationAngle(this, angle);
        }
    }
}
