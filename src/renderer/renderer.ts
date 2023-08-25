import { ScreenBounds } from "../common/screen-bounds";
import { Feature } from "../feature/feature";
import { Symbol } from "../symbol/symbol";
/**
 * 渲染方式基类
 */
export abstract class Renderer {
  /**
   * 根据矢量要素获取渲染符号
   * @param {ScreenBounds} redrawBounds - 屏幕范围
   * @remark Do something before layer draw, etc ClusterRenderer
   */
  init(redrawBounds?: ScreenBounds) {
    //do something before layer draw; 
    //etc ClusterRenderer
  }
  /**
   * 根据矢量要素获取渲染符号
   * @param {Feature} feature - 矢量要素
   * @return {Symbol} 返回渲染符号
   */
  abstract getSymbol(feature: Feature): Symbol;
}