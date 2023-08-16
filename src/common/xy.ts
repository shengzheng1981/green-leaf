import { formatNum } from '../util/util';

/**
 * 坐标
 */
export abstract class XY {

	public x: number;
	public y: number;
  /**
    * 构造函数
    * @param {number} x - X
    * @param {number} y - Y
    */
	constructor(x: number = 0, y: number = 0) {
		// @property x: Number; The `x` coordinate of the point
		this.x = x;
		// @property y: Number; The `y` coordinate of the point
		this.y = y;
	}

  /**
   * 克隆坐标
   * @return {XY} 返回坐标
   */
  abstract clone(): XY;

	// @method add(otherPoint: Point): Point
	// Returns the result of addition of the current and the given points.
	/**
   * 坐标相加
   * @param {XY} otherXY - 另一坐标
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
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
	/**
   * 坐标相减
   * @param {XY} otherXY - 另一坐标
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
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
	/**
   * 坐标除以常数
   * @param {number} num - 常数
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
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
	/**
   * 坐标乘以常数
   * @param {number} num - 常数
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
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
	/**
   * 坐标相乘
   * @param {XY} otherXY - 另一坐标
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
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
	/**
   * 坐标相除
   * @param {XY} otherXY - 另一坐标
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
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
	/**
   * 坐标取整（四舍五入）
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
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
	/**
   * 坐标向下取整
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
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
	/**
   * 坐标向上取整
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
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
	/**
   * 坐标直接取整（将数字的小数部分去掉）
   * @param {boolean} clone - 是否返回新坐标
   * @return {XY} 返回坐标
   */
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
	/**
   * 计算与另一点间欧式距离
   * @param {XY} point - 另一点坐标
   * @return {number} 返回距离
   */
  distanceTo(point: XY): number {
		let x = point.x - this.x,
		    y = point.y - this.y;

		return Math.sqrt(x * x + y * y);
	}

	// @method equals(otherPoint: Point): Boolean
	// Returns `true` if the given point has the same coordinates.
	/**
   * 判断坐标是否相等
   * @param {XY} obj - 坐标
   * @return {boolean} 返回是否相等
   */
  equals(point: XY): boolean {
		if (!point) return false;
		return point.x === this.x &&
		       point.y === this.y;
	}

	// @method contains(otherPoint: Point): Boolean
	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
	/**
   * 判断是否包含坐标
   * @remark Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
   * @param {XY} obj - 坐标
   * @return {boolean} 返回是否包含
   */
  contains(point: XY): boolean {
		return Math.abs(point.x) <= Math.abs(this.x) &&
		       Math.abs(point.y) <= Math.abs(this.y);
	}

	// @method toString(): String
	// Returns a string representation of the point for debugging purposes.
	/**
   * 输出字符串
   * @param {number} precision - 保留精度
   * @return {string} 返回字符串
   */
  toString(precision: number = 3): string {
		return 'XY(' +
		        formatNum(this.x, precision) + ', ' +
		        formatNum(this.y, precision) + ')';
	}

}
