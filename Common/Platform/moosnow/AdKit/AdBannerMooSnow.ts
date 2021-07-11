import AdBannerPlatformWrapper from "../../../AdKit/Banner/AdBannerPlatformWrapper";



export default class AdBannerMooSnow extends AdBannerPlatformWrapper {
  bannerAd = null;
  width = 0;
  height = 0;
  objAd = null;
  /*
{
  source:"", 
  success: (p:any,w:any,h:any) => {
      
  }, 
  fail: (p:any) => {
      
  },
}
*/
  InitAd(obj: any) {
    
  }

  ShowAd(isShow: boolean) {
   


  }


  GetHeight() {
    return this.height;
  }
  SetScreenSize(w: any, h: any) {

  }
  //y 基于屏幕底部
  SetScreenOffset(w: any, h: any) {

  }
}
 