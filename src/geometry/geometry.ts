import { LatLngBounds } from "../common/latlng-bounds";
import { PlaneBounds } from "../common/plane-bounds";
import { ScreenBounds } from "../common/screen-bounds";
import { Symbol } from '../symbol/symbol';
import { Text } from '../text/text';
import { ScreenXY } from "../common/screen-xy";
import { CRS } from "../crs/crs";
import { XY } from "../common/xy";

/**
 * 坐标类型
 * @enum {number}
 */
export enum CoordinateType {
  //经纬度坐标
  Latlng = 1,
  //地理平面坐标
  Plane = 2,
  //屏幕平面坐标
  Screen = 3
}

/**
 * 图形类型
 * @enum {number}
 */
export enum GeometryType {
  //点
  Point = 1,
  //线
  Polyline = 2,
  //面
  Polygon = 3,

  // MultiplePoint = 4,

  // MultiplePolyline = 5,

  // MultiplePolygon = 6
}

/**
 * 图形基类
 */
export abstract class Geometry {
  protected _type: GeometryType;
  /**
   * 坐标投影变换
   */
  // protected _projection: Projection;
  protected _crs: CRS;
  /**
   * 包络矩形
   */
  protected _latlngBounds: LatLngBounds;
  protected _planeBounds: PlaneBounds;
  protected _screenBounds: ScreenBounds;

  get type(): GeometryType {
    return this._type;
  }
  /**
   * 包络矩形
   * @remarks
   * 注意bound的坐标类型：一般为地理平面坐标，即投影后坐标
   */
  get latlngBounds(): LatLngBounds {
    return this._latlngBounds;
  }

  get planeBounds(): PlaneBounds {
    return this._planeBounds;
  }

  get screenBounds(): ScreenBounds {
    return this._screenBounds;
  }

  get crs(): CRS {
    return this._crs;
  }

  set crs(value: CRS) {
    this._crs = value;
    this.project();
  }

  /**
   * 输出GeoJSON
   */
  abstract toGeoJSON();

  /**
   * 投影变换虚函数
   * @param {Projection} projection - 坐标投影转换
   */
  abstract project();


  abstract transform(origin: ScreenXY, zoom: number, symbol?: Symbol);
  /**
   * 图形绘制虚函数
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {Projection} projection - 坐标投影转换
   * @param {Bound} extent - 当前可视范围
   * @param {Symbol} symbol - 渲染符号
   */
  abstract draw(ctx: CanvasRenderingContext2D, symbol?: Symbol);

  // animate(elapsed, ctx: CanvasRenderingContext2D, projection: Projection = new WebMercator(), extent: Bound = projection.bound, animation: Animation) {};

  /**
   * 是否包含传入坐标
   * @remarks 主要用于鼠标交互
   * @param {number} screenX - 鼠标屏幕坐标X
   * @param {number} screenX - 鼠标屏幕坐标Y
   * @return {boolean} 是否落入
   */
  // contain(screenX: number, screenY: number): boolean { return false; }
  abstract contains(screenXY: ScreenXY);
  /**
   * 图形包络矩形与可见视图范围是否包含或相交
   * @param {Projection} projection - 坐标投影转换
   * @param {Bound} extent - 当前可视范围
   * @return {boolean} 是否在可视范围内
   */
  // intersect(projection: Projection = new WebMercator(), extent: Bound = projection.bound): boolean {
  //     if (!this._projected) this.project(projection);
  //     return extent.intersect(this._bound);
  // }

  /**
   * 获取图形中心点虚函数
   * @param {CoordinateType} type - 坐标类型
   * @param {Projection} projection - 坐标投影转换
   * @return {number[]} 中心点坐标
   */
  getCenter(type: CoordinateType = CoordinateType.Latlng) {
    if (type === CoordinateType.Plane) {
      return this._planeBounds.getCenter();
    } else if (type === CoordinateType.Screen) {
      return this._screenBounds.getCenter();
    } else {
      return this._latlngBounds.getCenter();
    }
  }
  // getCenter(type: CoordinateType = CoordinateType.Latlng, projection: Projection = new WebMercator()) {};

  /**
   * 获取图形包络矩形
   * 针对新建图形，还未进行投影的情况
   * @param {Projection} projection - 坐标投影转换
   * @return {number[]} 包络矩形
   */
  // getBound(projection: Projection = new WebMercator()) {
  //     if (!this._projected) this.project(projection);
  //     return this._bound;
  // };

  /**
   * 获取两个图形间距离
   * @remarks
   * 当前为两图形中心点间的直线距离
   * 多用于聚合判断
   * @param {Geometry} geometry - 另一图形
   * @param {CoordinateType} type - 坐标类型
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {Projection} projection - 坐标投影转换
   * @return {number} 距离
   */
  distance(geometry: Geometry, type: CoordinateType = CoordinateType.Screen) {
    if (type == CoordinateType.Screen || type == CoordinateType.Plane) {
      const center: XY = this.getCenter(type) as XY;
      const center2: XY = geometry.getCenter(type) as XY;
      return Math.sqrt((center2.x - center.x) * (center2.x - center.x) + (center2.y - center.y) * (center2.y - center.y));
    } else {
      // const center: L = this.getCenter(type) as XY;
      // const center2: XY = geometry.getCenter(type) as XY;
      // return Math.sqrt((center2.x-center.x) * (center2.x-center.x) + (center2.y-center.y) * (center2.y-center.y));
    }
  }

  /**
     * 标注绘制
     * @remarks
     * 标注文本支持多行，/r/n换行
     * @param {string} text - 标注文本
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {SimpleTextSymbol} symbol - 标注符号
     */
  label(ctx: CanvasRenderingContext2D, value: string, symbol: Text = new Text()) {
    if (value == null || value == undefined || value === "") return;
    // ctx.save();
    ctx.strokeStyle = symbol.strokeStyle;
    ctx.fillStyle = symbol.fillStyle;
    ctx.lineWidth = symbol.lineWidth;
    ctx.lineJoin = "round";
    ctx.font = symbol.fontSize + "px/1 " + symbol.fontFamily + " " + symbol.fontWeight;
    const center: ScreenXY = this.getCenter(CoordinateType.Screen) as ScreenXY;

    const array = value.toString().split("/r/n");
    let widths = array.map(str => ctx.measureText(str).width + symbol.padding * 2);
    let width = Math.max(...widths);
    let height = symbol.fontSize * array.length + symbol.padding * 2 + symbol.padding * (array.length - 1);
    const screenX = center.x;
    const screenY = center.y;
    let totalX: number, totalY: number;
    switch (symbol.placement) {
      case "TOP":
        totalX = - width / 2;
        totalY = - symbol.pointSymbolHeight / 2 - height;
        break;
      case "BOTTOM":
        totalX = - width / 2;
        totalY = symbol.pointSymbolHeight / 2;
        break;
      case "RIGHT":
        totalX = symbol.pointSymbolWidth / 2;
        totalY = - height / 2;
        break;
      case "LEFT":
        totalX = - symbol.pointSymbolWidth / 2 - width;
        totalY = - height / 2;
        break;
    }
    ctx.strokeRect(screenX + totalX, screenY + totalY, width, height);
    ctx.fillRect(screenX + totalX, screenY + totalY, width, height);
    ctx.textBaseline = "top";
    ctx.fillStyle = symbol.fontColor;
    array.forEach((str, index) => {
      ctx.fillText(str, screenX + totalX + symbol.padding + (width - widths[index]) / 2, screenY + totalY + symbol.padding + index * (symbol.fontSize + symbol.padding));
    });
    // ctx.restore();
  }

}