import { LatLng } from '../../common/latlng';
import { PlaneBounds } from '../../common/plane-bounds';
import { PlaneXY } from '../../common/plane-xy';
import { Projection } from './projection';

/*
 * @namespace Projection
 * @projection L.Projection.Mercator
 *
 * Elliptical Mercator projection — more complex than Spherical Mercator. Assumes that Earth is an ellipsoid. Used by the EPSG:3395 CRS.
 */

export class Mercator extends Projection {
	static R: number = 6378137;
	static R_MINOR: number = 6356752.314245179;
	bounds: PlaneBounds = new PlaneBounds(new PlaneXY(-20037508.34279, -15496570.73972), new PlaneXY(20037508.34279, 18764656.23138));

	project(latlng: LatLng): PlaneXY {
		var d = Math.PI / 180,
		    r = Mercator.R,
		    y = latlng.lat * d,
		    tmp = Mercator.R_MINOR / r,
		    e = Math.sqrt(1 - tmp * tmp),
		    con = e * Math.sin(y);

		var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
		y = -r * Math.log(Math.max(ts, 1E-10));

		return new PlaneXY(latlng.lng * d * r, y);
	}

	unproject(xy: PlaneXY): LatLng {
		var d = 180 / Math.PI,
		    r = Mercator.R,
		    tmp = Mercator.R_MINOR / r,
		    e = Math.sqrt(1 - tmp * tmp),
		    ts = Math.exp(-xy.y / r),
		    phi = Math.PI / 2 - 2 * Math.atan(ts);

		for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
			con = e * Math.sin(phi);
			con = Math.pow((1 - con) / (1 + con), e / 2);
			dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
			phi += dphi;
		}

		return new LatLng(phi * d, xy.x * d / r);
	}
};
