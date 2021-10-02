import UIView from "../../../../../Common/UIKit/ViewController/UIView";
 
 
export default class UIScoreNumber extends UIView {
       textScore:UIText;
    onAwake() {
        super.onAwake(); 
        this.LayOut(); 
    } 

    onStart() {
        super.onStart();
        this.LayOut(); 
    }
    
    LayOut() {
        super.LayOut(); 
    }
    UpdateScore()
    {
        if (GameData.main.addScore > 0)
        {
            this.textScore.text = "+" + GameData.main.addScore.ToString();
            this.RunMoveAnimate(GameData.main.fromPosScoreWorld);
        }

    }

    // 
    RunMoveAnimate(  fromPosWorld)
    {
        var rctan = this.GetComponent<RectTransform>();
        textScore.visible = true;
        var fromPosCanvas = Common.WorldToCanvasPoint(mainCam, AppSceneBase.main.sizeCanvas, fromPosWorld);
        var fromPosScreen = Common.WorldToScreenPoint(mainCam, fromPosWorld);
        // rctan.position = fromPosScreen;
        this.transform.position = fromPosScreen;

        var posnow = rctan.anchoredPosition;
        var toPos = new Vector3(posnow.x, posnow.y + 512, posnow.z);
        // Vector3 toPos = new Vector3(fromPosScreen.x, fromPosScreen.y + 256, fromPosScreen.z);
        var duration = 1f;

        Tweener tw = rctan.DOLocalMove(toPos, duration).OnComplete(() =>
                          {
                              //   textScore.title.GetComponent<Renderer>().material.DOFade(1, 0.01f);
                                 textScore.title.material.DOFade(1,0.01f);
                              textScore.visible = false;
                          }
          );

        var color = textScore.title.color;
        // color.a = 0;
        // textScore.title.DOColor(color, duration);


// DoTween对UI进行DoFade操作存在问题及解决办法(https://www.jianshu.com/p/50759163fce4)
// 对Text 做DoFade 后会导致整个ui都改变透明度,所有使用缺省material的组件都是使用的默认的material，而这个material只存在一份，所有UI组件使用的默认material都只是该material的引用,
// 所以要给Text单独设置material

    this.textScore.title.material.DOFade(0,duration);

    }
}
 