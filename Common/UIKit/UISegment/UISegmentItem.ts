 
export default class UISegmentItem  {
    static _main: UISegmentItem;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new UISegmentItem();
            // this._main.Init();
        }
        return this._main;
    }
 

}



