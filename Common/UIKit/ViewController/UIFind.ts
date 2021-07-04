

import Debug from "../../Debug";
import UIButton from "../UIButton/UIButton";
import UIImage from "../UIImage/UIImage";
import UIText from "../UIText/UIText";

export default class UIFind {

    static Find(parent: Laya.Node, name: string): Laya.Node {
        return parent.getChildByName(name);

        // var listNode = [];
        // listNode.push(parent);
        // for (var i = 0; i < parent.numChildren; i++) {
        //     var child = parent.getChildAt[i];
        //     listNode.push(child);
        // }

        // listNode.forEach((item) => {
        //     if (item != null) {
        //         var node = item.getChildByName(name);;
        //         if (node != null) {
        //             return node;
        //         }
        //     }
        // }); 
        // return null;
    }

    // 按名字查找子对象
    static FindChild(parent: Laya.Node, name: string): Laya.Node {
        return parent.getChildByName(name);
    }




    // 按名字查找子对象中的uibutton
    static FindButton(parent: Laya.Node, name: string): UIButton {
        var node = UIFind.Find(parent, name);
        if (node != null) {
            return node.getComponent(UIButton);
        }
        return null;
    }
    static FindImage(parent: Laya.Node, name: string): UIImage {
        var node = UIFind.Find(parent, name);
        if (node != null) {
            return node.getComponent(UIImage);
        }
        return null;
    }
    static FindText(parent: Laya.Node, name: string): UIText {
        var node = UIFind.Find(parent, name);
        if (node != null) {
            return node.getComponent(UIText);
        }
        return null;
    }
}


