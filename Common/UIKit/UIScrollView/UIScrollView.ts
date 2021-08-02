import { ui } from "../../../../ui/layaMaxUI";
import ImageRes from "../../Config/ImageRes";
import Debug from "../../Debug";
import ItemInfo from "../../ItemInfo";
import Language from "../../Language/Language";
import AnimateButton from "../UIButton/AnimateButton";
import UIImage from "../UIImage/UIImage";
import UITouchEvent from "../UITouchEvent";
import UI from "../ViewController/UI";
import UIView from "../ViewController/UIView"; 
import IUIScrollView from "./IUIScrollView";
import ScrollView from "./ScrollView";
import { ScrollViewDirection } from "./ScrollViewUtil";




export default class UIScrollView extends UIView {
 
    content: Laya.View;

    /** @prop {name:direction,type:Option,option:"Horizontal,Vertical", default:"Vertical"}*/
    direction = ScrollViewDirection.Vertical;

    public listItem: any[] = [];

    mask: Laya.Sprite;

    delegate:IUIScrollView;

    // 鼠标按下
    private _mouseDown: boolean = false;
    // 鼠标移动速度
    private _mouseSpeed: number = 0;
    private _mouseStartPosX: number = 0;
    private _mouseStartPosY: number = 0;
    private _mouseX: number = 0;
    private _mouseY: number = 0;
    private _curMoveFrame: number = 0;

    isScroll = false;

    private isShowMoveAnimate: boolean = false;

    // 单元格渲染处理器 
    private _renderHandler: Laya.Handler;
    /**
  * 设置单元格渲染处理器,返回(cell:any, index:number)
  */
    public set renderHandler(hander: Laya.Handler) {
        this._renderHandler = hander;
    }


    private _itemRender: any;
    public set itemRender(itemRender: any) {
        this._itemRender = itemRender;
    }

    Reload() {


    }
    Init() {
        if (this.content != null) {
            return;
        }
        this.content = this.owner.getChildByName("Content") as Laya.View;
        var ui = this.content.addComponent(UIView);
        // ui.controller = this.controller;
    }



    onAwake() {
        super.onAwake();

        this.Init();

        var size = UI.GetNodeContentSize(this.owner);
        //创建遮罩对象 
        this.mask = new Laya.Sprite();
        //画一个圆形的遮罩区域
        // tMask.graphics.drawCircle(0, 0, 80, "#ff0000");
        // tMask.pos(0, 80);


        // this.mask.graphics.drawRect(0, 0, size.width,size.height, "#ff0000");
        // this.mask.pos(256, 256);
        //设置遮罩
        // this.content.mask = this.mask;

        //设置遮罩
        var view = this.owner as Laya.View;
        view.mask = this.mask;


        this.LayOut();
    }

    onStart() {
        // [3]
        super.onStart();
        this.LayOut();
    }
    onUpdate() {
        if (!this.visible) {
            return;
        }


        if (this.isShowMoveAnimate) {
            this.UpdateScrollViewPosMouseUp();
        }
        // if (!this._mouseDown && this._mouseSpeed != 0) {
        //     var direction = Math.abs(this._mouseSpeed) / this._mouseSpeed;
        //     var absSpeed = Math.sqrt(Math.abs(this._mouseSpeed));
        //     var moveDis = this._mouseSpeed;
        //     this.UpdateScrollViewPos(moveDis);
        //     // this.updateScale();
        //     absSpeed = absSpeed - 0.3;
        //     if (absSpeed < 1) {
        //         absSpeed = 0;
        //         this._mouseSpeed = 0;
        //         // 居中显示 
        //         // this.centeringControl();
        //     } else {
        //         this._mouseSpeed = absSpeed * absSpeed * direction;
        //     }
        // }

    }

    LayOut() {
        super.LayOut();
        // image 和uiimage同步大小
        var size = UI.GetNodeContentSize(this.owner);


        this.mask.graphics.drawRect(0, 0, size.width, size.height, "#ff0000");
        this.mask.pos(0, 0);

        if (this.isPivotCenter) {
            UI.SetNodePivotCenter(this.owner);
        }



        if (this.direction == ScrollViewDirection.Horizontal) {
            this.content.width = this.GetChildItemWidth(this.content.numChildren);
            this.content.height = size.height;
        }
        if (this.direction == ScrollViewDirection.Vertical) {
            this.content.width = size.width;
            this.content.height = this.GetChildItemHeight(this.content.numChildren);
        }


        var x, y;

        for (var i = 0; i < this.content.numChildren; i++) {
            var child = this.content.getChildAt(i);
            var pos = UI.GetNodePosition(child);
            x = pos.x;
            y = pos.y;
            if (this.direction == ScrollViewDirection.Vertical) {
                y = this.GetChildItemY(i);
            } else {
                x = this.GetChildItemX(i);
            }
            UI.SetNodePosition(child, x, y);
        }
        
      

    }

    Add(child: UIView) {
        this.Init();
        var node = child.node;
        this.content.addChild(node);

        // var ev = node.addComponent(UITouchEvent);
        // ev.callBackTouch = this.OnUITouchEvent.bind(this);
        // node.on(Laya.Event.CLICK, this, this.onCellMouse);
        // node.on(Laya.Event.RIGHT_CLICK, this, this.onCellMouse);
        // node.on(Laya.Event.MOUSE_OVER, this, this.onCellMouse);
        // node.on(Laya.Event.MOUSE_OUT, this, this.onCellMouse);
        // node.on(Laya.Event.MOUSE_DOWN, this, this.onCellMouse);
        // node.on(Laya.Event.MOUSE_UP, this, this.onCellMouse);


        var animateButton = node.addComponent(AnimateButton);
        animateButton.SetClick(this, this.OnClickItem.bind(this));

        this.LayOut();
    }

    OnClickItem(btn:AnimateButton) {
        Debug.Log("UIScrollView OnClickItem  name=" + btn.owner.name);
        var uiview = btn.owner.getComponent(UIView); 
        if (uiview!=null) {
            Debug.Log("UIScrollView OnClickItem name=" + btn.owner.name + " index=" + uiview.index);
            if(!this.isScroll)
            {
                if(this.delegate!=null)
                {
                    this.delegate.OnScrollViewDidClickItem(this,uiview);
                }
            }
        }
    }

    OnUITouchEvent(ui: UITouchEvent, status: number) {
        switch (status) {

            case UITouchEvent.TOUCH_DOWN:
                {
                    var uiview = ui.owner.getComponent(UIView);
                    // Debug.Log("UIScrollView OnUITouchEvent TOUCH_DOWN name=" + ui.owner.name);
                    if (uiview!=null) {
                        Debug.Log("UIScrollView OnUITouchEvent TOUCH_DOWN name=" + ui.owner.name + " index=" + uiview.index);
                    }
                }
                break;
            case UITouchEvent.TOUCH_MOVE:
                {
                    var uiview = ui.owner.getComponent(UIView);
                    if (uiview!=null) {
                        Debug.Log("UIScrollView OnUITouchEvent TOUCH_MOVE name=" + ui.owner.name + " index=" + uiview.index);
                    }
                }

                break;
            case UITouchEvent.TOUCH_UP:
                {
                    var uiview = ui.owner.getComponent(UIView);
                    if (uiview!=null) {
                        Debug.Log("UIScrollView OnUITouchEvent TOUCH_UP name=" + ui.owner.name + " index=" + uiview.index);
                    }
                }
                break;
        }
    }


    protected onCellMouse(e: Event): void {
        // var cell = e.target.;
        if (e.type === Laya.Event.MOUSE_DOWN) {
            Debug.Log("UIScrollView onCellMouse MOUSE_DOWN name=");
        }
        if (e.type === Laya.Event.MOUSE_MOVE) {
            Debug.Log("UIScrollView onCellMouse MOUSE_MOVE");
        }

        if (e.type === Laya.Event.MOUSE_UP) {
            Debug.Log("UIScrollView onCellMouse MOUSE_UP");
        }

        //  this._isMoved = false;
        // var cell = (<Box>e.currentTarget);
        // var index = this._startIndex + this._cells.indexOf(cell);
        // if (index < 0) return;
        // if (e.type === Laya.Event.CLICK || e.type === Laya.Event.RIGHT_CLICK) {
        // 	if (this.selectEnable && !this._isMoved) this.selectedIndex = index;
        // 	else this.changeCellState(cell, true, 0);
        // } else if ((e.type === Laya.Event.MOUSE_OVER || e.type === Laya.Event.MOUSE_OUT) && this._selectedIndex !== index) {
        // 	this.changeCellState(cell, e.type === Laya.Event.MOUSE_OVER, 0);
        // }
        // this.mouseHandler && this.mouseHandler.runWith([e, index]);
    }

    GetChildItemWidth(i: number) {
        var child = this.content.getChildAt(i);
        return UI.GetNodeWidth(child);
    }
    GetChildItemHeight(i: number) {
        var child = this.content.getChildAt(i);
        return UI.GetNodeHeight(child);
    }


    //不包含endIndex
    GetChildItemTotalWidth(endIndex: number) {
        var ret = 0;
        for (var i = 0; i < endIndex; i++) {
            ret += this.GetChildItemWidth(i);
        }
        return ret;
    }

    //不包含endIndex
    GetChildItemTotalHeight(endIndex: number) {
        var ret = 0;
        for (var i = 0; i < endIndex; i++) {
            ret += this.GetChildItemHeight(i);
        }
        return ret;
    }

    GetChildItemX(i: number) {
        var child = this.content.getChildAt(i);
        var pivot = UI.GetPivotX(child);
        var w = this.GetChildItemTotalWidth(i);
        return w + pivot;
    }
    GetChildItemY(i: number) {
        var child = this.content.getChildAt(i);
        var pivot = UI.GetPivotY(child);
        var h = this.GetChildItemTotalHeight(i);
        return h + pivot;
    }


    UpdateContentSize(w, h) { 
        UIView.SetNodeContentSize(this.content, w, h); 
    }

    UpdateScrollViewPosMouseUp() {
        var size = UI.GetNodeContentSize(this.node);
        Debug.Log("UpdateScrollViewPosMouseUp endter _mouseDown=" + this._mouseDown);
        var height =Math.min(this.content.height,size.height);  
        var width =Math.min(this.content.width,size.width);  

        Debug.Log("UIScrollView this.content.height="+this.content.height+" size.height="+size.height);

        if (this.direction == ScrollViewDirection.Horizontal) {
            var posX: number = this.content.x;
            // this.content.pos(posX, this.content.y);
            if (posX > 0) {
                // posX = 0;
                var toPos = 0;
                // 滑到左边
                if (!this._mouseDown) {
                    // 左边反弹动画
                    Laya.Tween.to(this.content, { x: toPos }, 500, Laya.Ease.cubicOut);
                    this.isShowMoveAnimate = false;
                }
            }
            else if (posX < -this.content.width + size.width) {
               
                var toPos = -this.content.width + width;
                // 滑到右边
                if (!this._mouseDown) {
                    // 右边反弹动画
                    Laya.Tween.to(this.content, { x: toPos }, 500, Laya.Ease.cubicOut);
                    this.isShowMoveAnimate = false;
                }
            }
        }
        if (this.direction == ScrollViewDirection.Vertical) {
            var posY: number = this.content.y;
            // this.content.pos(this.content.x, posY);
            if (posY > 0) {
                // 滑到顶部
                var toPos = 0;
                if (!this._mouseDown) {
                    Laya.Tween.to(this.content, { y: toPos }, 500, Laya.Ease.cubicOut);
                    this.isShowMoveAnimate = false;
                }
            }
            else if (posY < -this.content.height + size.height) {
                // 滑到底部
                var toPos = -this.content.height + height;
                // Debug.Log("UIScrollView this.content.height="+this.content.height+" size.height="+size.height);
                if (!this._mouseDown) {
                    Laya.Tween.to(this.content, { y: toPos }, 500, Laya.Ease.cubicOut);
                    this.isShowMoveAnimate = false;
                }
            } else {

            }


        }

    }
    /**
     * 更新ScrollView位置 
     * @param dis 
     */
    private UpdateScrollViewPos(dis: number) {
        Debug.Log("UpdateScrollViewPos dis=" + dis);
        if(dis>5)
        {
            this.isScroll = true;
        }
        if (this.direction == ScrollViewDirection.Horizontal) {
            var posX: number = dis + this.content.x;
            this.content.pos(posX, this.content.y);
        }
        if (this.direction == ScrollViewDirection.Vertical) {
            var posY: number = dis + this.content.y;
            this.content.pos(this.content.x, posY);
        }
    }

    onMouseDown(e) {
        // console.log("按下");
        console.log("按下 " + this.owner.name + " mouseX=" + e.mouseX + " stageX=" + e.stageX + " stageY=" + e.stageY);

        this.isScroll = false;
        this.isShowMoveAnimate = false;
        if (this._mouseDown) {
            console.error("mouse had down");
        }
        this._mouseDown = true;


        if (this.direction == ScrollViewDirection.Horizontal) {
            this._mouseStartPosX = Laya.MouseManager.instance.mouseX;
            this._mouseX = Laya.MouseManager.instance.mouseX;
        }
        if (this.direction == ScrollViewDirection.Vertical) {
            this._mouseStartPosY = Laya.MouseManager.instance.mouseY;
            this._mouseY = Laya.MouseManager.instance.mouseY;
        }

    }
    onMouseMove(e) {
        console.log("移动");
        this.isShowMoveAnimate = false;
        if (this._mouseDown) {
            var dis = 0;
            if (this.direction == ScrollViewDirection.Horizontal) {
                dis = Laya.MouseManager.instance.mouseX - this._mouseX;
                this._mouseX = Laya.MouseManager.instance.mouseX;
            }

            if (this.direction == ScrollViewDirection.Vertical) {
                dis = Laya.MouseManager.instance.mouseY - this._mouseY;
                this._mouseY = Laya.MouseManager.instance.mouseY;
            }

            this.UpdateScrollViewPos(dis);
            // this.updateScale();

            this._curMoveFrame = Laya.timer.currFrame;
            this._mouseSpeed = dis;
        }

    }
    onMouseUp(e) {
        // console.log("抬起");
        console.log("抬起 " + this.owner.name);
        this.isShowMoveAnimate = true;
        if (!this._mouseDown) {
            return;
        }

        var stableFrame = Laya.timer.currFrame - this._curMoveFrame;
        // 滑动
        if (stableFrame > 2) {
            this._mouseSpeed = 0;
            // this.centeringControl();
        }
        this._mouseDown = false;

    }
    onClick(e) {
        //e.stopPropagation();//阻止事件冒泡/上报
        console.log("点击" + this.owner.name);
    }


    // PC 鼠标移出显示区域
    onMouseOut(e) {
        console.log("移出");
        this.isShowMoveAnimate = true;
        this._mouseDown = false;
        this.UpdateScrollViewPosMouseUp();
    }
    onMouseOver(e) {
        console.log("进入");
    }

}