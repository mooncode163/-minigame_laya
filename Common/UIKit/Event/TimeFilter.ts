import Timer from "../../Core/Timer";
import Debug from "../../Debug"; 

 

export default class TimeFilter {
      // 防止频繁点击 小于 timeTouchMin 不响应点击 second
      public  timeMin = -1; 
       tickPre = 0;
       tickCur = 0;
       IsFilter():boolean
      {
          var ret = false;
          if ((this.tickPre == 0) && (this.tickCur == 0))
          {
              // 初始化
              this.tickCur = Timer.curTime;
              this.tickPre = this.tickCur;
              return false;
          }
          this.tickCur = Timer.curTime;
          if (this.timeMin > 0)
          {
              var step = Math.abs(this.tickCur - this.tickPre);
              if (step < this.timeMin * 1000)
              {
                  ret = true;
                  Debug.Log("TimeFilter Filter this step=" + step + "ms timeMin=" + this.timeMin+" second");
              }
              else
              {
  
              }
          }
          this.tickPre = this.tickCur;
          return ret;
      }
  

}


