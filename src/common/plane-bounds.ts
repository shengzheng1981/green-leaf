import { XYBounds } from './bounds';
import { PlaneXY } from './plane-xy';

/**
 * 平面坐标范围
 * @remark Represents a rectangular area in plane coordinates.
 */
export class PlaneBounds extends XYBounds {
	// @property min: Point
	// The top left corner of the rectangle.
	// @property max: Point
	// The bottom right corner of the rectangle.
	/**
   * 最小平面坐标
   * @remark The top left corner of the rectangle.
   */
  min: PlaneXY;
  /**
   * 最大平面坐标
   * @remark The bottom right corner of the rectangle.
   */
	max: PlaneXY;
  /**
   * 构造函数
   * @param {PlaneXY | PlaneXY[]} a - 平面坐标或平面坐标数组
   * @param {PlaneXY} b - 平面坐标
   */
	constructor(a?: PlaneXY | PlaneXY[], b?: PlaneXY) {
		super(a, b);
	}

	// @method getCenter(round?: Boolean): Point
	// Returns the center point of the bounds.
  /**
   * 获取中心点
   * @param {boolean} round - 是否取整
   * @return {PlaneXY} 返回中心点
   */
	getCenter(round: boolean = false): PlaneXY {
		const x = round ? Math.round((this.min.x + this.max.x) / 2) : (this.min.x + this.max.x) / 2;
		const y = round ? Math.round((this.min.y + this.max.y) / 2) : (this.min.y + this.max.y) / 2;
		return new PlaneXY(x, y);
	}

	// @method getBottomLeft(): Point
	// Returns the bottom-left point of the bounds.
	/**
   * 获取左下角
   * @return {PlaneXY} 返回左下角
   */
  getBottomLeft(): PlaneXY {
		return new PlaneXY(this.min.x, this.max.y);
	}

	// @method getTopRight(): Point
	// Returns the top-right point of the bounds.
  /**
   * 获取右上角
   * @return {PlaneXY} 返回右上角
   */
	getTopRight(): PlaneXY { // -> Point
		return new PlaneXY(this.max.x, this.min.y);
	}

}
