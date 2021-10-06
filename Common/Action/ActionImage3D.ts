import Timer from "../Core/Timer";
import Debug from "../Debug";
import UISprite from "../UIKit/UIImage/UISprite";


// https://www.it610.com/article/1298108420397801472.htm
export default class ActionImage3D {
    sprite: UISprite;
    duration: number = 0;
    moveValue: number = 0;
    isFinish: boolean = false;
    listItem: string[] = [];
    deltaTime = 0;
    animationTimeDelay = 0;
    index=0;

    /**
     * Sprite3D移动方法
     * @param sprite 需要移动的3D对象 
     * @param duration 移动总耗时
     * @param easeFun 缓动函数 (Laya.Ease) 默认为线性移动
     * @param obj 回调域
     * @param callback 回调函数 
     */
    public Run(sprite: UISprite, listImage: string[], duration: number, easeFun: Function, obj: any = null, callback: Function = null) {
        this.listItem = listImage;
        this.sprite = sprite;
        this.duration = duration;
        this.isFinish = false;
        if (duration == 0) {
            return
        }
        this.OnActionStart()
        Laya.Tween.to(this, { moveValue: 1.0 }, this.duration, easeFun, Laya.Handler.create(this, this.OnActionFinish, [Laya.Handler.create(obj, callback)]))
    }

    private OnActionStart() {
        Laya.timer.frameLoop(1, this, this.ActionUpdate);
        this.deltaTime = 0;
        this.index = 0;
    }

    private OnActionFinish(handler: Laya.Handler) {
        if (this.isFinish) {
            Debug.Log("ActionImage3D isFinish");
            return;
        }
        Debug.Log("ActionImage3D OnActionFinish");
        Laya.timer.clear(this, this.ActionUpdate)

        handler.method();
        this.isFinish = true;
    }

    private ActionUpdate() {
        if (this.listItem.length == 0) {
            return;
        }
        this.animationTimeDelay = this.duration / this.listItem.length;
        this.deltaTime += Timer.deltaSecond;
        // Debug.Log(animationDeltaTime);
        if (this.deltaTime >= this.animationTimeDelay) {
            this.deltaTime = 0;
            this.UpdateImage();
            this.index++;
            // Debug.Log("UpdateImage:index++=" + index);
            
        }

    }



      UpdateImage()
    {
        if (this.index < this.listItem.length)
        {
            var key = this.listItem[this.index];
            this.sprite.UpdateImageByKey(key);
        }
    }
}