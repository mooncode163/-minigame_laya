
 
export default class UICellItemBase extends UIViewCell {
    index= 0;
    onClickCallBack= null;
    target:UIView=null;
    
    onLoad() {
        super.onLoad();
     
    }

    start() {
        // [3]
        super.start();
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


/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
