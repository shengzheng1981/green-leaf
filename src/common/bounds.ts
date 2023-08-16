import { XY } from './xy';

/**
 * 坐标范围
 * @remark Represents a rectangular area in plane or pixel coordinates.
 */
export abstract class XYBounds {
	// @property min: Point
	// The top left corner of the rectangle.
	// @property max: Point
	// The bottom right corner of the rectangle.
	/**
   * 最小坐标
   * @remark The top left corner of the rectangle.
   */
  min: XY;
	/**
   * 最大坐标
   * @remark The bottom right corner of the rectangle.
   */
  max: XY;
  /**
   * 构造函数
   * @param {XY | XY[]} a - 坐标或坐标数组
   * @param {XY} b - 坐标
   */
	constructor(a?: XY | XY[], b?: XY) {
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
	/**
   * 扩展坐标范围
   * @param {XY | XYBounds} obj - 坐标或坐标范围
   * @return {LatLngBounds} 返回坐标范围
   */
  extend(obj: XY | XYBounds): XYBounds { // (Point)
		// @property min: Point
		// The top left corner of the rectangle.
		// @property max: Point
		// The bottom right corner of the rectangle.
    if (obj instanceof XY) {
      if (!this.min && !this.max) {
        this.min = obj.clone();
        this.max = obj.clone();
      } else {
        this.min.x = Math.min(obj.x, this.min.x);
        this.max.x = Math.max(obj.x, this.max.x);
        this.min.y = Math.min(obj.y, this.min.y);
        this.max.y = Math.max(obj.y, this.max.y);
      }
    } else if (obj instanceof XYBounds) {
      if (!this.min && !this.max) {
        this.min = obj.min.clone();
        this.max = obj.max.clone();
      } else {
        this.min.x = Math.min(obj.min.x, this.min.x);
        this.max.x = Math.max(obj.max.x, this.max.x);
        this.min.y = Math.min(obj.min.y, this.min.y);
        this.max.y = Math.max(obj.max.y, this.max.y);
      }
    }
		
		return this;
	}

	// @method getCenter(round?: Boolean): Point
	// Returns the center point of the bounds.
	/**
   * 获取中心点
   * @return {XY} 返回中心点XY
   */
  abstract getCenter(round?: boolean): XY;

	// @method getBottomLeft(): Point
	// Returns the bottom-left point of the bounds.
	/**
   * 获取左下角
   * @return {XY} 返回左下角XY
   */
  abstract getBottomLeft(): XY;

	// @method getTopRight(): Point
	// Returns the top-right point of the bounds.
	/**
   * 获取右上角
   * @return {XY} 返回右上角XY
   */
  abstract getTopRight(): XY;

	// @method getTopLeft(): Point
	// Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
	/**
   * 获取左上角
   * @return {XY} 返回左上角XY
   */
  getTopLeft(): XY {
		return this.min; // left, top
	}

	// @method getBottomRight(): Point
	// Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
	/**
   * 获取右下角
   * @return {XY} 返回右下角XY
   */
  getBottomRight(): XY {
		return this.max; // right, bottom
	}

	// @method getSize(): Point
	// Returns the size of the given bounds
  /**
   * 获取范围大小XY
   * @return {XY} 返回范围大小XY
   */
	getSize(): XY {
		return this.max.subtract(this.min);
	}

	// @method contains(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle contains the given one.
	// @alternative
	// @method contains(point: Point): Boolean
	// Returns `true` if the rectangle contains the given point.
  /**
   * 判断是否包含坐标或坐标范围
   * @param {XYBounds | XY} obj - 坐标或坐标范围
   * @return {boolean} 返回是否包含
   */
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
  /**
   * 判断是否与另一经纬度范围有交叉
   * @param {LatLngBounds} obj - 经纬度范围
   * @return {boolean} 返回是否交叉
   */
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
  /**
   * 判断是否与另一坐标范围有叠盖
   * @param {XYBounds} obj - 经纬度范围
   * @return {boolean} 返回是否叠盖
   */
	overlaps(bounds: XYBounds): boolean { // (Bounds) -> Boolean
		let min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
		    yOverlaps = (max2.y > min.y) && (min2.y < max.y);

		return xOverlaps && yOverlaps;
	}
  /**
   * 判断坐标范围是否有效
   * @return {boolean} 返回是否有效
   */
	isValid(): boolean {
		return !!(this.min && this.max);
	}

}
