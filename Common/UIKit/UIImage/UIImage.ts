
// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

import TextureCache from "../../Cache/TextureCache";
import Common from "../../Common";
import ImageRes from "../../Config/ImageRes";
import Debug from "../../Debug";
import Device from "../../Device";
import FileUtil from "../../File/FileUtil";
import TextureUtil from "../../Image/TextureUtil";
import Platform from "../../Platform";
import { RelationType } from "../LayOut/LayOutUtil";
import UIView from "../ViewController/UIView";


enum ENUM_Effect {
    null = 0,
    popupEffect = 1,
    closeEffect = 2
};

function ENUM_ChangeString(enumObject) {
    let reslut = "";
    for (var entry in ENUM_Effect) {
        reslut = reslut + "," + entry;
    }
    return reslut;
}

var effectOption = ENUM_ChangeString(ENUM_Effect);

export default class UIImage extends UIView {

 
    /** @prop {name:targetEffect, tips:"UI特效", type:ENUM_Effect, default:null}*/
    private targetEffect: ENUM_Effect = null; //这样写实不行的

    /** @prop {name:targetEffect, tips:"UI特效", type:Option, option:effectOption, default:null}*/
    private targetEffect1: ENUM_Effect = null; //这样也是不行的
 

    /** @prop {name:image,type:Node}*/
    public image: Laya.Image;

    /** @prop {name:testPrefab,type:Prefab}*/
    public testPrefab: Laya.Prefab;


    isCache: boolean = true;


    /** @prop {name:keyImage,type:string}*/
    keyImage: string = "";
    /** @prop {name:keyImage2,type:string}*/
    keyImage2: string = "";
    /** @prop {name:keyImageH,type:string}*/
    keyImageH: string = "";//only for landscap 横屏
    /** @prop {name:keyImageH2,type:string}*/
    keyImageH2: string = "";


    // @type(RelationType) 
    /** @prop {name:testType,type:Option,option:"None,PARENT", default:PARENT}*/
    testType = RelationType.PARENT;

    isSizeFitTexture: boolean = false;

    onAwake() {
        Debug.Log("UIImage onAwake");
        super.onAwake();
        var keyPic = this.keyImage;
        // this.image = this.owner.getChildByName("Image") as Laya.Image;

        if (this.image == null) {
            Debug.Log("UIImage image==null");
        } else {
            Debug.Log("UIImage image!=null");
        }

        Debug.Log("UIImage testType=" + this.testType);

        if (Device.main.isLandscape) {
            if (!Common.BlankString(this.keyImageH)) {
                keyPic = this.keyImageH;
            }
        }

        if (Common.BlankString(keyPic)) {
            return;
        }

        var pic = ImageRes.main.GetImage(keyPic);

        if (!FileUtil.FileExist(pic)) {

            if (Device.main.isLandscape) {
                keyPic = this.keyImageH2;
            }
            else {
                keyPic = this.keyImage2;
            }
        }
        this.UpdateImageByKey(keyPic);
        this.LayOut();
    }

    onStart() {
        // [3]
        super.onStart();
        this.LayOut();
    }

    GetKeyImage() {
        var ret = "";
        if (!Common.BlankString(this.keyImage)) {
            ret = ImageRes.main.GetImage(this.keyImage);
        }
        return ret;
    }

    UpdateImageByKey(key: string) {
        var pic = "";
        if (Common.BlankString(key)) {
            return;
        }
        if (!Common.BlankString(key)) {
            pic = ImageRes.main.GetImage(key);
        }
        Debug.Log("UIImage UpdateImageByKey pic=" + pic + " key=" + key);

        if (!Common.BlankString(pic)) {
            this.UpdateImage(pic, key);
        }
    }

    UpdateImageTexture(tex: Laya.Texture2D) {

        TextureUtil.UpdateImageTexture(this.image, tex, true, Laya.Vector4.ZERO);
        if (this.isSizeFitTexture) {
            this.SetContentSize(tex.width, tex.height);
            this.LayOut();
        }
    }

    // 绝对路径
    UpdateImage(pic: string, key: string = "") {
        var strKey = key;
        if (Common.BlankString(key)) {
            strKey = this.keyImage;
        }
        if (Common.BlankString(pic)) {
            return;
        }
        var isBoard = ImageRes.main.IsHasBoard(strKey);
        var board = Laya.Vector4.ZERO;
        // if (isBoard) 
        {
            board = ImageRes.main.GetImageBoard(strKey);
        }
        if (board != Laya.Vector4.ZERO) {
            //  image.imagety
        }
        // RectTransform rctranOrigin = this.GetComponent<RectTransform>();
        // Vector2 offsetMin = rctranOrigin.offsetMin;
        // Vector2 offsetMax = rctranOrigin.offsetMax;

        var isCloud = false;
        if (Platform.isCloudRes) {
            isCloud = true;
        }
        TextureCache.main.Load(
            {
                filepath: pic,
                isCloud: isCloud,
                success: (p: any, tex: Laya.Texture2D) => {
                    TextureUtil.UpdateImageTexture(this.image, tex, true, board);
                    if (this.isSizeFitTexture) {
                        this.SetContentSize(tex.width, tex.height);
                        this.LayOut();
                    }

                },
                fail: (p: any) => {

                },
            });


        // RectTransform rctan = this.GetComponent<RectTransform>();
        // rctan.sizeDelta = new Vector2(tex.width, tex.height);
        // Debug.Log("UpdateImage pic=" + pic + "isBoard=" + isBoard + " keyImage=" + strKey + " tex.width=" + tex.width);
        // if ((rctan.anchorMin == new Vector2(0.5f, 0.5f)) && (rctan.anchorMax == new Vector2(0.5f, 0.5f))) {
        // }
        // else {
        //     //sizeDelta 会自动修改offsetMin和offsetMax 所以需要还原
        //     rctan.offsetMin = offsetMin;
        //     rctan.offsetMax = offsetMax;
        // }
        this.LayOut();
    }

    LayOut() {
        super.LayOut();

        // UIViewUtil.SetNodeContentSize(this.image,256,256);
        // UIViewUtil.SetNodePosition(this.owner,256,128);
    }

}


