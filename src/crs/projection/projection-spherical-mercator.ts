import { PlaneBounds } from '../../common/plane-bounds';
import { PlaneXY } from '../../common/plane-xy';
import { LatLng } from '../../common/latlng';
import { Projection } from './projection';

/*
 * @namespace Projection
 * @projection L.Projection.SphericalMercator
 *
 * Spherical Mercator projection — the most common projection for online maps,
 * used by almost all free and commercial tile providers. Assumes that Earth is
 * a sphere. Used by the `EPSG:3857` CRS.
 */


export class SphericalMercator extends Projection {

	static R: number = 6378137;
	static MAX_LATITUDE: number = 85.0511287798;
	bounds: PlaneBounds = new PlaneBounds(new PlaneXY(-SphericalMercator.R * Math.PI, -SphericalMercator.R * Math.PI), new PlaneXY(SphericalMercator.R * Math.PI, SphericalMercator.R * Math.PI));

	project(latlng: LatLng): PlaneXY {
		let d = Math.PI / 180,
		    max = SphericalMercator.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    sin = Math.sin(lat * d);

		return new PlaneXY(
			SphericalMercator.R * latlng.lng * d,
			SphericalMercator.R * Math.log((1 + sin) / (1 - sin)) / 2);
	}

	unproject(xy: PlaneXY): LatLng {
		var d = 180 / Math.PI;

		return new LatLng(
			(2 * Math.atan(Math.exp(xy.y / SphericalMercator.R)) - (Math.PI / 2)) * d,
			xy.x * d / SphericalMercator.R);
	}

}
