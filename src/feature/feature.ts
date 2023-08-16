import { EventedObject } from "../base/evented-object";
import { ILinkedList } from "../base/interface";
import { Geometry } from "../geometry/geometry";
import { Symbol } from "../symbol/symbol";
import { Text } from "../text/text";
import { Field } from "./field";

export class Feature extends EventedObject implements ILinkedList {

  /**
   * 空间图形
   */
  private _geometry: Geometry;
  /**
   * 属性信息
   */
  private _properties: Object = {};


  /**
   * 空间图形
   */
  get geometry(): Geometry {
    return this._geometry;
  }
  /**
   * 属性信息
   */
  get properties(): Object {
    return this._properties;
  }

  /**
   * 文本标注
   * @remarks
   * 用于某个要素特定标注设置
   */
  public text: Text;
  /**
   * 是否可见
   */
  public visible: boolean = true;
  /**
   * 前一要素
   * @remarks
   * 用于FeatureClass要素链表
   */
  public prev: Feature = null;
  /**
   * 后一要素
   * @remarks
   * 用于FeatureClass要素链表
   */
  public next: Feature = null;

  /**
    * 构造函数
    * @param {Geometry} geometry - 空间图形
    * @param {Object} properties - 属性信息
    */
  constructor(geometry: Geometry, properties?: Object) {
    super();
    this._geometry = geometry;
    this._properties = properties;
  }

  /**
    * 绘制点
    * @param {CanvasRenderingContext2D} ctx - 绘图上下文
    * @param {Symbol} symbol - 渲染符号
    */
  draw(ctx: CanvasRenderingContext2D, symbol: Symbol) {
    this._geometry.draw(ctx, symbol);
  }

  /**
    * 标注要素
    * @remarks 调用空间坐标信息进行标注绘制
    * @param {CanvasRenderingContext2D} ctx - 绘图上下文
    * @param {Field} field - 标注字段
    * @param {Text} text - 标注符号
    */
  label(ctx: CanvasRenderingContext2D, field: Field, text: Text = new Text()) {
    if (this.visible) this._geometry.label(ctx, this._properties[field.name], this.text || text);
  }

}