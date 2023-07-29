import { formatNum } from '../util/util';

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

export abstract class XY {

	public x: number;
	public y: number;

	constructor(x: number = 0, y: number = 0) {
		// @property x: Number; The `x` coordinate of the point
		this.x = x;
		// @property y: Number; The `y` coordinate of the point
		this.y = y;
	}

  // @method clone(): Point
	// Returns a copy of the current point.
	// clone(): XY {
	// 	return new XY(this.x, this.y);
	// }
  abstract clone(): XY;

	// @method add(otherPoint: Point): Point
	// Returns the result of addition of the current and the given points.
	add(otherXY: XY, clone: boolean = true): XY {
    let source: XY = this;
		// non-destructive, returns a new point
    if (clone) {
      source = this.clone();
    }
		source.x += otherXY.x;
		source.y += otherXY.y;
    return source;
	}

	// @method subtract(otherPoint: Point): Point
	// Returns the result of subtraction of the given point from the current.
	subtract(otherXY: XY, clone: boolean = true): XY {
		let source: XY = this;
		// non-destructive, returns a new point
    if (clone) {
      source = this.clone();
    }
		source.x -= otherXY.x;
		source.y -= otherXY.y;
    return source;
	}

	// @method divideBy(num: Number): Point
	// Returns the result of division of the current point by the given number.
	divideBy(num: number, clone: boolean = true): XY {
    let source: XY = this;
		// non-destructive, returns a new point
    if (clone) {
      source = this.clone();
    }
		source.x /= num;
		source.y /= num;
    return source;
	}

	// @method multiplyBy(num: Number): Point
	// Returns the result of multiplication of the current point by the given number.
	multiplyBy(num: number, clone: boolean = true): XY {
    let source: XY = this;
		// non-destructive, returns a new point
    if (clone) {
      source = this.clone();
    }
		source.x *= num;
		source.y *= num;
    return source;
	}

	// @method scaleBy(scale: Point): Point
	// Multiply each coordinate of the current point by each coordinate of
	// `scale`. In linear algebra terms, multiply the point by the
	// [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
	// defined by `scale`.
	scaleBy(otherXY: XY, clone: boolean = true): XY {
    let source: XY = this;
		// non-destructive, returns a new point
    if (clone) {
      source = this.clone();
    }
		source.x *= otherXY.x;
		source.y *= otherXY.y;
    return source;
	}

	// @method unscaleBy(scale: Point): Point
	// Inverse of `scaleBy`. Divide each coordinate of the current point by
	// each coordinate of `scale`.
	unscaleBy(otherXY: XY, clone: boolean = true): XY {
    let source: XY = this;
		// non-destructive, returns a new point
    if (clone) {
      source = this.clone();
    }
		source.x /= otherXY.x;
		source.y /= otherXY.y;
    return source;
	}

	// @method round(): Point
	// Returns a copy of the current point with rounded coordinates.
	round(clone: boolean = true): XY {
    let source: XY = this;
		// non-destructive, returns a new point
    if (clone) {
      source = this.clone();
    }
		source.x = Math.round(this.x);
		source.y = Math.round(this.y);
    return source;
	}

	// @method floor(): Point
	// Returns a copy of the current point with floored coordinates (rounded down).
	floor(clone: boolean = true): XY {
    let source: XY = this;
		// non-destructive, returns a new point
    if (clone) {
      source = this.clone();
    }
		source.x = Math.floor(this.x);
		source.y = Math.floor(this.y);
    return source;
	}

	// @method ceil(): Point
	// Returns a copy of the current point with ceiled coordinates (rounded up).
	ceil(clone: boolean = true): XY {
		let source: XY = this;
		// non-destructive, returns a new point
    if (clone) {
      source = this.clone();
    }
		source.x = Math.ceil(this.x);
		source.y = Math.ceil(this.y);
    return source;
	}

	// @method trunc(): Point
	// Returns a copy of the current point with truncated coordinates (rounded towards zero).
	trunc(clone: boolean = true): XY {
    let source: XY = this;
		// non-destructive, returns a new point
    if (clone) {
      source = this.clone();
    }
		source.x = Math.trunc(this.x);
		source.y = Math.trunc(this.y);
    return source;
	}

	// @method distanceTo(otherPoint: Point): Number
	// Returns the cartesian distance between the current and the given points.
	distanceTo(point: XY): number {
		let x = point.x - this.x,
		    y = point.y - this.y;

		return Math.sqrt(x * x + y * y);
	}

	// @method equals(otherPoint: Point): Boolean
	// Returns `true` if the given point has the same coordinates.
	equals(point: XY): boolean {
		if (!point) return false;
		return point.x === this.x &&
		       point.y === this.y;
	}

	// @method contains(otherPoint: Point): Boolean
	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
	contains(point: XY): boolean {
		return Math.abs(point.x) <= Math.abs(this.x) &&
		       Math.abs(point.y) <= Math.abs(this.y);
	}

	// @method toString(): String
	// Returns a string representation of the point for debugging purposes.
	toString(): string {
		return 'XY(' +
		        formatNum(this.x) + ', ' +
		        formatNum(this.y) + ')';
	}

}
