

import AudioPlay from '../../Common/Audio/AudioPlay';
import MusicBgPlay from '../../Common/Audio/MusicBgPlay';
import CloudResPreLoad from '../../Common/CloundRes/CloudResPreLoad';
import Common from '../../Common/Common';
import Debug from '../../Common/Debug';
import Device from '../../Common/Device';
import ResManager from '../../Common/Res/ResManager';
import PopUpManager from '../../Common/UIKit/PopUp/PopUpManager';
import UIViewController from '../../Common/UIKit/ViewController/UIViewController';
import UI from '../../Common/UIKit/ViewController/UI';
import AppSceneUtil from './AppSceneUtil';
import InitViewController from './InitViewController';
import PopUpData from '../../Common/UIKit/PopUp/PopUpData';
import GameConfig from '../../../GameConfig';


// typescript 提示 Object is possibly ‘null‘ 的N种解决方法
// https://blog.csdn.net/iamlujingtao/article/details/110573421



export default class AppSceneBase extends Laya.Script {


    rootViewController: UIViewController | null = null;

    /** @prop {name:rootNode,type:Node}*/
    public rootNode: Laya.Node;


    // @type(Size)
    sizeCanvas: Laya.Size;

    // designWidth=960;
    // designHeight=480;

    // canvasWidth=0;
    // canvasHeight=0;


    isHasRunApp = false;


    static _main: AppSceneBase;
    //静态方法
    static get main() {
        if (this._main == null) {

        }
        return this._main;
    }

    constructor() {
        super();


        AppSceneBase._main = this;
        AppSceneUtil.main = this;
        Debug.Log("AppSceneBase constructor");

    }
    onAwake() {

        Debug.Log("AppSceneBase onLoad");
        this.isHasRunApp = false;

        // AppSceneUtil.rootNode = this.rootNode;
        // 关闭左下角的fps和调试信息
        // setDisplayStats(false);  

        this.InitValue();

        //component
        this.owner.addComponent(AudioPlay);
        this.owner.addComponent(MusicBgPlay);

        CloudResPreLoad.main.Load(
            {
                success: (p: any) => {
                    this.RunApp();
                },
                fail: (p: any) => {
                    // this.OnFinish(obj);
                    this.RunApp();
                },
            });


        // this.RunApp();
    }
    onStart() {
        // [3]
        Debug.Log("AppSceneBase start");
    }
    // update (deltaTime: number) {
    //     // [4]
    // }

    onUpdate() {
        if (AppSceneUtil.isNeedLayout) {
            this.LayOut();
            AppSceneUtil.isNeedLayout = false;
        }
    }

    RunApp() {
        Debug.Log("AppSceneBase RunApp");

        var p = InitViewController.main;
        this.SetRootViewController(p);
    }
    InitValue() {
        Debug.Log("AppSceneBase InitValue");
        var w, h;


        // this.sizeCanvas = this.canvasMain?.getComponent(UITransform)?.contentSize;
        // var size = UI.GetNodeContentSize(this.canvasMain);
        var size = new Laya.Size(Laya.stage.width, Laya.stage.height);
        if (size != null) {
            this.sizeCanvas = size;
            if (GameConfig.width == size.width && GameConfig.height == size.height) {
                // ios 微信小程序 第一次安装 sizeCanvas和设计分辨率相同 需要重新计算
                w = size.width;
                h = Laya.Browser.height*w/Laya.Browser.width; 
                Laya.stage.height = h;
                this.sizeCanvas = new Laya.Size(w, h);
            }
        }
        Common.sizeCanvas = this.sizeCanvas;

        // let screenSize = director.getWinSizeInPixels();
        // var str = "sizeCanvas w=" + this.sizeCanvas.width + ",h=" + this.sizeCanvas.height;
        Debug.Log("sizeCanvas  width=" + this.sizeCanvas.width + ",height=" + this.sizeCanvas.height);
        // Debug.Log(str);




        // this.textTitle.string = str;
        // this.sizeCanvas.width = screenSize.width * this.sizeCanvas.height / screenSize.height;
        // Debug.Log("sizeCanvas size=" + this.sizeCanvas);
        // var framesize = cc.view.getFrameSize();
        // Debug.Log("frame size=" + framesize);
        // // cc.view.setFrameSize(windowSize.width,windowSize.height);
        // // var framesize1 = cc.view.getFrameSize();
        // //  Debug.Log("new frame size=" + framesize1);

        //按2048
        // w = this.canvasMain.design
        // w = view.getDesignResolutionSize().width;
        // h = view.getDesignResolutionSize().height;
        Debug.Log("DesignResolutionSize w=" + w + " h=" + h + " this.sizeCanvas=" + this.sizeCanvas);
        // w = this.btnUpRight.getComponent(UITransform).contentSize.width;
        // Debug.Log("btnUpRight pos="+this.btnUpRight.node.position+" contentSize="+w);
        // var x,y;
        // x = screenSize.width/2-w/2;
        // x = 1024;
        // x = this.sizeCanvas.width/2;
        // y = this.btnUpRight.node.position.y;
        // y = this.sizeCanvas.height/2;
        // this.btnUpRight.node.position.x=x;
        // this.btnUpRight.node.position.y=y;

        // Debug.Log("btnUpRight pos2="+this.btnUpRight.node.position+" contentSize="+w);


        // w = this.canvasMain.designResolutionSize.width;
        // h = this.canvasMain.designResolutionSize.height;

        if (Device.main.isLandscape) {
            // view.setDesignResolutionSize(math.absMax(w,h),math.absMin(w,h),view.getResolutionPolicy());

            // this.canvasMain.fitWidth = true;
            // this.canvasMain.fitHeight = false;
        } else {
            // this.canvasMain.designResolution = new cc.size(Math.min(h, h), Math.max(w, h));
            // this.canvasMain.fitHeight = true;
            // this.canvasMain.fitWidth = false;
        }

        if (this.sizeCanvas == null) {
            return;
        }

        // 同步修改主Scene大小 不然触摸事件可能区域不完整
        UI.SetNodeContentSize(this.owner, this.sizeCanvas.width, this.sizeCanvas.height);

        UI.SetNodeContentSize(this.rootNode, this.sizeCanvas.width, this.sizeCanvas.height);

        size = UI.GetNodeContentSize(this.rootNode);
        Debug.Log("this.rootNode size=" + size);
        Debug.Log("this.rootNode  width=" + size.width + ",height=" + size.height);
    }



    SetRootViewController(controller: UIViewController) {

        if (this.rootViewController != null) {
            this.rootViewController.DestroyObjController();
        }
        this.rootViewController = controller;
        this.rootViewController.SetViewParent(this.rootNode);//this.rootNode  this.canvasMain.node


    }


    UpdateLanguage() {
        if (this.rootViewController != null) {
            this.rootViewController.UpdateLanguage();
        }

        var listPopup = PopUpManager.main.listItem;
        if (listPopup != null) {
            var len = listPopup.length;
            for (var i = 0; i < len; i++) {
                var ui = listPopup[i];
                ui.UpdateLanguage();
            }
        }
    }


    LayOut() {

        // 同步修改主Scene大小 不然触摸事件可能区域不完整
        UI.SetNodeContentSize(this.owner, this.sizeCanvas.width, this.sizeCanvas.height);

        UI.SetNodeContentSize(this.rootNode, this.sizeCanvas.width, this.sizeCanvas.height);

        if (this.rootViewController != null) {
            this.rootViewController.LayOut();
            var ui = this.rootViewController.view;
            if (ui != null) {
                ui.LayOut();
            }

        }

        var list = PopUpManager.main.listItem;
        for (var i = 0; i < list.length; i++) {
            var uipop = list[i];
            if (uipop != null) {
                uipop.LayOut();
            }
        }


    }

}


