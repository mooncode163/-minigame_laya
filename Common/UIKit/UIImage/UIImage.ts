
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
import UI from "../ViewController/UI";
import ImageResCloudRes from "../../CloundRes/ImageResCloudRes";


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

// image: Laya.Image anchorX,Y 范围0-1 自身的旋转等猫点 pivotX、pivotY和anchorX、anchorY效果一样，都是设置轴心点，只不过一个是设置值，一个是设置百分比
export default class UIImage extends UIView {

    /** @prop {name:image,type:Node}*/
    // public image: Laya.Sprite;
    public image: Laya.Image;


    isCache: boolean = true;


    /** @prop {name:keyImage,type:string}*/
    keyImage: string = "";
    /** @prop {name:keyImage2,type:string}*/
    keyImage2: string = "";
    /** @prop {name:keyImageH,type:string}*/
    keyImageH: string = "";//only for landscap 横屏
    /** @prop {name:keyImageH2,type:string}*/
    keyImageH2: string = "";

    /** @prop {name:isSizeFitTexture,type:Bool}*/
    isSizeFitTexture: boolean = false;


    /** @prop {name:isPivotCenter,type:Bool}*/
    

    onAwake() {
        Debug.Log("UIImage onAwake");
        // this.Init();
        super.onAwake();
   
        this.LayOut();
        // this.image.render = -1;
    }

    onStart() {
        // [3]
        super.onStart();
        // this.image = this.owner.getChildByName("Image") as Laya.Image;
        var keyPic = this.keyImage;
        this.Init();

        if (this.image == null) {
            Debug.Log("UIImage image==null");
        } else {
            Debug.Log("UIImage image!=null");
        }

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

        var filepath = "Resources/App/UI/Bg/HomeBg.png";



        filepath = "Resources/App/UI/Setting/SettingCellBgYellow.png";

        var url = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2d2b7463-734d-482e-9539-28c66239be5d/356d43ca-241a-4e50-af69-17b80a0888c3.png";
        // this.image.sizeGrid = "32,32,32,32";
        // Laya.loader.load(filepath, Laya.Handler.create(this, function (data): void {
        //     var tex = Laya.loader.getRes(filepath);
        //     // var tex = data; 

        //     this.image.source = tex;
        //     Debug.Log("tex w=" + tex.width + " h=" + tex.height);

        // }));
        this.LayOut();
    }

    Init() {
        // if((this.image==null)||(this.image==undefined))
        {
            this.image = this.owner.getChildByName("Image") as Laya.Image;
        }

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

    UpdateTexture(tex: Laya.Texture) {

        TextureUtil.UpdateImageTexture(this.image, tex, true, Laya.Vector4.ZERO);
        if (this.isSizeFitTexture) {
            this.SetContentSize(tex.width, tex.height);
            this.LayOut();
        }
    }

    // 绝对路径
    UpdateImage(pic: string, key: string = "") {
        var strKey = key;
        this.Init();
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
        Debug.Log("UpdateImage .board="+board);
        TextureCache.main.Load(
            {
                filepath: pic,
                isCloud: isCloud,
                isSprite:false,
                success: (p: any, tex: Laya.Texture) => {
                    TextureUtil.UpdateImageTexture(this.image, tex, false, board);
                    if (this.isSizeFitTexture) {
                        this.SetContentSize(tex.width, tex.height); 
                    }
                    this.LayOut();
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


      // 绝对路径
      UpdateImageUICloudRes(pic: string, key: string = "") {
        var strKey = key;
        this.Init();
        if (Common.BlankString(key)) {
            strKey = this.keyImage;
        }
        if (Common.BlankString(pic)) {
            return;
        }
        var isBoard = ImageResCloudRes.main.IsHasBoard(strKey);
        var board = Laya.Vector4.ZERO;
        // if (isBoard) 
        {
            board = ImageResCloudRes.main.GetImageBoard(strKey);
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
        Debug.Log("UpdateImageUICloudRes board.x="+board.x);
        TextureCache.main.Load(
            {
                filepath: pic,
                isCloud: isCloud,
                isSprite:false,
                success: (p: any, tex: Laya.Texture) => {
                    TextureUtil.UpdateImageTexture(this.image, tex, false, board);
                    if (this.isSizeFitTexture) {
                        this.SetContentSize(tex.width, tex.height); 
                    }
                    this.LayOut();
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

        // image 和uiimage同步大小
        var size = UI.GetNodeContentSize(this.owner);
        UI.SetNodeContentSize(this.image,size.width,size.height);
        // this.image.x = 0;
        // this.image.y = 0;
        Debug.Log("UIImage  w=" + size.width + " h=" + size.height+" name="+this.owner.name); 
        if(this.isPivotCenter)
        {
            UI.SetNodePivotCenter(this.owner);
        }
        super.LayOut();
    }

    // SetContentSize(w, h) {
    //     super.SetContentSize(w,h);
    //     this.LayOut();
    // }
}


