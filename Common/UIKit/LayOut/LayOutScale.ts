import AppSceneBase from "../../../AppBase/Common/AppSceneBase";
import Common from "../../Common";
import UIViewUtil from "../ViewController/UIViewUtil";
import LayOutBase from "./LayOutBase";
 
import { ScaleType } from "./LayOutUtil";

 
export default class LayOutScale extends LayOutBase {

   
    ratio = 1.0;
 
    private _type = ScaleType.MIN;
   
    //get 的用法
    get type() {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._type;
    }
    // set 的用法
    set type(value) {
        this._type = value;
        this.LayOut();

    }


    onAwake() {
        super.onAwake(); 
        this.type = this._type;
        this.LayOut();
    }

    onStart() {
        super.onStart();
        this.LayOut();
    }

    LayOut() {
        if (!this.Enable()) {
            return;
        }
        super.LayOut();
        this.UpdateType();
    }


    UpdateType() {
        switch (this.type) {
            case ScaleType.MIN:
                {
                   this.ScaleNode(this.owner, false);
                }
                break;
            case ScaleType.MAX:
                {
                   this.ScaleNode(this.owner, true);
                }
                break;

        }
    }

    ScaleNode(node: Laya.Node, isMaxFit: boolean) {
        var x, y, w, h; 
         
        var size = UIViewUtil.GetNodeContentSize(this.owner);
        var sizeParent = UIViewUtil.GetNodeContentSize(this.owner.parent); 

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        w_parent = sizeParent.width;
        h_parent = sizeParent.height;
        if(AppSceneBase.main==null)
        {
            return;
        }
        var sizeCanvas = AppSceneBase.main.sizeCanvas;
        if (w_parent == 0) {
            w_parent = sizeCanvas.width;
        }
        if (h_parent == 0) {
            h_parent = sizeCanvas.height;
        }
        w_parent -= (this.offsetMin.x + this.offsetMax.x);
        h_parent -= (this.offsetMin.y + this.offsetMax.y);

        w = size.width;
        h = size.height;

        var scale = 0;
        if (isMaxFit == true) {
            scale = Common.GetMaxFitScale(w, h, w_parent, h_parent);
        } else {
            scale = Common.GetBestFitScale(w, h, w_parent, h_parent);
        }
        scale = scale * this.ratio; 

        var sp = node as Laya.Sprite;
        if(sp!=null)
        {
            sp.scaleX = scale;
            sp.scaleY = scale;
        } 
    }
 
}
 