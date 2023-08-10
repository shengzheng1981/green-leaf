import { PointSymbol, SimplePointSymbol, Symbol } from "../symbol/symbol";
import { Feature } from "../feature/feature";
import { Renderer } from "./renderer";
import { FeatureClass } from "../feature/feature-class";
import { GeometryType } from "../geometry/geometry";
import { Point } from "../geometry/point";
import { ScreenBounds } from "../common/screen-bounds";
import { ClusterSymbol } from "../symbol/cluster-symbol";

/**
 * 聚合渲染
 */
export class ClusterRenderer extends Renderer {

  private _defaultSymbol: PointSymbol = new SimplePointSymbol();
  private _tolerance: number = 50;     //distance 50px
  private _featureClass: FeatureClass;
  private _features: any = {};         // Map<id, count>
  set featureClass(value: FeatureClass) {
    if (value.type == GeometryType.Point) {
      this._featureClass = value;
    }
  }
  set defaultSymbol(value: PointSymbol) {
    this._defaultSymbol = value;
  }
  set Tolerance(value: number) {
    this._tolerance = value;
  }

  init(redrawBounds?: ScreenBounds) {
    this._features = {};
    if (!this._featureClass) return;
    let feature = this._featureClass.first;
    while (feature) {
      if (!redrawBounds || (feature.geometry && feature.geometry.screenBounds && feature.geometry.screenBounds.intersects(redrawBounds))) {
        let exist = false;
        const keys = Object.keys(this._features);
        for (let i = 0; i < keys.length; i++) {
          const id = keys[i];
          const item = this._featureClass.getFeature(id);
          if (item) {
            const p1: Point = feature.geometry as Point;
            const p2: Point = item.geometry as Point;
            if (p1.distance(p2) <= this._tolerance) {
              exist = true;
              this._features[id] += 1;
              break;
            }
          }
        }
        if (!exist) {
          this._features[feature.id] = 1;
        }
      } 
      feature = feature.next;
    }
  }

  getSymbol(feature: Feature): Symbol {
    const count = this._features[feature.id];
    if (!count) {
      return null;
    } else if (count == 1) {
      return this._defaultSymbol;
    } else {
      return new ClusterSymbol(count);
    }
   
  }
}