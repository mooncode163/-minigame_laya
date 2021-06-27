 
import ConfigAudio from "../Config/ConfigAudio";
import Debug from "../Debug";
import ResManager from "../Res/ResManager";
 

 
export default class AudioPlay extends Laya.Script {  
 
    audioSource: any = null;
    static _main: AudioPlay;
    //静态方法
    static get main() {
        if (this._main == null) {
            // this._main = new AudioPlay();
            // this._main.Init();
        }
        return this._main;
    }

    onAwake() {
        // super.onAwake();
        AudioPlay._main = this;
        // this.audioSource = this.node.addComponent(AudioSource);
        Debug.Log("  LoadAudio onLoad"); 

    }
    onStart() {
        // super.onStart();
    }
    PlayAudioClip(clip: any) { 
        if (clip == null) {
            return;
        }
        Debug.Log("  LoadAudio PlayAudioClip play");
        this.audioSource.playOneShot(clip, 1);
        this.audioSource.play();

    }


    PlayCloudAudio(file: string) {
        // var filepath = cc.CloudRes.main().audioRootPath + "/" + file;
        // if (cc.Common.main().isWeiXin) {
        //     AudioPlay.main.PlayUrl(filepath);
        // } else {
        //     AudioPlay.main.PlayFile(filepath);
        // }
    }

    PlayUrl(url: string) {
        ResManager.LoadUrlAudio(
            {
                url: url,
                success: (p: any, clip: any) => {
                    this.PlayAudioClip(clip);
                },
                fail: (p: any) => {

                },
            });
    }
    PlayFile(filepath: string) {
        console.log("  LoadAudio PlayFile=" + filepath);
        ResManager.LoadAudio(
            {
                filepath: filepath,
                success: (p: any, clip: any) => {
                    this.PlayAudioClip(clip);
                },
                fail: (p: any) => {
                    //this.PlayUrl(filepath);
                },
            });
    }
    PlayByKey(key: string) {
        // var dir = "";
        // if (Platform.isCloudRes) {
        //     // 从CloudRes缓存目录读取
        //     dir = CloudRes.main.rootPath;
        // } else {
        //     // 在resoureces目录
        //     dir = Common.CLOUD_RES_DIR;
        // }
        var filepath = ConfigAudio.main.GetAudio(key);
        Debug.Log("AudioPlay PlayByKey filepath="+filepath+" key="+key);
        ResManager.LoadAudio(
            {
                filepath: filepath,
                success: (p: any, clip: any) => {
                    this.PlayAudioClip(clip);
                },
                fail: (p: any) => {
                    this.PlayUrl(filepath);
                },
            });
    } 
    Stop() {
        Debug.Log("AudioPlay Stop");
        // this.audioSource.pause();      
        // this.audioSource.volume = 0;  
        this.audioSource.stop();
    }
}
 
