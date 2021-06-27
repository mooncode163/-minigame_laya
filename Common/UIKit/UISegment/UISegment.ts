 
export default class UISegment  {
    static _main: UISegment;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new UISegment();
            // this._main.Init();
        }
        return this._main;
    } 

}



