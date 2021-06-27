import { Platform } from "../Platform";
import { SharePlatformWrapper } from "./SharePlatformWrapper";
import { ShareWeiXin } from "./ShareWeiXin";

 
export default class Share  {

    platform: SharePlatformWrapper = null;

    static _main: Share;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new Share();
            this._main.Init();
        }
        return this._main;
    }

    GetPlatform() {
        var p = null;
        if (Platform.isWeiXin||Platform.isByte)  {
            //显示分享
            //  wx.showShareMenu();
            p = new ShareWeiXin();
        }
        return p;
    }
    Init() {
        this.platform = this.GetPlatform();
    }


    SetWeiXinMPShareMenu(title: string, pic: string) {
        if (this.platform == null) {
            return;
        }
        this.platform.SetWeiXinMPShareMenu(title, pic);
    }
    ShareImageText(source: string, title: string, pic: string, url: string) {
        if (this.platform == null) {
            return;
        }
        this.platform.ShareImageText(source, title, pic, url);
    }
}


