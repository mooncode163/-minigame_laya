
 
export default class UINaviBar extends UIView {
    imageBg: UIImage | null = null;
    textTitle: UIText | null = null;
    btnBack: UIButton | null = null;
    onAwake() {
        super.onAwake();
       // this.btnBack.node.active = false;
    }

    onStart() {
        // [3]
        super.onStart();

    }



    UpdateTitle(title: string) {
       // this.textTitle.text = title;
    }
    HideBtnBack(isHide: boolean) {
       // this.btnBack.node.active = !isHide;
    }
}



