
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
import UI from "../ViewController/UI";
import UIView from "../ViewController/UIView";


export default class UISprite extends UIView {

    /** @prop {name:sprite,type:Node}*/
    sprite3D: Laya.MeshSprite3D;

    sprite2: Laya.Sprite;

    isCache: boolean = true;


    /** @prop {name:keyImage,type:string}*/
    keyImage: string = "";
    /** @prop {name:keyImage2,type:string}*/
    keyImage2: string = "";
    /** @prop {name:keyImageH,type:string}*/
    keyImageH: string = "";//only for landscap 横屏
    /** @prop {name:keyImageH2,type:string}*/
    keyImageH2: string = "";



    // 世界坐标大小 tex/100
    width = 0;
    height = 0;

    isSizeFitTexture: boolean = false;
    _isVisible: boolean = true;

      material: Laya.BlinnPhongMaterial;

    _color: Laya.Color = new Laya.Color(255, 255, 255, 255);
    public set color(value: Laya.Color) {
        this._color = new Laya.Color(value.r, value.g, value.b, value.a);
        if (this.sprite3D != null) {
            // var material: Laya.BlinnPhongMaterial = this.sprite3D.meshRenderer.material as Laya.BlinnPhongMaterial;
            if (this.material != null) {
                this.material.albedoColor = new Laya.Vector4(this._color.r / 255, this._color.g / 255, this._color.b / 255, this._color.a / 255);
                // this.material.albedoColorA = this._color.a/255;
            }
        }
    }

    public get color(): Laya.Color {
        if (this.sprite3D != null) {

            //会导致修改颜色时候改变贴图 所以用this.material替代
            // var material: Laya.BlinnPhongMaterial = this.sprite3D.meshRenderer.material as Laya.BlinnPhongMaterial;
            if (this.material != null) {
                this._color = new Laya.Color(this.material.albedoColor.x * 255, this.material.albedoColor.y * 255, this.material.albedoColor.z * 255, this.material.albedoColor.w * 255);
            }

        }
        return this._color;
    }


    // 0-255
    public set alpha(value: number) {
        if (this.sprite3D != null) {
            // var material: Laya.BlinnPhongMaterial = this.sprite3D.meshRenderer.material as Laya.BlinnPhongMaterial;
            if (this.material != null) {
                // material.albedoColor = new Laya.Vector4(this._color.r / 255, this._color.g / 255, this._color.b / 255, this._color.a / 255);
                this.material.albedoColorA = value/255;
            }
        }
    }

    _position: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    public set position(value: Laya.Vector3) {
        // UI.SetPosition(this.sprite,value);  
        // this.sprite.x = value.x; 
        this._position = new Laya.Vector3(value.x, value.y, value.z);
        if (this.sprite3D != null) {
            this.sprite3D.transform.localPosition = new Laya.Vector3(value.x, value.y, value.z);
        }

    }

    public get position(): Laya.Vector3 {
        return this._position;
    }

    _localScale: Laya.Vector3 = new Laya.Vector3(1, 1, 1);
    public set localScale(value: Laya.Vector3) {
        ;
        // this.sprite.x = value.x; 
        this._localScale = new Laya.Vector3(value.x, value.y, value.z);
        if (this.sprite3D != null) {
            this.sprite3D.transform.localScale = new Laya.Vector3(value.x, value.y, value.z);
        }

    }

    public get localScale() {
        return this._localScale;
    }
    public get visible(): boolean {
        var sp = this.sprite3D;
        var z = 0;
        if (sp != null) {
            return sp.active;
        }
        return false
    }
    public set visible(value: boolean) {
        var sp = this.sprite3D;
        var z = 0;
        this._isVisible = value;
        if (sp != null) {
            sp.active = value;
            AppSceneUtil.isNeedLayout = true;
        }
    }

    onAwake() {
        Debug.Log("UISprite onAwake");
        super.onAwake();
        this.isSprite = true;


        this.LayOut();
    }

    onDestroy() {
        if (this.sprite3D != null) {
            this.sprite3D.destroy();
        }
    }

    onStart() {
        // [3]
        super.onStart();

        var w = 1.28;
        var h = 1.28;

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
        this.UpdateImageByKey(keyPic);

        this.LayOut();
    }
    GetBoundingBox() {
        var w = this.width * this.localScale.x;
        var h = this.height * this.localScale.y;
        return new Laya.Size(w, h);
    }
    GetContentSize() {
        var w = this.width;
        var h = this.height;
        return new Laya.Size(w, h);
    }
    GetBoundSize() {
        return this.GetBoundingBox();
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
        this.texture = tex;
        var w = tex.width / 100;
        var h = tex.height / 100;
        this.width = w;
        this.height = h;
        //   w = 1.28;
        //   h = 1.28;
        Debug.Log("UISprite tex.width=" + tex.width + " w=" + w);
        //添加自定义模型
        // var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        // var box: Laya.MeshSprite3D = AppSceneUtil.mainScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createQuad(w, h))) as Laya.MeshSprite3D;
        this.sprite3D = this.node.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createQuad(w, h))) as Laya.MeshSprite3D;
        if (this._position != null) {

            // this.sprite3D.transform.position = this._position;
            this.sprite3D.transform.position = new Laya.Vector3(this._position.x, this._position.y, this._position.z);
        }
        if (this._localScale != null) {
            this.sprite3D.transform.localScale = this._localScale;
            // this.sprite3D.transform.position = new Laya.Vector3(this._position.x,this._position.y,this._position.z);
        }

        this.sprite3D.active = this._isVisible;
        // this.sprite.transform.position = this._position;
        // this.sprite.active =false;
        // box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        this.material= new Laya.BlinnPhongMaterial();
        this.material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT;
        // res/layabox.png
        var color = this.material._Color;

        this.sprite3D.meshRenderer.material = this.material;
        this.material.albedoTexture = tex;
        // material.albedoColor = new Laya.Vector4(1,2,2,0.1);
        this.material.albedoColor = new Laya.Vector4(this._color.r / 255, this._color.g / 255, this._color.b / 255, this._color.a / 255);
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
                isSprite: true,
                success: (p: any, tex: Laya.Texture2D) => {
                    // TextureUtil.UpdateImageTexture(this.image, tex, true, board);
                    this.UpdateImageTexture(tex);
                    if (this.isSizeFitTexture) {
                        this.SetContentSize(tex.width, tex.height);
                        this.LayOut();
                    }

                    Laya.timer.once(100, this, function (): void {
                        Debug.Log("callbackRenderFinish UISprite");
                        if (this.callbackRenderFinish != null) {
                            Debug.Log("callbackRenderFinish UISprite not null");
                            this.callbackRenderFinish();
                        }
                    });
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


