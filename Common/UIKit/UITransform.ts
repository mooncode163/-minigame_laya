import UI from "./ViewController/UI";

export default class UITransform {
// ui:UIView
    _ui:any;
    constructor(ui:any) {
         this._ui = ui;
    }
    public set localScale(value: Laya.Vector3) {  
        UI.SetScaleX(this._ui.node,value.x); 
        UI.SetScaleY(this._ui.node,value.y);  
    }
    public set position(value: Laya.Vector3) {  
        UI.SetPosition(this._ui.node,value);  
    }
    public set localPosition(value: Laya.Vector3) {  
        UI.SetPosition(this._ui.node,value);  
    }
  
}


