

import Debug from "../../Debug";
import UIButton from "../UIButton/UIButton";
import UIImage from "../UIImage/UIImage";
import UIText from "../UIText/UIText";
import UI from "./UI";

export default class UIFind {

    static Find(parent: Laya.Node, name: string): Laya.Node {
        // var node = parent.getChildByName(name);
        return UIFind.FindAll(parent, name);
    }

     // 按名字查找子对象
    static FindChild(parent: Laya.Node, name: string): Laya.Node {
        return parent.getChildByName(name); 
    }

    // 嵌套查询所有的子节点
    static FindAll(parent: Laya.Node, name: string): Laya.Node {
        var listNode = [];
        listNode.push(parent);
        UIFind.GetAllChild(parent, listNode);
        var ret = null;
        listNode.forEach((item) => {
            // Debug.Log("FindAll name="+item.name);
            if (item.name.toLowerCase() == name.toLowerCase()) {
                Debug.Log("FindAll  name= return " + item.name);
                ret = item;

                // TS forEach 跳出 必须用return 不能用break
                return;
            }

        });
        return ret;
    }

    // 所有子节点
    static GetAllChild(parent: Laya.Node, listNode: Laya.Node[]) {
        // listNode.push(parent);
        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.getChildAt(i);
            listNode.push(child);
            UIFind.GetAllChild(child, listNode);
        }
    }

    // Head/BtnClose
    static FindByPath(parent: Laya.Node, path: string): Laya.Node {
        var listName = path.split("/");
        if (listName.length == 0) {
            return null;
        }

        var nodeParent = parent;
        var nodeFind = null;
        for (var i = 0; i < listName.length; i++) {
            var name = listName[i];
            Debug.Log("FindByPath name=" + name);
            nodeFind = UIFind.FindByName(nodeParent, name);
            if (nodeFind != null) {
                nodeParent = nodeFind;
            } else {

            }
        }
        return nodeFind;
    }


    // name 不分大小写
    // toUpperCase toLowerCase
    static FindByName(parent: Laya.Node, name: string): Laya.Node {
        // return parent.getChildByName(name);
        // Debug.Log("FindByName  parent.numChildren="+parent.numChildren);
        for (var i = 0; i < parent.numChildren; i++) {
            var child = parent.getChildAt(i) as Laya.Node;
            if (child == undefined) {
                continue;
            }
            var strtype = typeof child
            Debug.Log("FindByName child strtype=" + strtype);
            if (strtype != "undefined") {
                Debug.Log("FindByName child name=" + child.name);
                if (child.name.toLowerCase() == name.toLowerCase()) return child;
            }
        }
        return null;
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


    // path
    static FindButtonByPath(parent: Laya.Node, path: string): UIButton {
        var node = UIFind.FindByPath(parent, path);
        if (node != null) {
            return node.getComponent(UIButton);
        }
        return null;
    }
    static FindImageByPath(parent: Laya.Node, path: string): UIImage {
        var node = UIFind.FindByPath(parent, path);
        if (node != null) {
            return node.getComponent(UIImage);
        }
        return null;
    }

    static FindTextByPath(parent: Laya.Node, path: string): UIText {
        var node = UIFind.FindByPath(parent, path);
        if (node != null) {
            return node.getComponent(UIText);
        }
        return null;
    }

}


