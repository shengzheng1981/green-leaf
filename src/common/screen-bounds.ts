import { XYBounds } from './bounds';
import { ScreenXY } from './screen-xy';

/**
 * 屏幕坐标范围
 * @remark Represents a rectangular area in pixel coordinates.
 */
export class ScreenBounds extends XYBounds {
	// @property min: Point
	// The top left corner of the rectangle.
	// @property max: Point
	// The bottom right corner of the rectangle.
	/**
   * 最小屏幕坐标
   * @remark The top left corner of the rectangle.
   */
  min: ScreenXY;
	/**
   * 最大屏幕坐标
   * @remark The bottom right corner of the rectangle.
   */
  max: ScreenXY;
  /**
   * 构造函数
   * @param {ScreenXY | ScreenXY[]} a - 屏幕坐标或屏幕坐标数组
   * @param {ScreenXY} b - 屏幕坐标
   */
	constructor(a?: ScreenXY | ScreenXY[], b?: ScreenXY) {
		super(a, b);
	}

	// @method getCenter(round?: Boolean): Point
	// Returns the center point of the bounds.
	/**
   * 获取中心点
   * @param {boolean} round - 是否取整
   * @return {ScreenXY} 返回中心点
   */
  getCenter(round: boolean = false): ScreenXY {
		const x = round ? Math.round((this.min.x + this.max.x) / 2) : (this.min.x + this.max.x) / 2;
		const y = round ? Math.round((this.min.y + this.max.y) / 2) : (this.min.y + this.max.y) / 2;
		return new ScreenXY(x, y);
	}

	// @method getBottomLeft(): Point
	// Returns the bottom-left point of the bounds.
	/**
   * 获取左下角
   * @return {ScreenXY} 返回左下角
   */
  getBottomLeft(): ScreenXY {
		return new ScreenXY(this.min.x, this.max.y);
	}

	// @method getTopRight(): Point
	// Returns the top-right point of the bounds.
  /**
   * 获取右上角
   * @return {ScreenXY} 返回右上角
   */
	getTopRight(): ScreenXY { // -> Point
		return new ScreenXY(this.max.x, this.min.y);
	}
  /**
   * 缓冲范围
   * @param {number} pixel - 缓冲像素
   */
	pad(pixel: number) {
		this.min.x -= pixel;
		this.min.y -= pixel;
		this.max.x += pixel;
		this.max.y += pixel;
	}
}
