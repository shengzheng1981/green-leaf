import { Projection } from './projection';
import { PlaneBounds } from '../../common/plane-bounds';
import { PlaneXY } from '../../common/plane-xy';
import { LatLng } from '../../common/latlng';

/*
 * @namespace Projection
 * @section
 * Leaflet comes with a set of already defined Projections out of the box:
 *
 * @projection L.Projection.LonLat
 *
 * Equirectangular, or Plate Carree projection — the most simple projection,
 * mostly used by GIS enthusiasts. Directly maps `x` as longitude, and `y` as
 * latitude. Also suitable for flat worlds, e.g. game maps. Used by the
 * `EPSG:4326` and `Simple` CRS.
 */

export class LonLat extends Projection {

	bounds: PlaneBounds = new PlaneBounds(new PlaneXY(-180, -90), new PlaneXY(180, 90));

	project(latlng: LatLng): PlaneXY {
		return new PlaneXY(latlng.lng, latlng.lat);
	}

	unproject(xy: PlaneXY): LatLng {
		return new LatLng(xy.y, xy.x);
	}

}
