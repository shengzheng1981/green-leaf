import { LatLng } from '../common/latlng';
import { LatLngBounds } from '../common/latlng-bounds';
import { ScreenXY } from '../common/screen-xy';
import { PlaneXY } from '../common/plane-xy';
import { PlaneBounds } from '../common/plane-bounds';
import { Geometry, GeometryType } from './geometry';
import { LineSymbol, SimpleLineSymbol } from '../symbol/symbol';
import * as LineUtil from '../util/line-util';
import { ScreenBounds } from '../common/screen-bounds';

/*
 * @class Polyline
 * @aka L.Polyline
 * @inherits Path
 *
 * A class for drawing polyline overlays on a map. Extends `Path`.
 *
 * @example
 *
 * ```js
 * // create a red polyline from an array of LatLng points
 * var latlngs = [
 * 	[45.51, -122.68],
 * 	[37.77, -122.43],
 * 	[34.04, -118.2]
 * ];
 *
 * var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
 *
 * // zoom the map to the polyline
 * map.fitBounds(polyline.getBounds());
 * ```
 *
 * You can also pass a multi-dimensional array to represent a `MultiPolyline` shape:
 *
 * ```js
 * // create a red polyline from an array of arrays of LatLng points
 * var latlngs = [
 * 	[[45.51, -122.68],
 * 	 [37.77, -122.43],
 * 	 [34.04, -118.2]],
 * 	[[40.78, -73.91],
 * 	 [41.83, -87.62],
 * 	 [32.76, -96.72]]
 * ];
 * ```
 */


export class MultiplePolyline extends Geometry{
  protected _type: GeometryType = GeometryType.Polyline;
	_latlngs: LatLng[][];
	_planeXYs: PlaneXY[][];
	_screenXYs: ScreenXY[][];

	constructor(latlngs: LatLng[][]) {
		super();
		this._setLatLngs(latlngs);
	}

	// @method getLatLngs(): LatLng[]
	// Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
	getLatLngs() {
		return this._latlngs;
	}

	_setLatLngs(latlngs: LatLng[][]) {
		this._latlngBounds = new LatLngBounds();
		this._latlngs = [];
    latlngs.forEach(polyline => {
      const latLngPolyline = [];
      polyline.forEach(latlng => {
        this._latlngBounds.extend(latlng);
        latLngPolyline.push(latlng);
      })
      this._latlngs.push(latLngPolyline);
    })
	}

	// @method setLatLngs(latlngs: LatLng[]): this
	// Replaces all the points in the polyline with the given array of geographical points.
	setLatLngs(latlngs: LatLng[][]) {
		this._setLatLngs(latlngs);
		// return this.redraw();
	}

	// @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
	// Adds a given point to the polyline. By default, adds to the first ring of
	// the polyline in case of a multi-polyline, but can be overridden by passing
	// a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
	// addLatLng(latlng: LatLng, latlngs?: LatLng[]) {
	// 	latlngs = latlngs || this._defaultShape();
	// addLatLng(latlng: LatLng) {
	// 	// const latlngs = this._defaultShape();
	// 	this._latlngs.push(latlng);
	// 	this._latlngBounds.extend(latlng);
	// 	// return this.redraw();
	// }


	// @method getCenter(): LatLng
	// Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the polyline.
	// getCenter() {
	// 	return this._latlngBounds.getCenter();
	// }
	
	project() {
		if (!this._crs) return;
		this._planeBounds = new PlaneBounds();
		this._planeXYs = [];
    this._latlngs.forEach(polyline => {
      const planePolyline = [];
      polyline.forEach(latlng => {
        const planeXY: PlaneXY = this._crs.projection.project(latlng);
        this._planeBounds.extend(planeXY);
        planePolyline.push(planeXY);
      })
      this._planeXYs.push(planePolyline);
    })
	}

	transform(origin: ScreenXY, zoom: number, symbol?: LineSymbol) {
		if (!this._crs && !this._planeXYs) return;
		this._screenXYs = this._planeXYs.map(polyline => {
      return polyline.map(planeXY => {
			  return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
      })
		})
    this._screenBounds = new ScreenBounds();
    this._screenXYs.forEach(polyline => {
      this._screenBounds.extend(symbol.getScreenBounds(polyline));
    })
	}

	draw(ctx: CanvasRenderingContext2D, symbol?: LineSymbol) {
		if (!this._crs) return;
		// this._screenXYs = this._planeXYs.map(planeXY => {
		// 	return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
		// })
		symbol = symbol || new SimpleLineSymbol();
		// this._screenBounds = symbol.getScreenBounds(this._screenXYs);
    this._screenXYs.forEach(polyline => {
      symbol.draw(ctx, polyline);
    })
	}

	toGeoJSON(precision: number = 6) {
    const coords = [];
    this._latlngs.forEach(polyline => {
      const outPolyline = [];
      polyline.forEach(latlng => {
        this._latlngBounds.extend(latlng);
        outPolyline.push(latlng.toGeoJSON(precision));
      })
      coords.push(outPolyline);
    })
		return {
			type: "MultiLineString",
			coordinates: coords
		};
	}

  contains(screenXY: ScreenXY) {
    let i, len, w = 5;
		if (!this._screenBounds || !this._screenBounds.contains(screenXY)) { return false; }
		// hit detection for polylines
    return this._screenXYs.some(polyline => {
      for (i = 0, len = polyline.length; i < len - 1; i++) {
        if (LineUtil.pointToSegmentDistance(screenXY, polyline[i], polyline[i+1]) <= w) {
          return true;
        }
      }
    })
  }

}

