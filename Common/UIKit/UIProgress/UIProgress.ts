import UIImage from "../UIImage/UIImage";
import UIView from "../ViewController/UIView";
import UI from "../ViewController/UI";
import UIFind from "../ViewController/UIFind";
import Debug from "../../Debug";

 
export default class UIProgress extends UIView {
 
    imageBg: UIImage | null = null;
     
    imageFt: UIImage | null = null;

    progress= 0;
 
    onAwake() {
        super.onAwake();
        this.imageBg = UIFind.FindUI(this.node,"imageBg",UIImage);
        this.imageFt = UIFind.FindUI(this.node,"imageFt",UIImage);
        this.LayOut();
    }
    
    //0-1f
    UpdateProgress (value) {
        this.progress = value;
        // this.progress = 0.5;
        this.UpdateProgressInternal(this.progress);
    }
    //0-1f
    UpdateProgressInternal (value) {
        var x, y, w, h;
        var size = this.GetContentSize();
        w = size.width * value;
        h = size.height;
        Debug.Log("UpdateProgress w=" + w + " h=" + h + " size.width=" + size.width+" value="+value);
 
        this.imageFt.SetContentSize(w,h);
        this.imageFt.LayOut();
        x = -size.width / 2 + w / 2;
        y = 0; 
        UI.SetNodePosition(this.imageFt.owner,x,y);

    }
    LayOut() {
        super.LayOut();

    }
}



