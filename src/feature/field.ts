import { CommonObject } from "../base/common-object";

/**
 * 字段类型
 */
export enum FieldType {
  /**
   * 字符串
   */
  String = 1,
  /**
   * 数值型
   */
  Number = 2,
}


/**
 * 字段
 * @remarks
 * TODO: a lot of things to be done
 */
export class Field extends CommonObject {
  /**
   * 字段名称
   */
  name: string;
  /**
   * 字段别名
   */
  alias: string;
  /**
   * 字段类型
   */
  type: FieldType;

  constructor(name: string, type: FieldType) {
    super();
    this.name = name;
    this.type = type;
  }
}