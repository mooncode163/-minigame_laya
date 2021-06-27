import AudioPlay from "./AudioPlay";
 

 
export default class MusicBgPlay extends AudioPlay {  
    static _main: MusicBgPlay;
    //静态方法
    static get main() {
        if (this._main == null) {
            // this._main = new MusicBgPlay();
            // this._main.Init();
        }
        return this._main;
    }

    onAwake() {
        super.onAwake();
        MusicBgPlay._main = this; 

    }
    onStart() {
        super.onStart();
    } 
   
    PlayBgMusic() { 
        // this.audioSource.loop= true;
        // this.PlayByKey("Bg");
 
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

 
