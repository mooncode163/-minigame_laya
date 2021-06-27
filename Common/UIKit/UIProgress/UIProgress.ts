import UIImage from "../UIImage/UIImage";
import UIView from "../ViewController/UIView";

 
export default class UIProgress extends UIView {
    @type(UIImage)
    imageBg: UIImage | null = null;
    @type(UIImage)
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
        this.imageFt.node.setPosition(x, y);
    }
    LayOut() {
        super.LayOut();

    }
}



