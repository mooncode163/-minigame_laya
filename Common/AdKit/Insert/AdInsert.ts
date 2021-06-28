import Platform from "../../Platform";
import AdInsertWeiXin from "../../Platform/weixin/AdKit/AdInsertWeiXin";
import AdInsertPlatformWrapper from "./AdInsertPlatformWrapper";

 

 
export default class AdInsert  {

    platform: AdInsertPlatformWrapper = null;

    static _main: AdInsert;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new AdInsert();
            this._main.Init();
        }
        return this._main;
    }
	GetPlatform() {
        var p = null;
        if (Platform.isWeiXin||Platform.isByte)  {
            p = new AdInsertWeiXin();
        }

		if (Platform.isWeiXin||Platform.isByte)  {
            // p = new AdInsertMooSnow();
        }
        return p;
    }
    Init () { 
		this.platform = this.GetPlatform();
	}
	InitAd(source) {

		if (this.platform == null) {
			return;
		}
		// Moonma.AdKit.AdConfig.AdConfig.main.InitPriority(source, AdConfigParser.SOURCE_TYPE_INSERT);
		this.platform.InitAd(source);
	}
	SetObjectInfo(objName) {
		if (this.platform == null) {
			return;
		}
		this.platform.SetObjectInfo(objName);
	}
	ShowAd() {
		if (this.platform == null) {
			return;
		}
		this.platform.ShowAd();
	}

}



