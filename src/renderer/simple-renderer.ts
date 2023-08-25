import { Symbol } from "../symbol/symbol";
import { Feature } from "../feature/feature";
import { Renderer } from "./renderer";

/**
 * 单一渲染
 */
export class SimpleRenderer extends Renderer {
  /**
   * 单一渲染符号
   */
  public symbol: Symbol;
  /**
   * 根据矢量要素获取渲染符号
   * @param {Feature} feature - 矢量要素
   * @return {Symbol} 返回渲染符号
   */
  getSymbol(feature: Feature): Symbol {
    return this.symbol;
  }
}