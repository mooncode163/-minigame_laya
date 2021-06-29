import Debug from "../Debug";
import UIView from "../UIKit/ViewController/UIView";
import UIViewUtil from "../UIKit/ViewController/UIViewUtil";


export default class TextureUtil {
    static UpdateImageTexture(image: Laya.Image, tex: Laya.Texture, isUpdateSize: boolean, border: Laya.Vector4) {
        image.source = tex;
        if (border != Laya.Vector4.ZERO) 
        {
            // border left right top bottom
             //sizeGrid  上边距,右边距,下边距,左边距
             var strsplit = ","
            //  image.sizeGrid = "32,32,32,32"; 
            // 九宫格
            image.sizeGrid = border.z.toString()+strsplit+border.y.toString()+strsplit+border.w.toString()+strsplit+border.x.toString()
            //image.sizeGrid = String(border.z)+strsplit+String(border.y)+strsplit+String(border.w)+strsplit+String(border.x)
            Debug.Log("image.sizeGrid="+image.sizeGrid);
        }

        if(isUpdateSize)
        { 
            UIViewUtil.SetNodeContentSize(image,tex.width,tex.height);
            // this.LayOut();
        }
    }

    static UpdateSpriteTexture(sprite: Laya.Sprite, tex: Laya.Texture, isUpdateSize: boolean, border: Laya.Vector4) {
        sprite.texture = tex;
        if (border != Laya.Vector4.ZERO) 
        {
        }

        if(isUpdateSize)
        { 
            UIViewUtil.SetNodeContentSize(sprite,tex.width,tex.height);
            // this.LayOut();
        }
    }

           
    /*
    static UpdateImageTexture(image: Sprite, tex: Texture2D, isUpdateSize: boolean, border: Vec4) {
        if (tex) {
            const spriteFrame = new SpriteFrame();
            spriteFrame.texture = tex;
            if (tex != null) {
                console.log("TextureUtil success tex is not null");
            } else {
                console.log("TextureUtil success tex is  null");
            }
            if (image != null) {
                console.log("TextureUtil success sp is not null");
                image.spriteFrame = spriteFrame;
            } else {
                console.log("TextureUtil success sp is null");
            }

            if (border != Vec4.ZERO) 
            {
                // Debug.Log("pic=" + pic + " spf=" + spf + " obj.top=" + obj.top);
                image.type = Sprite.Type.SLICED; 
             
                // 纹理的四个边距
                spriteFrame.insetLeft = border.x;
                spriteFrame.insetRight = border.y;
                
                spriteFrame.insetTop = border.z;
                spriteFrame.insetBottom = border.w;

                // spriteFrame.insetLeft = 32;
                // spriteFrame.insetRight = 32;
                // spriteFrame.insetTop = 32;
                // spriteFrame.insetBottom = 32;
              
            }
            
            if(isUpdateSize)
            {
                // this.SetContentSize(tex.width,tex.height);
                // this.LayOut();
            }

        }
    }
*/

}

