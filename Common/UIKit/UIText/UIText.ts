


// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

import Common from "../../Common";
import ColorConfig from "../../Config/ColorConfig";
import Debug from "../../Debug";
import Language from "../../Language/Language";
import UIView from "../ViewController/UIView";
import UI from "../ViewController/UI";


export default class UIText extends UIView {

    // /** @prop {name:label,type:Node}*/
    public label: Laya.Label;

    /** @prop {name:keyText,type:string}*/
    keyText: string = "";
    /** @prop {name:keyColor,type:string}*/
    keyColor: string = "";


    //get 的用法
    get text() {
        this.Init();
        return this.label.text;
    }
    // set 的用法
    set text(value) {
        this.Init();
        this.label.text = value;
        this.LayOut();

    }


    private _fontSize: number = 64;
    //get 的用法
    /** @prop {name:fontSize,type:number}*/
    get fontSize() {
        return this._fontSize;
        // this.Init();
        // return this.label.fontSize;
    }
    // set 的用法
    set fontSize(value) {
        this._fontSize = value;
        // if (this.owner != null) {
        //     this.Init();
        //     this.label.fontSize = value;
        //     this.LayOut();
        // }

    }

    //get 的用法
    get color() {
        this.Init();
        return this.label.color;
    }
    // set 的用法
    set color(value) {
        this.Init();
        this.label.color = value;
        this.LayOut();

    }
    onAwake() {
        super.onAwake();
        UI.SetNodePivotCenter(this.owner);
        this.Init();
        this.label.fontSize = this.fontSize;

    }

    onStart() {
        // [3]
        super.onStart();
        Debug.Log("UIText this.keyColor =" + this.keyColor);
        if (!Common.BlankString(this.keyColor)) {
            Debug.Log("UIText this.color");
            var ret = this.GetKeyColor();
            Debug.Log("UIText this.color =" + ret);
            this.color = ret;
        }

        Debug.Log("UIText this.keyText =" + this.keyText);
        if (!Common.BlankString(this.keyText)) {
            this.text = this.GetKeyText();
        }

        this.LayOut();
    }

    onUpdate() {

    }
    Init() {
        if (this.label != null) {
            return;
        }
        this.label = this.owner.getChildByName("Label") as Laya.Label;

    }

    LayOut() {
        super.LayOut();
        // 同步大小
        var size = UI.GetNodeContentSize(this.owner);
        UI.SetNodeContentSize(this.label, size.width, size.height);
        UI.SetNodePivotCenter(this.owner);
        super.LayOut();

    }
    UpdateLanguage() {
        super.UpdateLanguage();
        if (!Common.BlankString(this.keyText)) {
            this.text = this.GetKeyText();
        }
        this.LayOut();
    }

    //js 默认参数方法： https://www.cnblogs.com/luotingliang/p/7250990.html
    GetKeyColor(def: string = "0, 0, 0, 255") {
        var ret = "0, 0, 0, 255";
        if (def) {
            ret = def;
        }

        if (!Common.BlankString(this.keyColor)) {
            ret = ColorConfig.main.GetColor(this.keyColor);
            Debug.Log("UIView this.keyColor =" + this.keyColor + " ret=" + ret);
        } else {
            Debug.Log("UIView this.keyColor null");
        }
        return ret;
    }
    GetKeyText() {
        var ret = "";
        if (!Common.BlankString(this.keyText)) {
            ret = Language.main.GetString(this.keyText);
        }
        return ret;
    }

}


