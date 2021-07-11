import Common from "../Common";
import FileSystem from "../File/FileSystem";
import Platform from "../Platform";

 
 
export default class CloudRes  {

    source ="";
    tmp_filepath = "";
    objDownload = null;
    static _main: CloudRes;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new CloudRes();
        }
        return this._main;
    }

    get rootPath() {
        var ret = Common.CLOUD_RES_DIR;
        if (Platform.isWeiXin||Platform.isByte||Platform.isQQ)  {
            ret = FileSystem.main.GetRootDirPath() + "/" + Common.CLOUD_RES_DIR_NAME;
        }
 
        return ret;
    }

    get uiRootPath() {
        var ret = this.rootPath;
        return ret;
    }

    get audioRootPath() {
        var ret = this.rootPath + "/audio";
        return ret;
    } 

    /*
        {
            url:"",
            success (res) {
            },
            fail (res) {
            },
            progress (res) {
            } ,
             unzipSuccess () {
            },
        }
        */

    StartDownload (obj:any) {
        this.objDownload = obj;
        console.log("CloudRes StartDownload url=" + obj.url);
          FileSystem.main.DownloadFile(
            {
                url: obj.url,
                success: (res: any) => {
                    var filePath = res.tempFilePath;
                    console.log("downloadFile=" + filePath)
                    this.UnzipFile(filePath);
                    if (obj.success != null) {
                        obj.success(res);
                    }
                },

                fail: (res: any) => {
                    console.log("readFile fail=" + obj.url)
                    if (obj.fail != null) {
                        obj.fail(res);
                    }
                },
                progress: (res: any) => { 
                    console.log('CloudRes  下载进度=  ', res.progress)
                    console.log('CloudRes已经下载的数据长度=', res.totalBytesWritten)
                    console.log('CloudRes预期需要下载的数据总长度=', res.totalBytesExpectedToWrite)
                    if (obj.progress != null) {
                        obj.progress(res);
                    }
                },
               
            });

    }

    UnzipFile (filePath:string) {
        var dir = FileSystem.main.GetRootDirPath();
        this.tmp_filepath = filePath; 
        FileSystem.main.UnzipFile(
            {
                zipFilePath: filePath,
                targetPath: dir,
                success: (res: any) => {
                    console.log("CloudRes unzip success=" + this.tmp_filepath);
                    // this.readFile(dir + "/CloudRes/image/Bird/Albatross.png");
                    FileSystem.main.DeleteFile(this.tmp_filepath);
                    if (this.objDownload != null) {
                        if (this.objDownload.unzipSuccess != null) {
                            this.objDownload.unzipSuccess();
                        }
                    }
                },

                fail: (res: any) => {
                    console.log("CloudRes unzip fail");
                }, 
               
            });

    }
} 