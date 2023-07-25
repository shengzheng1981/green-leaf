import { LatLng } from '../common/latlng';
import { CoordinateType, Geometry, GeometryType } from './geometry';
import { PlaneXY } from '../common/plane-xy';
import { ScreenXY } from '../common/screen-xy';
import { PointSymbol, SimplePointSymbol } from '../symbol/symbol';
import { ScreenBounds } from '../common/screen-bounds';
import { LatLngBounds } from '../common/latlng-bounds';
import { PlaneBounds } from '../common/plane-bounds';
/*
 * @class Point
 * @aka L.Point
 *
 * Represents a point with `x` and `y` coordinates in pixels.
 *
 * @example
 *
 * ```js
 * var point = L.point(200, 300);
 * ```
 *
 * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
 *
 * ```js
 * map.panBy([200, 300]);
 * map.panBy(L.point(200, 300));
 * ```
 *
 * Note that `Point` does not inherit from Leaflet's `Class` object,
 * which means new classes can't inherit from it, and new methods
 * can't be added to it with the `include` function.
 */

export class MultiplePoint extends Geometry {
  protected _type: GeometryType = GeometryType.Point;
	private _latlngs: LatLng[];
	private _planeXYs: PlaneXY[];
	private _screenXYs: ScreenXY[];

  private _screenBoundsArray: ScreenBounds[];
	// _order: any;

	constructor(latlngs: LatLng[]) {
		super();
		this._setLatLngs(latlngs);
	}

  // @method getLatLngs(): LatLng[]
	// Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
	getLatLngs() {
		return this._latlngs;
	}

	_setLatLngs(latlngs: LatLng[]) {
		this._latlngBounds = new LatLngBounds();
		this._latlngs = [];
		for (let i = 0, len = latlngs.length; i < len; i++) {
			this._latlngBounds.extend(latlngs[i]);
			this._latlngs.push(latlngs[i]);
		}
	}

	// @method setLatLngs(latlngs: LatLng[]): this
	// Replaces all the points in the polyline with the given array of geographical points.
	setLatLngs(latlngs: LatLng[]) {
		this._setLatLngs(latlngs);
		// return this.redraw();
	}
	
	project() {
		if (!this._crs) return;
		this._planeBounds = new PlaneBounds();
		this._planeXYs = [];
		for (let i = 0, len = this._latlngs.length; i < len; i++) {
			const planeXY: PlaneXY = this._crs.projection.project(this._latlngs[i]);
			this._planeBounds.extend(planeXY);
			this._planeXYs.push(planeXY);
		}
	}

	transform(origin: ScreenXY, zoom: number, symbol?: PointSymbol) {
		if (!this._crs && !this._planeXYs) return;
		this._screenXYs = this._planeXYs.map(planeXY => {
			return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
		})
    this._screenBounds = new ScreenBounds();
    this._screenBoundsArray = [];
    this._screenXYs.forEach(screenXY => {
      this._screenBounds.extend(symbol.getScreenBounds(screenXY));
      this._screenBoundsArray.push(symbol.getScreenBounds(screenXY));
    })
	}

	getCenter(type: CoordinateType = CoordinateType.Latlng) {
		if (type === CoordinateType.Plane) {
				return this._planeXYs[0];
		} else if (type === CoordinateType.Screen) {
				return this._screenXYs[0];
		} else {
				return this._latlngs[0];
		} 
	}

	toGeoJSON(precision: number = 6) {
    const coords = [];
		for (let i = 0, len = this._latlngs.length; i < len; i++) {
			coords.push(this._latlngs[i].toGeoJSON(precision));
		}
		return {
			type: "MultiPoint",
			coordinates: coords
		};
	}

	/**
     * 绘制点
     * @param {CanvasRenderingContext2D} ctx - 绘图上下文
     * @param {Projection} projection - 坐标投影转换
     * @param {Bound} extent - 当前可视范围
     * @param {Symbol} symbol - 渲染符号
     */
	draw(ctx: CanvasRenderingContext2D, symbol?: PointSymbol) {
		if (!this._crs) return;
		// this._screenXY = this._crs.planeXYToScreenXY(this._planeXY, zoom).round(false).subtract(origin);
		symbol = symbol || new SimplePointSymbol();
		// this._screenBounds = symbol.getScreenBounds(this._screenXY);
    this._screenXYs.forEach(screenXY => {
      symbol.draw(ctx, screenXY);
    })
	}

  contains(screenXY: ScreenXY) {
    return Array.isArray(this._screenBoundsArray) && this._screenBoundsArray.some(screenBounds => {
      this._screenBounds.contains(screenXY)
    });
  }

}
