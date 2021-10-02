import PrefabCache from "../../../../../Common/Cache/PrefabCache";
import UISprite from "../../../../../Common/UIKit/UIImage/UISprite";
import UIView from "../../../../../Common/UIKit/ViewController/UIView";
import GameLevelParse from "../../../../Main/GameLevelParse";
import GameData from "../../../Data/GameData";
import UIMergeItem from "../UIMergeItem";


export default class UIItemTrail extends UIView {
    // public List<UISprite> listItem = new List<UISprite>();
    listItem: UISprite[] = [];
    itemPosZ = -1;

    onAwake() {
        super.onAwake();
        this.LayOut();
        var count = 5;
        // for (var i = 0; i < count; i++)
        // {
        //     var uiPrefab = PrefabCache.main.LoadByKey<UISprite>("UISprite");
        //     var ui = (UISprite)GameObject.Instantiate(uiPrefab);
        //     ui.name = "UISprite";
        //     ui.transform.SetParent(this.transform);
        //     ui.transform.localScale = new Vector3(1f, 1f, 1f);
        //     ui.transform.localPosition = new Vector3(0f, 0f, itemPosZ);
        //     ui.visible = false;
        //     this.listItem.Add(ui);
        // }
    }

    onStart() {
        super.onStart();
        this.LayOut();
    }

    LayOut() {
        super.LayOut();
    }
    // 
    RunMoveAnimate(toPos, uiMerge: UIMergeItem) {
        this.keyId = uiMerge.keyId;
        var countTrail = this.listItem.length;
        var scaleStart = 1;
        /*
        var w = this.listItem[0].GetContentSize().x;
        if (w != 0)
        {
            scaleStart = (uiMerge.spriteItem.GetBoundSize().x / w) * 0.8;
        }
    
        var scaleEnd = 0.02;
        var duration = GameData.DURATION_MOVE;
    
        for (var i = 0; i < countTrail; i++)
        {
            var ui = this.listItem[i];
            var key = "TrailCirle" + "_" + GameLevelParse.main.GetIndexById(keyId).ToString();
            ui.UpdateImageByKey(key);
            var scale = scaleStart - i * (scaleStart - scaleEnd) / countTrail;
            ui.transform.localScale = new Vector3(scale, scale, 1);
            Sequence seq = DOTween.Sequence();
            float delayedTimer = (i * duration / countTrail);
            seq.AppendInterval(delayedTimer);
            seq.AppendCallback(() =>
       {
           ui.visible = true;
    
       });
            Tweener tw = ui.transform.DOMove(toPos, duration).OnComplete(() =>
                            {
    
                            }
            );
            seq.Append(tw);
            seq.AppendCallback(() =>
            {
                ui.transform.localPosition = new Vector3(0f, 0f, itemPosZ);
                ui.visible = false;
    
            });
    
    
        }
    
        */

    }
}
