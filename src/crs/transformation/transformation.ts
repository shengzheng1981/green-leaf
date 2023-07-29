import { PlaneXY } from '../../common/plane-xy';
import { ScreenXY } from '../../common/screen-xy';

/*
 * @class Transformation
 * @aka L.Transformation
 *
 * Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d`
 * for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing
 * the reverse. Used by Leaflet in its projections code.
 *
 * @example
 *
 * ```js
 * var transformation = L.transformation(2, 5, -1, 10),
 * 	p = L.point(1, 2),
 * 	p2 = transformation.transform(p), //  L.point(7, 8)
 * 	p3 = transformation.untransform(p2); //  L.point(1, 2)
 * ```
 */


// factory new L.Transformation(a: Number, b: Number, c: Number, d: Number)
// Creates a `Transformation` object with the given coefficients.
export class Transformation {
	_a: number;
	_b: number;
	_c: number;
	_d: number;
	constructor(a: any, b: number, c: number, d: number) {
		this._a = a;
		this._b = b;
		this._c = c;
		this._d = d;
	}
	// @method transform(point: Point, scale?: Number): Point
	// Returns a transformed point, optionally multiplied by the given scale.
	// Only accepts actual `L.Point` instances, not arrays.
	transform(planeXY: PlaneXY, scale: number = 1): ScreenXY { // (Point, Number) -> Point
		return new ScreenXY(
						scale * (this._a * planeXY.x + this._b),
						scale * (this._c * planeXY.y + this._d));
	}

	// @method untransform(point: Point, scale?: Number): Point
	// Returns the reverse transformation of the given point, optionally divided
	// by the given scale. Only accepts actual `L.Point` instances, not arrays.
	untransform(screenXY: ScreenXY, scale: number = 1): PlaneXY {
		return new PlaneXY(
		        (screenXY.x / scale - this._b) / this._a,
		        (screenXY.y / scale - this._d) / this._c);
	}

}




