
import AdKitCommon from "../../AdKit/AdKitCommon";
import Debug from "../../Debug";
import LayOutBase from "./LayOutBase";
import LayOutUtil, { RelationType, Align } from "./LayOutUtil";



export default class LayOutRelation extends LayOutBase {


    // @prop 在基类定义
    /** @prop {name:enableLayout,type:Bool}*/
    /** @prop {name:enableHide,type:Bool}*/
    /** @prop {name:enableLandscape,type:Bool}*/
    /** @prop {name:enableOffsetAdBanner,type:Bool}*/
    /** @prop {name:isOnlyForPortrait,type:Bool}*/
    /** @prop {name:isOnlyForLandscape,type:Bool}*/




    /** @prop {name:offsetX,type:Number}*/
    /** @prop {name:offsetY,type:Number}*/
    // @prop 在基类定义


    /** @prop {name:alignX,type:Option,option:"None,LEFT,RIGHT,CENTER,SAMEPOSTION", default:"CENTER"}*/
    alignX: Align = Align.CENTER;
    /** @prop {name:alignY,type:Option,option:"None,UP,DOWN,CENTER,SAMEPOSTION", default:"CENTER"}*/
    alignY: Align = Align.CENTER;

    // type: RelationType = RelationType.PARENT;

    /** @prop {name:typeX,type:Option,option:"None,PARENT,TARGET,BETWEEN_SIDE_TARGET,BETWEEN_TWO_TARGET", default:"PARENT"}*/
    typeX: RelationType = RelationType.PARENT;
    /** @prop {name:typeY,type:Option,option:"None,PARENT,TARGET,BETWEEN_SIDE_TARGET,BETWEEN_TWO_TARGET", default:"PARENT"}*/
    typeY: RelationType = RelationType.PARENT;


    /** @prop {name:targetX,type:Node}*/
    targetX: Laya.Node;
    /** @prop {name:targetY,type:Node}*/
    targetY: Laya.Node;

    /** @prop {name:targetX2,type:Node}*/
    targetX2: Laya.Node;
    /** @prop {name:targetY2,type:Node}*/
    targetY2: Laya.Node;


    onAwake() {
        super.onAwake();
        this.LayOut();
    }

    onStart() {
        super.onStart();
        this.LayOut();
    }
    LayOut() {
        if (!this.Enable()) {
            return;
        }
        super.LayOut();

        // this.LayOutXY();
        this.LayOutX();
        this.LayOutY();

        var x, y, w, h;

        var pt = this.GetPosition(this.node);// UI.GetNodePosition(this.owner);
        x = pt.x;
        y = pt.y;

        if (this.enableOffsetAdBanner) {
            if (this.isSprite) {
                y += AdKitCommon.main.heightWorldAdBanner;
            } else {
                y -= AdKitCommon.main.heightCanvasAdBanner;
                Debug.Log("LayOutRelation AdKitCommon.main.heightCanvasAdBanner=" + AdKitCommon.main.heightCanvasAdBanner);
            }
        }


        pt.x = x;
        pt.y = y;
        // UI.SetNodePosition(this.owner, x, y);
        this.SetPosition(this.node, pt);
    }

    // LayOutXY() {
    //     if (!this.Enable()) {
    //         return;
    //     }
    //     if(this.isSprite)
    //     {
    //         return;
    //     }

    //     var x, y, w, h;
    //     if (this.type == RelationType.None) {
    //         return;
    //     }
    //     if (this.align == Align.None) {
    //         return;
    //     }

    //     var pt = this.GetPosition(this.node);//var pt = UI.GetNodePosition(this.owner);
    //     x = pt.x;
    //     y = pt.y;

    //     var size = this.GetSize();
    //     var sizeParent = this.GetSizeParent(); 
    //     w = size.width;
    //     h = size.height;

    //     var w_parent = sizeParent.width;
    //     var h_parent = sizeParent.height;
    //     // this.align = Align.RIGHT;
    //     // x = w_parent - w;

    //     var pivotX = this.GetPivotX(this.owner);//*UI.GetScaleX(this.owner);
    //     var pivotY = this.GetPivotY(this.owner);
    //     // Debug.Log("LayOutRelation this.align=" + this.align + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX);
    //     switch (this.type) {
    //         case RelationType.PARENT:
    //             {

    //                 if (this.align == Align.LEFT) {
    //                     x = this.offsetX;
    //                     x += pivotX;
    //                 }
    //                 if (this.align == Align.RIGHT) {
    //                     x = w_parent - w - this.offsetX;
    //                     x += pivotX;
    //                 }
    //                 if (this.align == Align.UP) {
    //                     // Debug.Log("Align.UP this.type=" + this.type + " w_parent=" + w_parent + " h_parent=" + h_parent + " h=" + h);
    //                     y = this.offsetY;
    //                     y += pivotY;
    //                 }
    //                 if (this.align == Align.DOWN) {
    //                     y = h_parent - h - this.offsetY;
    //                     y += pivotY;
    //                 }
    //                 if (this.align == Align.DOWNLEFT) {
    //                     x = this.offsetX;
    //                     y = h_parent - h - this.offsetY;
    //                     x += pivotX;
    //                     y += pivotY;
    //                 }
    //                 if (this.align == Align.DOWNRIGHT) {
    //                     x = w_parent - w - this.offsetX;
    //                     y = h_parent - h - this.offsetY;
    //                     x += pivotX;
    //                     y += pivotY;
    //                 }
    //                 if (this.align == Align.UPLEFT) {
    //                     x = this.offsetX;
    //                     y = this.offsetY;
    //                     x += pivotX;
    //                     y += pivotY;
    //                 }
    //                 if (this.align == Align.UPRIGHT) {
    //                     x = w_parent - w - this.offsetX;
    //                     y = this.offsetY;
    //                     x += pivotX;
    //                     y += pivotY;
    //                 }
    //                 if (this.align == Align.CENTER) {
    //                     // size =  UI.GetNodeContentSize(this.owner);
    //                     // sizeParent = UI.GetNodeContentSize(this.owner.parent);
    //                     w = size.width;
    //                     h = size.height;
    //                     w_parent = sizeParent.width;
    //                     h_parent = sizeParent.height;

    //                     x = w_parent / 2 - w / 2 + this.offsetX;
    //                     y = h_parent / 2 - h / 2 + this.offsetY;
    //                     x += pivotX;
    //                     y += pivotY;
    //                     // Debug.Log("LayOutRelation CENTER=" + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX + " name=" + this.owner.name);

    //                 }
    //                 if (this.align == Align.CENTERX) {
    //                     // size = UI.GetNodeContentSize(this.owner);
    //                     // sizeParent = UI.GetNodeContentSize(this.owner.parent);
    //                     w = size.width;
    //                     h = size.height;
    //                     w_parent = sizeParent.width;
    //                     h_parent = sizeParent.height;

    //                     x = w_parent / 2 - w / 2 + this.offsetX;
    //                     x += pivotX;

    //                     // Debug.Log("LayOutRelation CENTER=" + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX + " name=" + this.owner.name);

    //                 }


    //                 if (this.align == Align.CENTERY) {
    //                     // size = UI.GetNodeContentSize(this.owner);
    //                     // sizeParent = UI.GetNodeContentSize(this.owner.parent);
    //                     w = size.width;
    //                     h = size.height;
    //                     w_parent = sizeParent.width;
    //                     h_parent = sizeParent.height;

    //                     y = h_parent / 2 - h / 2 + this.offsetY;
    //                     y += pivotY;
    //                     // Debug.Log("LayOutRelation CENTER=" + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX + " name=" + this.owner.name);

    //                 }


    //             }
    //             break;
    //         case RelationType.TARGET:
    //             {
    //                 if (this.target == null) {
    //                     break;
    //                 }
    //                 var sizeTarget = this.GetBoundSize(this.target);
    //                 if (sizeTarget == null) {
    //                     break;
    //                 }
    //                 var ptTarget = this.GetPosition(this.target);//var ptTarget = UI.GetNodePosition(this.target);
    //                 // 位于target的左边
    //                 if (this.align == Align.LEFT) {
    //                     x = ptTarget.x - w - this.offsetX;
    //                     x += pivotX;
    //                 }
    //                 if (this.align == Align.RIGHT) {
    //                     x = ptTarget.x + sizeTarget.width + this.offsetX;
    //                     x += pivotX;
    //                 }
    //                 if (this.align == Align.UP) {
    //                     y = ptTarget.y - h - this.offsetY;
    //                     y += pivotY;
    //                 }
    //                 if (this.align == Align.DOWN) {
    //                     y = ptTarget.y + sizeTarget.height + this.offsetY;
    //                     y += pivotY;
    //                 }

    //                 //相同位置
    //                 if (this.align == Align.SAMEPOSTION) {
    //                     x = ptTarget.x;
    //                     y = ptTarget.y;
    //                     x += pivotX;
    //                     y += pivotY;
    //                 }

    //             }
    //             break;



    //     }


    //     // UI.SetNodePosition(this.owner, x, y);
    //     pt.x = x;
    //     pt.y = y;
    //     this.SetPosition(this.node,pt);
    // }

    LayOutX() {
        if (!this.Enable()) {
            return;
        }
        var x, y, w, h;
        if (this.typeX == RelationType.None) {
            return;
        }
        if (this.alignX == Align.None) {
            return;
        }
        var pt = this.GetPosition(this.node);//var pt = UI.GetNodePosition(this.owner);
        x = pt.x;
        y = pt.y;

        // var rctran = this.node.getComponent(cc.RectTransform);
        var size = this.GetSize();
        var sizeParent = this.GetSizeParent();
        w = size.width;
        h = size.height;

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        // this.align = Align.RIGHT;
        // x = w_parent - w;

        var pivotX = this.GetPivotX(this.owner);//*UI.GetScaleX(this.owner);
        var pivotY = this.GetPivotY(this.owner);
        // Debug.Log("LayOutRelation this.align=" + this.align + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX);
        switch (this.typeX) {
            case RelationType.PARENT:
                {

                    if (this.alignX == Align.LEFT) {
                        x = this.offsetX;
                        x += pivotX;
                        if (this.isSprite) {
                            x = -w_parent / 2 + this.offsetX;
                        }
                    }
                    if (this.alignX == Align.RIGHT) {
                        x = w_parent - w - this.offsetX;
                        x += pivotX;
                        if (this.isSprite) {
                            x = w_parent / 2 - this.offsetX;
                        }
                    }



                    if ((this.alignX == Align.CENTER) || (this.alignX == Align.CENTERX)) {
                        // size = UI.GetNodeContentSize(this.owner);
                        // sizeParent = UI.GetNodeContentSize(this.owner.parent);
                        w = size.width;
                        h = size.height;
                        w_parent = sizeParent.width;
                        h_parent = sizeParent.height;

                        x = w_parent / 2 - w / 2 + this.offsetX;
                        x += pivotX;
                        if (this.isSprite) {
                            x = this.offsetX;
                        }
                        Debug.Log("LayOutRelation CENTER name=" + this.node.name + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX + " name=" + this.owner.name);

                    }




                }
                break;
            case RelationType.TARGET:
                {
                    if (this.targetX == null) {
                        break;
                    }
                    var sizeTarget = this.GetBoundSize(this.targetX);
                    if (sizeTarget == null) {
                        break;
                    }
                    // var ptTarget = UI.GetNodePosition(this.targetX);
                    var ptTarget = this.GetPosition(this.targetX);//
                    // 位于target的左边
                    if (this.alignX == Align.LEFT) {
                        x = ptTarget.x - w - this.offsetX;
                        x += pivotX;
                    }
                    if (this.alignX == Align.RIGHT) {
                        x = ptTarget.x + sizeTarget.width + this.offsetX;
                        x += pivotX;
                    }


                    //相同位置
                    if (this.alignX == Align.SAMEPOSTION) {
                        x = ptTarget.x;
                        x += pivotX;
                    }

                }
                break;
            case RelationType.BETWEEN_SIDE_TARGET:
                {
                    if (this.targetX == null) {
                        break;
                    }
                    var sizeTarget = this.GetBoundSize(this.targetX);
                    if (sizeTarget == null) {
                        break;
                    }
                    // var ptTarget = UI.GetNodePosition(this.targetX);
                    var ptTarget = this.GetPosition(this.targetX);//

                    // 左边界
                    if (this.alignX == Align.LEFT) {
                        x = LayOutUtil.main.GetBetweenScreenCenter(this.targetX as Laya.Sprite, this.alignX) - w / 2 + this.offsetX;
                        x += pivotX;

                    }
                    // 右边界
                    if (this.alignX == Align.RIGHT) {
                        x = LayOutUtil.main.GetBetweenScreenCenter(this.targetX as Laya.Sprite, this.alignX) - w / 2 + this.offsetX;
                        x += pivotX;

                    }
                }
                break;

            case RelationType.BETWEEN_TWO_TARGET:
                {
                    if (this.targetX == null) {
                        break;
                    }
                    var sizeTarget = this.GetBoundSize(this.targetX);
                    if (sizeTarget == null) {
                        break;
                    }
                    // var ptTarget = UI.GetNodePosition(this.targetX);
                    var ptTarget = this.GetPosition(this.targetX);//

                    x = LayOutUtil.main.GetBetweenCenterX(this.targetX as Laya.Sprite, this.targetX2 as Laya.Sprite) - w / 2 + this.offsetX;
                    x += pivotX;
                }
                break;
        }

        // if (this.enableOffsetAdBanner) {
        //     y -= AdKitCommon.main.heightCanvasAdBanner;
        // }

        // UI.SetNodePosition(this.owner, x, y);
        pt.x = x;
        pt.y = y;
        Debug.Log("LayOutRelation LayOutX CENTER name=" + this.node.name + " x=" + x + " y=" + y);
        this.SetPosition(this.node, pt);
    }

    LayOutY() {
        if (!this.Enable()) {
            return;
        }
        var x, y, w, h;
        if (this.typeY == RelationType.None) {
            return;
        }
        if (this.alignY == Align.None) {
            return;
        }
        var pt = this.GetPosition(this.node);//var pt = UI.GetNodePosition(this.owner);
        x = pt.x;
        y = pt.y;

        // var rctran = this.node.getComponent(cc.RectTransform);
        var size = this.GetSize();
        var sizeParent = this.GetSizeParent();
        w = size.width;
        h = size.height;

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        // this.align = Align.RIGHT;
        // x = w_parent - w;

        var pivotX = this.GetPivotX(this.owner);//*UI.GetScaleX(this.owner);
        var pivotY = this.GetPivotY(this.owner);
        Debug.Log("LayOutRelation this.alignY=" + this.alignY + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " x=" + x + " pivotX=" + pivotX);


        switch (this.typeY) {
            case RelationType.PARENT:
                {


                    if (this.alignY == Align.UP) {
                        // Debug.Log("Align.UP this.type=" + this.type + " w_parent=" + w_parent + " h_parent=" + h_parent + " h=" + h);
                        y = this.offsetY;
                        y += pivotY;
                        if (this.isSprite) {
                            y = h_parent / 2 - h - this.offsetY;
                        }
                    }
                    if (this.alignY == Align.DOWN) {
                        y = h_parent - h - this.offsetY;
                        y += pivotY;
                        if (this.isSprite) {
                            y = -h_parent / 2 + h + this.offsetY;
                        }
                    }



                    if ((this.alignY == Align.CENTER) || (this.alignY == Align.CENTERY)) {
                        // size = UI.GetNodeContentSize(this.owner);
                        // sizeParent = UI.GetNodeContentSize(this.owner.parent);
                        w = size.width;
                        h = size.height;
                        w_parent = sizeParent.width;
                        h_parent = sizeParent.height;

                        y = h_parent / 2 - h / 2 + this.offsetY;
                        y += pivotY;
                        if (this.enableOffsetAdBanner) {
                           
                            if (this.isSprite) {
                                y += AdKitCommon.main.heightWorldAdBanner/2;
                            }else{
                                y -= AdKitCommon.main.heightCanvasAdBanner/2;
                            }
                        }

                        if (this.isSprite) {
                            y = this.offsetY;
                        }

                      
                        Debug.Log("LayOutRelation alignY CENTER=" + " w_parent=" + w_parent + " h_parent=" + h_parent + " h=" + h + " y=" + y + " pivotY=" + pivotY + " name=" + this.owner.name);

                    }
                    if (this.isSprite) {
                        Debug.Log("LayOutRelation isSprite this.alignY=" + this.alignY + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w + " H=" + h + " Y=" + y);
                    }

                }
                break;
            case RelationType.TARGET:
                {
                    if (this.targetY == null) {
                        break;
                    }
                    var sizeTarget = this.GetBoundSize(this.targetY);
                    if (sizeTarget == null) {
                        break;
                    }
                    // var ptTarget = UI.GetNodePosition(this.targetY);
                    var ptTarget = this.GetPosition(this.targetY);//
                    if (this.alignY == Align.UP) {
                        y = ptTarget.y - h - this.offsetY;
                        y += pivotY;
                    }
                    if (this.alignY == Align.DOWN) {
                        y = ptTarget.y + sizeTarget.height + this.offsetY;
                        y += pivotY;
                    }

                    //相同位置
                    if (this.alignY == Align.SAMEPOSTION) {
                        y = ptTarget.y;
                        y += pivotY;
                    }

                }
                break;


            case RelationType.BETWEEN_SIDE_TARGET:
                {
                    if (this.targetY == null) {
                        break;
                    }
                    var sizeTarget = this.GetBoundSize(this.targetY);
                    if (sizeTarget == null) {
                        break;
                    }
                    // var ptTarget = UI.GetNodePosition(this.targetY);
                    var ptTarget = this.GetPosition(this.targetY);//

                    // 上边界
                    if (this.alignY == Align.UP) {
                        y = LayOutUtil.main.GetBetweenScreenCenter(this.targetY as Laya.Sprite, this.alignY) - h / 2 + this.offsetY;
                        y += pivotY;

                    }

                    // 下边界
                    if (this.alignY == Align.DOWN) {
                        y = LayOutUtil.main.GetBetweenScreenCenter(this.targetY as Laya.Sprite, this.alignY, this.enableOffsetAdBanner) - h / 2 + this.offsetY;
                        y += pivotY;
                    }
                }
                break;

            case RelationType.BETWEEN_TWO_TARGET:
                {
                    if (this.targetY == null) {
                        break;
                    }
                    var sizeTarget = this.GetBoundSize(this.targetY);
                    if (sizeTarget == null) {
                        break;
                    }
                    // var ptTarget = UI.GetNodePosition(this.targetY);
                    var ptTarget = this.GetPosition(this.targetY);//

                    y = LayOutUtil.main.GetBetweenCenterY(this.targetY as Laya.Sprite, this.targetY2 as Laya.Sprite) - h / 2 + this.offsetY;
                    y += pivotY;
                }
                break;


        }

        // if (this.enableOffsetAdBanner) {
        //     y -= AdKitCommon.main.heightCanvasAdBanner;
        // }

        // UI.SetNodePosition(this.owner, x, y);
        pt.x = x;
        pt.y = y;
        Debug.Log("LayOutRelation LayOutY CENTER name=" + this.node.name + " x=" + x + " y=" + y);
        this.SetPosition(this.node, pt);
    }


}
