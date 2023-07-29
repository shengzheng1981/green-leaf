import { Adapter } from "../adapter/adapter";
import { CRS } from "../crs/crs";
import { GeometryType } from "../geometry/geometry";
import { Feature } from "./feature";
import { Field } from "./field";

/**
 * 要素类（要素集合）
 * @remarks
 * TODO: a lot of things to be done
 */
export class FeatureClass {
  /**
   * 要素集合名称
   */
  name: string;
  /**
   * 要素集合别名
   */
  alias: string;
  /**
   * 要素集合描述
   */
  description: string;
  /**
   * 空间数据类型：点/线/面
   */
  private _type: GeometryType;
  /**
   * 属性字段集合
   */
  private _fields: Field[] = [];

  private _first: Feature;
  private _last: Feature;
  private _features: Object = {};     //Map<string, Graphic>
  private _crs: CRS;

  get first(): Feature {
    return this._first;
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
   * 创建要素集合
   * @param {GeometryType} type - 空间数据类型：点/线/面
   */
  constructor(type: GeometryType) {
    this._type = type;
  }

  /**
   * 添加要素
   * @param {Feature} feature - 空间矢量要素
   */
  addFeature(feature: Feature, last: boolean = true) {
    this._features[feature.id] = feature;
    feature.geometry.crs = this._crs;
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

  async load(adapter: Adapter) {
    if (this._type == adapter.type) {
      const features = await adapter.fetch();
      features.forEach(feature => {
        this.addFeature(feature);
      })
    }
  }

}