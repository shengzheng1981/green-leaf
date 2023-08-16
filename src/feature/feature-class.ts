import { Adapter } from "../adapter/adapter";
import { CRS } from "../crs/crs";
import { GeometryType } from "../geometry/geometry";
import { Feature } from "./feature";
import { Field } from "./field";

/**
 * 要素类（要素集合）
 * @remarks
 * TODO: a lot of things to be done
 * 可设置CRS代表数据源坐标系，FeatureLayer对应Map显示坐标系，可内置数据转换
 */
export class FeatureClass {
  /**
   * 要素集合名称
   */
  public name: string;
  /**
   * 要素集合别名
   */
  public alias: string;
  /**
   * 要素集合描述
   */
  public description: string;
  /**
   * 空间数据类型：点/线/面
   */
  private _type: GeometryType;
  /**
   * 属性字段集合
   */
  private _fields: Field[] = [];
  /**
   * 遍历集合的初始要素
   */
  private _first: Feature;
  /**
   * 遍历集合的结尾要素
   */
  private _last: Feature;
  /**
   * 矢量要素集合
   */
  private _features: Object = {};     //Map<string, Graphic>

  /**
   * 遍历集合的初始要素
   */
  get first(): Feature {
    return this._first;
  }
  /**
   * 遍历集合的结尾要素
   */
  get last(): Feature {
    return this._last;
  }

  /**
   * 空间数据类型：点/线/面
   */
  get type(): GeometryType {
    return this._type;
  }
  /**
   * 要素集合
   */
  get features(): Feature[] {
    return Object.values(this._features);
  }
  /**
   * 属性字段集合
   */
  get fields(): Field[] {
    return this._fields;
  }
  /**
   * 构造函数
   * @param {GeometryType} type - 空间数据类型：点/线/面
   */
  constructor(type: GeometryType) {
    this._type = type;
  }
  /**
   * 根据ID获取矢量要素
   * @param {string} id - 空间矢量要素ID
   */
  getFeature(id: string) {
    return this._features[id];
  }
  /**
   * 添加要素
   * @param {Feature} feature - 空间矢量要素
   */
  addFeature(feature: Feature, last: boolean = true) {
    this._features[feature.id] = feature;
    if (!this._first) {
      this._first = feature;
      this._last = feature;
    } else {
      if (!last) {
        this._first.prev = feature;
        feature.next = this._first;
        this._first = feature;
      } else {
        this._last.next = feature;
        feature.prev = this._last;
        this._last = feature;
      }
    }
  }

  /**
   * 删除要素
   * @param {Feature} feature - 空间矢量要素
   */
  removeFeature(feature: Feature) {
    if (this._first == feature) {
      this._first = feature.next;
    }
    if (this._last == feature) {
      this._last = feature.prev;
    }
    if (feature.prev) {
      feature.prev.next = feature.next;
    }
    if (feature.next) {
      feature.next.prev = feature.prev;
    }
    feature.prev = null;
    feature.next = null;
    delete this._features[feature.id];
  }
  /**
   * 清空要素集合
   */
  clearFeatures() {
    this._features = {};
  }

  /**
   * 添加字段
   * @param {Field} field - 字段
   */
  addField(field: Field) {
    this._fields.push(field);
  }
  /**
   * 删除字段
   * @param {Field} field - 字段
   */
  removeField(field: Field) {
    const index = this._fields.findIndex(item => item === field);
    index != -1 && this._fields.splice(index, 1);
  }
  /**
   * 清空字段集合
   */
  clearFields() {
    this._fields = [];
  }
  /**
   * 加载矢量数据
   * @param {Adapter} adapter - 数据适配器
   */
  async load(adapter: Adapter) {
    if (this._type == adapter.type) {
      const features = await adapter.fetch();
      features.forEach(feature => {
        this.addFeature(feature);
      })
    }
  }

}