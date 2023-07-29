import { LatLng } from '../common/latlng';
import { CoordinateType, Geometry, GeometryType } from './geometry';
import { PlaneXY } from '../common/plane-xy';
import { ScreenXY } from '../common/screen-xy';
import { PointSymbol, SimplePointSymbol } from '../symbol/symbol';
import { ScreenBounds } from '../common/screen-bounds';
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

export class Point extends Geometry {
  protected _type: GeometryType = GeometryType.Point;
	private _latlng: LatLng;
	private _planeXY: PlaneXY;
  //
	private _screenXY: ScreenXY;

  get latlng(): LatLng {
    return this._latlng;
  }

  get screenXY(): ScreenXY {
    return this._screenXY;
  }
	// _order: any;

	constructor(latlng: LatLng) {
		super();
		this._latlng = latlng;
	}

	project() {
		if (!this._crs) return;
		this._planeXY = this._crs.projection.project(this._latlng);
		this._planeBounds = new ScreenBounds();
		this._planeBounds.extend(this._planeXY);
	}

	transform(origin: ScreenXY, zoom: number, symbol?: PointSymbol) {
		if (!this._crs && !this._planeXY) return;
		this._screenXY = this._crs.planeXYToScreenXY(this._planeXY, zoom).round(false).subtract(origin);
		symbol = symbol || new SimplePointSymbol();
		this._screenBounds = symbol.getScreenBounds(this._screenXY);
	}

	getCenter(type: CoordinateType = CoordinateType.Latlng) {
		if (type === CoordinateType.Plane) {
				return this._planeXY;
		} else if (type === CoordinateType.Screen) {
				return this._screenXY;
		} else {
				return this._latlng;
		} 
	}

	toGeoJSON(precision: number = 6) {
		return {
			type: "Point",
			coordinates: this._latlng.toGeoJSON(precision)
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
		symbol.draw(ctx, this._screenXY);
	}

  contains(screenXY: ScreenXY) {
    return this._screenBounds && this._screenBounds.contains(screenXY);
  }

}
