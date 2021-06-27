 
export default class FileSystemPlatformWrapper  { 
    public static FILE_ROOT_DIR = "moonma";

    static _main: FileSystemPlatformWrapper;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new FileSystemPlatformWrapper();
        }
        return this._main;
    }

 

    GetRootDirPath () {
        return "";
    }

    ReadFile (obj) {
    }
    WriteFile (obj) {
    }
    UnzipFile (obj) {
   
    }
    DownloadFile (obj) {
    }
    DeleteFile (filepath) { 
    }
 
}


