 
export class UIHomeSideBar extends UIView {
    onLoad() {
        super.onLoad(); 
        // this.LayOut();
    }
    start() { 
        super.start();
        this.LayOut();
    }
    LayOut () { 
        super.LayOut();
  
    }
    OnBtnClickShare(event: Event, customEventData: string) {
        Share.main.ShareImageText("", Config.main.shareTitle, Config.main.shareUrl, "");
    }
    OnBtnClickSetting(event: Event, customEventData: string) {
        if (this.controller != null) {
            var navi = this.controller.naviController; 
            navi.Push(SettingViewController.main);
        } 
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
