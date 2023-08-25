import { LatLng } from "../common/latlng";
import { LatLngBounds } from "../common/latlng-bounds";
import { PlaneBounds } from "../common/plane-bounds";
import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";
import { CRS } from "../crs/crs";

/**
 * 栅格
 */
export abstract class Raster {
  private _canvas: HTMLCanvasElement;
  /**
   * 动态栅格（实时渲染）
   */
  get dynamic(): boolean {
    return false;
  }
  /**
   * 画布存放Image
   */
  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }
  /**
   * 栅格经纬度边界
   */
  get bounds(): LatLngBounds {
    return this._latlngBounds;
  }

  /**
    * 坐标系
    */
  protected _crs: CRS;
  /**
   * 包络矩形
   */
  protected _latlngBounds: LatLngBounds;
  protected _planeBounds: PlaneBounds;
  protected _screenBounds: ScreenBounds;

  /**
   * 包络矩形
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
  /**
    * 设置坐标系并投影
    */
  set crs(value: CRS) {
    this._crs = value;
    this.project();
  }
  /**
   * 创建栅格
   * @remarks
   * 遍历图形集合进行绘制
   * @param {number} xmin - 经度左值
   * @param {number} ymin - 纬度下值
   * @param {number} xmax - 经度右值
   * @param {number} ymax - 纬度上值
   * @param {number} width - 栅格宽度
   * @param {number} height - 栅格高度
   * @param {number} cellsize - 栅格大小
   */
  constructor(xmin, ymin, xmax, ymax, width = 1000, height = 1000) {
    this._canvas = document.createElement("canvas");
    this._canvas.width = width;
    this._canvas.height = height;
    this._latlngBounds = new LatLngBounds(new LatLng(ymin, xmin), new LatLng(ymax, xmax));
  }
  /**
   * 投影变换虚函数
   * @param {Projection} projection - 坐标投影转换
   */
  abstract project();

  /**
   * 数据变换
   * @param {ScreenXY} origin - 窗口坐标原点
   * @param {number} zoom - 当前缩放级别
   */
  abstract transform(origin: ScreenXY, zoom: number);

  /**
   * 绘制栅格
   * @remarks
   * 遍历图形集合进行绘制
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   */
  abstract draw(ctx: CanvasRenderingContext2D);
}