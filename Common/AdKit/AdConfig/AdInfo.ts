 
export enum AdType {
    SPLASH= 0,
    BANNER,
    INSERT,
    SPLASH_INSERT,
    NATIVE, 
    VIDEO,
    INSERT_VIDEO,
}
 
export default class AdInfo  {
    // public static AdType = AdType;
    source = '';
    appid = '';
    appkey = '';
    key_splash = '';
    key_splash_insert = '';
    key_banner = '';
    key_insert = '';
    key_native = '';
    key_video = '';
    key_insert_video = ''; 
}


