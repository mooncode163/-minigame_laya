import AppSceneUtil from "../../AppBase/Common/AppSceneUtil";
import Common from "../Common";
import CommonRes from "../CommonRes";
import Debug from "../Debug";
import UIImage from "../UIKit/UIImage/UIImage";
import UIProgress from "../UIKit/UIProgress/UIProgress";
import UIText from "../UIKit/UIText/UIText";
import PopViewController from "../UIKit/ViewController/PopViewController";
import UIFind from "../UIKit/ViewController/UIFind";
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
    nodePannel:Laya.Sprite;

    onAwake() {
        super.onAwake();
        // this.textTitle.text ="dddd";
        this.LoadBg();
        this.imageBg = UIFind.FindUI(this.node, "imageBg", UIImage);
        this.textTitle = UIFind.FindUI(this.node, "textTitle", UIText);
        this.textStatus = UIFind.FindUI(this.node, "textStatus", UIText);
        this.uiProgress = UIFind.FindUI(this.node, "uiProgress", UIProgress);

        this.textTitle.text = LanguageCloudRes.main.GetString("STR_CLOUDRES_TITLE");

        this.LayOut();
    }


    onStart() {
        super.onStart();

        {
            var key = "CloudProgressBg"
            var pic = ImageResCloudRes.main.GetImage(key);
            this.uiProgress.imageBg.UpdateImageUICloudRes(pic,key);
        }
        {
            var key = "CloudProgressFt"
            var pic = ImageResCloudRes.main.GetImage(key);
            this.uiProgress.imageFt.UpdateImageUICloudRes(pic,key); 
        }
        this.UpdateProgress(0);

        CloudRes.main.StartDownload(
            {
                url: ConfigCloudRes.main.cloudResUrl,
                progress: (res: any) => {
                    this.UpdateProgress(res.progress / 100.0);
                },
                unzipSuccess: () => {
                    Debug.Log("UICloudRes unzipSuccess "); 
                    //   this.scheduleOnce(this.OnCloudResDidFinish, 0.25);
                    Laya.timer.once(250, this, function():void {
                        Debug.Log("UICloudRes Laya.timer.once "); 
                        this.OnCloudResDidFinish();
                    });
                },
            });

        this.LayOut();
    }
    LoadBg() {
       
        this.nodePannel = new Laya.Sprite();
        this.nodePannel.addComponent(UIView);
        // #343434
        // this.nodePannel.color = new Color(52, 52, 52, 50);
        var size = Common.sizeCanvas; 
        // this.nodePannel.graphics.drawRect(0, 0, size.width, size.height, "#343434");
        this.nodePannel.graphics.drawRect(0, 0, size.width, size.height, "#343434");
        // AppSceneUtil.main.rootNode.addChild(this.nodePannel);
        this.node.addChild(this.nodePannel);
        this.nodePannel.zOrder = -1;
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
        Debug.Log("UICloudRes OnCloudResDidFinish"); 
        Common.SetBoolOfKey(CommonRes.KEY_DOWNLOAD_CLOUNDRES, true);
        Debug.Log("UICloudRes OnCloudResDidFinish 2"); 
        if (this.controller != null) {
            Debug.Log("UICloudRes OnCloudResDidFinish 3"); 
            var p = this.controller as PopViewController;
            p.Close();
        }
    }

    LayOut() {
        super.LayOut();

    }

}



