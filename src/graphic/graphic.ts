import { EventedObject } from "../base/evented-object";
import { ILinkedList } from "../base/interface";
import { ScreenXY } from "../common/screen-xy";
import { Geometry } from "../geometry/geometry";
import { Symbol } from "../symbol/symbol";

export class Graphic extends EventedObject implements ILinkedList {

	private _geometry: Geometry;
  private _symbol: Symbol;
  prev: Graphic = null;
  next: Graphic = null;

  get geometry(): Geometry {
    return this._geometry;
  }

  set geometry(value: Geometry) {
    this._geometry = value;
  }

  get symbol(): Symbol {
    return this._symbol;
  }

  constructor(geometry: Geometry, symbol: Symbol) {
    super();
    this._geometry = geometry;
    this._symbol = symbol;
  }

  transform(origin: ScreenXY, zoom: number) {
    this._geometry.transform(origin, zoom, this._symbol);
  }

  /**
     * 绘制点
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
	draw(ctx: CanvasRenderingContext2D) {
    this._geometry.draw(ctx, this._symbol);
	}
}