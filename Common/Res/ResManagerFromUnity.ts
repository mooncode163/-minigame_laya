import Debug from "../Debug";
// 3D场景编辑导出-LayaAir引擎Unity插件使用详解 : https://www.233tw.com/laya/5568
// 加载laya的unity插件导出资源 https://ldc2.layabox.com/doc/?nav=zh-js-4-8-2
// https://ldc2.layabox.com/doc/?nav=zh-js-4-3-1

/*
// @moon
1  laya 导出unity资源 工具设置:
  需要将导出工具的 节点设置-“批量导出一级节点” 勾上 不然在导出 预设 时候会把场景里的cammera和light 全部导出 这样的话 在laya加载lh 预设体的时候同时包含了多余的cammera和light 
 会导致冲突,显示不正常等问题

 2,导出粒子显示方块 是因为材质的透明度处理问题,需要在laya加载是时候重新场景材质

               // 加载unity 的粒子
        Laya.Sprite3D.load("LayaScene_LayaLizi/Conventional/Particle System.lh", Laya.Handler.create(this, function (sp) {
            var sp3d: Laya.ShuriKenParticle3D = scene.addChild(sp) as Laya.ShuriKenParticle3D;
            console.log(sp3d);
            // sp3d = sp3d.getChildByName("Particle System") as Laya.ShuriKenParticle3D;
            var material: Laya.ShurikenParticleMaterial = new Laya.ShurikenParticleMaterial();
            // material.renderMode = Laya.BlinnPhongMaterial.RENDERMODE_TRANSPARENT;  
            sp3d.particleRenderer.material = material;
            Laya.Texture2D.load("IconLearnList.png", Laya.Handler.create(null, function (tex: Laya.Texture2D) {
                material.texture = tex;
            }));
        }));

// @moon
*/
/*
资源类型
.ls为场景文件，选择导出Scene类别时生成。其中包含了场景需要的各种数据、光照贴图、模型、位置等。需使用 Scene3D 类加载。
.lh为预设文件，选择导出Sprite3D类别时生成。其中缺少场景信息，其他的特征与.ls文件相同，但是需要使用 Sprite3D 类加载。
.lm为模型数据文件，通常是FBX格式的转换而成。可以使用 MeshSprite3D 类加载。
.lmat为材质数据文件，是在unity中为模型设置的材质信息。加载.ls或.lh文件时会自动加载.lmat文件来产生材质。可以使用 BaseMaterial 类来加载。
.lani为动画数据文件。如果模型上有动画，导出后将生成的动画配置文件，其中包含了动画帧数据。加载可以使用 AnimationClip 类来加载。
.jpg,.png：为普通的图片文件。
.ktx :安卓平台下的压缩纹理的图片格式。
.pvr ：iOS平台下的压缩纹理的图片格式。
.ltc ：天空盒文件，该天空盒为Cube天空盒，文件中记录了六张图片，分别对应天空盒的六个面。
.ltcb : 二进制的天空盒文件，该天空盒文件为一张图片，其中记录了反射场景的反射信息。
.jpg,.png,.ktx,.pvr,.ltc,.ltcb等是贴图文件。如果有使用到贴图，unity导出后将会生成贴图文件。可以使用 Texture2D 类来加载。


Laya的Unity导出插件的注意事项:  https://zhuanlan.zhihu.com/p/82067089
所有Shader必须转换为Laya自带的Shader,它们的前缀为LayaAir3D.其中我们自己用的最多的就是LayaAir3D/Mesh/Unlit(或LayaAir3D/Unlit,版本不同名字不一样)不受光shader,且支持透明
模型动作中只支持position,rotation,scale变化,不支持blend shape等高级操作,而且导出的报错让你摸不着头脑.如果硬要导出一个包含不支持属性的动作,可以通过在Animation窗口中删除不支持的属性.如果你的动作是只读动作(通常包含在fbx里)可以通过复制这个动作到同级目录下,新复制出来的动作就是可以更改的.
一个模型的动作如果是骨骼动作的话那么它的Animator必须要有Avatar,有骨骼动作的模型在导出到Laya以后内部的节点结构与Unity的会有不同.可以通过查看Laya导出的ls或lh文件来确定节点具体位置.
没有骨骼动作的Animation如果放上了Avatar以后动画播放也会不正常,所以一个动作是不是骨骼动画你要提前分辨好.
导出设定中导出Scene和Sprite3D都会把当前场景全部导出去,他们的区别仅仅是Scene有一些场景相关性属性,而Sprite3D没有罢了.如果你只想导出一个A物体,记得在Laya中加载完毕以后选择getChildAt(0)才能获得到该A物体,因为导出的时候它会在你要导出的内容上包一层Sprite3D或Scene对象.在Laya 2.0.2beta中在导出成Sprite3D是可以选择将场景中的对象分别导出各自的Sprite3D.

*/

export default class ResManagerFromUnity {
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
        Laya.loader.load(obj.filepath, Laya.Handler.create(this, function (data: any): void {
            var ret = Laya.loader.getRes(obj.filepath);
            if (obj.success != null) {
                obj.success(this, ret);
            }

        }));
    }




    /*
        {
            // Particle System.lh
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
        console.log("ResManagerFromUnity LoadPrefab obj.filepath=" + obj.filepath); 
        //加载3D预设（3D精灵）
        Laya.Sprite3D.load(obj.filepath, Laya.Handler.create(null, function (sp) {
            if (obj.success != null) {
                obj.success(this, sp);
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
       }
       */
    public static LoadParticle(obj: any) {
        console.log("ResManager LoadParticle obj.filepath=" + obj.filepath);
        Laya.loader.load(obj.filepath, Laya.Handler.create(this, function (data: any): void {
            var setting = Laya.loader.getRes(obj.filepath);
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
    public static LoadTexture(obj: any) {
        // texture spriteFrame
        console.log("ResManager LoadTexture obj.filepath=" + obj.filepath);
        //加载纹理
        // Laya.loader.load(obj.filepath, Laya.Handler.create(this, function (data: any): void {
        //     console.log("ResManager texture is not null");
        //     var tex = Laya.loader.getRes(obj.filepath);
        //     if (tex == null) {
        //         if (obj.fail != null) {
        //             obj.fail(this);
        //         }
        //     } else {

        //         if (obj.success != null) {
        //             Debug.Log("LoadTexture tex w=" + tex.width + " h=" + tex.height);
        //             obj.success(this, tex);
        //         }
        //     }

        // }));
      Laya.Texture2D.load(obj.filepath, Laya.Handler.create(this, function (tex: Laya.Texture2D) { 
            console.log("ResManager Laya.Texture2D.load obj.filepath=" + obj.filepath);
            if (tex == null) {
                console.log("ResManager Laya.Texture2D texture is null fail");
                if (obj.fail != null) {
                    obj.fail(this);
                }
            } else { 
                console.log("ResManager Laya.Texture2D.load  success before");
                if (obj.success != null)  
                {
                    Debug.Log("LoadTexture  Laya.Texture2D.load tex w=" + tex.width + " h=" + tex.height);
                    obj.success(this, tex);
                }else{
                    console.log("ResManager Laya.Texture2D.load  success null");
                }
            }

        }.bind(this)));

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