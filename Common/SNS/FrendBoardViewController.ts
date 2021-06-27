
 
export default class FrendBoardViewController  {
    static _main: FrendBoardViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new FrendBoardViewController();
            // this._main.Init();
        }
        return this._main;
    }
    properties: {
        uiPrefab: {
            default: null,
            type: Prefab
        }
        ui: {
            default: null,
            type: UIFrendBoard
        }


    } 
    CreateUI () {
        var node = instantiate(this.uiPrefab);
        this.ui = node.getComponent(UIFrendBoard);
        this.ui.SetController(this);
    }

    LoadPrefab () {
        var strPrefab = "Common/Prefab/FrendBoard/UIFrendBoard"; 
        PrefabCache.main.Load(strPrefab, function (err, prefab) {
            if (err) {
                Debug.Log("LoadPrefab err:" + err.message || err);
                return;
            }
            this.uiPrefab = prefab;
            this.CreateUI();
        }.bind(this)
        );
    }

    ViewDidLoad () {
        Debug.Log("FrendBoardViewController ViewDidLoad");
        super.ViewDidLoad();
        this.LoadPrefab();
    }
    ViewDidUnLoad () {
        Debug.Log("FrendBoardViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LayOut () {
        Debug.Log("FrendBoardViewController LayOutView");
        //  base.LayOutView();

    }

}



