    
 export interface IAutoClick { 
    // auto:AutoClick
      OnAutoClickDidClick(auto:any);
      OnAutoClickClickDown(auto:any);
      OnAutoClickClickUp(auto:any);
}
 

// 用法 implements IAutoClick

export default class AutoClick extends Laya.Script{ 
     
        public  iDelegate:IAutoClick;
      public   autoClickCount = 200;
        autoIndex = 0;
      public  autoClickTime = 0.6;//0.2f
  
//下一帧执行 Laya.timer.callLater  
// Laya.timer.once
      public   RunAuto()
      {  
            //   StartCoroutine(MouseAutoClickDown(autoClickTime, autoIndex));
            //   StartCoroutine(MouseAutoClickUp(autoClickTime + 0.01f, autoIndex));
              Laya.timer.once(this.autoClickTime,this, this.MouseAutoClickDown);
              Laya.timer.once(this.autoClickTime+0.01,this, this.MouseAutoClickUp);
          if(this.iDelegate!=null)
          {
              this.iDelegate.OnAutoClickDidClick(this);
          }
          this.autoIndex++;
          if (this.autoIndex < this.autoClickCount)
          {
            //   Invoke("RunAuto", this.autoClickTime + 0.02f);
            Laya.timer.once(this.autoClickTime+0.02,this, this.RunAuto);
          }
      }
  
       MouseAutoClickUp()
      {
          if(this.iDelegate!=null)
          {
              this.iDelegate.OnAutoClickClickUp(this);
          }
      }
  
       MouseAutoClickDown()
      { 
          if(this.iDelegate!=null)
          {
              this.iDelegate.OnAutoClickClickDown(this);
          }
      }
  

}


