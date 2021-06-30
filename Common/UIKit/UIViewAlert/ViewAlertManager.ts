 
import AppSceneUtil from "../../../AppBase/Common/AppSceneUtil";
import PrefabCache from "../../Cache/PrefabCache";
import ConfigPrefab from "../../Config/ConfigPrefab";
import PopUpManager from "../PopUp/PopUpManager";
import UIViewAlert from "./UIViewAlert";
 

 
export default class ViewAlertManager  {
    uiPrefab: Laya.Prefab = null;
    ui: UIViewAlert = null;
    keyName: string = "";
    isNeedShow: boolean = false;
    strTitle: string = "";
    strMsg: string = "";
    strYes: string = "";
    strNo: string = "";

    //callback(UIViewAlert alert, bool isYes);
    callback = null;

    static _main: ViewAlertManager;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new ViewAlertManager();
            // this._main.Init();
        }
        return this._main;
    }

    Init() {
        this.isNeedShow = false;
        this.LoadUI();
    }

    LoadUI() {
        PrefabCache.main.LoadByKey(
            {
                key: "UIViewAlert",
                success: (p: any, data: any) => {
                    this.uiPrefab = data;
                    if (this.isNeedShow) {
                        this.ShowInternal(this.strTitle, this.strMsg, this.strYes, this.strNo);
                    }
                },
                fail: () => {
                },
            });


    }

    ShowInternal(title, msg, yes, no) {
        //Debug.Log("ShowInternal SetText title ="+title+" msg="+msg);
        var node = this.uiPrefab.create();
        this.ui = node.getComponent(UIViewAlert);
        // this.ui.callback = this.OnUIViewAlertFinished.bind(this);

        this.ui.keyName = this.keyName;
        this.ui.SetText(title, msg, yes, no);
        // this.ui.SetViewParent(AppSceneUtil.main.canvasMain.node);
    }
    //string
    Show(title, msg, yes, no) {
        this.isNeedShow = true;
        this.strTitle = title;
        this.strMsg = msg;
        this.strYes = yes;
        this.strNo = no;

        if (this.uiPrefab == null) {
            this.LoadUI();
        } else {
            this.ShowInternal(this.strTitle, this.strMsg, this.strYes, this.strNo);
        }


    }

    /*
 {
     title: "",
     msg: "",
     yes: "",
     no: "",
     isShowBtnNo:false,
     name: "",
     finish (ui,isYes) {
     } 
 }
*/

    ShowFull(obj) {
        // this.keyName = obj.name;
        // this.callback = obj.finish;
        // this.Show(obj.title, obj.msg, obj.yes, obj.no);
        // //必须在show之后设置
        // this.ShowBtnNo(obj.isShowBtnNo);
 
        var strPrefab = ConfigPrefab.main.GetPrefab("UIViewAlert");
        PopUpManager.main.Show(
            {
                prefab: strPrefab,
                open: (ui: any) => {
                    ui.keyName = obj.name;
                ui.SetText(obj.title, obj.msg, obj.yes, obj.no);
                ui.ShowBtnNo(obj.isShowBtnNo);
                ui.callback = obj.finish;
                },
                close: (ui: any) => {
                },
            });

    }
    Hide() {
        if (this.ui != null) {
            // GameObject.DestroyImmediate(ui);
            // ui = null;
        }
    }

    ShowBtnNo(isShow) {
        if (this.ui != null) {
            this.ui.ShowBtnNo(isShow);
        }
    }

    OnUIViewAlertFinished(alert, isYes) {
        if (this.callback != null) {
            this.callback(alert, isYes);
        }
    }


}



