 
import ImageRes from "../../Config/ImageRes";
import ItemInfo from "../../ItemInfo";
import Language from "../../Language/Language";
import UI from "../ViewController/UI";
import UIView from "../ViewController/UIView";
import ScrollView from "./ScrollView";
import { ScrollViewDirection } from "./ScrollViewUtil";




export default class UIScrollView2 extends UIView {


    /** @prop {name:direction,type:Option,option:"Horizontal,Vertical", default:"Vertical"}*/
    direction = ScrollViewDirection.Vertical;

    public listItem: any[] = [];
    private _mouseX: number = 0;
    private _mouseY: number = 0;


    public scrollView: ScrollView;

    private coinNumLab: Laya.Label;
    private priceLab: Laya.Label;
    private buyBtn: Laya.Button;
    private gameStartImg: Laya.Image;
    private coinImg: Laya.Image;

    // 商店角色图缩放大小。
    private itemMaxScale: number = 0.7;
    private itemMinScale: number = 0.4;

    // ScrollView操作 
    // 鼠标按下
    private _mouseDown: boolean = false;
    // 鼠标移动速度
    private _mouseSpeed: number = 0;
    private _mouseStartPosX: number = 0;
    private _mouseStartPosY: number = 0;

    private _curMoveFrame: number = 0;

    private forkMoveSpeed: number = 1;
    private forkGroup: Array<Laya.Sprite> = new Array<Laya.Sprite>();


    // 单元格渲染处理器 
    private _renderHandler: Laya.Handler;
    /**
  * 设置单元格渲染处理器,返回(cell:any, index:number)
  */
    public set renderHandler(hander: Laya.Handler) {
        this._renderHandler = hander;
        this.scrollView.renderHandler = this._renderHandler;
    }


    private _itemRender: any;
    public set itemRender(itemRender: any) {
        this._itemRender = itemRender;
        this.scrollView.itemRender = this._itemRender;
    }

    // // 商店界面按钮
    // shopBtns: Array<Laya.Button> =  [
    //     this.backBtn
    // ];

    constructor() {
        super();
        this.init();

    }



    /**
     * 初始化商店街面引用
     */
    private init() {
        // this.coinNumLab = this.coinBox.getChildByName("coinNumLab") as Laya.Label;
        // this.priceLab = this.purchaseBox.getChildByName("priceLab") as Laya.Label;
        // this.buyBtn = this.purchaseBox.getChildByName("buyBtn") as Laya.Button;
        // this.gameStartImg = this.purchaseBox.getChildByName("gameStartImg") as Laya.Image;
        // this.coinImg = this.purchaseBox.getChildByName("coinImg") as Laya.Image;

        // this.shopBtns.push(this.buyBtn);

        // for (var button of this.shopBtns) {
        //     let buttons: Array<string> = [button.name]
        //     button.clickHandler = new Laya.Handler(this, this.addButtonEvent, buttons);
        //     this.addMouseOverEvent(button);
        //     this.addMouseOutEvent(button);
        // }
    }

    Reload() {

        var array = [];
        for (var i = 0; i < this.listItem.length; i++) {
            var roleInfo = this.listItem[i];
            var skinStr: string = ImageRes.main.GetImage(roleInfo.skin);
            array.push({ role: { skin: skinStr } });
        }
        this.scrollView.array = array;
    }

    GetArray() {
       return this.scrollView.array;
    }


    onUpdate() {
        // if (!this.visible) {
        //     return;
        // }
        if (!this._mouseDown && this._mouseSpeed != 0) {
            var direction = Math.abs(this._mouseSpeed) / this._mouseSpeed;
            var absSpeed = Math.sqrt(Math.abs(this._mouseSpeed));
            var moveDis = this._mouseSpeed;
            this.updateScrollViewPos(moveDis);
            this.updateScale();
            absSpeed = absSpeed - 0.3;
            if (absSpeed < 1) {
                absSpeed = 0;
                this._mouseSpeed = 0;
                // 居中显示 
                this.centeringControl();
            } else {
                this._mouseSpeed = absSpeed * absSpeed * direction;
            }
        }
    }

    /**
     * 添加按钮点击事件
     * @param buttons 
     */
    private addButtonEvent(name: string) {

    }

    /**
     * 鼠标进入到按钮，按钮效果
     * @param button 
     */
    private addMouseOverEvent(button: Laya.Button) {
        button.on(Laya.Event.MOUSE_OVER, button, function () {
            button.scale(1.2, 1.2);
        });
    }

    /**
     * 鼠标离开到按钮，按钮效果
     * @param button 
     */
    private addMouseOutEvent(button: Laya.Button) {
        button.on(Laya.Event.MOUSE_OUT, button, function () {
            button.scale(1, 1);
        });
    }

    /**
     * 设置ScrollView信息
     */
    private setScrollView() {
        // this.scrollView = new ScrollView();
        // this.scrollViewContainer.addChild(this.scrollView);
        this.initScrollView();

        // var array = [];
        // for (var i = 0; i < this.listItem.length; i++) {
        //     var roleInfo: RoleInfo = this.listItem[i];
        //     var skinStr: string = ImageRes.main.GetImage(roleInfo.skin);
        //     array.push({ role: { skin: skinStr } });
        // }
        // this.scrollView.array = array;
        // this.scrollView.renderHandler = new Laya.Handler(this, this.onScrollRender);
        this.scrollView.mouseHandler = new Laya.Handler(this, this.onScrollMouse);
    }

    /**
     * 设置ScrollView属性
     */
    private initScrollView() {
        this.scrollView.leftAlign = 210;
        this.scrollView.rightAlign = 210;
        this.scrollView.space = 50;
        this.scrollView.cellWidth = 300;
        this.scrollView.cellHeight = 300;

        this.scrollView.height = 1280;
        this.scrollView.anchorY = 0.5;
        // this.scrollView.pos(0, 600);
        this.scrollView.pos(0, 0);
    }

    /**
     * ScrollView单元格渲染回调 
     * @param cell 
     * @param index 
     */
    private onScrollRender(cell: Laya.Box, index: number) {
        // if (index > this.listItem.length) {
        //     return;
        // }
        // var item: Item = cell as Item;
        // var data: any = this.scrollView.array[index];
        // var roleImg: Laya.Image = item.role;
        // var skinStr: string = data.role.skin;
        // roleImg.skin = skinStr;


    }

    /**
     * ScrollView鼠标操作响应
     * @param e 
     */
    private onScrollMouse(e: Event) {
        // 移动ScrollView时其中单元格缩放
        if (e.type == Laya.Event.MOUSE_DOWN) {
            this.mouseDown();
        } else if (e.type == Laya.Event.MOUSE_UP) {
            this.mouseUp();
        } else if (e.type == Laya.Event.MOUSE_MOVE) {
            this.mouseMove();
        }
    }

    /**
     * 鼠标按下响应事件
     */
    private mouseDown() {
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

    /**
     * 鼠标抬起响应事件
     */
    private mouseUp() {
        if (!this._mouseDown) {
            return;
        }

        var stableFrame = Laya.timer.currFrame - this._curMoveFrame;
        // 滑动
        if (stableFrame > 2) {
            this._mouseSpeed = 0;
            this.centeringControl();
        }
        this._mouseDown = false;
    }

    /**
     * 鼠标移动事件响应
     */
    private mouseMove() {
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

            this.updateScrollViewPos(dis);
            this.updateScale();

            this._curMoveFrame = Laya.timer.currFrame;
            this._mouseSpeed = dis;
        }
    }

    /**
     * 调整图像大小
     */
    private updateScale() {
        var centerIndex = this.getScreenCenterCellIndex();
        /*
                if (this.direction == ScrollViewDirection.Horizontal) {
                    var leftIndex = Math.max(centerIndex - 1, 0);
                    var rightIndex = Math.min(centerIndex + 1, this.scrollView.array.length - 1);
                    var scrollPosX = this.scrollView.x;
                    var centerPos = Laya.stage.width / 2 - scrollPosX;
                    for (var index = leftIndex; index <= rightIndex; index++) {
                        let cellPos = this.scrollView.getCellPosByIndex(index);
                        let cellDis = Math.abs(cellPos - centerPos);
                        if (cellDis < 180) {
                            let scaleRate = this.itemMaxScale - (this.itemMaxScale - this.itemMinScale) / 180 * cellDis;
                            let item: Item = this.scrollView.getItemByIndex(index) as Item;
                            item.role.scale(scaleRate, scaleRate);
                        } else {
                            let item: Item = this.scrollView.getItemByIndex(index) as Item;
                            item.role.scale(0.4, 0.4)
                        }
                    }
                }
        
                if (this.direction == ScrollViewDirection.Vertical) {
                    var leftIndex = Math.max(centerIndex - 1, 0);
                    var rightIndex = Math.min(centerIndex + 1, this.scrollView.array.length - 1);
                    var scrollPosY = this.scrollView.y;
                    var centerPos = Laya.stage.height / 2 - scrollPosY;
                    for (var index = leftIndex; index <= rightIndex; index++) {
                        let cellPos = this.scrollView.getCellPosByIndex(index);
                        let cellDis = Math.abs(cellPos - centerPos);
                        if (cellDis < 180) {
                            let scaleRate = this.itemMaxScale - (this.itemMaxScale - this.itemMinScale) / 180 * cellDis;
                            let item: Item = this.scrollView.getItemByIndex(index) as Item;
                            item.role.scale(scaleRate, scaleRate);
                        } else {
                            let item: Item = this.scrollView.getItemByIndex(index) as Item;
                            item.role.scale(0.4, 0.4)
                        }
                    }
                }
        
                */

    }

    /**
     * 更新ScrollView位置 
     * @param dis 
     */
    private updateScrollViewPos(dis: number) {

        if (this.direction == ScrollViewDirection.Horizontal) {
            var posX: number = dis + this.scrollView.x;
            if (posX > 0) {
                posX = 0;
            }
            if (posX < -this.scrollView.width + Laya.stage.width) {
                posX = -this.scrollView.width + Laya.stage.width;
            }
            this.scrollView.pos(posX, this.scrollView.y);
        }
        if (this.direction == ScrollViewDirection.Vertical) {
            var posY: number = dis + this.scrollView.y;
            if (posY > 0) {
                posY = 0;
            }
            if (posY < -this.scrollView.height + Laya.stage.height) {
                posY = -this.scrollView.height + Laya.stage.height;
            }
            this.scrollView.pos(this.scrollView.x, posY);
        }
    }

    /**
     * 将角色居中显示
     */
    private centeringControl() {
        var centerIndex = this.getScreenCenterCellIndex()

        if (this.direction == ScrollViewDirection.Horizontal) {
            var cellPosX = this.getCellPosByIndex(centerIndex);
            var posX = Laya.stage.width / 2 - cellPosX;
            Laya.Tween.to(this.scrollView, { x: posX }, 500, Laya.Ease.cubicOut).update = new Laya.Handler(this, this.updateScale);
        }
        if (this.direction == ScrollViewDirection.Vertical) {
            var cellPosY = this.getCellPosByIndex(centerIndex);
            var posY = Laya.stage.height / 2 - cellPosY;
            Laya.Tween.to(this.scrollView, { y: posY }, 500, Laya.Ease.cubicOut).update = new Laya.Handler(this, this.updateScale);
        }
    }

    /**
     * 获取屏幕中间的单元格
     */
    public getScreenCenterCellIndex(): number {
        var index: number = 0;
        if (this.direction == ScrollViewDirection.Horizontal) {
            var distance = -this.scrollView.x;
            index = (distance - this.scrollView.leftAlign + this.scrollView.space + (Laya.stage.width + this.scrollView.cellWidth) / 2) / (this.scrollView.cellWidth + this.scrollView.space);
        }
        if (this.direction == ScrollViewDirection.Vertical) {
            var distance = -this.scrollView.y;
            index = (distance - this.scrollView.upAlign + this.scrollView.space + (Laya.stage.height + this.scrollView.cellHeight) / 2) / (this.scrollView.cellHeight + this.scrollView.space);
        }
        return Math.round(index) - 1;
    }

    /**
     * 根据单元格索引获取单元格位置
     * @param index 
     */
    public getCellPosByIndex(index: number): number {
        if (this.direction == ScrollViewDirection.Horizontal) {
            return this.scrollView.leftAlign + (index + 0.5) * this.scrollView.cellWidth + index * this.scrollView.space;
        }
        if (this.direction == ScrollViewDirection.Vertical) {
            return this.scrollView.upAlign + (index + 0.5) * this.scrollView.cellHeight + index * this.scrollView.space;
        }
    }





    onAwake() {
        super.onAwake();
        this.scrollView = new ScrollView();
        this.scrollView.direction = this.direction;
        this.node.addChild(this.scrollView);


        Laya.timer.frameLoop(1, this, this.onUpdate);

        this.setScrollView();

        this.LayOut();
    }

    onStart() {
        // [3]
        super.onStart();
        this.LayOut();
    }

    LayOut() {
        super.LayOut();
        // image 和uiimage同步大小
        var size = UI.GetNodeContentSize(this.owner);
        if (this.scrollView != null) {
            UI.SetNodeContentSize(this.scrollView, size.width, size.height);
        }
        if (this.isPivotCenter) {
            UI.SetNodePivotCenter(this.owner);
        }
    }

}