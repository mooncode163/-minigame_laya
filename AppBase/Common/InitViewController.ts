import MainViewController from "../../Apps/Main/MainViewController";
import AppPreLoad from "../../Common/AppPreLoad";
import AppVersion from "../../Common/AppVersion/AppVersion";
import MusicBgPlay from "../../Common/Audio/MusicBgPlay";
import CloudResVersion from "../../Common/CloundRes/CloudResVersion";
import CloudResViewController from "../../Common/CloundRes/CloudResViewController";
import Common from "../../Common/Common";
import CommonRes from "../../Common/CommonRes";
import Debug from "../../Common/Debug";
import Language from "../../Common/Language/Language";
import { SysLanguage } from "../../Common/Language/LanguageUtil";
import Platform from "../../Common/Platform";
import NaviViewController from "../../Common/UIKit/NaviBar/NaviViewController";
import LevelManager from "../Game/LevelManager";
import AppSceneBase from "./AppSceneBase";
import AppSceneUtil from "./AppSceneUtil";
import Config from "../../Common/Config/Config";


export default class InitViewController extends NaviViewController {
    static _main: InitViewController;
    //静态方法
    static get main() {
        console.log("AppScene InitViewController Main");
        if (this._main == null) {
            this._main = new InitViewController();
        }
        return this._main;
    }
    ViewDidLoad() {
        super.ViewDidLoad();
        this.InitLoad();
    }


    InitLoad() {
        var isShowClound = false;
        if (Platform.isCloudRes) {
            Debug.Log("InitViewController 1");
            var isDownload = Common.GetBoolOfKey(CommonRes.KEY_DOWNLOAD_CLOUNDRES, false);
            if (!isDownload) {
                Debug.Log("InitViewController 2");
                //第一次 下载资源
                isShowClound = true;
            } else {
                Debug.Log("InitViewController 3")

                CloudResVersion.main.LoadVersion(
                    {
                        success: (p: any, data: any) => {
                            var versionNet = CloudResVersion.main.versionNet;
                            var versionLocal = CloudResVersion.main.versionLocal;
                            Debug.Log("InitViewController version: versionNet=" + versionNet + " versionLocal=" + versionLocal);
                            if (versionNet > versionLocal) {
                                //需要更新资源 
                                isShowClound = true;
                            }
                        },
                        fail: () => {

                        },
                    });
            }
        }
        // isShowClound = true;
        if (isShowClound) {
            this.GotoCloundRes();
        } else {
            this.OnAppPreLoad();
        }


    }

    OnAppPreLoad() {
        AppPreLoad.main.Load(
            {
                success: (p: any) => {
                    this.OnAppPreLoadFinish();
                },
                fail: (p: any) => {
                    this.OnAppPreLoadFinish();
                },
            });
    }

    OnAppPreLoadFinish() {
        var camera = AppSceneUtil.mainCamera;
        if (Config.main.is3D) {
            camera.transform.translate(new Laya.Vector3(0, 3, 3));
            camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);

            //添加方向光
            var directionLight: Laya.DirectionLight = AppSceneUtil.mainScene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            // directionLight.color = new Laya.Vector3(1, 1, 1);
            directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        } else {
            camera.orthographic = true;
            camera.transform.translate(new Laya.Vector3(0, 0, 10));//3
        }


        AppVersion.main.StartParseVersion(
            { 
                success: (p: any) => {
                   
                },
                fail: (p: any) => {

                },
                finish: (p: any) => {
                    this.OnStartApp();
                },
                
            }
        );
        // this.OnStartApp();
    }
    OnStartApp() {
        Debug.Log("OnStartApp enter")
        var isFirstRun = !Common.GetBoolOfKey(CommonRes.STR_KEY_NOT_FIRST_RUN, false);
        if (isFirstRun) {
            // Common.gold = AppRes.GOLD_INIT_VALUE;
            //第一次安装
            Common.SetBoolOfKey(CommonRes.STR_KEY_NOT_FIRST_RUN, true);

            Common.SetBoolOfKey(CommonRes.KEY_BTN_SOUND, true);
            Common.SetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, true);

            //languageCode
            var lan = SysLanguage.CN;
            Common.SetItemOfKey(CommonRes.KEY_LANGUAGE, lan);
            // Language.main.SetLanguage(lan);
        }
        else {

            // var lan = Common.GetItemOfKey(CommonRes.KEY_LANGUAGE,SysLanguage.CN); 
            // Language.main.SetLanguage(lan);

        }

        this.StartParsePlace();
    }

    StartParsePlace() {
        Debug.Log("InitViewController StartParsePlace");
        LevelManager.main.StartParsePlace(
            {
                success: (p: any) => {
                    this.StartParseGuanka();
                },
                fail: () => {
                    this.StartParseGuanka();
                },
            });
    }

    StartParseGuanka() {
        Debug.Log("InitViewController StartParseGuanka");
        LevelManager.main.StartParseGuanka(
            {
                success: (p: any) => {
                    this.ParseLevelFinish();
                },
                fail: () => {
                    this.ParseLevelFinish();
                },
            }); 
    }



    GotoCloundRes() {
        CloudResViewController.main.Show(
            {
                controller: this,
                close: (p: any) => {
                    Debug.Log("CloudResViewController GotoCloundRes close");
                    this.OnAppPreLoad();
                },
            });
    }

    OnImageResFinish() {
        // ConfigAudio.main.LoadCloudConfig(
        //     {
        //         success: (p: any) => {
        //             this.OnConfigAudioFinish();
        //         },
        //         fail: () => {
        //             this.OnConfigAudioFinish();
        //         },
        //     });


    }

    OnConfigAudioFinish() {
        this.GotoGame();
    }

    ParseLevelFinish() {
        Debug.Log("InitViewController ParseLevelFinish");
        this.GotoGame();

        // ImageRes.main.LoadCloudConfig(
        //     {
        //         success: (p: any) => {
        //             this.OnImageResFinish();
        //         },
        //         fail: () => {
        //             this.OnImageResFinish();
        //         },
        //     });

    }

    GotoGame() {
        var p = MainViewController.main;
        // this.Push(MainViewController.main); 

        AppSceneUtil.main.SetRootViewController(p);


        var ret = Common.GetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, false);
        Debug.Log("MusicBgPlay Start");
        if (ret) {
            MusicBgPlay.main.PlayBgMusic();
        }

    }

}


