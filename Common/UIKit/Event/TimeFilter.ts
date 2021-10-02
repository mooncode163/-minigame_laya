import Timer from "../Core/Timer";

 

export default class TimeFilter {
      // 防止频繁点击 小于 timeTouchMin 不响应点击 second
      public  timeMin = -1; 
       tickPre = 0;
       tickCur = 0;
       IsFilter():boolean
      {
          var ret = false;
          if ((tickPre == 0) && (tickCur == 0))
          {
              // 初始化
              tickCur = Timer.curTime;
              tickPre = tickCur;
              return false;
          }
          tickCur = Timer.curTime;
          if (timeMin > 0)
          {
              var step = Math.abs(tickCur - tickPre);
              if (step < timeMin * 1000)
              {
                  ret = true;
                  Debug.Log("TimeFilter Filter this step=" + step + " timeMin=" + timeMin);
              }
              else
              {
  
              }
          }
          tickPre = tickCur;
          return ret;
      }
  

}


