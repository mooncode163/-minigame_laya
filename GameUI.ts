import { ui } from "./../ui/layaMaxUI";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
    constructor() {
        super();

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
        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
        // Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function (tex: Laya.Texture2D) {
        //     material.albedoTexture = tex;
        // }));
        box.meshRenderer.material = material;


        {
            var filepath = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-850e2487-bb16-4d29-b798-c3f14a71a618/40720046-b0b1-41e2-9edd-09aca079a150.png";
            // console.log("ResManager Laya.loader.load before obj.filepath=" + filepath);
            Laya.loader.load(filepath, Laya.Handler.create(this, function (data: any): void {
                // console.log("ResManager Laya.loader.load obj.filepath=" + filepath);
                var tex = Laya.loader.getRes(filepath);
                
                if (tex == null) {
                    // console.log("ResManager Laya.loader.load texture is null fail");

                } else {
                    // console.log("ResManager Laya.loader.load texture is not null");

                }
                // material.albedoTexture = tex;

            }));
        }



        {
            var filepath = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-850e2487-bb16-4d29-b798-c3f14a71a618/40720046-b0b1-41e2-9edd-09aca079a150.png";
            console.log("ResManager Laya.loader.load before obj.filepath=" + filepath);
            Laya.loader.load(filepath, Laya.Handler.create(this, function (data: any): void {
                console.log("ResManager Laya.loader.load obj.filepath=" + filepath);
                var tex = Laya.loader.getRes(filepath);
                
                if (tex == null) {
                    console.log("ResManager Laya.loader.load texture is null fail");

                } else {
                    console.log("ResManager Laya.loader.load texture is not null");

                }
                material.albedoTexture = tex;

            }));
        }

    }
}