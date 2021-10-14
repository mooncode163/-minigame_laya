import UIView from "../../../../../Common/UIKit/ViewController/UIView";

 


// 微信小程序 wx3e44af039aee1b96
export default class UIHandItem extends UIView { 


    stepDistance = 2.0;
    stepLayer = 8;
    check = true;
    moveTime = 0.09;
    isRightHand = false;
    stopped = false;

    LayOut() {
        super.LayOut();
    }

    onAwake() {
        super.onAwake(); 
    }
    onStart() {
        super.onStart();
        this.LayOut();

         
    } 


    MoveOne() {
        // transform.DOComplete();
        this.CheckStepCollision(0);
        // transform.DOMoveY(transform.position.y + stepDistance, moveTime); 
        this.CheckStepCollision(this.moveTime);
    }

    CheckStepCollision(time: Number, checkOtherHand = false) {
        // if (this.waitToCheck!=null) StopCoroutine(waitToCheck);
        // waitToCheck = waitToCheckStepCollision(time, checkOtherHand);
        // StartCoroutine(waitToCheck);
    }

    waitToCheckStepCollision(time, checkOtherHand = false) {
        this.check = false;
        //yield return new WaitForSeconds(time);
        // shapeCast
        // if (Physics.OverlapSphere(GetPos(), .2f, stepLayer).Length > 0)
        // {
        //     Debug.Log("waitToCheckStepCollision OverlapSphere length >0");
        //     if (!checkOtherHand)
        //     {
        //         //Debug.Log("CHECKED");
        //         check = true;
        //         lastHandPos = transform.position;
        //         // movement.OneStepMoved();
        //         StartCoroutine(playDustEffect(.2f,true,true));
        //     }
        //     else
        //     {
        //         /*
        //         if (Physics.OverlapSphere(movement.rHand.GetPos(), .2f, stepLayer).Length > 0
        //             && Physics.OverlapSphere(movement.lHand.GetPos(), .2f, stepLayer).Length > 0)
        //         {
        //             //Debug.Log("CHECKED");
        //             check = true;
        //             lastHandPos = transform.position;
        //             StartCoroutine(playDustEffect(.0f,true,false));
        //         }
        //         else
        //         {
        //             //Debug.Log("NOT CHECKED");
        //             check = false;
        //             if (movement.FaultGetHearts() > 0) ReturnToLastPos(isRightHand);
        //             //movement.Fall();
        //         }

        //         */
        //     }

        // }
        // else
        // {
        //     check = false;
        //     //Debug.Log("NOT CHECKED");
        //     if (checkOtherHand)
        //     {
        //       //  if(movement.FaultGetHearts()>0) ReturnToLastPos(isRightHand);

        //         //movement.Fall();
        //     }
        //     else
        //     {
        //        // if (movement.FaultGetHearts() > 0) ReturnToLastPos();
        //         //movement.Fall();
        //     }
        // }

        // if (check)
        // {
        //     Collider[] col = Physics.OverlapSphere(GetPos(), .2f, stepLayer);
        //     col[0].GetComponentInParent<StepSc>().StopAnimation();
        // }



    }

    ReturnToLastPos(switchNextHand = true) {
        // StartCoroutine(stopForAnAmountOfTime()); 
        // anim.SetTrigger("DidntCatch");
        // transform.DOComplete();
        // transform.DOMoveY(lastHandPos.y, moveTime*4); 
    }

    stopForAnAmountOfTime() {
        // stopped = true;
        // yield return new WaitForSeconds(1.0f);
        // stopped = false;
    }

    GetPos() {
        // return new Vector3(transform.position.x, transform.position.y, 0); 
    }

    playDustEffect(wait, vibrate, sound) {
        // yield return new WaitForSeconds(wait);
        // dustEffect.Play();
        // if (vibrate)
        // {
        //     Vibration.Vibrate(35);
        // }
        // if (sound)
        // {
        //     // movement.gameManager.audioManager.PlayCatch();
        // }

    }
}


