import Timer from "../Core/Timer";
import Debug from "../Debug";

 

export default class ActionBase extends Laya.Script {


    target: Node;
    percentage = 0;//0-1.0f
    duration = 1.0;//总时间 secode
    index = 0;
    isLoop = false;
    isUpdateByPercent = true;
    runningTime = 0;


    reverse = false;
    isPaused = false;
    _isRunning = false;
    callbackComplete = null;


    public get node(): Laya.Node {
        return this.owner;
    }
    // public OnActionCompleteDelegate callbackComplete { get; set; }
    get isRunning() {
        return this._isRunning;
    }
    onAwake() {
        super.onAwake();
        this.runningTime = 0;
        this.percentage = 0;
        this.reverse = false;
        this.isPaused = true;
        this._isRunning = false;
        this.isLoop = false;
        this.isUpdateByPercent = true;
        this.InitAction();
    }
    // Use this for initialization
    onStart() {
        super.onStart();
    }

    // Update is called once per frame
    onUpdate() {
        if (!this.isPaused) {
            this._isRunning = true;
            if (this.isUpdateByPercent) {
                this.UpdatePercentage();
            }

            this.UpdateAction();
            if (this.percentage >= 1) {
                this._isRunning = false;
                this.OnFinish();
            }
        }

    }


    UpdatePercentage() {
        this.runningTime += Timer.deltaSecond;

        if (this.duration != 0) {
            if (this.reverse) {
                this.percentage = 1 - this.runningTime / this.duration;
            }
            else {
                this.percentage = this.runningTime / this.duration;
            }
            if (this.percentage > 1) {
                this.percentage = 1;
            }
            Debug.Log("UpdatePercentage:percentage=" + this.percentage);

        }


    }


    OnFinish() {

        if (this.isLoop) {
            this.runningTime = 0;
            this.percentage = 0;
            return;
        }
        this.Pause();
        this.OnActionComplete();
        if (this.callbackComplete != null) {
            this.callbackComplete(this.owner);
        }
        // DestroyImmediate(this);
        this.destroy();

    }

    Pause() {
        this.isPaused = true;
    }
    Run() {
        this.isPaused = false;
    }



    InitAction() {

    }
    UpdateAction() {

    }

    OnActionComplete() {

    }
}
