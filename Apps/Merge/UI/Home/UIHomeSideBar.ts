import UIHomeBase from "../../../../AppBase/Home/UIHomeBase";
import SettingViewController from "../../../../AppBase/Setting/SettingViewController";
import MusicBgPlay from "../../../../Common/Audio/MusicBgPlay";
import Common from "../../../../Common/Common";
import CommonRes from "../../../../Common/CommonRes";
import Share from "../../../../Common/Share/Share";
import UIButton from "../../../../Common/UIKit/UIButton/UIButton";
import UIFind from "../../../../Common/UIKit/ViewController/UIFind";
import UIView from "../../../../Common/UIKit/ViewController/UIView";
import Config from "../../../../Common/Config/Config";
import AppVersion from "../../../../Common/AppVersion/AppVersion";
import Platform from "../../../../Common/Platform";



export default class UIHomeSideBar extends UIView {
    btnMusic: UIButton;
    btnSound: UIButton;
    btnSetting: UIButton;
    btnMore: UIButton;
    btnShare: UIButton;
    btnNoAd: UIButton;


    onAwake() {
        super.onAwake();


        // var button = UIFind.Find(this.node,"Button");

        // {
        //     this.btnMusic = UIFind.FindUI(this.node, "BtnMusic",UIButton);
        //     this.btnMusic.SetClick(this, this.OnBtnClickMusic.bind(this));
        // }

        // {
        //     this.btnSound = UIFind.FindUI(this.node, "BtnSound",UIButton);
        //     this.btnSound.SetClick(this, this.OnBtnClickSound.bind(this));
        // }
        // {
        //     this.btnSetting = UIFind.FindUI(this.node, "BtnSetting",UIButton);
        //     this.btnSetting.SetClick(this, this.OnBtnClickSetting.bind(this));
        // }
        // {
        //     this.btnMore = UIFind.FindUI(this.node, "BtnMore",UIButton);
        //     this.btnMore.SetClick(this, this.OnBtnClickMore.bind(this));
        //     this.btnMore.visible = AppVersion.main.appCheckHasFinished;
        // }
        // {
        //     this.btnShare = UIFind.FindUI(this.node, "BtnShare",UIButton);
        //     this.btnShare.SetClick(this, this.OnBtnClickShare.bind(this));
        // }

        if(Platform.isHuawei)
        {
            this.btnShare.visible = false;
        }

        this.LayOut();
    }
    onStart() {
        super.onStart();
        this.UpdateBtns();
        this.LayOut();
    }

    // onUpdate()
    // {
    //     this.LayOut();  
    // }
    LayOut() {
        super.LayOut();

    }

    UpdateBtns() {
        this.UpdateBtnMusic();
        this.UpdateBtnSound();
    }
    UpdateBtnMusic() {
        UIHomeBase.UpdateBtnMusic(this.btnMusic);
    }
    UpdateBtnSound() {
        UIHomeBase.UpdateBtnSound(this.btnSound);
    }
    OnBtnClickMusic() {
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, false);
        var value = !ret;
        Common.SetBoolOfKey(CommonRes.KEY_BACKGROUND_MUSIC, value);
        if (value)
        {
            MusicBgPlay.main.PlayBgMusic();
        }
        else
        {
            MusicBgPlay.main.StopBgMusic();
        }
        this.UpdateBtnMusic();
    }
    OnBtnClickSound() {
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);
        var value = !ret;
        Common.SetBoolOfKey(CommonRes.KEY_BTN_SOUND, value);
        this.UpdateBtnSound();
    }
    OnBtnClickMore() {

    }
    OnBtnClickNoad() {

    }
    OnBtnClickShare() {
        Share.main.ShareImageText("", Config.main.shareTitle, Config.main.shareUrl, "");
    }
    OnBtnClickSetting() {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            navi.Push(SettingViewController.main);
        }
    }
}


