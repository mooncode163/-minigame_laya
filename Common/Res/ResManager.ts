import Debug from "../Debug"; 
// 资源加载
// https://ldc2.layabox.com/doc/?nav=zh-js-4-3-1
export default class ResManager {
    /*
      {
        filepath:"", 
        success: (p:any) => {
            
        }, 
        fail: (p:any) => {
            
        },
      }
      */
    public static Load(obj: any) { 
        Laya.loader.load(obj.filepath, Laya.Handler.create(this, function (data:any): void { 
            var ret = Laya.loader.getRes(obj.filepath);
            if (obj.success != null) {
                obj.success(this, ret);
            }

        }));
    }


    /*
     {
       filepath:"", 
       success: (p:any,data:string) => {
           
       }, 
       fail: (p:any) => {
           
       },
     }
     */
    public static LoadText(obj: any) {  
        // Laya.loader.load("laya.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
        Laya.loader.load(obj.filepath, Laya.Handler.create(this, function (data:any): void { 
            var str: string = Laya.loader.getRes(obj.filepath);
            if (obj.success != null) {
                obj.success(this, str);
            }

        }));
    }


  
    public static LoadJson(obj: any) {  
        // Laya.loader.load("laya.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
        Laya.loader.load(obj.filepath, Laya.Handler.create(this, function (data:any): void { 
            var json: JSON = Laya.loader.getRes(obj.filepath);
            //  console.log(json["name"]);
            if (obj.success != null) {
                obj.success(this, json);
            }

        }));
    }

  /*
      {
          filepath:"", 
          success: function (p,tex:Texture2D) {
          },
          fail: function (p) {
          },
          progress: function (p) {
          } ,
        
      }
      */
    public static LoadPrefab(obj: any) { 
        console.log("ResManager LoadPrefab obj.filepath=" + obj.filepath); 
        var pic = obj.filepath; 
        Laya.loader.load(obj.filepath, Laya.Handler.create(this, function (pref:Laya.Prefab): void {
            if (obj.success != null) {
                obj.success(this, pref);
            }

            // 实例华并加载到舞台
            // this.owner.parent.addChild(data.create());

        }));

        
    }

    /*
      {
          filepath:"", 
          success: function (p,tex:Texture2D) {
          },
          fail: function (p) {
          },
          progress: function (p) {
          } ,
        
      }
      */


    public static LoadTexture(obj: any) {
        // texture spriteFrame
        console.log("ResManager LoadTexture obj.filepath=" + obj.filepath);
        // var pic = FileUtil.GetFileBeforeExtWithOutDot(obj.filepath) + "/texture";
        var pic = obj.filepath;
        // "res/threeDimen/texture/earth.png"
        //加载纹理
        Laya.Texture2D.load(pic, Laya.Handler.create(null, function (tex): void {
            //使用纹理
            // var earth1 = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(5, 32, 32))) as Laya.MeshSprite3D;
            // earth1.transform.translate(new Laya.Vector3(17, 20, 0));

            // var earthMat = new Laya.BlinnPhongMaterial();
            // earthMat.albedoTexture = tex;
            // earthMat.albedoIntensity = 1;
            // earth1.meshRenderer.material = earthMat;

            console.log("ResManager texture is not null");
            if (obj.success != null) {
                obj.success(this, tex);
            }

        }));

        
    }

    /*
  {
      url:"", 
      success: function (p:any,data:any) {
      },
      fail: function (p) {
      }, 
    
  }
  */
    public static LoadUrlTexture(obj: any) {
        this.LoadUrl(
            {
                url: obj.url,
                success: (p: any, tex: any) => {
                    if (obj.success != null) {


                        /*
                        let remoteUrl = "http://unknown.org/someres.png";
                    assetManager.loadRemote<ImageAsset>(remoteUrl, function (err, imageAsset) {
                        const spriteFrame = new SpriteFrame();
                        const texture = new Texture2D();
                        texture.image = imageAsset;
                        spriteFrame.texture = texture;
                        // ...
                    });
                    */
                        // const texture = new Texture2D();
                        // texture.image = tex;
                        // obj.success(this, texture);
                    }
                },
                fail: () => {
                    if (obj.fail != null) {
                        obj.fail(this);
                    }
                },
            });
    }

    /*
  {
      url:"", 
      success: function (p:any,data:any) {
      },
      fail: function (p) {
      },
      finish: function (p) {
      }, 
    
  }
  */

    //   weixin http://usr/moonma/CloudRes/Image/Star/Earth.png
    public static LoadUrl(obj: any) {
        Debug.Log("ResManager LoadUrl obj.url=" + obj.url);

      
        // assetManager.loadRemote(obj.url, function (err: any, data: any) {
        //     if (data == null) {
        //         console.log("ResManager LoadUrl is null err=", err);
        //         if (obj.fail != null) {
        //             obj.fail(this);
        //         }
        //         if (obj.finish != null) {
        //             obj.finish(this);
        //         }

        //     } else {
        //         console.log("ResManager LoadUrl is not null");
        //         if (obj.success != null) {
        //             obj.success(this, data);
        //         }
        //         if (obj.finish != null) {
        //             obj.finish(this);
        //         }
        //         // const spriteFrame = new SpriteFrame();
        //         // spriteFrame.texture = texture;
        //         // p.nodeBg.getComponent(Sprite).spriteFrame = spriteFrame;
        //     }
        // });
    }



    /*
     {
         filepath:"", 
         success: function (p,clip:AudioClip) {
         },
         fail: function (p) {
         }, 
     }
     */


    public static LoadAudio(obj: any) {
        // texture spriteFrame
        // console.log("ResManager LoadAudio obj.filepath=" + obj.filepath);
        // var pic = FileUtil.GetFileBeforeExtWithOutDot(obj.filepath);
        // resources.load(pic, AudioClip, (err: any, clip: AudioClip) => {
        //     if (clip == null) {
        //         // Bundle resources doesn't contain 1
        //         console.log("ResManager LoadAudio err:" + err.message || err);
        //         if (obj.fail != null) {
        //             obj.fail(this);
        //         }
        //     } else {
        //         console.log("ResManager LoadAudio is not null");
        //         if (obj.success != null) {
        //             obj.success(this, clip);
        //         }
        //     }

        // });

        /*
         assetManager.loadRemote('http://example.com/background.mp3', {
        audioLoadMode: AudioClip.AudioType.DOM_AUDIO,
    }, callback);

    */

    }

    /*
         {
             url:"", 
             success: function (p,clip:AudioClip) {
             },
             fail: function (p) {
             }, 
         }
         */
    public static LoadUrlAudio(obj: any) {
        // assetManager.loadRemote(obj.url, function (err: any, clip: AudioClip) {
        //     if (clip == null) {
        //         console.log("ResManager LoadUrlAudio is null err=", err);
        //         if (obj.fail != null) {
        //             obj.fail(this);
        //         }
        //     } else {
        //         console.log("ResManager LoadUrlAudio is not null");
        //         if (obj.success != null) {
        //             obj.success(this, clip);
        //         }

        //     }
        // });


        /*
         assetManager.loadRemote('http://example.com/background.mp3', {
        audioLoadMode: AudioClip.AudioType.DOM_AUDIO,
    }, callback);

    */

    }


}