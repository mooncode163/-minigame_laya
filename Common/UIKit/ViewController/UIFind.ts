

import Debug from "../../Debug";
import UIButton from "../UIButton/UIButton";
import UIImage from "../UIImage/UIImage";
import UIText from "../UIText/UIText";
import UI from "./UI";

export default class UIFind {

    // isAll = false 只查找当前子节点  true 嵌套查找所以子节点
    static Find(parent: Laya.Node, name: string, isAll: boolean = true): Laya.Node {
        // var node = parent.getChildByName(name);
        if (isAll) {
            return UIFind.FindAll(parent, name);
        } else {
            return UIFind.FindChild(parent, name);
        }
    }

    // 按名字查找子对象
    static FindChild(parent: Laya.Node, name: string): Laya.Node {
        // return parent.getChildByName(name);
        return UIFind.FindByName(parent, name);
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



    // isAll = false 只查找当前子节点  true 嵌套查找所以子节点 当isAll = false时如果字节点没有找到 自动切换成true再查找
    static FindUI(parent: Laya.Node, name: string, componentType: typeof Laya.Component, isAll: boolean = false): any {
        var node = UIFind.Find(parent, name, isAll);
        if (isAll == false) {
            if (node == null) {
                // 自动切换成true再查找
                node = UIFind.Find(parent, name, true);
            }
        }
        if (node != null) {
            return node.getComponent(componentType);
        }
        return null;
    }
    static FindUIByPath(parent: Laya.Node, path: string, componentType: typeof Laya.Component): any {
        var node = UIFind.FindByPath(parent, path);
        if (node != null) {
            return node.getComponent(componentType);
        }
        return null;
    }
}


