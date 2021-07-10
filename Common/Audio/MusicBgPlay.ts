import Common from "../Common";
import ConfigAudio from "../Config/ConfigAudio";
import AudioPlay from "./AudioPlay";



export default class MusicBgPlay extends AudioPlay {

    player:Laya.Sound;

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
    private loadcom(e: Laya.Event): void {
        console.log("PlayBgMusic loadcom");
    }
    PlayBgMusic() {
        // this.audioSource.loop= true;
        // this.PlayByKey("Bg");
        this.player = new Laya.Sound();
        var filepath = ConfigAudio.main.GetAudio("Bg");
        if(Common.BlankString(filepath))
        {
            return;
        }
        this.player.load(filepath);

        this.player.on(Laya.Event.COMPLETE, this, this.loadcom);
        this.player.on(Laya.Event.PROGRESS, this, this.loadcom);
        this.player.on(Laya.Event.ERROR, this, this.loadcom);

        this.player.play(0, 0);

    }

    OnDidFinish() {
        // this.audioSource.loop= false;
        // this.audioSource.play();
        this.Stop();
    }
    StopBgMusic() {
        // this.audioSource.loop= false;
        // this.audioSource.play();
        if(this.player!=null)
        {
            this.player.dispose();
        }
        // this.Stop();
    }
}


