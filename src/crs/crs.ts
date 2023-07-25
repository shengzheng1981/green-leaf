
import { LatLng } from '../common/latlng';
import { LatLngBounds } from '../common/latlng-bounds';
import * as Util from '../util/util';
import { Projection } from './projection/projection';
import { Transformation } from './transformation/transformation';
import { PlaneXY } from '../common/plane-xy';
import { ScreenXY } from '../common/screen-xy';
import { ScreenBounds } from '../common/screen-bounds';

/*
 * @namespace CRS
 * @crs L.CRS.Base
 * Object that defines coordinate reference systems for projecting
 * geographical points into pixel (screen) coordinates and back (and to
 * coordinates in other units for [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services). See
 * [spatial reference system](http://en.wikipedia.org/wiki/Coordinate_reference_system).
 *
 * Leaflet defines the most usual CRSs by default. If you want to use a
 * CRS not defined by default, take a look at the
 * [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin.
 *
 * Note that the CRS instances do not inherit from Leaflet's `Class` object,
 * and can't be instantiated. Also, new classes can't inherit from them,
 * and methods can't be added to them with the `include` function.
 */

export abstract class CRS {
	projection: Projection;
	transformation: Transformation;
	// @property code: String
	// Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
	code: String;
	// @property wrapLng: Number[]
	// An array of two numbers defining whether the longitude (horizontal) coordinate
	// axis wraps around a given range and how. Defaults to `[-180, 180]` in most
	// geographical CRSs. If `undefined`, the longitude axis does not wrap around.
	//
	// @property wrapLat: Number[]
	// Like `wrapLng`, but for the latitude (vertical) axis.

	// wrapLng: [min, max],
	// wrapLat: [min, max],
	wrapLng: number[];
	wrapLat: number[];
	// @property infinite: Boolean
	// If true, the coordinate space will be unbounded (infinite in both axes)
	infinite: boolean = false;

	// @method latLngToPoint(latlng: LatLng, zoom: Number): Point
	// Projects geographical coordinates into pixel coordinates for a given zoom.
	latLngToScreenXY(latlng: LatLng, zoom: number): ScreenXY {
		const planeXY: PlaneXY = this.projection.project(latlng),
		    scale: number = this.scale(zoom);

		return this.transformation.transform(planeXY, scale);
	}

	// @method pointToLatLng(point: Point, zoom: Number): LatLng
	// The inverse of `latLngToPoint`. Projects pixel coordinates on a given
	// zoom into geographical coordinates.
	screenXYToLatLng(screenXY: ScreenXY, zoom: number): LatLng {
		const scale: number = this.scale(zoom),
			planeXY: PlaneXY = this.transformation.untransform(screenXY, scale);

		return this.projection.unproject(planeXY);
	}

	planeXYToScreenXY(planeXY: PlaneXY, zoom: number): ScreenXY {
		const scale: number = this.scale(zoom);
		return this.transformation.transform(planeXY, scale);
	}

	screenXYToPlaneXY(screenXY: ScreenXY, zoom: number): PlaneXY {
		const scale: number = this.scale(zoom);
		return this.transformation.untransform(screenXY, scale);
	}

	// @method project(latlng: LatLng): Point
	// Projects geographical coordinates into coordinates in units accepted for
	// this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
	project(latlng: LatLng): PlaneXY {
		return this.projection.project(latlng);
	}

	// @method unproject(point: Point): LatLng
	// Given a projected coordinate returns the corresponding LatLng.
	// The inverse of `project`.
	unproject(planeXY: PlaneXY): LatLng {
		return this.projection.unproject(planeXY);
	}

	// @method scale(zoom: Number): Number
	// Returns the scale used when transforming projected coordinates into
	// pixel coordinates for a particular zoom. For example, it returns
	// `256 * 2^zoom` for Mercator-based CRS.
	scale(zoom: number): number {
		return 256 * Math.pow(2, zoom);
	}

	// @method zoom(scale: Number): Number
	// Inverse of `scale()`, returns the zoom level corresponding to a scale
	// factor of `scale`.
	zoom(scale: number): number {
		return Math.log(scale / 256) / Math.LN2;
	}

	// @method getProjectedBounds(zoom: Number): Bounds
	// Returns the projection's bounds scaled and transformed for the provided `zoom`.
	getScreenBounds(zoom: number): ScreenBounds {
		// if (this.infinite) { return null; }

		var b = this.projection.bounds,
		    s = this.scale(zoom),
		    min = this.transformation.transform(b.min, s),
		    max = this.transformation.transform(b.max, s);

		return new ScreenBounds(min, max);
	}

	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
	// Returns the distance between two geographical coordinates.

	// @method wrapLatLng(latlng: LatLng): LatLng
	// Returns a `LatLng` where lat and lng has been wrapped according to the
	// CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
	wrapLatLng(latlng: LatLng): LatLng {
		var lng = this.wrapLng ? Util.wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng,
		    lat = this.wrapLat ? Util.wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat,
		    alt = latlng.alt;

		return new LatLng(lat, lng, alt);
	}

	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
	// Returns a `LatLngBounds` with the same size as the given one, ensuring
	// that its center is within the CRS's bounds.
	// Only accepts actual `L.LatLngBounds` instances, not arrays.
	wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds {
		var center = bounds.getCenter(),
		    newCenter = this.wrapLatLng(center),
		    latShift = center.lat - newCenter.lat,
		    lngShift = center.lng - newCenter.lng;

		if (latShift === 0 && lngShift === 0) {
			return bounds;
		}

		var sw = bounds.getSouthWest(),
		    ne = bounds.getNorthEast(),
		    newSw = new LatLng(sw.lat - latShift, sw.lng - lngShift),
		    newNe = new LatLng(ne.lat - latShift, ne.lng - lngShift);

		return new LatLngBounds(newSw, newNe);
	}
};
