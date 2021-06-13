 
export class UIProgress extends UIView {
    @type(UIImage)
    imageBg: UIImage | null = null;
    @type(UIImage)
    imageFt: UIImage | null = null;

    progress= 0;
 
    onLoad() {
        super.onLoad();
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


/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
