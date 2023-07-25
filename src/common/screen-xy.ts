import { formatNum } from '../util/util';
import { XY } from './xy';

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

export class ScreenXY extends XY{

	constructor(x: number = 0, y: number = 0) {
		super(x, y);
	}

// @method clone(): Point
	// Returns a copy of the current point.
	clone(): ScreenXY {
		return new ScreenXY(this.x, this.y);
	}

	// @method distanceTo(otherPoint: Point): Number
	// Returns the cartesian distance between the current and the given points.
	distanceTo(screenXY: ScreenXY): number {
		return super.distanceTo(screenXY);
	}

	// @method equals(otherPoint: Point): Boolean
	// Returns `true` if the given point has the same coordinates.
	equals(screenXY: ScreenXY): boolean {
		return super.equals(screenXY);
	}

	// @method contains(otherPoint: Point): Boolean
	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
	contains(screenXY: ScreenXY): boolean {
		return super.contains(screenXY);
	}

	// @method toString(): String
	// Returns a string representation of the point for debugging purposes.
	toString(): string {
		return 'ScreenXY(' +
		        formatNum(this.x) + ', ' +
		        formatNum(this.y) + ')';
	}

}
