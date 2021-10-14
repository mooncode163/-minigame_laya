 
//  qq: https://q.qq.com/
// weixin:https://mp.weixin.qq.com/
// https://microapp.bytedance.com/

// https://unicloud.dcloud.net.cn/login   chyfemail163@163.com  Qianlizhiwai1
// vkceyugu.cdn.bspapp.com

export default class Platform  {

    public static get isAndroid(): boolean {
        return Laya.Browser.onAndroid ;
    }
    public static get isiOS(): boolean {
        return Laya.Browser.onIOS ;
    }

    public static get isWin(): boolean {
        return Laya.Browser.onPC ;
    }
    public static get isWeiXin(): boolean {
        return Laya.Browser.onMiniGame ;
    }

    public static get isQQ(): boolean {
        return Laya.Browser.onQQMiniGame ;
    }

    
    public static get isFacebook(): boolean {
        return Laya.Browser.onIOS ;
    }

    public static get isByte(): boolean {
        // return false;
        return Laya.Browser.onTTMiniGame ;
    }
    public static get isHuawei(): boolean {
        return Laya.Browser.onHWMiniGame ;
    }

    
    public static get isCloudRes(): boolean {
        // return false;
        if(this.isWeiXin||this.isByte||this.isQQ)
        {
            return true;
        }
        return false;
    }

    public static get isEmulator(): boolean {
        // return false; 
        return false;
    }
    

}


