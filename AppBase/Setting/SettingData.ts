import ItemInfo from "../../Common/ItemInfo";



export enum SettingType {
    COMMENT = 0,//0
    VERSION,//1
    LANGUAGE,//2
    BACKGROUND_MUSIC,//3
    BTN_SOUND,
    NOAD,
    RESTORE_IAP,
    LAST,
}

export class SettingInfo {
    tag: number;
    keyTitle = '';
}

export default class SettingData {

    listImage: string[] = ["SettingCellBgOringe", "SettingCellBgBlue", "SettingCellBgYellow"];

    // UISetting
    uiSetting: any;


    listItem: SettingInfo[] = [];
    listItemLan: ItemInfo[] = [];
    static _main: SettingData;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new SettingData();
            this._main.UpdateItem();
        }
        return this._main;
    }
    UpdateItem() { 
        {
            var info = new SettingInfo();
            info.keyTitle = "STR_SETTING_LANGUAGE";//Language.main.GetString("STR_SETTING_LANGUAGE");
            info.tag = SettingType.LANGUAGE;
            this.listItem.push(info);
        }

        var isHasBgMusic = true;
        // if (Config.main.appType == AppType.SHAPECOLOR) {
        //     isHasBgMusic = false;
        // }
        if (isHasBgMusic) {
            var info = new SettingInfo();
            info.keyTitle = "STR_SETTING_BACKGROUND_MUSIC";
            info.tag = SettingType.BACKGROUND_MUSIC;
            this.listItem.push(info);
        }

        {
            var info = new SettingInfo();
            info.keyTitle = "STR_SETTING_BTN_SOUND";
            info.tag = SettingType.BTN_SOUND;
            this.listItem.push(info);
        }

        // this.uiScrollView.listItem = this.listItem;


    }
}


