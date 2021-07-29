import CloudRes from "../../../../../Common/CloundRes/CloudRes";
import Debug from "../../../../../Common/Debug";
import FileUtil from "../../../../../Common/File/FileUtil";
import JsonUtil from "../../../../../Common/File/JsonUtil";
import ItemInfo from "../../../../../Common/ItemInfo";
import ResManager from "../../../../../Common/Res/ResManager";

export default class GameLearnData {
    indexItem = 0;
    countItem = 0;
    listItem: ItemInfo[] = [];

    static _main: GameLearnData;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new GameLearnData();
        }
        return this._main;
    }


    /*
   { 
   success: (p:any) => {
       
   }, 
   fail: (p:any) => {
       
   },
   }
   */
    StartParseItem(obj: any) {
        if ((this.listItem != null) && (this.listItem.length != 0)) {
            if (obj.success != null) {
                obj.success(this);
            }
            return;
        }
        var filepath = CloudRes.main.rootPath + "/Level/Learn.json";
        ResManager.LoadJson(
            {
                filepath: filepath,
                success: (p: any, data: any) => {
                    this.ParseItem(data);
                    if (obj.success != null) {
                        obj.success(this);
                    }
                },
                fail: () => {
                    if (obj.fail != null) {
                        obj.fail(this);
                    }
                },
            });


    }

    ParseItem(rootJson) {
        var items = rootJson["items"];
        for (var i = 0; i < items.length; i++) {
            var info = new ItemInfo();
            var item = items[i];
            info.id = item["id"];
            info.pic = this.GetImagePath(info.id);
            info.artist = JsonUtil.GetString(item, "pinyin", "");
            this.listItem.push(info);
        }
        Debug.Log("GameItems:this.listGameItems=" + this.listItem.length);

    }


    GetImagePath(id: string): string {
        return CloudRes.main.rootPath + "/Image/" + "Learn" + "/" + id + ".png";
    }
    GetItemInfo(idx: number): ItemInfo {
        return this.listItem[idx] as ItemInfo;
    }



    GetTotal(): number {
        if (this.listItem != null) {
            return this.listItem.length;
        }
        return 0;
    }


}



