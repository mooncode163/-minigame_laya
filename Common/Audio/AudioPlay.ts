 
import Common from "../Common";
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
        // ResManager.LoadUrlAudio(
        //     {
        //         url: url,
        //         success: (p: any, clip: any) => {
        //             this.PlayAudioClip(clip);
        //         },
        //         fail: (p: any) => {

        //         },
        //     });
        Laya.SoundManager.playSound(url);
    }
    PlayFile(filepath: string) {
        console.log("  LoadAudio PlayFile=" + filepath);
        // ResManager.LoadAudio(
        //     {
        //         filepath: filepath,
        //         success: (p: any, clip: any) => {
        //             this.PlayAudioClip(clip);
        //         },
        //         fail: (p: any) => {
        //             //this.PlayUrl(filepath);
        //         },
        //     });


        //playSound播放音效，可以同时支持播放多个，可以是网络文件，也可以本地文件，如果是播放本地音频，则需要确保音频文件在输出目录 bin 目录下
        // Laya.SoundManager.playSound("https://layaair.ldc.layabox.com/demo/h5/res/sounds/btn.mp3");
        //sound/hit.wav 必须在 bin 目录下，否则找不到文件:ERR_FILE_NOT_FOUND，联系播放3次
        // Laya.SoundManager.playSound("sound/hit.wav",3);
        Laya.SoundManager.playSound(filepath);
 

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
        if(Common.BlankString(key))
        {
            return;
        }

        var filepath = ConfigAudio.main.GetAudio(key);
        if(Common.BlankString(filepath))
        {
            return;
        }
        Debug.Log("AudioPlay PlayByKey filepath="+filepath+" key="+key);
        // ResManager.LoadAudio(
        //     {
        //         filepath: filepath,
        //         success: (p: any, clip: any) => {
        //             this.PlayAudioClip(clip);
        //         },
        //         fail: (p: any) => {
        //             this.PlayUrl(filepath);
        //         },
        //     });
        this.PlayFile(filepath);
    } 
    Stop() {
        Debug.Log("AudioPlay Stop");
        // this.audioSource.pause();      
        // this.audioSource.volume = 0;  
        this.audioSource.stop();
    }
}
 
