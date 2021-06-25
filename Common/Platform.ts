 
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
        if(this.isWeiXin||this.isByte)
        {
            return true;
        }
        return false;
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
