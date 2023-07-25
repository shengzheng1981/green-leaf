/**
 * 渲染方式基类
 */
import { CommonObject } from "../base/common-object";
import { Feature } from "../feature/feature";
import { Symbol } from "../symbol/symbol";

export abstract class Renderer extends CommonObject {
  abstract getSymbol(feature: Feature): Symbol;
}