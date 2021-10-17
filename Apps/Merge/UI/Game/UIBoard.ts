import CameraUtil from "../../../../Common/Camera/CameraUtil";
import Debug from "../../../../Common/Debug";
import LayOutRelation from "../../../../Common/UIKit/LayOut/LayOutRelation";
import LayOutScale from "../../../../Common/UIKit/LayOut/LayOutScale";
import LayOutSize from "../../../../Common/UIKit/LayOut/LayOutSize";
import { Align, ScaleType, SizeType } from "../../../../Common/UIKit/LayOut/LayOutUtil";
import UISprite from "../../../../Common/UIKit/UIImage/UISprite";
import UI from "../../../../Common/UIKit/ViewController/UI";
import UIView from "../../../../Common/UIKit/ViewController/UIView";
import UIView3D from "../../../../Common/UIKit/ViewController/UIView3D";
import GameData from "../../Data/GameData";
import UIDeadLine from "./UIDeadLine";
import UIMergeItem from "./UIMergeItem";


export default class UIBoard extends UIView3D {

    uiLeft: UISprite;
    uiRight: UISprite;
    uiBottom: UISprite;
    uiDeadLine: UISprite;
    uiGuide: UISprite;

    // 新生成的对象位置
    posItem: Laya.Vector3;
    onAwake() {
        super.onAwake();
        // return;
        var size = CameraUtil.main.GetWorldSize(this.mainCam);

        {
            this.uiDeadLine = UI.CreateUI3D(UISprite, this, "deadline"); //GameBg
            this.uiDeadLine.transform.localPosition = new Laya.Vector3(0, 0, 0);
            this.uiDeadLine.addComponent(UIDeadLine);
            {
                // this.uiDeadLine.height = 0.1;
                // var ly: LayOutSize = this.uiDeadLine.node.addComponent(LayOutSize);
                // ly.typeX = SizeType.CONTENT;
                // ly.typeY = SizeType.CONTENT;
            }
            {
                var ly2: LayOutRelation = this.uiDeadLine.node.addComponent(LayOutRelation);
                ly2.alignX = Align.CENTER;
                ly2.alignY = Align.UP;
                ly2.offsetY = size.y / 6;
            }
            {
                let ly = this.uiDeadLine.addComponent(LayOutScale);
                ly.type = ScaleType.MIN;
                this.uiDeadLine.name = "UIDeadLine";

            }

            var collider: Laya.PhysicsCollider = this.uiDeadLine.node.addComponent(Laya.PhysicsCollider);
            collider.isTrigger = true;
        }
        // left 
        {
            this.uiLeft = UI.CreateUI3D(UISprite, this, ""); //GameBg
            this.uiLeft.transform.localPosition = new Laya.Vector3(0, 0, 0);
            {
                this.uiLeft.width = 0.1;
                var ly: LayOutSize = this.uiLeft.node.addComponent(LayOutSize);
                ly.typeX = SizeType.CONTENT;
                ly.typeY = SizeType.PARENT;
            }
            {
                var ly2: LayOutRelation = this.uiLeft.node.addComponent(LayOutRelation);
                ly2.alignX = Align.LEFT;
                ly2.alignY = Align.CENTER;
            }

            var collider: Laya.PhysicsCollider = this.uiLeft.node.addComponent(Laya.PhysicsCollider);
        }


        // right 
        {
            this.uiRight = UI.CreateUI3D(UISprite, this, ""); //GameBg
            this.uiRight.transform.localPosition = new Laya.Vector3(0, 0, 0);
            {
                this.uiRight.width = 0.1;
                var ly: LayOutSize = this.uiRight.node.addComponent(LayOutSize);
                ly.typeX = SizeType.CONTENT;
                ly.typeY = SizeType.PARENT;
            }
            {
                var ly2: LayOutRelation = this.uiRight.node.addComponent(LayOutRelation);
                ly2.alignX = Align.RIGHT;
                ly2.alignY = Align.CENTER;
            }
            var collider: Laya.PhysicsCollider = this.uiRight.node.addComponent(Laya.PhysicsCollider);
        }


        // bottom 
        {
            this.uiBottom = UI.CreateUI3D(UISprite, this, "BottomBoard"); //GameBg
            this.uiBottom.transform.localPosition = new Laya.Vector3(0, 0, 0);
            {
                // this.uiBottom.height = 0.05;
                // var ly: LayOutSize = this.uiBottom.node.addComponent(LayOutSize);
                // ly.typeX = SizeType.CONTENT;
                // ly.typeY = SizeType.CONTENT;
            }
            var lyRelation: LayOutRelation = null;
            {
                lyRelation = this.uiBottom.node.addComponent(LayOutRelation);
                lyRelation.alignX = Align.CENTER;
                lyRelation.alignY = Align.DOWN;
                lyRelation.enableOffsetAdBanner = true;
            }

            let ly11 = this.uiBottom.addComponent(LayOutScale);
            ly11.type = ScaleType.MIN;
            this.uiBottom.name = "uiBottom";

            var collider: Laya.PhysicsCollider = this.uiBottom.node.addComponent(Laya.PhysicsCollider);

            // Laya.timer.once(1000, this, function (): void {

            //     Debug.Log("LayOutRelation this.uiBottom w="+this.uiBottom.width+" uiBottom.height="+this.uiBottom.height);

            //     var shape: Laya.BoxColliderShape = new Laya.BoxColliderShape(20, this.uiBottom.height, 1);
            //     collider.colliderShape = shape;
            //     lyRelation.LayOut();
            // });
        }


        {
            this.uiGuide = UI.CreateUI3D(UISprite, this, "GuideLine"); //GameBg
            this.uiGuide.transform.localPosition = new Laya.Vector3(0, 0, 0);


        }

    }
    onStart() {
        super.onStart();
        this.LayOut();
    }

    // onUpdate()
    // {
    //     this.LayOut();
    // }
    LayOut() {
        super.LayOut();
        this.uiBottom.LayOut();
        // return; 
        {
            var collider: Laya.PhysicsCollider = this.uiDeadLine.node.getComponent(Laya.PhysicsCollider);
            if (collider != null) {
                var shape: Laya.BoxColliderShape = new Laya.BoxColliderShape(this.uiDeadLine.width, this.uiDeadLine.height, 1);
                collider.colliderShape = shape;
            }
        }
        {
            var collider: Laya.PhysicsCollider = this.uiLeft.node.getComponent(Laya.PhysicsCollider);
            if (collider != null) {
                var shape: Laya.BoxColliderShape = new Laya.BoxColliderShape(this.uiLeft.width, this.uiLeft.height, 1);
                collider.colliderShape = shape;
            }
        }

        {
            var collider: Laya.PhysicsCollider = this.uiRight.node.getComponent(Laya.PhysicsCollider);
            if (collider != null) {
                var shape: Laya.BoxColliderShape = new Laya.BoxColliderShape(this.uiRight.width, this.uiRight.height, 1);
                collider.colliderShape = shape;
            }
        }

        {
            var collider: Laya.PhysicsCollider = this.uiBottom.node.getComponent(Laya.PhysicsCollider);
            if (collider != null) {

                // this.uiBottom.width
                var shape: Laya.BoxColliderShape = new Laya.BoxColliderShape(20, this.uiBottom.height, 1);
                collider.colliderShape = shape;
            }
        }

    }

    // pos 新生成的对象位置
    UpdateGuideLine(pos) {
        var x, y, h;
        this.posItem = pos;
        x = this.posItem.x;
        h = this.GetGuideLineHeight();
        y = this.posItem.y - h / 2;
        this.uiGuide.transform.localPosition = new Laya.Vector3(x, y, 0);
        var scale = h / this.uiGuide.height;
        this.uiGuide.transform.localScale = new Laya.Vector3(1, scale, 1);
        this.ShowGuideLine(true);
    }
    ShowGuideLine(isShow) {
        this.uiGuide.visible = isShow;
    }


    GetGuideLineHeight() {

        var listItem = GameData.main.game.listItem;
        var x, y, w, h;
        // 查找直线下最顶部的item
        var ybottom = -CameraUtil.main.GetWorldSize(this.mainCam).y / 2 + this.uiBottom.GetBoundSize().height;
        var yTopItem = ybottom;
        for (var i = 0; i < listItem.length; i++) {
            var ui = listItem[i] as UIMergeItem;
            if (ui.isNew) {
                continue;
            }
            var pt = ui.transform.localPosition;
            var size = ui.GetBoundSize();// * ui.transform.localScale.x;
            // w = 5.12f * ui.transform.localScale.x;
            w = size.width;
            if (((pt.x - w / 2) < this.posItem.x) && (this.posItem.x <= (pt.x + w / 2))) {
                if ((pt.y + size.height / 2) > yTopItem) {
                    yTopItem = pt.y + size.height / 2;
                    Debug.Log("UIGuideLine new yTopItem=" + yTopItem);
                }
            }
            else {
                Debug.Log("UIGuideLine i=" + i + "  pt=" + pt + " size=" + size + " posItem.x=" + this.posItem.x);
            }

        }

        // if (yTopItem == ybottom) {
        //     yTopItem = 0;
        // }

        Debug.Log("UIGuideLine yTopItem=" + yTopItem);


        // RectTransform rctran = this.GetComponent<RectTransform>();
        // w = rctran.rect.width;
        h = Math.abs(this.posItem.y - yTopItem);
        // rctran.sizeDelta = new Vector2(w, h);

        // Vector3 pos = this.transform.position;
        // pos.x = posItem.x;
        // pos.y = posItem.y - h / 2;
        // this.transform.position = pos;

        return h;
    }
}


