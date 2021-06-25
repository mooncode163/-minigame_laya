  
import Debug from "../Common/Debug";
import ResManager from "../Common/Res/ResManager";
import AppSceneBase from "./Common/AppSceneBase";


/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class AppScene extends AppSceneBase// ui.test.TestSceneUI

{ 
    onAwake() {
        super.onAwake();
        Debug.Log("AppScene onAwake");
        // var strDir = "Resources/"+Common.RES_CONFIG_DATA + "/config";
        // var fileName = "config_common.json";
        // ResManager.LoadJson(
        //     {
        //         filepath: strDir+"/"+fileName,
        //         success: (p: any, data: any) => {
        //             // Debug.Log("AppScene data="+data);
        //             console.log(data["APP_TYPE"]);
        //         },
        //         fail: () => {
        //             Debug.Log("AppScene fail=");
        //         },
        //     }); 

        //     fileName = "config_common.txt";
        //     ResManager.LoadText(
        //         {
        //             filepath: strDir+"/"+fileName,
        //             success: (p: any, data: any) => {
        //                 Debug.Log("AppScene LoadText="+data); 
        //             },
        //             fail: () => {
        //                 Debug.Log("AppScene fail=");
        //             },
        //         }); 

        var strDir = "Resources";
        var fileName = "Image.prefab";
        ResManager.LoadPrefab(
            {
                filepath: strDir + "/" + fileName,
                success: (p: any, data: any) => { 
                    console.log("load prefab:", data);
                    this.owner.parent.addChild(data.create());
                },
                fail: () => {
                    Debug.Log("AppScene fail=");
                },
            });

    }

    onStart() {
        super.onStart();
        Debug.Log("AppScene onStart");
    }
}

