import UI from "../../../../../Common/UIKit/ViewController/UI";
import UIView from "../../../../../Common/UIKit/ViewController/UIView";
import UIHandItem from "./UIHandItem";




// 微信小程序 wx3e44af039aee1b96
export default class UIHand extends UIView {

    uiHandItemLeft: UIHandItem;
    uiHandItemRight: UIHandItem;

    uiHandItemClimbNext: UIHandItem;

    uiHandItemClimbLast: UIHandItem;
    ladderStepY = 1;
    static _main: UIHand;
    //静态方法
    static get main() {
        return this._main;
    }


    LayOut() {
        super.LayOut();
    }

    onAwake() {
        super.onAwake();

        this.LoadPrefab();
        UIHand._main = this;
        this.uiHandItemClimbNext = this.uiHandItemRight;

        { 
            var pos =UI.GetPosition(this.uiHandItemRight.node);
            pos.y = 0; 
            UI.SetPosition(this.uiHandItemRight.node,pos);

        }

        { 
            var pos =UI.GetPosition(this.uiHandItemLeft.node);
            pos.y = this.ladderStepY; 
            UI.SetPosition(this.uiHandItemLeft.node,pos);

        }
    }
    onStart() {
        super.onStart();
        this.LayOut();


    }


      LoadPrefab()
    {


    }
      SwitchNextHand()
    {
        if (this.uiHandItemClimbNext == this.uiHandItemRight)
        {
            this.uiHandItemClimbNext = this.uiHandItemLeft;
            this.uiHandItemClimbLast = this.uiHandItemRight;

        }
        else
        {
            this.uiHandItemClimbNext = this.uiHandItemRight;
            this.uiHandItemClimbLast = this.uiHandItemLeft;
        }
    }
     OnTap()
    {
        var pos =UI.GetPosition(this.uiHandItemClimbNext.node);
        pos.y += 2 * this.ladderStepY;
        // uiHandItemClimbNext.transform.position = pos; 
        this.uiHandItemClimbNext.MoveOne();
        
        this.SwitchNextHand();
    }
     OnSwitchHand()
    {
        this.SwitchNextHand();

    }
}


