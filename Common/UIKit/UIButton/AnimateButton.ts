import AudioPlay from "../../Audio/AudioPlay";
import Common from "../../Common";
import CommonRes from "../../CommonRes";
import Debug from "../../Debug";


/**@private */
class EventHandler extends Laya.Handler {

    /**@private handler对象池*/
    protected static _pool: any[] = [];

    constructor(caller: any, method: Function, args: any[], once: boolean) {
        super(caller, method, args, once);
    }
	/**
	 * @override
	 */
    recover(): void {
        if (this._id > 0) {
            this._id = 0;
            EventHandler._pool.push(this.clear());
        }
    }

	/**
	 * 从对象池内创建一个Handler，默认会执行一次回收，如果不需要自动回收，设置once参数为false。
	 * @param caller	执行域(this)。
	 * @param method	回调方法。
	 * @param args		（可选）携带的参数。
	 * @param once		（可选）是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
	 * @return 返回创建的handler实例。
	 */
    static create(caller: any, method: Function, args: any[] = null, once: boolean = true): Handler {
        if (EventHandler._pool.length) return EventHandler._pool.pop().setTo(caller, method, args, once);
        return new EventHandler(caller, method, args, once);
    }
}


export default class AnimateButton extends Laya.Node {

    // @serializable
    // @displayOrder(20)
    // @tooltip('按钮点击事件的列表。先将数量改为1或更多，就可以为每个点击事件设置接受者和处理方法')
    // public clickAnimateEvents: EventHandler[] = [];

    private _events2: any;


    /**
  * @private
  * 按钮的点击事件函数。
  */
    protected _clickHandler: Handler;
    /**
     * 对象的点击事件处理器函数（无默认参数）。
     * @implements
     */
    get clickHandler(): Handler {
        return this._clickHandler;
    }

    set clickHandler(value: Handler) {
        this._clickHandler = value;
    }

    onAwake() {
        super.onAwake();
        this._createListener(Laya.Event.MOUSE_OVER, this, this.onMouse, null, false, false);
        this._createListener(Laya.Event.MOUSE_OUT, this, this.onMouse, null, false, false);
        this._createListener(Laya.Event.MOUSE_DOWN, this, this.onMouse, null, false, false);
        this._createListener(Laya.Event.MOUSE_UP, this, this.onMouse, null, false, false);
        this._createListener(Laya.Event.CLICK, this, this.onMouse, null, false, false);
    }

    // onStart() { 
    //     // super.onStart();
    // }
    /**@internal */
    _createListener(type: string, caller: any, listener: Function, args: any[], once: boolean, offBefore: boolean = true): EventDispatcher {
        //移除之前相同的监听
        offBefore && this.off(type, caller, listener, once);

        //使用对象池进行创建回收
        var handler: Handler = EventHandler.create(caller || this, listener, args, once);
        this._events2 || (this._events2 = {});

        var events: any = this._events2;
        //默认单个，每个对象只有多个监听才用数组，节省一个数组的消耗
        if (!events[type]) events[type] = handler;
        else {
            if (!events[type].run) events[type].push(handler);
            else events[type] = [events[type], handler];
        }
        return this;
    }

    /**
     * 对象的 <code>Event.MOUSE_OVER、Event.MOUSE_OUT、Event.MOUSE_DOWN、Event.MOUSE_UP、Event.CLICK</code> 事件侦听处理函数。
     * @param e Event 对象。
     */
    protected onMouse(e: Laya.Event): void {
        // if (this.toggle === false && this._selected) return;
        if (e.type === Laya.Event.CLICK) {
            // this.toggle && (this.selected = !this._selected);
            this._clickHandler && this._clickHandler.run();
            return;
        }
        // !this._selected && (this.state = Button.stateMap[e.type]);
    }

    OnClickItem(event: Event, customEventData: string) {
        // The event here is a Touch object, and you can get the send node of the event by event.target
        // const node = event.target as Node;
        //  const button = node.getComponent(Button);
        //  console.log(customEventData); // foobar

        Debug.Log("AnimateButton OnClickItem");
        var duration = 0.2;

        // var actionTo1 = cc.scaleTo(duration / 2, 1.2);
        // var actionTo2 = cc.scaleTo(duration / 2, 1);
        // //delay延时
        // var time = cc.delayTime(0.01);
        // var seq = cc.sequence([time, actionTo1, actionTo2, cc.callFunc(function () {
        //     this.DoClickItem(event, customEventData);
        // }.bind(this))]);
        // this.node.runAction(seq);


        var scale1 = 1.2;
        var scale2 = 1;

        // tween(this.node)
        //     .delay(0.01)
        //     .to(duration / 2, { scale: new Vec3(scale1, scale1, 1) })
        //     .to(duration / 2, { scale: new Vec3(scale2, scale2, 1) })
        //     .call(() => {
        //         console.log('AnimateButton scale animate finish');
        //         this.DoClickItem(event, customEventData);
        //     })
        //     .onStart()
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);
        if (ret) {
            //play sound click
            AudioPlay.main.PlayByKey("BtnClick");
        }
    }

    DoClickItem(event: Event, customEventData: string) {
        Debug.Log("AnimateButton DoClickItem"); 
        // EventHandler.emitEvents(this.clickAnimateEvents, event); 
    }

}

