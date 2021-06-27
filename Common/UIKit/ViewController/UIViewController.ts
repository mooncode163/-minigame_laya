 
import NaviViewController from "../NaviBar/NaviViewController";
import UIView from "./UIView";

 
 
export default class UIViewController   {
    // [1]
    // dummy = '';

    // [2]
    //
    // serializableDummy = 0;

    index: number;
    id: string;
    title: string;



    // @type(Node) // Declare that the cc type of the attribute _targetNode is Node
    objController: Laya.View | null = null;

    naviController: NaviViewController | null = null;

    view: UIView | null = null;
    CreateObjController() {

        if (this.objController == null) {
            this.objController = new Laya.View();
        }
        this.ViewDidLoad();


    }
    DestroyObjController() {
        this.ViewDidUnLoad();
        if (this.objController != null) {
            this.objController.destroy();
            this.objController = null;
        }
    }

    //SetViewParent
    SetViewParent(node: Laya.Node | null) {

        console.log("SetViewParent node");
        if (node == null) {
            console.log("SetViewParent node is null");
        }
        if (this.objController == null) {
            this.CreateObjController();
        }
        if (this.objController == null) {
            console.log("objController is null");
        } else {
            // this.objController.setParent(node); 
            node.addChild(this.objController);
            // var size = node.getComponent(UITransform).contentSize;
            var ui=this.objController.addComponent(UIView);
            // ui.SetContentSize()
            // this.objController.addComponent(UITransform);
            // this.objController?.getComponent(UITransform)?.setContentSize(size);

        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    //virtual
    LayOut() {
        if(this.view!=null)
        {
            this.view.LayOut();
        }
    }
    ViewDidLoad() {
    }

    ViewDidUnLoad() {
    }


    // 显示ui后调用
    ViewDidAppear() {
        if(this.naviController!=null){
            this.naviController.OnNextUIDidAppear();
        }
    }

    // 销毁ui后调用
    ViewDidUnAppear() {
    }

    //UIView view
    AddView(view: UIView) {
    }




    UpdateLanguage() {
        if (this.view == null) {
            return;
        }
        //child
        // var children = this.objController.numChildren;
        for (var i = 0; i < this.objController.numChildren; i++) {
            var child = this.objController.getChildAt(i);
            var viewchild = child.getComponent(UIView);
            if (viewchild != null) {
                viewchild.UpdateLanguage();
            }
        }
    }
}
 