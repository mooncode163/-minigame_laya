 
export default class AudioCache  {
    
    static _main: AudioCache;
    //静态方法
    static get main() { 
        if (this._main == null) {
            this._main = new AudioCache();
        }
        return this._main;
    }
}


