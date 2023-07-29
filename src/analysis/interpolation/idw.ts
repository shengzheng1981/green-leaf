
import { ScreenXY } from "../../common/screen-xy";
import { Feature } from "../../feature/feature";
import { FeatureClass } from "../../feature/feature-class";
import { Field } from "../../feature/field";
import { GeometryType } from "../../geometry/geometry";
import { Point } from "../../geometry/point";
import { Raster } from "../../raster/raster";


/*
 * 反距离加权法（Inverse Distance Weighted）插值
 */
export class IDW extends Raster {

  private _featureClass: FeatureClass;
  private _field: Field;
  private _min: number;
  private _max: number;
  private _ramp: HTMLCanvasElement;
  private _origin: ScreenXY;

  /**
   * 分辨率
   */
  public resolution: number = 10;  //
  /**
   * 渐变色
   */
  //["#006837", "#1a9850", "#66bd63", "#a6d96a", "#d9ef8b", "#ffffbf", "#fee08b", "#fdae61", "#f46d43", "#d73027", "#a50026"]
  public gradient: any[] = [
    { step: 0, color: "#006837" },
    { step: 0.1, color: "#1a9850" },
    { step: 0.2, color: "#66bd63" },
    { step: 0.3, color: "#a6d96a" },
    { step: 0.4, color: "#d9ef8b" },
    { step: 0.5, color: "#ffffbf" },
    { step: 0.6, color: "#fee08b" },
    { step: 0.7, color: "#fdae61" },
    { step: 0.8, color: "#f46d43" },
    { step: 0.9, color: "#d73027" },
    { step: 1, color: "#a50026" }
  ];
  /**
   * 反距离函数
   */
  public decay: any = (distance) => {
    return 1 / Math.pow(distance, 3);
  }
  /*
  * 蜂窝显示
  */
  public honey: boolean = false;
  /*
  * 蜂窝边长
  */
  public honeySide: number = 10;
  /*
  * 蜂窝颜色
  */
  public honeyColor: string = "#ffffff88";
  /*
  * 动态栅格（实时渲染）
  */
  get dynamic(): boolean {
    return true;
  }
  get min(): number {
    return this._min;
  }
  set min(value: number) {
    this._min = value;
  }
  get max(): number {
    return this._max;
  }
  set max(value: number) {
    this._max = value;
  }
  /**
   * 创建插值
   */
  constructor() {
    super(0, 0, 0, 0);
  }

  project() {
    if (!this._crs) return;
    let feature = this._featureClass.first;
    while (feature) {
      feature.geometry.crs = this._crs;
      feature = feature.next;
    }
  }

  transform(origin: ScreenXY, zoom: number) {
    this._origin = origin;
    let feature = this._featureClass.first;
    while (feature) {
      feature.geometry.transform(origin, zoom);
      feature = feature.next;
    }
  }

  /*
   * 初始化
   * @param {FeatureClass} featureClass - 点要素类
   * @param {Field} field - 值字段
   */
  generate(featureClass: FeatureClass, field: Field) {
    if (featureClass.type != GeometryType.Point) return;
    this._featureClass = featureClass;
    this._field = field;
    const values = featureClass.features.map(feature => feature.properties[field.name]);
    this._min = this._min || Math.min(...values), this._max = this._max || Math.max(...values);
    //初始化色带，256个颜色，1个像素代表1个颜色
    this._ramp = document.createElement("canvas");
    const ramp = this._ramp.getContext('2d');
    this._ramp.width = 256;
    this._ramp.height = 1;
    const grd = ramp.createLinearGradient(0, 0, this._ramp.width, this._ramp.height);
    this.gradient.forEach(item => {
      grd.addColorStop(item.step, item.color);
    });
    ramp.fillStyle = grd;
    ramp.fillRect(0, 0, this._ramp.width, this._ramp.height);
  }

  /**
   * 绘制栅格
   * @remarks
   * 遍历图形集合进行绘制
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {Projection} projection - 坐标投影转换
   * @param {Bound} extent - 当前可视范围
   * @param {number} zoom - 当前缩放级别
   */
  draw(ctx: CanvasRenderingContext2D) {
    if (!this._featureClass || !this._field) return;
    const valueData = [];
    // const canvas = document.createElement("canvas");
    // canvas.width = ctx.canvas.width;
    // canvas.height = ctx.canvas.height;
    // canvas.style.width = ctx.canvas.style.width;
    // canvas.style.height = ctx.canvas.style.height;
    // canvas.style.transform = ctx.canvas.style.transform;
    // const gray = canvas.getContext("2d");
    // // const gray = this.honey ? canvas.getContext("2d") : ctx;  
    // const matrix = ctx.getTransform();
    // gray.setTransform(matrix.a, 0, 0, matrix.d, matrix.e, matrix.f);
    const matrix = ctx.getTransform();
    //抽稀
    /*const cluster = this._featureClass.features.reduce( (acc, cur) => {
        if (cur.geometry instanceof Point) {
            const point: Point = cur.geometry;
            const item: any = acc.find((item: any) => {
                const distance = point.distance(item.geometry, CoordinateType.Screen, ctx, projection);
                return distance <= 20;
            });
            if (!item) acc.push(cur);
            return acc;
        }
    }, []);*/
    //生成(x,y,value),
    //1.如x,y地理平面坐标，则可放到初始化代码中；
    //2.如x,y屏幕平面坐标，则放在此处，每次重绘重新坐标变换；
    this._featureClass.features.forEach((feature: Feature) => {
      const value = feature.properties[this._field.name];
      if (value != undefined) {
        const point: Point = feature.geometry as any;
        // const screenX = point.screenXY.x;
        // const screenY = point.screenXY.y;
        const screenX = matrix.a * point.screenXY.x + matrix.e;
        const screenY = matrix.d * point.screenXY.y + matrix.f;
        valueData.push([screenX, screenY, (value - this._min) / (this._max - this._min)]);
      }
    });

    //根据alpha值找到色带中对应颜色
    const colorData = this._ramp.getContext("2d").getImageData(0, 0, 256, 1).data;
    //是否采用蜂窝网格渲染
    if (this.honey) {

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.strokeStyle = this.honeyColor;
      ctx.lineWidth = 1;
      let flag = 0; //奇偶标志
      //循环y轴
      for (let y = 0; y <= ctx.canvas.height; y = Math.floor(y + this.honeySide * 1.732 / 2)) {
        //循环x轴
        for (let x = 0 + flag * (3 / 2 * this.honeySide); x <= ctx.canvas.width; x = x + 3 * this.honeySide) {
          //通过蜂窝网格中心点(x,y)，计算该点的反距离插值
          let values = 0, weights = 0;
          valueData.forEach(item => {
            let distance = Math.sqrt((item[0] - x) * (item[0] - x) + (item[1] - y) * (item[1] - y));
            distance = distance < 1 ? 1 : distance;
            let weight = this.decay(distance);
            values += weight * item[2];
            weights += weight;
          });
          if (weights) {
            //插值对比色带，找到填充色，填充整个网格
            const alpha = Math.floor(values / weights * 255);
            ctx.fillStyle = "rgba(" + colorData[4 * alpha] + "," + colorData[4 * alpha + 1] + "," + colorData[4 * alpha + 2] + "," + alpha / 255 + ")";
            ctx.beginPath();
            //绘制蜂窝网格
            ctx.moveTo(x - this.honeySide, y);
            ctx.lineTo(x - 1 / 2 * this.honeySide, Math.floor(y - this.honeySide * 1.732 / 2));
            ctx.lineTo(x + 1 / 2 * this.honeySide, Math.floor(y - this.honeySide * 1.732 / 2));
            ctx.lineTo(x + this.honeySide, y);
            ctx.lineTo(x + 1 / 2 * this.honeySide, Math.floor(y + this.honeySide * 1.732 / 2));
            ctx.lineTo(x - 1 / 2 * this.honeySide, Math.floor(y + this.honeySide * 1.732 / 2));
            ctx.lineTo(x - this.honeySide, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        }
        //奇偶行换位
        flag = flag === 0 ? 1 : 0;
      }
      ctx.restore();
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = ctx.canvas.width / this.resolution;
      canvas.height = ctx.canvas.height / this.resolution;
      // canvas.width = ctx.canvas.width;
      // canvas.height = ctx.canvas.height;
      // canvas.style.width = ctx.canvas.style.width;
      // canvas.style.height = ctx.canvas.style.height;
      // canvas.style.transform = ctx.canvas.style.transform;
      const gray = canvas.getContext("2d");
      
      gray.setTransform(matrix.a, 0, 0, matrix.d, matrix.e, matrix.f);
      const imgData = gray.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let i = 0; i < data.length; i = i + 4) {
        const screenY = i / (4 * canvas.width) * this.resolution, screenX = i / 4 % canvas.width * this.resolution;
        // const screenY = i / (4 * canvas.width), screenX = i / 4 % canvas.width;
        let values = 0, weights = 0;
        //加权
        valueData.forEach(item => {
          let distance = Math.sqrt((item[0] - screenX) * (item[0] - screenX) + (item[1] - screenY) * (item[1] - screenY));
          distance = distance < 1 ? 1 : distance;
          let weight = this.decay(distance);
          values += weight * item[2];
          weights += weight;
        });
        //像素RGB赋值，赋值方式参考热力图
        if (weights) {
          const alpha = Math.floor(values / weights * 255);
          data[i] = colorData[4 * alpha];            //R
          data[i + 1] = colorData[4 * alpha + 1];    //G
          data[i + 2] = colorData[4 * alpha + 2];    //B
          data[i + 3] = alpha;
        }
      }
      gray.putImageData(imgData, 0, 0);
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(canvas, 0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
      // ctx.save();
      // ctx.putImageData(imgData, 0, 0);
      // ctx.restore();
    }
  }
}