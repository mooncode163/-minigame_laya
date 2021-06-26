import AppSceneBase from "../../../AppBase/Common/AppSceneBase";
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
            root = AppSceneBase.main.rootViewController;
        }
        // this.SetViewParent(root.objController);
        this.SetViewParent(AppSceneBase.main.rootNode);
    }

    Close () { 
        if(this.objCallback.close){
            this.objCallback.close(this);
        }
        this.DestroyObjController();
    }

}
 