import ConfigInternalBase from "../../Config/ConfigInternalBase";
import Debug from "../../Debug";
import JsonUtil from "../../File/JsonUtil";
import Source from "../../Source";
import AdInfo, { AdType } from "./AdInfo";

 
export default class AdConfigInternal extends ConfigInternalBase {

    public static COUNTRY_CN: string = "cn";
    public static COUNTRY_OTHER: string = "other";
    public static SPLASH_TYPE_SPLASH: string = "splash";
    public static SPLASH_TYPE_INSERT: string = "splash_insert";

    adSourceSplash: string = Source.ADMOB;
    adSourceSplashInsert: string = Source.ADMOB;
    adSourceInsert: string = Source.ADMOB;
    adSourceBanner: string = Source.ADMOB;
    adSourceNative: string = Source.GDT;
    adSourceVideo: string = Source.UNITY;


    // public OnAdConfigFinishedDelegate callback { get; set; }

    listPlatform: AdInfo[] = [];
    listPriorityBanner: AdInfo[] = [];
    listPriorityInsert: AdInfo[] = [];
    listPrioritySplash: AdInfo[] = [];
    listPrioritySplashInsert: AdInfo[] = [];
    listPriorityVideo: AdInfo[] = [];
    listPriorityNative: AdInfo[] = [];

    rootJsonCommon: any = null;
    rootJsonPriority: any = null;

    indexPriorityBanner = 0;
    indexPriorityInsert = 0;
    indexPrioritySplash = 0;
    indexPrioritySplashInsert = 0;
    indexPriorityVideo = 0;
    indexPriorityNative = 0;

    IsInPlatformList(src: string) {
        var ret = false;
        this.listPlatform.forEach((info) => {
            if (info.source == src) {
                ret = true;
                return;
            }
        });
        return ret;
    }
    GetJsonKey(data: any, key: string) {
        var ret = "0";
        if (JsonUtil.ContainsKey(data, key)) {
            ret = data[key];
        }
        return ret;
    }



    GetAdInfo(source: string) {
        // Debug.Log("AdConfigInternal GetAdInfo source= " + source);
        if (this.listPlatform == null) {
            Debug.Log("AdConfigInternal GetAdInfo null ");
            return null;
        }
        var ret = null;
        this.listPlatform.forEach((info) => {
            // Debug.Log("AdConfigInternal GetAdInfo forEach info.source= " + info.source);
            if (info.source == source) {
                // Debug.Log("AdConfigInternal GetAdInfo forEach return= " + info.source);
                ret = info;
                // 这里的return是跳出return循环不是整个函数 相当于c中break
                return;
            }
        });

        // Debug.Log("AdConfigInternal GetAdInfo  return null ");
        return ret;
    }
    IsInChina() {
        var ret = true;
        // var ret = IPInfo.isInChina;
        // if (Common.isAndroid) {
        //     if (AppVersion.appCheckForXiaomi) {
        //         //xiaomi 审核中,广告用国外的 admob
        //         // ret = false;
        //     }
        //     ret = true;
        // }

        return ret;
    }
    GetAdSource(type) {
        // var src = AdConfigParser.adSourceBanner;
        // switch (type) {
        //     case AdConfigInternal.SOURCE_TYPE_SPLASH:
        //         src = AdConfigParser.adSourceSplash;

        //         break;
        //     case AdConfigInternal.SOURCE_TYPE_BANNER:
        //         src = AdConfigParser.adSourceBanner;

        //         break;
        //     case AdConfigInternal.SOURCE_TYPE_INSERT:
        //         src = AdConfigParser.adSourceInsert;
        //         break;
        //     case AdConfigInternal.SOURCE_TYPE_SPLASH_INSERT:
        //         src = AdConfigParser.adSourceSplashInsert;
        //         break;
        //     case AdConfigInternal.SOURCE_TYPE_NATIVE:
        //         src = AdConfigParser.adSourceNative;
        //         break;
        //     case AdConfigInternal.SOURCE_TYPE_VIDEO:
        //         src = AdConfigParser.adSourceVideo;
        //         break;
        // }

        // if (Config.main.channel == Source.INMOB) {
        //     src = Source.INMOB;
        // }
        // return src;
    }
    GetAppId(source: string) {
        var ret = "0";
        var info = this.GetAdInfo(source);
        if (info != null) {
            ret = info.appid;
        }
        return ret;
    }

    GetAdKey(source: string, type: number) {
        var ret = "0";
        var info = this.GetAdInfo(source);
        if (info != null) {
            Debug.Log("AdConfigInternal GetAdKey info= " + info.source);
            switch (type) {
                case AdType.SPLASH:
                    ret = info.key_splash;
                    break;
                case AdType.BANNER:
                    ret = info.key_banner;
                    break;
                case AdType.INSERT:
                    ret = info.key_insert;
                    break;
                case AdType.SPLASH_INSERT:
                    ret = info.key_splash_insert;
                    break;
                case AdType.NATIVE:
                    ret = info.key_native;
                    break;

                case AdType.VIDEO:
                    ret = info.key_video;
                    break;
                case AdType.INSERT_VIDEO:
                    ret = info.key_insert_video;
                    break;
            }
        }
        return ret;
    }

    // public List<AdInfo> GetListPriority(int type) {
    //     List < AdInfo > listPriority = null;
    //     switch (type) {
    //         case SOURCE_TYPE_SPLASH:
    //             listPriority = listPrioritySplash;
    //             break;
    //         case SOURCE_TYPE_BANNER:
    //             listPriority = listPriorityBanner;
    //             break;
    //         case SOURCE_TYPE_INSERT:
    //             listPriority = listPriorityInsert;
    //             break;
    //         case SOURCE_TYPE_SPLASH_INSERT:
    //             listPriority = listPrioritySplashInsert;
    //             break;
    //         case SOURCE_TYPE_NATIVE:
    //             listPriority = listPriorityNative;
    //             break;
    //         case SOURCE_TYPE_VIDEO:
    //             listPriority = listPriorityVideo;
    //             break;
    //     }
    //     return listPriority;
    // }

    // public void InitPriority(string src, int type) {
    //     int idx = 0;
    //     List < AdInfo > listPriority = GetListPriority(type);
    //     foreach(AdInfo info in listPriority)
    //     {
    //         if (info.source == src) {
    //             switch (type) {
    //                 case SOURCE_TYPE_SPLASH:
    //                     indexPrioritySplash = idx;
    //                     break;
    //                 case SOURCE_TYPE_BANNER:
    //                     indexPriorityBanner = idx;
    //                     break;
    //                 case SOURCE_TYPE_INSERT:
    //                     indexPriorityInsert = idx;
    //                     break;
    //                 case SOURCE_TYPE_SPLASH_INSERT:
    //                     indexPrioritySplashInsert = idx;
    //                     break;
    //                 case SOURCE_TYPE_NATIVE:
    //                     indexPriorityNative = idx;
    //                     break;
    //                 case SOURCE_TYPE_VIDEO:
    //                     indexPriorityVideo = idx;
    //                     break;
    //             }
    //             break;
    //         }
    //         idx++;
    //     }
    // }

    // public AdInfo GetNextPriority(int type) {
    //     int idx = 0;
    //     switch (type) {
    //         case SOURCE_TYPE_SPLASH:
    //             idx = ++indexPrioritySplash;
    //             break;
    //         case SOURCE_TYPE_BANNER:
    //             idx = ++indexPriorityBanner;
    //             break;
    //         case SOURCE_TYPE_INSERT:
    //             idx = ++indexPriorityInsert;
    //             break;
    //         case SOURCE_TYPE_SPLASH_INSERT:
    //             idx = ++indexPrioritySplashInsert;
    //             break;
    //         case SOURCE_TYPE_NATIVE:
    //             idx = ++indexPriorityNative;
    //             break;
    //         case SOURCE_TYPE_VIDEO:
    //             idx = ++indexPriorityVideo;
    //             break;
    //     }
    //     List < AdInfo > listPriority = GetListPriority(type);
    //     Debug.Log("GetNextPriority:listPriority.Count=" + listPriority.Count + " type=" + type + " idx=" + idx);
    //     if (idx >= listPriority.Count) {
    //         return null;
    //     }
    //     AdInfo info = listPriority[idx];
    //     return info;

    // }

    ParseData() {
        Debug.Log("AdConfigInternal ParseData");
        var key = "platform";
        Debug.Log("AdConfigInternal 0");
        if (!JsonUtil.ContainsKey(this.rootJson, key)) {
            Debug.Log("AdConfigInternal 1 key= " + key);
            return;
        }
        Debug.Log("AdConfigInternal 1");
        var jsonItems = this.rootJson[key];

        for (var i = 0; i < jsonItems.length; i++) {
            var info = new AdInfo();
            var current = jsonItems[i];
            info.source = current["source"];
            if (this.IsInPlatformList(info.source)) {
                Debug.Log("AdConfigInternal 2 source= " + info.source);
                continue;
            }

            info.appid = current["appid"];
            info.appkey = this.GetJsonKey(current, "appkey");
            info.key_splash = this.GetJsonKey(current, "key_splash");
            info.key_splash_insert = this.GetJsonKey(current, "key_splash_insert");
            info.key_banner = current["key_banner"];
            info.key_insert = current["key_insert"];
            info.key_native = this.GetJsonKey(current, "key_native");
            info.key_video = this.GetJsonKey(current, "key_video");
            info.key_insert_video = this.GetJsonKey(current, "key_insert_video");
            this.listPlatform.push(info);
            Debug.Log("AdConfigInternal length= " + this.listPlatform.length);
        }
    }
    GetAppIdOfStore(store: string) {
        Debug.Log("GetAppIdOfStore store=" + store);
        var appid = this.rootJson.APPID;
        var strid = "0";
        if (appid.store != null) {
            strid = appid.store;
        }
        Debug.Log("GetAppIdOfStore appid= " + strid + "store=" + store);
        return strid;
    }
}


