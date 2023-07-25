import { BaseObject } from "../base/base-object";
import { EventedObject } from "../base/evented-object";
import { ILinkedList } from "../base/interface";
import { ScreenXY } from "../common/screen-xy";
import { Geometry } from "../geometry/geometry";
import { Symbol } from "../symbol/symbol";
import { Text } from "../text/text";
import { Field } from "./field";

export class Feature extends EventedObject implements ILinkedList {

	private _geometry: Geometry;
  private _properties: Object = {};
  private _text: Text;

  get geometry(): Geometry {
    return this._geometry;
  }

  get properties(): Object {
    return this._properties;
  }

  get Text(): Text {
    return this._text;
  }

  set Text(value: Text) {
    this._text = value;
  }

  public visible: boolean = true;

  prev: Feature = null;
  next: Feature = null;

  constructor(geometry: Geometry, properties?: Object) {
    super();
    this._geometry = geometry;
    this._properties = properties;
  }

  /**
     * 绘制点
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
	draw(ctx: CanvasRenderingContext2D, symbol: Symbol) {
    this._geometry.draw(ctx, symbol);
	}

  /**
     * 标注要素
     * @remarks 调用空间坐标信息进行标注绘制
     * @param {Field} field - 标注字段
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {SimpleTextSymbol} symbol - 标注符号
     */
  label(ctx: CanvasRenderingContext2D, field:Field, text: Text = new Text()) {
    if (this.visible) this._geometry.label(ctx, this._properties[field.name], this._text || text);
  }

}