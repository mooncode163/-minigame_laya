

export default class TextureUtil {
    static UpdateImageTexture(image:Laya.Sprite, tex: Laya.Texture2D, isUpdateSize: boolean, border: Laya.Vector4) {
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

