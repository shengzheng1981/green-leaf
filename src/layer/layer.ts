import { EventedObject } from "../base/evented-object";

/**
 * 图层基类
 */
export abstract class Layer extends EventedObject {
  /**
   * 图层名称
   */
  name: string;
  /**
   * 图层描述
   */
  description: string;
  /**
   * 图层可见设置
   */
  protected _visible: boolean = true;
  /**
   * 图层是否可见
   */
  get visible(): boolean {
    return this._visible;
  }
  /**
   * 图层可见设置
   */
  set visible(value: boolean) {
    this._visible = value;
  }

  /**
   * 图层可见缩放级别
   */
  private _zoom: number[] = [1, 20];
  /**
     * 图层可见缩放级别设置
     */
  get minZoom() {
    return this._zoom[0];
  }
  get maxZoom() {
    return this._zoom[1];
  }
  set minZoom(value: number) {
    this._zoom[0] = value;
  }
  set maxZoom(value: number) {
    this._zoom[1] = value;
  }
  set zoom(value: number[]) {
    this._zoom = value;
  }
  /**
   * 图层可交互设置
   */
  protected _interactive: boolean = true;
  /**
   * 图层是否可交互
   */
  get interactive(): boolean {
    return this._interactive;
  }
  /**
   * 图层可交互设置
   */
  set interactive(value: boolean) {
    this._interactive = value;
  }

  /**
   * 图层顺序（z-index）
   * @remarks
   * TODO: marker的异步加载，会影响绘制顺序
   */
  private _index: number = 0; //z-index
  /**
   * 图层顺序
   */
  get index(): number {
    return this._index;
  }
  /**
   * 图层顺序设置
   */
  set index(value: number) {
    this._index = value;
  }
  /**
   * 创建图层
   */
  constructor() {
    super();
  }

  /**
   * 绘制图层
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {Projection} projection - 坐标投影转换
   * @param {Bound} extent - 当前可视范围
   * @param {number} zoom - 当前缩放级别
   */
  abstract draw(ctx: CanvasRenderingContext2D, zoom: number);

}