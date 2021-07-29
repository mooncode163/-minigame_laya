
export default class TtsWeiXin {
    static _main: TtsWeiXin;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new TtsWeiXin();
        }
        return this._main;
    }
    Speak(url) {
        this.PlayUrl(url);
    }

    PlayUrl(url) {
        var wx = Laya.Browser.window.wx;
        const audio = wx.createInnerAudioContext()
        //@moon 让微信在静音模式下继续播放声音 https://segmentfault.com/a/1190000016875469?utm_medium=referral&utm_source=tuicool
        if (wx.setInnerAudioOption) {
            wx.setInnerAudioOption({
                obeyMuteSwitch: false,
                autoplay: true
            })
        } else {
            audio.obeyMuteSwitch = false;
            audio.autoplay = true;
        }
        //@moon

        audio.src = url;
        //audio.src = 'https://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=1&text=福';
        // audio.src = 'https://cdn.feilaib.top/img/sounds/bg.mp3';

        console.log(audio.src);
        audio.onPlay(() => {
            console.log('onPlay:开始播放');
            // this.setData({ isplaying: true });
        });
        audio.onEnded(() => {
            console.log('onEnded:音频自然播放结束事件');
            //this.setData({ isplaying: false });
            audio.destroy();
        });
        audio.onStop(() => {
            console.log('onStop:音频停止事件');
            //this.setData({ isplaying: false });
            audio.destroy();
        });
        audio.onError((res) => {
            console.log("onError:" + res.errMsg);
            console.log(res);
            audio.destroy();
        });
        audio.onWaiting((res) => {
            console.log('onWaiting:音频加载中事件，当音频因为数据不足，需要停下来加载时会触发')
            console.log(res)
        });
        audio.onCanplay(() => {
            console.log('onCanplay');
            audio.play();
        });


        audio.play();
    }



}


