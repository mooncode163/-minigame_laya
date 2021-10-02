
// import { ui } from '../../../ui/layaMaxUI';
import Debug from '../../Common/Debug';
import AppSceneUtil from './AppSceneUtil';


/*


import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui.test {
    export class TestSceneUI extends Scene {
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("test/TestScene");
        }
    }
    REG("ui.test.TestSceneUI",TestSceneUI);
}

*/


// export default class AppSceneRuntime extends ui.test.TestSceneUI 
export default class AppSceneRuntime extends Laya.Scene {
    static _main: AppSceneRuntime;
    //静态方法
    static get main() {
        if (this._main == null) {

        }
        return this._main;
    }

    constructor() {
        super();
        AppSceneRuntime._main = this;


        //初始化引擎-让舞台大小与屏幕大小一致
        // Laya.init(Laya.Browser.width, Laya.Browser.height,Laya.WebGL);
        // Laya.init(1536,2048,Laya.WebGL);
        //  Laya.init(1536,2048,Laya.WebGL);
        //  Laya.stage.designWidth = 1536;
        //  Laya.stage.designHeight = 2048;


        Debug.Log("AppSceneRuntime constructor");

        // var scene: Laya.Scene = Laya.stage.addChild(new Laya.Scene()) as Laya.Scene;

        // https://blog.csdn.net/frankxixu/article/details/113747126


        // default 3d sample 
        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;
        // 设置环境光试试
        scene.ambientColor = new Laya.Vector3(255 / 255, 255 / 255, 255 / 255);

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.clearFlag = Laya.CameraClearFlags.DepthOnly;

        if (AppSceneUtil.is3D) {
            camera.transform.translate(new Laya.Vector3(0, 3, 3));
            camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);

            //添加方向光
            var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            // directionLight.color = new Laya.Vector3(1, 1, 1);
            directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        } else {
            camera.orthographic = true;
            camera.transform.translate(new Laya.Vector3(0, 0, 3));
        }
        // camera.orthographic = true;
        // orthographicVerticalSize 默认为10 为屏幕顶部到底部的世界坐标距离
        // camera.orthographicVerticalSize = 7;

        AppSceneUtil.mainCamera = camera;




        //添加自定义模型
        // var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        // box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        // var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        // Laya.Texture2D.load("Resources/GameRes/CloudRes/UI/Bg/HomeBg.png", Laya.Handler.create(null, function(tex:Laya.Texture2D) {
        // 		material.albedoTexture = tex;
        // }));
        // box.meshRenderer.material = material;

        //加载3D预设（3D精灵）
        // Laya.Sprite3D.load("LayaScene_Laya/Conventional/Laya.lh", Laya.Handler.create(this, function (sp) {
        // 	scene.addChild(sp);
        // 	// let pangzi: Laya.Sprite3D = scene.addChild(sp) as Laya.Sprite3D;
        // }));

        AppSceneUtil.mainScene = scene;

    
    }



    onAwake() {
        super.onAwake();
        Debug.Log("AppSceneBase onAwake");
    }

    ononStart() {
        // super.ononStart();
    }



}


