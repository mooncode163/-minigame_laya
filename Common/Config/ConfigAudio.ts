import CloudRes from "../CloundRes/CloudRes";
import Common from "../Common";
import Platform from "../Platform";
import ConfigAudioInternal from "./ConfigAudioInternal";
import ConfigBase from "./ConfigBase";
 
 
export default class ConfigAudio extends ConfigBase {
    configAudioApp: ConfigAudioInternal = null;
    configAudioCloudRes: ConfigAudioInternal = null;
    static _main: ConfigAudio;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new ConfigAudio();
            this._main.Init();
        }
        return this._main;
    }
    Init() {

        // {
        //     var strDir = Common.RES_CONFIG_DATA + "/Audio";
        //     var fileName = "ConfigAudioApp.json";
        //     { 
        //         this.configAudioApp = new ConfigAudioInternal();
        //         this.configAudioApp.fileJson = strDir + "/" + fileName;
        //         this.listItem.push(this.configAudioApp);
        //     }
        // } 
        // if (!Platform.isCloudRes) 
        {
            // var strDir = Common.CLOUD_RES_DIR;
            var strDir = CloudRes.main.rootPath;
            var  fileName = "AudioCloudRes.json";
            {
                this.configAudioCloudRes = new ConfigAudioInternal();
                this.configAudioCloudRes.fileJson = strDir + "/" + fileName;
                this.configAudioCloudRes.isCloud =  Platform.isCloudRes;
                this.listItem.push(this.configAudioCloudRes);
            }

        }
    }

    GetAudio(key: string) {
        var ret = "";

        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item as ConfigAudioInternal;
            if (Common.BlankString(ret)) {
                if (p != null) {
                    ret = p.GetAudio(key);
                    if (p == this.configAudioCloudRes) {
                        if (Platform.isCloudRes) {
                            // 从CloudRes缓存目录读取
                            ret = CloudRes.main.rootPath+"/" + ret;
                        }else{
                            // 在resoureces目录
                            ret = Common.CLOUD_RES_DIR + "/" + ret;
                        }
                    }

                }
            } else {
                return;
            }
        }); 


        return ret;
    }

    /*
     { 
       success: (p:any) => {
           
       }, 
       fail: (p:any) => {
           
       },
     }
     */
     LoadCloudConfig(obj: any) {
        // if (Platform.isCloudRes) {
        //     var strDir = CloudRes.main.rootPath;
        //     var fileName = "AudioCloudRes.json";
        //     {
        //         this.configAudioCloudRes = new ConfigAudioInternal();
        //         this.configAudioCloudRes.fileJson = strDir + "/" + fileName;
        //         this.listItem.push(this.configAudioCloudRes);
        //         Debug.Log("ImageRes AudioCloudRes .fileJson=" + this.configAudioCloudRes.fileJson);
        //         this.configAudioCloudRes.Load(
        //             {
        //                 isCloud: true,
        //                 success: (p: any) => {
        //                     // this.OnFinish(obj,false);
        //                     Debug.Log("ImageRes AudioCloudRes success=");
        //                     if (obj.success != null) {
        //                         obj.success(this);
        //                     }
        //                 },
        //                 fail: () => {
        //                     // this.OnFinish(obj,true);
        //                     Debug.Log("ImageRes AudioCloudRes fail=");
        //                     if (obj.fail != null) {
        //                         obj.fail(this);
        //                     }
        //                 },
        //             });
        //     }

        // } else {
        //     if (obj.success != null) {
        //         obj.success(this);
        //     }
        // }
    }
}

 