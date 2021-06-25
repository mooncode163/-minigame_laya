import Debug from "../Debug"; 
import Dictionary from "../Dictionary";
import CSVParser from "../FileParse/CSV/CSVParser";
import { SysLanguage } from "./LanguageUtil";
 
export default class LTLocalization  {
    public static ENGLISH = "EN";
    public static CHINESE = "CN";
    public static JAPANESE = "JP";
    public static FRENCH = "FR";
    public static GERMAN = "GE";
    public static ITALY = "IT";
    public static KOREA = "KR";
    public static RUSSIA = "RU";
    public static SPANISH = "SP";


    KEY_CODE = "KEY";
    indexLanguage = 0;

    // private dicData: { [key: string]: string } = {}; //声明字典
    
    dicData:Dictionary = null;

    language = SysLanguage.CN;


    csvParser: CSVParser = null;


    GetLanguageKeyName(lan: string) {
        var ret = LTLocalization.CHINESE;
 
        switch (lan) {
            case SysLanguage.CN:
                {
                    ret = LTLocalization.CHINESE;
                }
                break;
            case SysLanguage.EN:
                {
                    ret = LTLocalization.ENGLISH;
                }
                break;
        }

        return ret;
    }

    GetLanguageIndexByName(str: string) {
        var listTable = this.csvParser.listTable;
        var list = listTable[0];
        for (var i = 1; i < list.length; i++) {
            //Debug.Log("GetLanguageIndexByName indexLanguage i=" + i + " list[i]=" + list[i] + " str=" + str);
            if (list[i] == str) {
                // Debug.Log("indexLanguage i=" + i + " list[i]=" + list[i] + " str=" + str);
                return i;
            }
        }
        return 1;
    }
    ReadData(data: any) {
        this.dicData = new Dictionary();
        this.csvParser = new CSVParser();
        this.csvParser.ReadData(data);
        this.SetLanguage(this.language);

    }

    SetLanguage(lan: any) {
        this.language = lan;
        if (this.dicData == null) {
            return;
        }
        this.dicData.Clear();
        var key_lan = this.GetLanguageKeyName(lan);
        this.indexLanguage = this.GetLanguageIndexByName(key_lan);

        //var row_count = this.csvParser.listTable.length;
        var row_count = this.csvParser.GetRowCount();

        Debug.Log("indexLanguage=" + this.indexLanguage + " key_lan=" + key_lan);

        for (var row = 0; row < row_count; row++) {
            var key = this.csvParser.GetText(row, 0);
            var value = this.csvParser.GetText(row, this.indexLanguage);
            //Debug.Log("dicData.Add key=" + key + " value=" + value);
            this.dicData.Add(key, value);
        }
    }
    GetLanguage() {
        return this.language;
    }

    GetText(key: any) {
        if (this.IsContainsKey(key)) {
            return this.dicData.Get(key);
        }
        return "[NoDefine]" + key;
    }

    IsContainsKey(key: any) {
        if (this.dicData == null) {
            return false;
        }
        var ret = this.dicData.Contains(key); 
        return ret;
    }



}
 