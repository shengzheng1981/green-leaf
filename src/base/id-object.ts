import { BaseObject } from "./base-object";
/** 
 * 带ID实体基类
 */
export abstract class IDObject extends BaseObject {
  /** 
  * 最大ID（类变量）
  */
  static MAX_ID: number = 0;
  /** 
  * ID
  */
  private _id: number;
  /** 
  * ID
  */
  get id(): number {
    return this._id;
  }
  /** 
    * 构造函数
    */
  constructor() {
    super();
    this._create();
  }
  
  private _create() {
    // const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    // this._id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
    //     return (Math.random() * 16 | 0).toString(16);
    // }).toLowerCase();
    IDObject.MAX_ID += 1;
    this._id = IDObject.MAX_ID;
  }
  /** 
    * 输出字符串
    */
  toString(): string {
    return this._id.toString();
  }

}