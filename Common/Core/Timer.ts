 

export default class Timer {
 

    // 两帧之间的时间间隔,单位毫秒。
    static get delta() {
      return Laya.timer.delta;
    }

      // 两帧之间的时间间隔,单位秒。
      static get deltaSecond() {
        return Laya.timer.delta/1000;
      }
  

    // * 当前帧开始的时间戳 tick  单位ms。
    static get curTime() {
        return Laya.systemTimer.currTimer;
      }
   
      // * 当前帧开始的时间戳 tick  单位s。
      static get curTimeSecond() {
        return Laya.systemTimer.currTimer/1000;
      }
}


