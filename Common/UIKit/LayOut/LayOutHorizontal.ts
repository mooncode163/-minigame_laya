import Debug from "../../Debug"; 
import HorizontalOrVerticalLayoutBase from "./HorizontalOrVerticalLayoutBase";
import LayOutUtil from "./LayOutUtil";
 
export default class LayOutHorizontal extends HorizontalOrVerticalLayoutBase {
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
       
        if (!this.Enable()) {
            return;
        }
        super.LayOut();
        this.row = 1;
        this.col = LayOutUtil.main.GetChildCount(this.owner, this.enableHide);
        Debug.Log("LayOutHorizontal LayOut");
        super.LayOut();

    }
}


