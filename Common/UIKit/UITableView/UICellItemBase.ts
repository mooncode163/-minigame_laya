
 
export default class UICellItemBase extends UIViewCell {
    index= 0;
    onClickCallBack= null;
    target:UIView=null;
    
    onAwake() {
        super.onAwake();
     
    }

    onStart() {
        // [3]
        super.onStart();
    }
    LayOut() {
        super.LayOut();
    }


    GetUIViewParent () {
        // return this.node.parent.uiViewParent;
    }
    GotoController (controller) {
        if (this.target.controller != null) {
            var navi = this.target.controller.naviController;
            if (navi != null) {
                navi.Push(controller);
            }else{
                Debug.Log("GotoController：navi is null");
            }
        }else{
            Debug.Log("GotoController：this.target.controller is null");
        }
    }
 
}



