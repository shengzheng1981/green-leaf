import { XYBounds } from './bounds';
import { PlaneXY } from './plane-xy';

/*
 * @class Bounds
 * @aka L.Bounds
 *
 * Represents a rectangular area in pixel coordinates.
 *
 * @example
 *
 * ```js
 * var p1 = L.point(10, 10),
 * p2 = L.point(40, 60),
 * bounds = L.bounds(p1, p2);
 * ```
 *
 * All Leaflet methods that accept `Bounds` objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
 *
 * ```js
 * otherBounds.intersects([[10, 10], [40, 60]]);
 * ```
 *
 * Note that `Bounds` does not inherit from Leaflet's `Class` object,
 * which means new classes can't inherit from it, and new methods
 * can't be added to it with the `include` function.
 */

export class PlaneBounds extends XYBounds {
	// @property min: Point
	// The top left corner of the rectangle.
	// @property max: Point
	// The bottom right corner of the rectangle.
	min: PlaneXY;
	max: PlaneXY;

	constructor(a?: PlaneXY | PlaneXY[], b?: PlaneXY) {
		super(a, b);
	}

	// @method getCenter(round?: Boolean): Point
	// Returns the center point of the bounds.
	getCenter(round: boolean = false): PlaneXY {
		const x = round ? Math.round((this.min.x + this.max.x) / 2) : (this.min.x + this.max.x) / 2;
		const y = round ? Math.round((this.min.y + this.max.y) / 2) : (this.min.y + this.max.y) / 2;
		return new PlaneXY(x, y);
	}

	// @method getBottomLeft(): Point
	// Returns the bottom-left point of the bounds.
	getBottomLeft(): PlaneXY {
		return new PlaneXY(this.min.x, this.max.y);
	}

	// @method getTopRight(): Point
	// Returns the top-right point of the bounds.
	getTopRight(): PlaneXY { // -> Point
		return new PlaneXY(this.max.x, this.min.y);
	}

}
