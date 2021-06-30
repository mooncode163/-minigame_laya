import FrendBoardPlatformWrapper from "./FrendBoardPlatformWrapper";
 
 
export default class FrendBoard  {
    static _main: FrendBoard;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new FrendBoard();
            // this._main.Init();
        }
        return this._main;
    }
    properties: {
        platform: FrendBoardPlatformWrapper,
    }
    statics: {

    }
    GetPlatform () {
        var p = null;
        // if (cc.Common.main().isWeiXin) {
        //     //显示分享
        //     //  wx.showFrendBoardMenu();
        //     p = new cc.FrendBoardWeiXin();
        // } else if (cc.Common.main().isFacebook) {
        //     p = new cc.FrendBoardFacebook();
        // }


        return p;
    }

    Init () {
        var p = new FrendBoardPlatformWrapper();
        // this.platform = p.GetPlatform();
    }

    //score:string
    SaveData (score) {
        // if (this.platform == null) {
        //     return;
        // }
        // this.platform.SaveData(score);
    }

    // ShowFrendBoard () {
    //     if (this.platform == null) {
    //         return;
    //     }
    //     this.platform.ShowFrendBoard();
    // }

    Show() {
        // FrendBoardViewController.main().Show(null, null);
    }

}



