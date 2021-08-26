import Common from "../Common";
import ConfigBase from "../Config/ConfigBase";
import LanguageInternal from "./LanguageInternal";
import { SysLanguage } from "./LanguageUtil";




export default class Language extends ConfigBase {
    languageApp: LanguageInternal = null;
    languageAppCommon: LanguageInternal = null;
    languageCommon: LanguageInternal = null;
    languageGame: LanguageInternal = null;


    // defaultLanId:
    // {
    //     get () {
    //         var ret = cc.sys.LANGUAGE_CHINESE;
    //         if (cc.sys.platform == cc.sys.MOBILE_BROWSER) {
    //             ret = cc.sys.LANGUAGE_ENGLISH;
    //         }
    //         return ret;
    //     }
    // }

    static _main: Language;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new Language();
            this._main.Init();
        }
        return this._main;
    }


    Init() {
        {
            var strDir = Common.RES_CONFIG_DATA + "/language";
            var fileName = "language.csv";
            {
                this.languageApp = new LanguageInternal();
                this.languageApp.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.languageApp);
            }
        }

        {
            var strDir = Common.RES_AppCommon + "/language";
            var fileName = "language.csv";
            {
                this.languageAppCommon = new LanguageInternal();
                this.languageAppCommon.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.languageAppCommon);
            }
        }

        {
            var strDir = Common.RES_CONFIG_DATA_COMMON + "/language";
            var fileName = "language.csv";
            {
                this.languageCommon = new LanguageInternal();
                this.languageCommon.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.languageCommon);
            }
        }

        {

            var strDir = Common.GAME_RES_DIR + "/language";
            // CloudRes.main.rootPath
            var fileName = "language.csv";
            {
                this.languageGame = new LanguageInternal();
                this.languageGame.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.languageGame);
            } this.listItem.push(this.languageApp);
        }
    }


    SetLanguage(lan: any) {
        if (this.languageApp != null) {
            this.languageApp.SetLanguage(lan);
        }
        if (this.languageGame != null) {
            this.languageGame.SetLanguage(lan);
        }
        if (this.languageAppCommon != null) {
            this.languageAppCommon.SetLanguage(lan);
        }
        if (this.languageCommon != null) {
            this.languageCommon.SetLanguage(lan);
        }
    }

    GetLanguage() {
        if (this.languageApp != null) {
            return this.languageApp.GetLanguage();
        }
    }
    GetString(key: string) {
        var str = "";
        if (this.languageApp != null) {
            str = this.languageApp.GetString(key);
        }
        if (str == "") {
            if (this.languageAppCommon != null) {
                str = this.languageAppCommon.GetString(key);
            }
        }

        if (str == "") {
            if (this.languageCommon != null) {
                str = this.languageCommon.GetString(key);
            }
        }

        return str;

    }


    //
    GetReplaceString(key: string, replace: string, strnew: string) {
        // string str = GetString(key);
        // str = str.Replace(replace, strnew);
        // return str;
    }

    IsContainsKey(key: string) {
        var ret = true;
        if (this.languageApp != null) {
            ret = this.languageApp.IsContainsKey(key);
        }

        if (!ret) {
            if (this.languageAppCommon != null) {
                ret = this.languageAppCommon.IsContainsKey(key);
            }
        }

        if (!ret) {
            if (this.languageCommon != null) {
                ret = this.languageCommon.IsContainsKey(key);
            }
        }
        return ret;
    }


    IsChinese() {
        var lan = this.GetLanguage();
        if (lan == SysLanguage.CN) {
            return true;
        }
        return false;
    }

}
