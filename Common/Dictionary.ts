import Debug from "./Debug";

 
export default class Dictionary  {
    datastore: any[] = []; 
    Init () {
     
    } 
    Add (key:string, value:any) {
        this.datastore[key] = value;
    }

    Get (key:string) {
        return this.datastore[key];
    }

    Remove (key:string) {
        delete this.datastore[key];
    }

    ShowAll () {
        var str = "";
        for (var key in this.datastore) {
            str += key + " -> " + this.datastore[key] + ";  "
        }
        // Debug.Log(str);
    }

    Count () {
        /*var ss = Object.keys(this.datastore).length;
        console.log("ssss   "+ss);
        return Object.keys(this.datastore).length;*/
        /**/
        var n = 0;
        for (var key in Object.keys(this.datastore)) {
            ++n;
        }
        // Debug.Log(n);
        return n;
    }

    Clear () {
        for (var key in this.datastore) {
            delete this.datastore[key];
        }
    }

    Contains (key:string) {
        var v = this.Get(key);
        if (v == null) {
            return false;
        }
        return true;
    }

}


