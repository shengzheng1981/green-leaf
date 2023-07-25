import { CommonObject } from "../../base/common-object";
import { PlaneBounds } from "../../common/plane-bounds";
import { LatLng } from "../../common/latlng";
import { PlaneXY } from "../../common/plane-xy";

export abstract class Projection extends CommonObject {
  bounds: PlaneBounds;
  abstract project(latlng: LatLng): PlaneXY;
  abstract unproject(point: PlaneXY): LatLng;
}