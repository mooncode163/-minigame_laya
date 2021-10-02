
// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

import AppSceneUtil from "../../../AppBase/Common/AppSceneUtil";
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


export default class UISprite extends UIView {

    /** @prop {name:sprite,type:Node}*/
    sprite: Laya.MeshSprite3D;


    isCache: boolean = true;


    /** @prop {name:keyImage,type:string}*/
    keyImage: string = "";
    /** @prop {name:keyImage2,type:string}*/
    keyImage2: string = "";
    /** @prop {name:keyImageH,type:string}*/
    keyImageH: string = "";//only for landscap 横屏
    /** @prop {name:keyImageH2,type:string}*/
    keyImageH2: string = "";


    isSizeFitTexture: boolean = false;

    onAwake() {
        Debug.Log("UIImage onAwake");
        super.onAwake();
        var keyPic = this.keyImage;
        // this.image = this.owner.getChildByName("Image") as Laya.Image;


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
        // this.UpdateImageByKey(keyPic);

        this.LayOut();
    }

    onStart() {
        // [3]
        super.onStart();

        var filepath = "Resources/App/UI/Bg/HomeBg.png";
        // this.image.skin = pic;
        // var imageload = this.image;
        // Laya.Texture2D.load(filepath, Laya.Handler.create(null, function (tex): void {
        //     // imageload.skin = pic;
        //     var data = Laya.loader.getRes(filepath);
        //     imageload.texture = data;

        // }));

        // Laya.loader.load(filepath, Laya.Handler.create(this, this.onLoaded));
        // this.image2.loadImage(pic); 

        // filepath = "comp/image.png";


        // filepath = "Resources/App/UI/Bg/BgTest.png";
        // this.image2.loadImage(filepath);  
        var url = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-2d2b7463-734d-482e-9539-28c66239be5d/356d43ca-241a-4e50-af69-17b80a0888c3.png";
        // filepath = url;
        Laya.loader.load(filepath, Laya.Handler.create(this, function (data): void {
            var tex = Laya.loader.getRes(filepath);
            // var tex = data;
            this.image.texture = tex;
            Debug.Log("tex w=" + tex.width + " h=" + tex.height);

        }));

        this.LayOut();
    }

    onLoaded() {

        // var pic = "Resources/UI/Bg/HomeBg.jpg";
        // var texture=Laya.loader.getRes(pic);
        // this.image.skin = pic;
        // this.image.source = texture;
        var filepath = "Resources/App/UI/Bg/HomeBg.png";
        var texture = Laya.loader.getRes(filepath);
        // this.texture = texture;
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

        // TextureUtil.UpdateImageTexture(this.image, tex, true, Laya.Vector4.ZERO);
        if (this.isSizeFitTexture) {
            this.SetContentSize(tex.width, tex.height);
            this.LayOut();
        }
        var w = tex.width / 100;
        var h = tex.height / 100;
        //添加自定义模型
        // var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        var box: Laya.MeshSprite3D = AppSceneUtil.mainScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createQuad(w, h))) as Laya.MeshSprite3D;
        // box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT;
        // res/layabox.png

        box.meshRenderer.material = material;
        material.albedoTexture = tex;
        // box.transform.translate(new Laya.Vector3(0,-1, 0));

          /*
            Laya.Texture2D.load("GameWinBg.png", Laya.Handler.create(null, function (tex: Laya.Texture2D) {

  
        }));
        */


 

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
                success: (p: any, tex: Laya.Texture) => {
                    // TextureUtil.UpdateImageTexture(this.image, tex, true, board);
                    this.UpdateImageTexture(tex);   
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

        // UI.SetNodeContentSize(this.image,256,256);
        // UI.SetNodePosition(this.owner,256,128);
    }

}


