import { ScreenBounds } from "../common/screen-bounds";
import { Feature } from "../feature/feature";
import { Symbol } from "../symbol/symbol";
/**
 * 渲染方式基类
 */
export abstract class Renderer {
  
  init() {
    //do something before layer draw; 
    //etc ClusterRenderer
  }
  abstract getSymbol(feature: Feature): Symbol;
}