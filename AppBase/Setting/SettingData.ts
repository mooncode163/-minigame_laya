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
    tag:number;
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
        }
        return this._main;
    }

}


