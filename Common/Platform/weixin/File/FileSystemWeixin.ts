import FileSystemPlatformWrapper from "../../../File/FileSystemPlatformWrapper";

 
 
export default class FileSystemWeixin extends FileSystemPlatformWrapper {
    static _main: FileSystemWeixin;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new FileSystemWeixin();
        }
        return this._main;
    }

    GetRootDirPath() {
        // var ret = `${wx.env.USER_DATA_PATH}/` + FileSystemPlatformWrapper.FILE_ROOT_DIR;
        // return ret;  
        return "";
    }

    DownloadFile(obj: any) {
/*
        const fs = wx.getFileSystemManager()
        var dir = this.GetRootDirPath();

        const downloadTask = wx.downloadFile({ 
            url: obj.url,
            success(res) {
                var filePath = res.tempFilePath;
                console.log("downloadFile=" + filePath)
                // this.UnzipFile(filePath);
                if (obj.success != null) {
                    obj.success(res);
                }
            },

            fail(res) {
                if (obj.fail != null) {
                    obj.fail(res);
                }
            }

        })
        downloadTask.onProgressUpdate((res) => {

            if (obj.progress != null) {
                obj.progress(res);
            }
        })

        // downloadTask.abort() // 取消下载任务
        */

    }

    UnzipFile(obj: any) {
        /*
        const fs = wx.getFileSystemManager();
        var dir = this.GetRootDirPath();
        fs.unzip({
            zipFilePath: obj.zipFilePath,
            targetPath: obj.targetPath,
            success(res) {
                console.log("weixin unzip success=" + dir);
                // this.readFile(dir + "/CloudRes/image/Bird/Albatross.png");
                if (obj.success != null) {
                    obj.success(res);
                }
            },
            fail(res) {
                console.log("weixin unzip fail");
                if (obj.fail != null) {
                    obj.fail(res);
                }
            },

        });
        */
    }

    ReadFile(obj: any) {
        /*
        const fs = wx.getFileSystemManager()
        var dir = this.GetRootDirPath();
        fs.readFile({
            filePath: obj.filePath,
            success(res) {
                if (obj.success != null) {
                    obj.success(res);
                }
            },
            fail(res) {
                if (obj.fail != null) {
                    obj.fail(res);
                }
            },

        })
        */
    }
    WriteFile(obj: any) {
        /*
        const fs = wx.getFileSystemManager()
        fs.writeFile({
            filePath: obj.filePath,
            success(res) {
                if (obj.success != null) {
                    obj.success(res);
                }
            },
            fail(res) {
                if (obj.fail != null) {
                    obj.fail(res);
                }
            },

        })
         */
    }

    DeleteFile(filepath: string) {
        /*
        const fs = wx.getFileSystemManager()
        fs.removeSavedFile({
            filePath: filepath,
            success(res) {

            },
            fail(res) {

            },

        })
        */
    }

}
 
