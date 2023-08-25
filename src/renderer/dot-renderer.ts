
import { Feature } from "../feature/feature";
import { Field } from "../feature/field";
import { SimplePointSymbol, Symbol } from "../symbol/symbol";
import { Renderer } from "./renderer";

/**
 * 点半径渲染
 * @remarks
 * 只适用点图层
 */
export class DotRenderer extends Renderer {
  /**
   * 半径字段
   * @remarks
   * 数值字段
   */
  _field: Field;
  /**
   * 半径字段
   */
  get field(): Field {
    return this._field;
  }
  /**
   * 半径字段
   */
  set field(value: Field) {
    this._field = value;
  }
  /**
   * 点渲染符号
   */
  public symbol: SimplePointSymbol;
  /**
   * 根据矢量要素获取渲染符号
   * @param {Feature} feature - 矢量要素
   * @return {Symbol} 返回渲染符号
   */
  getSymbol(feature: Feature): Symbol {
    this.symbol = this.symbol || new SimplePointSymbol();
    this.symbol.radius = Number(feature.properties[this.field.name] || 0);
    return this.symbol;
  }

}