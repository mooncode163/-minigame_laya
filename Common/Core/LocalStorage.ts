import Common from "../Common";
import Debug from "../Debug";


export default class LocalStorage {

  static SetBool(key: string, value: boolean) {
    Laya.LocalStorage.setItem(key, value.toString());

  }

  static GetBool(key: string, default_value: boolean = false) {
    var v = Laya.LocalStorage.getItem(key);
    if (Common.BlankString(v)) {
      //Debug.Log("key is null:" + key);
      return default_value;
    }
    if (v == "true") {
      return true;
    } else {
      return false;
    }


  }
  static GetItem(key: string, default_value: any) {
    var v = Laya.LocalStorage.getItem(key);
    if (Common.BlankString(v)) {
      //Debug.Log("key is null:" + key);
      return default_value;
    }
    return v;
  }
  static SetItem(key: string, value: any) {
    Laya.LocalStorage.setItem(key, value);
  }

  static GetInt(key: string, default_value: number) {
    var v = Laya.LocalStorage.getItem(key);
    //微信小程序key不存在的时候返回""而非null
    if (Common.BlankString(v)) {
      Debug.Log("key is null:" + key);
      return default_value;
    }
    var v_int = parseInt(v);
    //Debug.Log("GetIntOfKey key=:" + key + " v=" + v + " v_int=" + v_int);
    return v_int;
  }

}


