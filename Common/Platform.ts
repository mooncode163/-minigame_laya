 
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
        return Laya.Browser.onTTMiniGame ;
    }

    public static get isCloudRes(): boolean {
        // return false;
        if(this.isWeiXin||this.isByte||this.isQQ)
        {
            return true;
        }
        return false;
    }

}


