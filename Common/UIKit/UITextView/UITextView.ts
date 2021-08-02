import Common from "../../Common";
import Debug from "../../Debug";
import UIImage from "../UIImage/UIImage";
import UIScrollView from "../UIScrollView/UIScrollView";
import UIText from "../UIText/UIText";
import UI from "../ViewController/UI";
import UIFind from "../ViewController/UIFind";
import UIView from "../ViewController/UIView";


export default class UITextView extends UIView {

    textWidth = 0;
    textContent: UIText;
    uiScrollView: UIScrollView;
    static _main: UITextView;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new UITextView();
            // this._main.Init();
        }
        return this._main;
    }

    //get 的用法
    get text() {
        this.Init();
        if (this.textContent == null) {
            return "UITextView";
        }
        return this.textContent.text;
    }
    // set 的用法
    set text(value) {
        this.Init();
        Debug.Log("UIText set text value=" + value);
        if (this.textContent == null) {
            return;
        }
        this.textContent.text = value;
        this.LayOut();

    }

    Init() {  
        this.textContent = UIFind.FindUI(this.node, "textContent", UIText);
        this.uiScrollView = UIFind.FindUI(this.node, "uiScrollView", UIScrollView); 
    }

    onAwake() {
        super.onAwake();
        UI.SetNodePivotCenter(this.owner);
        this.Init();
        this.textContent.index = 0;
        // this.uiScrollView.Add(this.textContent);
        // this.textContent.visible = false;

    }

    onStart() {
        // [3]
        super.onStart();

        this.textWidth = Common.GetTextSize(this.textContent.text, this.textContent.fontSize).width;

        this.LayOut();

        // 初始化显示在顶部
        var size = this.GetContentSize();
        var sizeText = this.textContent.GetContentSize();

        var x = sizeText.width/2;
        var y = sizeText.height/2;
        UI.SetNodePosition(this.textContent.node,x,y);
    }

    SetContentHeight(h) {
        // RectTransform rctran = objScrollContent.GetComponent<RectTransform>();
        // rctran.sizeDelta = new Vector2(rctran.sizeDelta.x, h);
        var size = this.GetContentSize();
        var h_real = h;
        h_real = size.height;
        this.textContent.SetContentSize(size.width, h_real); 
    }

    LayOut() {
        super.LayOut();
        var fontsize = this.textContent.fontSize;

        var str_w = this.GetContentSize().width;
        var str_h = (this.textWidth / str_w + 1) * fontsize * 400;
        this.SetContentHeight(str_h);
        Debug.Log("UITextView "  + " str_h=" + str_h+" str_w="+str_w+ " this.textWidth="+this.textWidth);
       
        UI.SetNodePivotCenter(this.owner);
        super.LayOut();

        this.uiScrollView.LayOut();

        this.uiScrollView.UpdateContentSize(str_w,str_h);
    }

}



