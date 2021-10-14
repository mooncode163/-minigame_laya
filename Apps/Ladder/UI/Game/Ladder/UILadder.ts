import LevelData from "../../../../../AppBase/Game/LevelData"; 
import PrefabCache from "../../../../../Common/Cache/PrefabCache";
import Common from "../../../../../Common/Common";
import Debug from "../../../../../Common/Debug";
import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIView from "../../../../../Common/UIKit/ViewController/UIView"; 
import UILadderItem from "./UILadderItem";
import UILadderSide from "./UILadderSide";

export default class UILadder extends UIView {
    listLadderKey = ["UILadderItem", "UILadderItemR", "UILadderItemL", "UILadderItemLRAnim", "UILadderItemRAnim", "UILadderItemLAnim", "UILadderItemLAnim", "UILadderItem", "UILadderItem", "UILadderItemR", "UILadderItemL", "UILadderItemLorRAnim"];
    uiSideLeft: UILadderSide;
    uiItemPrefab: UILadderItem;
    stepsBetweenSpawns = 5;
    stepsLength = 10;

    LayOut() {
        super.LayOut();
    }

    onAwake() {
        super.onAwake();
    }
    onStart() {
        super.onStart();
        this.UpdateLevel(LevelData.main.gameLevel);
        this.LayOut();


    }
    LoadPrefab() {
        PrefabCache.main.LoadByKey(
            {
                key: "UILadderItem",
                success: (p: any, data: any) => {
                    this.uiItemPrefab = data;


                },
                fail: () => {

                },
            });


    }


    UpdateLevel(level: number) {
        var firstCount = 3;
        var count = 13;
        for (var i = 0; i < count; i++) {
            var key = this.listLadderKey[Common.RandomRange(0, this.listLadderKey.length)];
            if (i < firstCount) {
                key = this.listLadderKey[0];
            }
            Debug.Log("UILadder  UpdateLevel i=" + i + " key=" + key);
        

            PrefabCache.main.LoadByKey(
                {
                    key: key,
                    success: (p: any, data: any) => {
                        var prefab = data;
                        var node = UI.Instantiate(data);
                        UI.SetParent(node, this.node);
                        // ui.transform.position = new Vector3(0f, 0.5f * i, 0f);
                        // UIViewController.ClonePrefabRectTransform(prefab.gameObject, ui.gameObject);
                        var pt = new Laya.Vector3();
                        pt.x = 0;
                        pt.y = 0.5*i;
                        pt.z = 0;
                        UI.SetPosition(node,pt);
                    },
                    fail: () => {

                    },
                });


        }
    }
}


