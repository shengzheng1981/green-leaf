import { Feature } from "../feature/feature";
import { GeometryType } from "../geometry/geometry";

/**
 * 数据适配基类
 */
export abstract class Adapter {
  /**
   * 矢量数据类型
   */
  protected _type: GeometryType;
  /**
   * 获取矢量数据类型
   */
  get type(): GeometryType {
    return this._type;
  }
  /**
    * 构造函数
    * @param {GeometryType} type - 矢量数据类型
    */
  constructor(type: GeometryType) {
    this._type = type;
  }

  /**
   * 获取矢量数据
   * @return {Promise<Feature[]>} 返回Promise
   */
  abstract fetch(): Promise<Feature[]>; 
}