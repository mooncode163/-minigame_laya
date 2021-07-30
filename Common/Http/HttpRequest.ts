

export default class HttpRequest {
    static _main: HttpRequest;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new HttpRequest();
        }
        return this._main;
    }

    Get2(url, cb) {
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

    //  callback(data,isSuccesfull); 
    // heads   headers: ["Content-Type", "application/json", 'token', token ]
    Get(url, type,heads, callback) {
        var xhr = new Laya.HttpRequest();//创建HttpRequest对象
        xhr.http.timeout = 10000;//设置超时时间；
        //once：使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除
        //on：使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。两者参数是完全一样的
        //注意默认情况下必须是Laya.Event.COMPLETE的形式，而不能是Event.COMPLETE，否则会触发不了回电函数
        xhr.on(Laya.Event.PROGRESS, this, processHandler);
        xhr.once(Laya.Event.ERROR, this, errorHandler);
        xhr.once(Laya.Event.COMPLETE, this, completeHandler);

        //发送http请求——get请求时参数必须带在路径中，此时第二个参数空着即可
        //如果是 post请求，则参数必须放在第二个参数中，格式同样是：a=xxxx&b=xxx，通常项目中都会采用json格式进行数据传递
        // xhr.send(url, "id=120&name=李四&address=后海大道", "post", "json");
        xhr.send(url, null, "get", type,heads);

        //请求进度改变时调度，通常用于文件上传等
        function processHandler(data) {
            console.log("HttpRequest get 请求进行中：" + data);
        }
        //请求出错时调度
        function errorHandler(data) {
            console.log("HttpRequest get 请求错误：" + data);
            if (callback) {
                callback(data, false);
            }
        }
        //请求结束后调度 ———— 其中的参数就是服务器放的数据
        function completeHandler(data) {
            console.log("HttpRequest get 请求成功...");
            //json对象取值，两种方式 Obj.property、Obj[property]
            // console.log("返回数据1：" + data, JSON.stringify(data), data["message"]);
            // console.log("返回数据2：" + xhr.data.message);//也可以使用HttpRequest的属性data获取服务器返回的数据
            // console.log("请求地址：" + xhr.url);//HttpRequest的属性url返回请求的路径

            if (callback) {
                callback(data, true);
            }
        }
    }

    //  callback(data,isSuccesfull); 
    Post(url, data, type = "text",heads, callback) {
        var xhr = new Laya.HttpRequest();//创建HttpRequest对象
        xhr.http.timeout = 10000;//设置超时时间；
        //once：使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除
        //on：使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。两者参数是完全一样的
        //注意默认情况下必须是Laya.Event.COMPLETE的形式，而不能是Event.COMPLETE，否则会触发不了回电函数
        xhr.on(Laya.Event.PROGRESS, this, processHandler);
        xhr.once(Laya.Event.ERROR, this, errorHandler);
        xhr.once(Laya.Event.COMPLETE, this, completeHandler);

        //发送http请求——get请求时参数必须带在路径中，此时第二个参数空着即可
        //如果是 post请求，则参数必须放在第二个参数中，格式同样是：a=xxxx&b=xxx，通常项目中都会采用json格式进行数据传递
        // xhr.send(url, "id=120&name=李四&address=后海大道", "post", "json");
        xhr.send(url, data, "post", type,heads);

        //请求进度改变时调度，通常用于文件上传等
        function processHandler(data) {
            console.log("HttpRequest post 请求进行中：" + data);
        }
        //请求出错时调度
        function errorHandler(data) {
            console.log("HttpRequest post 请求错误：" + data);
            if (callback) {
                callback(data, false);
            }
        }
        //请求结束后调度 ———— 其中的参数就是服务器放的数据
        function completeHandler(data) {
            console.log("HttpRequest post 请求成功...");
            //json对象取值，两种方式 Obj.property、Obj[property]
            // console.log("返回数据1：" + data, JSON.stringify(data), data["message"]);
            // console.log("返回数据2：" + xhr.data.message);//也可以使用HttpRequest的属性data获取服务器返回的数据
            // console.log("请求地址：" + xhr.url);//HttpRequest的属性url返回请求的路径

            if (callback) {
                callback(data, true);
            }
        }
    }

}


