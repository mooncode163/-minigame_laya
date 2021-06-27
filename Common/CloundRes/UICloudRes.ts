import Common from "../Common";
import CommonRes from "../CommonRes";
import Debug from "../Debug";
import UIImage from "../UIKit/UIImage/UIImage";
import UIProgress from "../UIKit/UIProgress/UIProgress";
import UIText from "../UIKit/UIText/UIText";
import PopViewController from "../UIKit/ViewController/PopViewController";
import UIView from "../UIKit/ViewController/UIView";
import CloudRes from "./CloudRes";
import ConfigCloudRes from "./ConfigCloudRes";
import ImageResCloudRes from "./ImageResCloudRes";
import LanguageCloudRes from "./LanguageCloudRes";

 

 
export default class UICloudRes extends UIView {
    
    imageBg: UIImage | null = null;
    
    textTitle: UIText | null = null;
  
    textStatus: UIText | null = null;
 
    uiProgress: UIProgress | null = null;


    onAwake() {
        super.onAwake();
        // this.textTitle.text ="dddd";
        this.textTitle.text = LanguageCloudRes.main.GetString("STR_CLOUDRES_TITLE");
        {
            var pic = ImageResCloudRes.main.GetImage("CloudProgressBg");
            this.uiProgress.imageBg.UpdateImage(pic);
        }
        {
            var pic = ImageResCloudRes.main.GetImage("CloudProgressFt");
            this.uiProgress.imageFt.UpdateImage(pic);
        }
        this.UpdateProgress(0);

        CloudRes.main.StartDownload(
            {
                url: ConfigCloudRes.main.cloudResUrl,
                progress: (res: any) => {
                    this.UpdateProgress(res.progress / 100.0);
                },
                unzipSuccess: () => {
                    Debug.Log(" unzipSuccess ");
                 //   this.scheduleOnce(this.OnCloudResDidFinish, 0.25);
                },
            });
        this.LayOut();
    }

    UpdateProgress(value) {
        var progress = value;
        if (progress < 0) {
            progress = 0;
        }
        if (progress > 1) {
            progress = 1;
        }
        var percent = Math.floor(progress * 100);
        // progress = 0.5;
        this.uiProgress.UpdateProgress(progress);
        //下载进度:xxx%
        var str = LanguageCloudRes.main.GetString("STR_CLOUDRES_STATUS");
        str = str.replace("xxx", percent.toString());
        // var str = percent.toString();
        this.textStatus.text = str;
    }
    OnCloudResDidFinish() {
        Common.SetBoolOfKey(CommonRes.KEY_DOWNLOAD_CLOUNDRES, true);
        if (this.controller != null) {
            var p = this.controller as PopViewController;
            p.Close();
        }
    }

    LayOut() {
        super.LayOut();

    }

}



