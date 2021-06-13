
 
export class UINaviBar extends UIView {
    imageBg: UIImage | null = null;
    textTitle: UIText | null = null;
    btnBack: UIButton | null = null;
    onLoad() {
        super.onLoad();
       // this.btnBack.node.active = false;
    }

    start() {
        // [3]
        super.start();

    }



    UpdateTitle(title: string) {
       // this.textTitle.text = title;
    }
    HideBtnBack(isHide: boolean) {
       // this.btnBack.node.active = !isHide;
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
