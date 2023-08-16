import { formatNum } from '../util/util';
import { XY } from './xy';

/**
 * 平面坐标
 */
export class PlaneXY extends XY{
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
   * @return {PlaneXY} 返回坐标
   */
	clone(): PlaneXY {
		return new PlaneXY(this.x, this.y);
	}

	// @method distanceTo(otherPoint: Point): Number
	// Returns the cartesian distance between the current and the given points.
	/**
   * 计算与另一点间欧式距离
   * @param {PlaneXY} planeXY - 另一点坐标
   * @return {number} 返回距离
   */
  distanceTo(planeXY: PlaneXY): number {
		return super.distanceTo(planeXY);
	}

	// @method equals(otherPoint: Point): Boolean
	// Returns `true` if the given point has the same coordinates.
	/**
   * 判断坐标是否相等
   * @param {PlaneXY} obj - 坐标
   * @return {boolean} 返回是否相等
   */
  equals(planeXY: PlaneXY): boolean {
		return super.equals(planeXY);
	}

	// @method contains(otherPoint: Point): Boolean
	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
	/**
   * 判断是否包含坐标
   * @param {PlaneXY} obj - 坐标
   * Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
   * @return {boolean} 返回是否包含
   */
  contains(planeXY: PlaneXY): boolean {
		return super.contains(planeXY);
	}

	// @method toString(): String
	// Returns a string representation of the point for debugging purposes.
	/**
   * 输出字符串
   * @param {number} precision - 保留精度
   * @return {string} 返回字符串
   */
  toString(precision: number = 3): string {
		return 'PlaneXY(' +
		        formatNum(this.x, precision) + ', ' +
		        formatNum(this.y, precision) + ')';
	}

}
