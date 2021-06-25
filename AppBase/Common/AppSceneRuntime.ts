
import { ui } from '../../../ui/layaMaxUI';
import Debug from '../../Common/Debug'; 


// typescript 提示 Object is possibly ‘null‘ 的N种解决方法
// https://blog.csdn.net/iamlujingtao/article/details/110573421



export default class AppSceneRuntime extends ui.test.TestSceneUI {
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
        Debug.Log("AppSceneRuntime constructor");
        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        //添加自定义模型
        // var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        // box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        // var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        // Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function (tex: Laya.Texture2D) {
        //     material.albedoTexture = tex;
        // }));
        // box.meshRenderer.material = material;
    }



    onAwake() {
        super.onAwake();
        Debug.Log("AppSceneBase onAwake");
    }

    onStart() {
        // super.onStart();
    }

  

}


