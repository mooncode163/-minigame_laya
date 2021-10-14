
 
 /*

Laya微信小游戏的开放域教程:https://www.cnblogs.com/gamedaybyday/p/11545411.html 
                      https://ldc2.layabox.com/doc/?nav=zh-ts-5-0-7
                      */

export default class FrendBoardWeiXin  { 
    SaveData (score) {
        //let score = '' + 50;
        // wx.setUserCloudStorage({
        //     KVDataList: [{ key: 'score', value: score }],
        //     success: res => {
        //         console.log(res);
        //         // 让子域更新当前用户的最高分，因为主域无法得到getUserCloadStorage;
        //         let openDataContext = wx.getOpenDataContext();
        //         openDataContext.postMessage({
        //             type: 'updateMaxScore',
        //         });
        //     }
        //     fail: res => {
        //         console.log(res);
        //     }
        // });
    }

}



