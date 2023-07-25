import { CommonObject } from '../base/common-object';
import { XY } from './xy';

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

export abstract class XYBounds extends CommonObject {
	// @property min: Point
	// The top left corner of the rectangle.
	// @property max: Point
	// The bottom right corner of the rectangle.
	min: XY;
	max: XY;

	constructor(a?: XY | XY[], b?: XY) {
		super();
		let points: XY[];
		if (a instanceof XY && b instanceof XY) {
			points = [a, b];
		} else if (Array.isArray(a)){
			points = a;
		} else if (typeof a === 'undefined' && typeof b === 'undefined'){
			points = [];
		} else {
			throw new Error('Bounds constructor has an invalid argument.');
		}
		for (var i = 0, len = points.length; i < len; i++) {
			this.extend(points[i]);
		}
	}

	// @method extend(point: Point): this
	// Extends the bounds to contain the given point.
	extend(xy: XY | XYBounds): XYBounds { // (Point)
		// @property min: Point
		// The top left corner of the rectangle.
		// @property max: Point
		// The bottom right corner of the rectangle.
    if (xy instanceof XY) {
      if (!this.min && !this.max) {
        this.min = xy.clone();
        this.max = xy.clone();
      } else {
        this.min.x = Math.min(xy.x, this.min.x);
        this.max.x = Math.max(xy.x, this.max.x);
        this.min.y = Math.min(xy.y, this.min.y);
        this.max.y = Math.max(xy.y, this.max.y);
      }
    } else if (xy instanceof XYBounds) {
      if (!this.min && !this.max) {
        this.min = xy.min.clone();
        this.max = xy.max.clone();
      } else {
        this.min.x = Math.min(xy.min.x, this.min.x);
        this.max.x = Math.max(xy.max.x, this.max.x);
        this.min.y = Math.min(xy.min.y, this.min.y);
        this.max.y = Math.max(xy.max.y, this.max.y);
      }
    }
		
		return this;
	}

	// @method getCenter(round?: Boolean): Point
	// Returns the center point of the bounds.
	abstract getCenter(round?: boolean): XY;

	// @method getBottomLeft(): Point
	// Returns the bottom-left point of the bounds.
	abstract getBottomLeft(): XY;

	// @method getTopRight(): Point
	// Returns the top-right point of the bounds.
	abstract getTopRight(): XY;

	// @method getTopLeft(): Point
	// Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
	getTopLeft(): XY {
		return this.min; // left, top
	}

	// @method getBottomRight(): Point
	// Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
	getBottomRight(): XY {
		return this.max; // right, bottom
	}

	// @method getSize(): Point
	// Returns the size of the given bounds
	getSize(): XY {
		return this.max.subtract(this.min);
	}

	// @method contains(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle contains the given one.
	// @alternative
	// @method contains(point: Point): Boolean
	// Returns `true` if the rectangle contains the given point.
	contains(obj: XYBounds | XY): boolean {
		let min, max;

		if (obj instanceof XYBounds) {
			min = obj.min;
			max = obj.max;
		} else {
			min = max = obj;
		}

		return (min.x >= this.min.x) &&
		       (max.x <= this.max.x) &&
		       (min.y >= this.min.y) &&
		       (max.y <= this.max.y);
	}

	// @method intersects(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle intersects the given bounds. Two bounds
	// intersect if they have at least one point in common.
	intersects(bounds: XYBounds): boolean { // (Bounds) -> Boolean
		let min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

		return xIntersects && yIntersects;
	}

	// @method overlaps(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle overlaps the given bounds. Two bounds
	// overlap if their intersection is an area.
	overlaps(bounds: XYBounds): boolean { // (Bounds) -> Boolean
		let min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
		    yOverlaps = (max2.y > min.y) && (min2.y < max.y);

		return xOverlaps && yOverlaps;
	}

	isValid(): boolean {
		return !!(this.min && this.max);
	}

}
