
import { ui } from '../../../ui/layaMaxUI';
import Debug from '../../Common/Debug';
import { UIViewController } from '../../Common/UIKit/ViewController/UIViewController';


// typescript 提示 Object is possibly ‘null‘ 的N种解决方法
// https://blog.csdn.net/iamlujingtao/article/details/110573421



export default class AppSceneBase extends Laya.Script {
    static _main: AppSceneBase;
    //静态方法
    static get main() {
        if (this._main == null) {

        }
        return this._main;
    }

    constructor() {
        super();
        Debug.Log("AppSceneBase constructor");

    }



    onAwake() {
        //   super();
        Debug.Log("AppSceneBase onAwake");
    }

    onStart() {
        //   super();
        Debug.Log("AppSceneBase onStart");
    }



}


