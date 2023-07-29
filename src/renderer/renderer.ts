import { Feature } from "../feature/feature";
import { Symbol } from "../symbol/symbol";
/**
 * 渲染方式基类
 */
export abstract class Renderer {
  abstract getSymbol(feature: Feature): Symbol;
}