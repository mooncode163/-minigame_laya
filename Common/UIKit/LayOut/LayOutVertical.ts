import HorizontalOrVerticalLayoutBase from "./HorizontalOrVerticalLayoutBase";
import LayOutUtil from "./LayOutUtil";

 

 
export default class LayOutVertical extends HorizontalOrVerticalLayoutBase {
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
        // this.row = LayOutUtil.main.GetChildCount(this.node,this.enableHide);
        super.LayOut();
    } 
} 
