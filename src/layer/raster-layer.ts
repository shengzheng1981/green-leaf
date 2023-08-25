import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";
import { CRS } from "../crs/crs";
import { Raster } from "../raster/raster";
import { Layer } from "./layer";
/**
 * 栅格图层
 */
export class RasterLayer extends Layer {
  /**
   * 图层可交互设置
   */
  protected _interactive: boolean = false;
  /*
   * 栅格
   */
  private _raster: Raster;

  get raster(): Raster {
    return this._raster;
  }
  set raster(value: Raster) {
    this._raster = value;
  }
  
  private _crs: CRS;
  set crs(value: CRS) {
    this._crs = value;
    if (this._raster) {
      this._raster.crs = value;
    }
  }
  /**
   * 数据变换
   * @param {ScreenXY} origin - 窗口坐标原点
   * @param {number} zoom - 当前缩放级别
   */
  transform(origin: ScreenXY, zoom: number) {
    if (this._raster) {
      this._raster.transform(origin, zoom);
    }
  }
  /**
   * 绘制图层
   * @remarks
   * 遍历图形集合进行绘制
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {Projection} projection - 坐标投影转换
   * @param {Bound} extent - 当前可视范围
   * @param {number} zoom - 当前缩放级别
   */
  draw(ctx: CanvasRenderingContext2D, zoom: number, redrawBounds?: ScreenBounds) {
    if (!this.visible || this.minZoom >= zoom || this.maxZoom <= zoom) return;
    if (!this.raster.screenBounds || this.raster.screenBounds.intersects(redrawBounds)) {
      this.raster && this.raster.draw(ctx);
    }
  }
}