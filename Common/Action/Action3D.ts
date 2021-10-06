import Debug from "../Debug";
import UISprite from "../UIKit/UIImage/UISprite";

export enum ActionType {
    Move = "Move",// 
    Scale = "Scale",
    Fade = "Fade",
}

// https://www.it610.com/article/1298108420397801472.htm
export default class Action3D {
    type = ActionType.Move;
    from: any;
    to: any;
    distance: any;
    sprite: UISprite;
    duration: number = 0;
    actionValue: number = 0;
    isFinish: boolean = false;
    objAction: any;
 

    /**
     * Sprite3D移动方法
     * @param gameObject 需要移动的3D对象
     * @param toPos 移动目标点
     * @param playTime 移动总耗时
     * @param easeFun 缓动函数 (Laya.Ease) 默认为线性移动
     * @param obj 回调域
     * @param callback 回调函数 
     */


    /*
  {
    sp: UISprite,
    type:ActionType,
    to:any,
    time:number,//second
    easeFun: Function,
    objCallback:any
    callbackFinish: Function,
    success: (p:any) => {
        
    }, 
    fail: (p:any) => {
        
    },
  }
  */
    public Run(obj: any) {
        this.objAction = obj;
        this.to = obj.to;
        this.sprite = obj.sp;
        this.type =obj.type;

        if (this.type == ActionType.Move) {
            this.distance = new Laya.Vector3(this.to.x - this.sprite.position.x, this.to.y - this.sprite.position.y, this.to.z - this.sprite.position.z);
            this.from = new Laya.Vector3(this.sprite.position.x, this.sprite.position.y, this.sprite.position.z);
        }
        if (this.type == ActionType.Scale) {
            this.distance = new Laya.Vector3(this.to.x - this.sprite.localScale.x, this.to.y - this.sprite.localScale.y, this.to.z - this.sprite.localScale.z);
            this.from = new Laya.Vector3(this.sprite.localScale.x, this.sprite.localScale.y, this.sprite.localScale.z);
        }

        if (this.type == ActionType.Fade) {
            this.from = this.sprite.color.a;
            this.distance = this.to - this.from;
        }

        this.duration = obj.time * 1000;//ms
        this.isFinish = false;
        if (this.duration == 0) {
            // this.moveObjcet.transform.position = this.topostion;
            return
        }
        this.OnActionStart()
        Laya.Tween.to(this, { actionValue: 1.0 }, this.duration, obj.easeFun, Laya.Handler.create(this, this.OnActionFinish, [Laya.Handler.create(obj.objCallback, obj.callbackFinish)]))
    }

    ActionUpdate() {
        switch (this.type) {
            case ActionType.Move:
                {
                    this.OnActionUpdateMove();
                }
                break;
            case ActionType.Scale:
                {
                    this.OnActionUpdateScale();
                }
                break;
            case ActionType.Fade:
                {
                    this.OnActionUpdateFade();
                }
                break;
        }
    }

    private OnActionStart() {
        this.actionValue = 0;
        Laya.timer.frameLoop(1, this, this.ActionUpdate)
    }

    private OnActionFinish(handler: Laya.Handler) {
        if (this.isFinish) {
            Debug.Log("Sprite3DMoveContorller isFinish");
            return;
        }
        Debug.Log("Sprite3DMoveContorller endMove");
        Laya.timer.clear(this, this.ActionUpdate) 
        if (this.type == ActionType.Move) {
            this.sprite.position = this.to
        }
        if (this.type == ActionType.Scale) {
            this.sprite.localScale = this.to
        }

        if (this.type == ActionType.Fade) {
            var color = this.sprite.color;
            color.a = this.to;
            this.sprite.color = color;
        }

        // handler.method();
        this.isFinish = true;

        if (this.objAction.success != null) {
            this.objAction.success(this);
        }
    }

    private OnActionUpdateMove() {

        var pt = new Laya.Vector3(
            this.from.x + (this.distance.x * this.actionValue),
            this.from.y + (this.distance.y * this.actionValue),
            this.from.z + (this.distance.z * this.actionValue)
        )
        // Debug.Log("Sprite3DMoveContorller moveUpdate x=" + pt.x + " y=" + pt.y + " this.actionValue=" + this.actionValue + " this.frompostion.x=" + this.frompostion.x + " this.moveDistance.x=" + this.moveDistance.x);
        if(this.sprite!=null)
        {
            this.sprite.position = pt;
        }
    }

    private OnActionUpdateScale() {

        var pt = new Laya.Vector3(
            this.from.x + (this.distance.x * this.actionValue),
            this.from.y + (this.distance.y * this.actionValue),
            this.from.z + (this.distance.z * this.actionValue)
        )
        pt.z = 1;
        // Debug.Log("OnActionUpdateScale x=" + pt.x + " y=" + pt.y + " this.actionValue=" + this.actionValue+" this.from.x="+this.from.x+" this.distance.x="+this.distance.x);
        if(this.sprite!=null)
        {
            this.sprite.localScale = pt;
        }

    }

    private OnActionUpdateFade() {
        var a = this.from + (this.distance * this.actionValue)
        var color = this.sprite.color;
        // color.a = a*255;
        color.a =a;
        Debug.Log("OnActionUpdateFade a=" + a +" this.actionValue=" + this.actionValue+" this.from="+this.from+" this.distance="+this.distance);
        if(this.sprite!=null)
        {
            this.sprite.color = color;
        }
    }
}