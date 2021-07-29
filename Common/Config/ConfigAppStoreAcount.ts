import Common from "../Common";
import JsonUtil from "../File/JsonUtil";
import ColorConfigInternal from "./ColorConfigInternal";
import ConfigAppStoreAcountInternal from "./ConfigAppStoreAcountInternal";
import ConfigBase from "./ConfigBase";




export default class ConfigAppStoreAcount extends ConfigBase {
    appstoreAcount: ConfigAppStoreAcountInternal = null;

    public static Type_password = "password";
    public static Type_ClientId = "ClientId";
    public static Type_ClientSecret = "ClientSecret";
    public static Type_API_KEY_ID = "API_KEY_ID";
    public static Type_API_USER_ID = "API_USER_ID";
    public static Type_teamID = "teamID";
    public static Type_CertificateID = "CertificateID";

    rootJson: any = null;

    static _main: ConfigAppStoreAcount;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new ConfigAppStoreAcount();
            this._main.Init();
        }
        return this._main;
    }
    Init() {

        var filePath = Common.RES_CONFIG_DATA_COMMON + "/appstore/AppStoreAcount.json";

        {
            this.appstoreAcount = new ConfigAppStoreAcountInternal();
            this.appstoreAcount.fileJson = filePath;
            this.listItem.push(this.appstoreAcount);
        }
        // string json = FileUtil.ReadStringAuto(filePath);
        // rootJson = JsonMapper.ToObject(json);

    }


    GetAcountInfo(store, acount, type) {
        var ret = this.appstoreAcount.GetAcountInfo(store, acount, type);
        return ret;
    }

}


