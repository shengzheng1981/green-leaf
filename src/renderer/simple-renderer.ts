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

  getSymbol(feature: Feature): Symbol {
    return this.symbol;
  }
}