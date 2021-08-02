import Debug from "../../Debug";

 
 
export default class ShareHuawei  { 
     SetWeiXinMPShareMenu (title:string, pic:string) {
        // var wx = Laya.Browser.window.wx;
        // wx.onShareAppMessage(() => ({
        //     title: title,
        //     imageUrl: pic,
        // }))
    }

    // image 分辨率 5:4  如 1000 × 800
    ShareImageText (source:string, title:string, pic:string, url:string) {
        // this.SetWeiXinMPShareMenu(title, pic);
        // var wx = Laya.Browser.window.wx;
        // wx.shareAppMessage({
        //     title: title,
        //     imageUrl: pic,
        //     success: function (res) {
        //         Debug.Log("ShareHuawei share success");
               

        //     },
        //     fail: function (res) {
        //         Debug.Log("ShareHuawei share fails");
        //     }
        // })
    }
}


