
export default class SampleViewController extends UIViewController {

    uiPrefab: Laya.Prefab;
    ui: UISample;
    runCount = 0;

    static _main: SampleViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new SampleViewController();
        }
        return this._main;
    }

    ViewDidLoad() {
        Debug.Log("SampleViewController ViewDidLoad");
        super.ViewDidLoad(); 
        this.LoadPrefab();
    }
    ViewDidUnLoad() {
        Debug.Log("SampleViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LoadPrefab() { 
        var key = "UISample" 
        PrefabCache.main.LoadByKey(
            {
                key: key,
                // filepath: "Resources/AppCommon/Prefab/Home/UIHomeMerge.prefab",
                success: (p: any, data: any) => {
                    this.uiPrefab = data;

                    this.CreateUI();

                },
                fail: () => {

                },
            });
    }


    CreateUI() {
        Debug.Log("SampleViewController CreateUI");

        var node = UI.Instantiate(this.uiPrefab);
        this.ui = node.getComponent(UISample);
        this.ui.SetController(this);
    }

}