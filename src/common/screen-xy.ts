import { formatNum } from '../util/util';
import { XY } from './xy';

/**
 * 屏幕坐标
 */
export class ScreenXY extends XY{
  /**
    * 构造函数
    * @param {number} x - X
    * @param {number} y - Y
    */
	constructor(x: number = 0, y: number = 0) {
		super(x, y);
	}

  // @method clone(): Point
	// Returns a copy of the current point.
  /**
   * 克隆坐标
   * @return {ScreenXY} 返回坐标
   */
	clone(): ScreenXY {
		return new ScreenXY(this.x, this.y);
	}

	// @method distanceTo(otherPoint: Point): Number
	// Returns the cartesian distance between the current and the given points.
	/**
   * 计算与另一点间欧式距离
   * @param {ScreenXY} screenXY - 另一点坐标
   * @return {number} 返回距离
   */
  distanceTo(screenXY: ScreenXY): number {
		return super.distanceTo(screenXY);
	}

	// @method equals(otherPoint: Point): Boolean
	// Returns `true` if the given point has the same coordinates.
	/**
   * 判断坐标是否相等
   * @param {ScreenXY} obj - 坐标
   * @return {boolean} 返回是否相等
   */
  equals(screenXY: ScreenXY): boolean {
		return super.equals(screenXY);
	}

	// @method contains(otherPoint: Point): Boolean
	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
	/**
   * 判断是否包含坐标
   * @param {ScreenXY} obj - 坐标
   * Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
   * @return {boolean} 返回是否包含
   */
  contains(screenXY: ScreenXY): boolean {
		return super.contains(screenXY);
	}

	// @method toString(): String
	// Returns a string representation of the point for debugging purposes.
	/**
   * 输出字符串
   * @param {number} precision - 保留精度
   * @return {string} 返回字符串
   */
  toString(precision: number = 3): string {
		return 'ScreenXY(' +
		        formatNum(this.x, precision) + ', ' +
		        formatNum(this.y, precision) + ')';
	}

}
