import { PlaneBounds } from "../../common/plane-bounds";
import { LatLng } from "../../common/latlng";
import { PlaneXY } from "../../common/plane-xy";

export abstract class Projection {
  bounds: PlaneBounds;
  abstract project(latlng: LatLng): PlaneXY;
  abstract unproject(point: PlaneXY): LatLng;
}