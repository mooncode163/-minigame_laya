import { AudioPlay } from "./AudioPlay";

 
export class MusicBgPlay extends AudioPlay {  
    static _main: MusicBgPlay;
    //静态方法
    static get main() {
        if (this._main == null) {
            // this._main = new MusicBgPlay();
            // this._main.Init();
        }
        return this._main;
    }

    onLoad() {
        super.onLoad();
        MusicBgPlay._main = this; 

    }
    start() {
        super.start();
    } 
   
    PlayBgMusic() { 
        this.audioSource.loop= true;
        this.PlayByKey("Bg");

        // this.scheduleOnce(this.OnDidFinish, 1);
    }

    OnDidFinish() {
        // this.audioSource.loop= false;
        // this.audioSource.play();
        this.Stop();
    }
    StopBgMusic() {
        // this.audioSource.loop= false;
        // this.audioSource.play();
        this.Stop();
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
