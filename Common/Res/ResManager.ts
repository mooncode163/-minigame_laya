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
        var filepath = obj.filepath;
        Laya.loader.load( filepath, Laya.Handler.create(this, function (data: any): void {
            var ret = Laya.loader.getRes(filepath);
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
        var filepath = obj.filepath;
        // filepath =  obj.filepath;
        Debug.Log("LoadText filepath="+filepath);
        Laya.loader.load(filepath, Laya.Handler.create(this, function (data: any): void {
            var str: string = Laya.loader.getRes(filepath);
            if (obj.success != null) {
                obj.success(this, str);
            }

        }));
    }



    public static LoadJson(obj: any) {
        var filepath = obj.filepath;
        // Laya.loader.load("laya.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
        Laya.loader.load( filepath, Laya.Handler.create(this, function (data: any): void {
            var json: JSON = Laya.loader.getRes(filepath);
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
        var filepath = obj.filepath;
        Laya.loader.load( filepath, Laya.Handler.create(this, function (pref: Laya.Prefab): void {
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
       }
       */
    public static LoadParticle(obj: any) {
        console.log("ResManager LoadParticle obj.filepath=" + obj.filepath);
        var filepath = obj.filepath;
        Laya.loader.load(filepath, Laya.Handler.create(this, function (data: any): void {
            var setting = Laya.loader.getRes(filepath);
            var particle: Laya.Particle2D = new Laya.Particle2D(setting);
            if (obj.success != null) {
                obj.success(this, particle);
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


    //  laya editor  f9 设置图片的最大 2048x2048 默认512x512
    // filepath 可以是本地图片 也可以是网络图片

    // ui 使用 Laya.loader.load  sprite 使用 Laya.Texture2D.load 不然显示会有问题 laya bug
    public static LoadTexture(obj: any) {
        // texture spriteFrame
        console.log("ResManager LoadTexture obj.filepath=" + obj.filepath);
        //加载纹理
        var filepath = obj.filepath;
        obj.isSprite = true;
        // if (obj.isSprite) 
        // {
        //     Laya.Texture2D.load(filepath, Laya.Handler.create(this, function (tex: Laya.Texture2D) {
        //         console.log("ResManager texture is not null");
        //         if (tex == null) {
        //             if (obj.fail != null) {
        //                 obj.fail(this);
        //             }
        //         } else {

        //             if (obj.success != null) {
        //                 Debug.Log("LoadTexture tex w=" + tex.width + " h=" + tex.height);
        //                 obj.success(this, tex);
        //             }
        //         }

        //     }.bind(this)));
        // }
        
        // else 
        
        {
            Laya.loader.load(filepath, Laya.Handler.create(this, function (data: any): void {
                console.log("ResManager texture is not null");
                var tex = Laya.loader.getRes(filepath);
                if (tex == null) {
                    if (obj.fail != null) {
                        obj.fail(this);
                    }
                } else {

                    if (obj.success != null) {
                        Debug.Log("LoadTexture tex w=" + tex.width + " h=" + tex.height);
                        obj.success(this, tex);
                    }
                }

            }));
        }



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
        Laya.loader.load(obj.url, Laya.Handler.create(this, function (data: any): void {
            var ret = Laya.loader.getRes(obj.url);
            if (obj.success != null) {
                obj.success(this, ret);
            }

        }));
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