import UIImage from "../UIImage/UIImage";
import UIView from "../ViewController/UIView";
import UI from "../ViewController/UI";

 
export default class UIProgress extends UIView {
 
    imageBg: UIImage | null = null;
     
    imageFt: UIImage | null = null;

    progress= 0;
 
    onAwake() {
        super.onAwake();
        this.LayOut();
    }
    LayOutDidFinish () {
        this.UpdateProgressInternal(this.progress);
    }
    UpdateProgress (value) {
        this.progress = value;
        this.UpdateProgressInternal(this.progress);
    }
    //0-1f
    UpdateProgressInternal (value) {
        var x, y, w, h;
        var size = this.GetContentSize();
        w = size.width * value;
        h = size.height;
        // cc.Debug.Log("UpdateProgress w=" + w + " h=" + h + " size.width=" + size.width);
 
        this.imageFt.SetContentSize(w,h);
        x = -size.width / 2 + w / 2;
        y = 0; 
        UI.SetNodePosition(this.imageFt.owner,x,y);
    }
    LayOut() {
        super.LayOut();

    }
}



