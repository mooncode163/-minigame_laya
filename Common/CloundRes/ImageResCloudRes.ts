import Common from "../Common";
import ConfigBase from "../Config/ConfigBase";
import ImageResInternal from "../Config/ImageResInternal";

 
 
export default class ImageResCloudRes extends ConfigBase { 
    imageResCommon: ImageResInternal = null; 




    static _main: ImageResCloudRes;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new ImageResCloudRes();
            this._main.Init();
        }
        return this._main;
    }
    Init() {

        
        // strDir = Common.RES_CONFIG_DATA_COMMON + "/Image";
       var strDir = "Resources/Common/UI"  
       var fileName = "ImageRes.json";
        {
            this.imageResCommon = new ImageResInternal();
            this.imageResCommon.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.imageResCommon);
        }
 

    }

     

    GetImageBoardString(path: string) {

        var ret = "";
        this.listItem.forEach((item) => {
            var p = item as ImageResInternal;
            if (Common.BlankString(ret)) {
                if (p != null) {
                    var key = p.FindKeyByPath(path);
                    if (!Common.BlankString(key)) {
                        ret = p.GetImageBoardString(key);
                    }
                }
            } else {
                return ret;
            }

        });

 
        return ret;
    }

    IsHasBoard(key: string) {
        var ret = false;
        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item as ImageResInternal;
            if (ret == false) {
                if (p != null) {
                    ret = p.IsHasBoard(key);
                }
            } else {
                return ret;
            }
        });
 


        return ret;
    }


    IsContainsKey(key: string) {
        var ret = false;
        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item as ImageResInternal;
            if (ret == false) {
                if (p != null) {
                    ret = p.IsHasKey(key);
                }
            } else {
                return ret;
            }
        });

        
        return ret;
    }

    GetImage(key: string) {
        var ret = "";

        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item as ImageResInternal;
            if (Common.BlankString(ret)) {
                if (p != null) {
                    ret = p.GetImage(key); 
                }
            } else {
                return;
            }
        });
 

        return ret;
    }



    GetImageBoard(key: string) {
        var ret = Laya.Vector4.ZERO;

        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item as ImageResInternal;
            // Debug.Log("GetImageBoard ScoreBg 0 ret="+ret);
            if ((ret.x == 0)&&(ret.y == 0)&&(ret.z == 0)&&(ret.w == 0)) {
                if (p != null) {
                    ret = p.GetImageBoard(key);
                    // Debug.Log("GetImageBoard ScoreBg 2 ret="+ret);
                }
            } else {
                // Debug.Log("GetImageBoard ScoreBg 1 ret="+ret);
                return;
            }
        });
 

        return ret;
    }

}


