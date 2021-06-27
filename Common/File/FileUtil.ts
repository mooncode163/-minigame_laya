import Common from "../Common";

 
 
export default class FileUtil  {

    //除去文件后缀  并去除.
    static GetFileBeforeExtWithOutDot(filepath: string) {
        var ret = filepath;
        var idx = filepath.lastIndexOf(".");
        if (idx >= 0) {
            ret = filepath.substr(0, idx);
        }
        return ret;
    }
    static FileExist(filepath: string) {
        if (Common.BlankString(filepath)) {
            return false;
        }
        var ret = true;
        // if (sys.isNative) {
        //     ret = jsb.fileUtils.isFileExist(filepath);
        // }
        return ret;
    }

}


