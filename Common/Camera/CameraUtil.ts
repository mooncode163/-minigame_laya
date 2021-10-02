import Common from "../Common";
import Device from "../Device";

export default class CameraUtil {

  static _main: CameraUtil;
  //静态方法
  static get main() {
    if (this._main == null) {
      this._main = new CameraUtil();
    }
    return this._main;
  }

  private k_NearClip = 9.5;//0.3f;

  // public static  ScreenPointToWorldPoint(Camera cam, Vector2 screenPoint, float distanceToCamera = k_NearClip)
  // {
  //     //  float distanceToCamera = cam.nearClipPlane;
  //     //     distanceToCamera = 9.5f;
  //     return cam.ScreenToWorldPoint(new Vector3(screenPoint.x, screenPoint.y, distanceToCamera));
  // }

  GetWorldSize(cam: Laya.Camera, distanceToCamera = 9.5) {
    var ret = Laya.Vector2.ZERO;
    if (cam.orthographic) {
      // orthographicVerticalSize 默认为10 为屏幕顶部到底部的世界坐标距离
      // camera.orthographicVerticalSize = 7;

      var world_w = this.GetCameraWorldSizeWidth(cam);
      var world_h = cam.orthographicVerticalSize;
      return new Laya.Vector3(world_w, world_h, 1);
    }
    // float w = Screen.width;
    // float h = Screen.height;
    // Vector3 posworld_left = ScreenPointToWorldPoint(cam, new Vector2(0, 0), distanceToCamera);
    // Vector3 posworld_right = ScreenPointToWorldPoint(cam, new Vector2(w - 1, 0), distanceToCamera);

    // Vector3 posworld_up = ScreenPointToWorldPoint(cam, new Vector2(0, h - 1), distanceToCamera);
    // Vector3 posworld_down = ScreenPointToWorldPoint(cam, new Vector2(0, 0), distanceToCamera);
    // ret = new Vector3((posworld_right.x - posworld_left.x), (posworld_up.y - posworld_down.y), posworld_left.z);
    return ret;
  }

  GetCameraWorldSizeWidth(cam: Laya.Camera) {
    let screenSize = Device.main.screenSize;
    var ret = cam.orthographicVerticalSize * screenSize.width / screenSize.height;
    return ret;
  }


  //   public static Vector3 GetWorldSizeOfCanvasUI(Camera cam, GameObject objUI,float distanceToCamera = k_NearClip)
  // {
  //     Vector3 ret = Vector2.zero;
  //     // 屏幕坐标
  //     Vector2 pos_screen = objUI.transform.position;
  //     RectTransform rctran = objUI.GetComponent<RectTransform>();

  //     float w = Common.CanvasToScreenWidth(AppSceneBase.main.sizeCanvas, rctran.rect.width * rctran.localScale.x);
  //     float h = Common.CanvasToScreenHeight(AppSceneBase.main.sizeCanvas, rctran.rect.height * rctran.localScale.y);

  //     Vector3 posworld_left = ScreenPointToWorldPoint(cam, new Vector2(pos_screen.x - w / 2, 0), distanceToCamera); 
  //     Vector3 posworld_right = ScreenPointToWorldPoint(cam, new Vector2(pos_screen.x +w / 2, 0), distanceToCamera); 


  //     Vector3 posworld_up = ScreenPointToWorldPoint(cam, new Vector2(0, pos_screen.y + h / 2), distanceToCamera);
  //     Vector3 posworld_down = ScreenPointToWorldPoint(cam, new Vector2(0, pos_screen.y - h / 2), distanceToCamera);
  //     ret = new Vector3((posworld_right.x - posworld_left.x), (posworld_up.y - posworld_down.y), posworld_left.z);
  //     return ret;
  // }


  // // 通过ray获取屏幕点击的世界坐标
  // public static Vector3 GetWorldPositionByRay(Camera cam, Vector2 screenPoint)
  // {
  //     Vector3 ret = Vector3.zero;
  //     var ray = cam.ScreenPointToRay(screenPoint);
  //     RaycastHit hitInfo;
  //     if (Physics.Raycast(ray, out hitInfo))
  //     {
  //         ret = hitInfo.point;
  //         Debug.Log("GetWorldPositionByRay posworld=" + ret);
  //     }

  //     return ret;

  // }




  // https://www.cnblogs.com/huojiaoqingchun0123/p/11290143.html
  /**[SixGod]
       * 世界坐标转屏幕坐标
       * @param {Laya.Camera} camera   参照相机
       * @param {Laya.Vector3} point   需要转换的点
       */
  WorldToScreen2(camera, point) {
    var pointA = this.InverseTransformPoint(camera.transform, point);
    var distance = pointA.z;

    var out = new Laya.Vector3();
    camera.viewport.project(point, camera.projectionViewMatrix, out);
    var value = new Laya.Vector3(out.x / Laya.stage.clientScaleX, out.y / Laya.stage.clientScaleY, distance);
    return value;
  }/**[SixGod]
* 屏幕坐标转世界坐标
* @param {Laya.Camera} camera  参照相机
* @param {Laya.Vector3} point  需要转换的点
*/
  ScreenToWorld(camera, point) {
    var halfFOV = (camera.fieldOfView * 0.5) * Math.PI / 180;
    let height = point.z * Math.tan(halfFOV);
    let width = height * camera.aspectRatio;

    let lowerLeft = this.GetLowerLeft(camera.transform, point.z, width, height);
    let v = this.GetScreenScale(width, height);

    // 放到同一坐标系（相机坐标系）上计算相对位置
    var value = new Laya.Vector3();
    var lowerLeftA = this.InverseTransformPoint(camera.transform, lowerLeft);
    value = new Laya.Vector3(-point.x / v.x, point.y / v.y, 0);
    Laya.Vector3.add(lowerLeftA, value, value);
    // 转回世界坐标系
    value = this.TransformPoint(camera.transform, value);
    return value;
  }

  /**[SixGod]
  * 获取三维场景和屏幕比例
  * @param {Number} width     宽
  * @param {Number} height    长
  */
  GetScreenScale(width, height) {
    var v = new Laya.Vector3();
    v.x = Laya.stage.width / width / 2;
    v.y = Laya.stage.height / height / 2;
    return v;
  }

  /**[SixGod]
  * 获取相机在 distance距离的截面右下角世界坐标位置
  * @param {Laya.Transform} transform    相机transfrom
  * @param {Number} distance     距离
  * @param {Number} width        宽度
  * @param {Number} height       长度
  */
  GetLowerLeft(transform, distance, width, height) {
    // 相机在 distance距离的截面左下角世界坐标位置
    // LowerLeft
    var lowerLeft = new Laya.Vector3();

    // lowerLeft = transform.position - (transform.right * width);
    var right = new Laya.Vector3();
    transform.getRight(right);
    Laya.Vector3.normalize(right, right);
    var xx = new Laya.Vector3(right.x * width, right.y * width, right.z * width);
    Laya.Vector3.add(transform.position, xx, lowerLeft);

    // lowerLeft -= transform.up * height;
    var up = new Laya.Vector3();
    transform.getUp(up);
    Laya.Vector3.normalize(up, up);
    var yy = new Laya.Vector3(up.x * height, up.y * height, up.z * height);
    Laya.Vector3.subtract(lowerLeft, yy, lowerLeft);

    // lowerLeft += transform.forward * distance;
    var forward = new Laya.Vector3();
    transform.getForward(forward);
    Laya.Vector3.normalize(forward, forward);
    var zz = new Laya.Vector3(forward.x * distance, forward.y * distance, forward.z * distance);
    Laya.Vector3.subtract(lowerLeft, zz, lowerLeft);
    return lowerLeft;
  }

  /**[SixGod]
  * 世界坐标转相对坐标
  * @param {Laya.Transform} origin   camera.transform
  * @param {Laya.Vector3} point      需要转换的点
  */
  InverseTransformPoint(origin, point) {
    var xx = new Laya.Vector3();
    origin.getRight(xx);
    var yy = new Laya.Vector3();
    origin.getUp(yy);
    var zz = new Laya.Vector3();
    origin.getForward(zz);
    var zz1 = new Laya.Vector3(-zz.x, -zz.y, -zz.z);
    var x = this.ProjectDistance(point, origin.position, xx);
    var y = this.ProjectDistance(point, origin.position, yy);
    var z = this.ProjectDistance(point, origin.position, zz1);
    var value = new Laya.Vector3(x, y, z);
    return value;
  }

  /**[SixGod]
  * 相对坐标转世界坐标
  * @param {Laya.Transform} origin   camera.transform
  * @param {Laya.Vector3} point      需要转换的点
  */
  TransformPoint(origin, point) {
    var value = new Laya.Vector3();
    Laya.Vector3.transformQuat(point, origin.rotation, value);
    Laya.Vector3.add(value, origin.position, value);
    return value;
  }

  /**[SixGod]
  * 向量投影长度, 向量CA 在向量 CB 上的投影长度
  * @param {Laya.Vector3} A
  * @param {Laya.Vector3} C
  * @param {Laya.Vector3} B
  */
  ProjectDistance(A, C, B) {
    var CA = new Laya.Vector3();
    Laya.Vector3.subtract(A, C, CA);
    var angle = this.Angle2(CA, B) * Math.PI / 180;
    var distance = Laya.Vector3.distance(A, C);
    distance *= Math.cos(angle);
    return distance;
  }

  /**[SixGod]
  * 向量夹角
  * @param {Laya.Vector3} ma 向量A
  * @param {Laya.Vector3} mb 向量B
  */
  Angle2(ma, mb) {
    var v1 = (ma.x * mb.x) + (ma.y * mb.y) + (ma.z * mb.z);
    var ma_val = Math.sqrt(ma.x * ma.x + ma.y * ma.y + ma.z * ma.z);
    var mb_val = Math.sqrt(mb.x * mb.x + mb.y * mb.y + mb.z * mb.z);
    var cosM = v1 / (ma_val * mb_val);

    if (cosM < -1) cosM = -1;
    if (cosM > 1) cosM = 1;

    var angleAMB = Math.acos(cosM) * 180 / Math.PI;
    return angleAMB;
  }

}


