

export default class HttpRequest {
    static _main: HttpRequest;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new HttpRequest();
        }
        return this._main;
    }

    Get(url, cb) {
        //var xhr = cc.loader.getXMLHttpRequest();
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;
        // var requestURL = url + path;
        // if (params) {
        //     requestURL = requestURL + "?" + params;
        // }
        var requestURL = url;
        xhr.open("GET", requestURL, true);

        //必须设置为arraybuffer 不然会闪退
        xhr.responseType = 'arraybuffer';//arraybuffer

        // if (cc.sys.isNative) 
        // {
        //     //charset=UTF-8:当文本为非UTF8的时候会乱码，所以关闭
        //     // xhr.setRequestHeader("Accept-Encoding", "gzip,deflate", "text/html;charset=UTF-8");
        // }
        // if (cc.sys.isBrowser)
        //  {
        //     //跨域问题 
        //     xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        //     xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST');
        //     // xhr.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type,authorization');
        //     //xhr.setRequestHeader("Content-Type", "application/json");

        // }


        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 300)) {

                try {
                    //var str = xhr.responseText;
                    // console.log("http res(" + xhr.responseText.length + "):" + xhr.responseText);
                    var ret = xhr.response;
                    if (cb) {
                        cb(null, ret);
                    }
                } catch (e) {
                    console.log("err:" + e);
                    cb(e, null);
                }
            }
        }

        xhr.send();
        return xhr;
    }

}


