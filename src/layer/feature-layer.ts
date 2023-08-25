import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";
import { CRS } from "../crs/crs";
import { Feature } from "../feature/feature";
import { FeatureClass } from "../feature/feature-class";
import { Label } from "../label/label";
import { Renderer } from "../renderer/renderer";
import { SimpleRenderer } from "../renderer/simple-renderer";
import { Layer } from "./layer";
/**
 * 矢量图层类
 */
export class FeatureLayer extends Layer {
  /**
   * 矢量要素类（数据源）
   */
  private _featureClass: FeatureClass;
  /**
   * 图层渲染方式
   */
  private _renderer: Renderer = new SimpleRenderer();

  /**
   * 图层标注设置
   */
  private _label: Label;
  /**
   * 图层显示坐标系
   */
  private _crs: CRS; 
  /**
   * 是否显示标注
   */
  public labeled: boolean = false;

  /**
   * 获取矢量要素类（数据源）
   */
  get featureClass(): FeatureClass {
    return this._featureClass;
  }
  /**
   * 设置矢量要素类（数据源）
   */
  set featureClass(value: FeatureClass) {
    this._featureClass = value;
  }
  /**
   * 获取图层标注
   */
  get label(): Label {
    return this._label;
  }
  /**
   * 设置图层标注
   */
  set label(value: Label) {
    this._label = value;
  }
  /**
   * 获取图层渲染方式
   */
  get renderer(): Renderer {
    return this._renderer;
  }
  /**
   * 设置图层渲染方式
   */
  set renderer(value: Renderer) {
    this._renderer = value;
  }

  /**
   * 设置图层显示坐标系
   */
  set crs(value: CRS) {
    this._crs = value;
    let feature = this._featureClass.first;
    while (feature) {
      feature.geometry.crs = value;
      feature = feature.next;
    }
  } 
  /**
   * 数据变换
   * @param {ScreenXY} origin - 窗口坐标原点
   * @param {number} zoom - 当前缩放级别
   */
  transform(origin: ScreenXY, zoom: number) {
    let feature = this._featureClass.first;
    while (feature) {
      feature.geometry.transform(origin, zoom, this._renderer.getSymbol(feature));
      feature = feature.next;
    }
  }

  /**
   * 绘制图层
   * @remarks
   * 遍历图形集合进行绘制
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {number} zoom - 当前缩放级别
   * @param {ScreenBounds} redrawBounds - 当前可视范围
   */
  draw(ctx: CanvasRenderingContext2D, zoom: number, redrawBounds?: ScreenBounds) {
    if (!this.visible || this.minZoom >= zoom || this.maxZoom <= zoom) return;
    // before draw
    this._renderer.init(redrawBounds);
    let feature = this._featureClass.first;
    // let count = 0;
    const features = [];
    while (feature) {
      if (!redrawBounds || (feature.geometry && feature.geometry.screenBounds && feature.geometry.screenBounds.intersects(redrawBounds))) {
        const symbol = this._renderer.getSymbol(feature);
        if (symbol) {
          feature.draw(ctx, symbol);       
          features.push(feature);
        }
        // count += 1;
      }
      feature = feature.next;
    }
    // console.log(count);
    if (this.labeled) {
      this.label.draw(ctx, features);
    }
  }
  /**
   * 根据当前屏幕坐标位置查询图层
   * @param {ScreenXY} screenXY - 当前屏幕坐标位置
   * @param {number} zoom - 当前缩放级别
   * @param {ScreenBounds} redrawBounds - 当前可视范围
   */
  query(screenXY: ScreenXY, zoom: number, bounds: ScreenBounds) {
    if (!this.visible || this.minZoom >= zoom || this.maxZoom <= zoom) return [];
    let feature = this._featureClass.first;
    const features: Feature[] = [];
    while (feature) {
      if (feature.geometry && feature.geometry.screenBounds && feature.geometry.screenBounds.intersects(bounds)) {
        if (feature.geometry.contains(screenXY)) {
          features.push(feature);
        }
      }
      feature = feature.next;
    }
    return features;
  }

  on(types: any, fn?: any, context?: any) {
    let feature = this._featureClass.first;
    while (feature) {
      feature.on(types, fn, context);
      feature = feature.next;
    }
    return this;
  }
}