


// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

import Common from "../../Common";
import ColorConfig from "../../Config/ColorConfig";
import Debug from "../../Debug";
import Language from "../../Language/Language";
import UIView from "../ViewController/UIView";
import UI from "../ViewController/UI";
import LayOutSize from "../LayOut/LayOutSize";
import { SizeType } from "../LayOut/LayOutUtil";

// Laya.Label 自动换行 wordWrap = true
export default class UIText extends UIView {

    // /** @prop {name:label,type:Node}*/
    public label: Laya.Label = null;


    /** @prop {name:keyColor,type:string}*/
    keyColor: string = "";

    /** @prop {name:enableFitTextSize,type:Bool}*/
    enableFitTextSize: boolean = false;
    /** @prop {name:offsetx,type:number}*/
    offsetx: number = 0;
    /** @prop {name:offsety,type:number}*/
    offsety: number = 0;

    //get 的用法
    get text() {
        this.Init();
        if (this.label == null) {
            return "UIText";
        }
        return this.label.text;
    }
    // set 的用法
    set text(value) {
        this.Init();
        Debug.Log("UIText set text value=" + value);
        if (this.label == null) {
            return;
        }
        this.label.text = value;
        this.LayOut();

    }


    _keyText: string = "";

    //keyText
    get keyText() {
        return this._keyText;
    }

    /** @prop {name:keyText,type:string}*/
    set keyText(value) {
        this._keyText = value;
        if (this.text == null) {
            return;
        }
        if (!Common.BlankString(this._keyText)) {
            this.text = this.GetKeyText();
        }
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

    // rgb 0-255
    private _color: Laya.Color = new Laya.Color(255, 255, 255, 255);
    //get 的用法
    get color(): Laya.Color {
        this.Init();
        // return ColorConfig.main.HexString2Color(this.label.color);
        return this._color;
    }
    // set 的用法
    set color(value: Laya.Color) {
        this.Init();
        this._color = value;
        if(this.label==null)
        {
            return;
        }
        this.label.color = ColorConfig.main.Color2HexString(value);
        this.LayOut();

    }
    onAwake() {
        super.onAwake();
        UI.SetNodePivotCenter(this.owner);
        this.Init();
        if (this.label != null) {
            this.label.fontSize = this.fontSize;
        }
        Debug.Log("UIText this.keyColor =" + this.keyColor);
        if (!Common.BlankString(this.keyColor)) {
            Debug.Log("UIText this.color");
            var ret = this.GetKeyColor();
            Debug.Log("UIText this.color =" + ret);
            this.color = ret;
        }
        var ly:LayOutSize = this.getComponent(LayOutSize);
        if(ly&&this.enableFitTextSize)
        {
            ly.enableLayout = false;
        }
    }

    onStart() {
        // [3]
        super.onStart();
        // return;


        Debug.Log("UIText this.keyText =" + this.keyText);
        if (!Common.BlankString(this.keyText)) {
            this.text = this.GetKeyText();
        }

        this.LayOut();
    }

    onUpdate() {

    }
    Init() {
        if (this.owner == null) {
            return;
        }
        if (this.label != null) {
            // return;
        }

        this.label = this.owner.getChildByName("Label") as Laya.Label;
        if (this.label == null) {

            var parent = this.node;
            for (var i = 0; i < parent.numChildren; i++) {
                var child = parent.getChildAt(i) as Laya.Node;
                if (child == undefined) {
                    continue;
                }

                var strtype = typeof child
                if (strtype != "undefined") {

                }
                //@moon laya bug,prefab 有时候copy的时候名字会丢失 直接获取子元素
                this.label = child as Laya.Label;
                break;



            }
        }
    }

    LayOut() {
        if (this.label == null) {
            return;
        }

        if (this.enableFitTextSize) {
            // var ly = this.label.getComponent(LayOutSize);
            // if (ly != null) {
            //     ly.enableLayout = false; 
            // }
        }

        super.LayOut();
        // 同步大小
        var size = UI.GetNodeContentSize(this.owner);
        if (this.label != null) {
            if (!this.enableFitTextSize) {
                // UI.SetNodeContentSize(this.label, size.width, size.height);
            } else {
                var w = this.label.width+this.offsetx;
                var h = this.label.height+this.offsety;
                Debug.Log("enableFitTextSize this.label.width="+this.label.width+" w=" + w + " h=" + h);
                UI.SetNodeContentSize(this.node, w, h);
            }

        }

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
    GetKeyColor(def: string = "0, 0, 0, 255"): Laya.Color {
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

        return ColorConfig.main.RgbString2Color(ret);
    }
    GetKeyText() {
        var ret = "";
        if (!Common.BlankString(this._keyText)) {
            ret = Language.main.GetString(this._keyText);
        }
        return ret;
    }


    GetTextSize() {
        if (this.label == null) {
            return null;
        }
        // var size = new Laya.Size(this.label.width, this.label.height);
        var size = this.contentSize;
        return size;
    }

}


