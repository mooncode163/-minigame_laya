


// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

import Common from "../../Common";
import ColorConfig from "../../Config/ColorConfig";
import Debug from "../../Debug";
import Language from "../../Language/Language";
import UIView from "../ViewController/UIView";
import UIViewUtil from "../ViewController/UIViewUtil";


export default class UIText extends UIView {

    // /** @prop {name:label,type:Node}*/
    public label: Laya.Label;

    /** @prop {name:keyText,type:string}*/
    keyText: string = "";
    /** @prop {name:keyColor,type:string}*/
    keyColor: string = "";

    //get 的用法
    get text() {
        return this.label.text;
    }
    // set 的用法
    set text(value) {
        this.label.text = value;
        this.LayOut();

    }


    //get 的用法
    get fontSize() {
        return this.label.fontSize;
    }
    // set 的用法
    set fontSize(value) {
        this.label.fontSize = value;
        // this.label.lineHeight = value;
        this.LayOut();

    }

    //get 的用法
    get color() {
        return this.label.color;
    }
    // set 的用法
    set color(value) {
        this.label.color = value;
        this.LayOut();

    }
    onAwake() {
        super.onAwake();
        Debug.Log("UIText this.keyColor =" + this.keyColor);
        
        this.label = this.owner.getChildByName("Label") as Laya.Label;

        if (!Common.BlankString(this.keyColor)) {
            Debug.Log("UIText this.color");
            var ret = this.GetKeyColor(Laya.Color.YELLOW);
            Debug.Log("UIText this.color =" + ret);
            // this.color = ret;
        }
        if (!Common.BlankString(this.keyText)) {
            this.text = this.GetKeyText();
        }
    }

    onStart() {
        // [3]
        super.onStart();
    }
    LayOut() {
        super.LayOut();
        // 同步大小
        var size = UIViewUtil.GetNodeContentSize(this.owner);
        UIViewUtil.SetNodeContentSize(this.label, size.width, size.height);

    }
    UpdateLanguage() {
        super.UpdateLanguage();
        if (!Common.BlankString(this.keyText)) {
            this.text = this.GetKeyText();
        }
        this.LayOut();
    }

    //js 默认参数方法： https://www.cnblogs.com/luotingliang/p/7250990.html
    GetKeyColor(def: Laya.Color) {
        var ret = Laya.Color.BLACK;
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


