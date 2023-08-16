import { BaseObject } from "./base-object";
/** 
 * 实体配置选项基类
 */
export abstract class OptionsObject extends BaseObject {
  /** 
    * 构造函数
    */
  constructor() {
    super();
  }
  /** 
    * 赋值函数
    */
  assign(options: Object) {
    if (options !== undefined) {
      for (let key in options) {
        if(this.hasOwnProperty(key)){
          this[key] = options[key];
        }
      }
    }
  }
 
}