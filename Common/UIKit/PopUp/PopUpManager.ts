
import AppSceneBase from "../../../AppBase/Common/AppSceneBase";
import AppSceneUtil from "../../../AppBase/Common/AppSceneUtil";
import AudioPlay from "../../Audio/AudioPlay";
import PrefabCache from "../../Cache/PrefabCache";
import Common from "../../Common";
import CommonRes from "../../CommonRes";
import ConfigPrefab from "../../Config/ConfigPrefab";
import Debug from "../../Debug";
import UI from "../ViewController/UI";
import UIView from "../ViewController/UIView";
import PopUpData from "./PopUpData";
import UIViewPop from "./UIViewPop";


export default class PopUpManager {
    // UIViewPop
    listItem: UIViewPop[] = [];
    static ANIMATE_DURATION = 0.8;
    nodePannel: Laya.Sprite = null;
    objPop = null;

    static _main: PopUpManager;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new PopUpManager();
            PopUpData.main.manager = this._main;
            // this._main.Init();
        }
        return this._main;
    }


    /*
   { 
    prefab:"" 
    open: (p:any) => {
       
   }, 
   close: (p:any) => {
       
   }, 
   }
   */
    Show(obj: any) {
        this.objPop = obj;
        this.LoadBg();

        PrefabCache.main.Load(
            {
                filepath: this.objPop.prefab,
                success: (p: any, data: any) => {
                    Debug.Log("PopUpManager LoadBgInternal success");
                    this.OpenPopup(data);
                },
                fail: () => {
                    Debug.Log("PopUpManager LoadBgInternal fail");
                },
            });

    }
 
      /*
   { 
    key:"" 
    open: (p:any) => {
       
   }, 
   close: (p:any) => {
       
   }, 
   }
   */
    ShowByKey(obj: any) { 
        var strPrefab = ConfigPrefab.main.GetPrefab(obj.key);
        this.Show(
            {
                prefab: strPrefab,
                open: (ui: any) => { 
                    if (obj.open != null) {
                        obj.open(ui);
                    }
                },
                close: (ui: any) => {
                    if (obj.close != null) {
                        obj.close(ui);
                    }
                },
            });

      

    }



    LoadBg() {
        // Debug.Log("PopUpManager LoadBg");
        // // var strPrefab = "Common/Prefab/UIKit/UIPopUp/PopUpBgPannel"; 
        // PrefabCache.main.LoadByKey(
        //     {
        //         key: "PopUpBgPannel",
        //         success: (p: any, data: any) => {
        //             Debug.Log("PopUpManager LoadBg success");
        //             this.LoadBgInternal(data);

        //         },
        //         fail: () => {
        //             Debug.Log("PopUpManager LoadBg fail");
        //             this.LoadBgInternal(null);
        //         },
        //     });
        this.nodePannel = new Laya.Sprite();
        this.nodePannel.addComponent(UIView);
        // #343434
        // this.nodePannel.color = new Color(52, 52, 52, 50);
        var size = Common.sizeCanvas;
        // this.nodePannel.graphics.drawRect(0, 0, size.width, size.height, "#343434");
        this.nodePannel.graphics.drawRect(0, 0, size.width, size.height, "#343434E0");
        AppSceneUtil.main.rootNode.addChild(this.nodePannel);
    }
    LoadBgInternal(prefab) {
        var nodeRoot = AppSceneUtil.main.rootNode;

        // this.nodePannel = new Node("Pannel");
        // this.nodePannel.addComponent(UIView);
        // var uitran = this.nodePannel.addComponent(UITransform);
        // this.nodePannel.color = new Color(52, 52, 52, 50);
        if (prefab != null) {
            var node = UI.Instantiate(prefab);
            nodeRoot.addChild(node);
            // node.setContentSize(Common.sizeCanvas);

            //拦截点击
            //  panel.addComponent(BlockInputEvents);
            // this.nodePannel = node;
            // this.nodePannel.active = false;
        }

        // this.nodePannel.active = false;
        PrefabCache.main.Load(
            {
                filepath: this.objPop.prefab,
                success: (p: any, data: any) => {
                    Debug.Log("PopUpManager LoadBgInternal success");
                    this.OpenPopup(data);
                },
                fail: () => {
                    Debug.Log("PopUpManager LoadBgInternal fail");
                },
            });
    }

    OpenPopup(prefab: any) {
        Debug.Log("OpenPopup");
        var nodeRoot = AppSceneUtil.main.rootNode;
        var nodePop = UI.Instantiate(prefab);
        nodeRoot.addChild(nodePop);
        var ui = nodePop.getComponent(UIViewPop);
        if (nodePop == null) {
            Debug.Log("OpenPopup nodePop is null");
        }
        if (ui == null) {
            Debug.Log("OpenPopup ui is null");
            return;
        }
        this.listItem.push(ui);

        if (this.objPop.open != null) {
            this.objPop.open(ui);
        }

        var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);
        if (ret) {
            //play sound click
            AudioPlay.main.PlayCloudAudio("PopUp/PopupOpen.mp3");
        }

    }


    OnClose() {

    }
    /// <summary>
    /// Closes the topmost popup.
    /// </summary>
    CloseCurrentPopup() {
        /*
       var currentPopup = currentPopups.Peek();
       if (currentPopup != null) {
           currentPopup.GetComponent<UIViewPop>().Close();
       } 
       */
    }

    /// <summary>
    /// Closes the topmost popup.
    /// </summary>
    ClosePopup() {

        if (this.nodePannel != null) {
            this.nodePannel.destroy();
            this.nodePannel = null;
        }
        if (this.listItem.length == 0) {
            return;
        }
        var ui = this.listItem[0];
        if (ui == null) {
            return;
        }

        //删除index为0的元素
        this.listItem.splice(0, 1);

        // ui.Close();
        /*
    
    
        var topmostPanel = currentPanels.Pop();
        if (topmostPanel != null) {
            StartCoroutine(FadeOut(topmostPanel.GetComponent<Image>(), 0.2f, () => Destroy(topmostPanel)));
        }
    
        if (_onClose != null) {
            _onClose(topmostPopup.GetComponent<UIViewPop>());
        }
        */
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);
        if (ret) {
            //play sound click
            AudioPlay.main.PlayCloudAudio("PopUp/PopupClose.mp3");
        }


        //delay延时
        // var time = delayTime(2);
        var duration = PopUpManager.ANIMATE_DURATION;

        var scale1 = 1.2;
        var scale2 = 0;

        // tween(ui.node)
        //     .to(duration / 2, { scale: new Vec3(scale1, scale1, 1) })
        //     .to(duration / 2, { scale: new Vec3(scale2, scale2, 1) })
        //     .call(() => {
        //         ui.DoClose();
        //     })
        //     .onStart()

        if (this.objPop.close != null) {
            this.objPop.close(ui);
        }

    }



    /// <summary>
    /// Utility coroutine to fade in the specified image.
    /// </summary>
    /// <param name="image">The image to fade.</param>
    /// <param name="time">The duration of the fade in seconds.</param>
    /// <returns>The coroutine.</returns>
    FadeIn(image, time) {
        //         var alpha = image.color.a;
        //         for (var t = 0.0f; t < 1.0f; t += Time.deltaTime / time)
        // {
        //     var color = image.color;
        //     color.a = Mathf.Lerp(alpha, 220 / 256.0f, t);
        //     image.color = color;

        // }
    }

    /// <summary>
    /// Utility coroutine to fade out the specified image.
    /// </summary>
    /// <param name="image">The image to fade.</param>
    /// <param name="time">The duration of the fade in seconds.</param>
    /// <param name="onComplete">The callback to invoke when the fade has finished.</param>
    /// <returns>The coroutine.</returns>
    FadeOut(image, time, onComplete) {
        //         var alpha = image.color.a;
        //         for (var t = 0.0f; t < 1.0f; t += Time.deltaTime / time)
        // {
        //     var color = image.color;
        //     color.a = Mathf.Lerp(alpha, 0, t);
        //     image.color = color;
        //     yield return null;
        // }
        // if (onComplete != null) {
        //     onComplete();
        // }
    }

}

