import AppSceneBase from "../../../AppBase/Common/AppSceneBase";
import AppSceneUtil from "../../../AppBase/Common/AppSceneUtil";
import UIViewController from "./UIViewController";
 

 
export default class PopViewController extends UIViewController {
    // iDelegate: IPopViewControllerDelegate,
        // _closeCallback: null,
        objCallback=null;
     /*
      {
        controller:any, 
        close: (p:any) => {
            
        },  
    }
      */
    Show (obj:any) { 
        this.objCallback = obj;
        //this.iDelegate = dele;
        var root = obj.controller;
        if (root == null) {
            root = AppSceneUtil.main.rootViewController;
        }
        // this.SetViewParent(root.objController);
        this.SetViewParent(AppSceneUtil.main.rootNode);
    }

    Close () { 
        if(this.objCallback.close){
            this.objCallback.close(this);
        }
        this.DestroyObjController();
    }

}
 