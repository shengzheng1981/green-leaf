import { ScreenXY } from "../common/screen-xy";
import { CRS } from "../crs/crs";
import { Point } from "../geometry/point";
import { Animation } from './animation';
/**
 * 点默认动画效果类
 * @remarks
 * 类似flashing效果，从中心点向外光环扩散效果
 */
export class PointAnimation extends Animation {
  protected _point: Point;

  /**
   * 边宽
   */
  lineWidth: number = 3;
  /**
   * 颜色
   */
  color: string = "#ff0000";
  /**
   * 扩散速度
   */
  velocity: number = 10;   //  px/s
  /**
   * 扩散的最大半径
   */
  limit: number = 30;
  /**
   * 扩散的光圈数
   */
  ring: number = 3;
  //radius: number = this.limit / this.ring;
  /**
   * 创建动画效果
   * @param {Point} geometry - 点
   */
  constructor(geometry: Point) {
    super();
    this._point = geometry;
  }
  /**
   * 动画效果初始化
   * @remarks
   * 一般情况下，把一次性逻辑放于此处，以及处理动画的初始状态
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {Projection} projection - 坐标投影转换
   */
   project(crs: CRS) {
    this._point.crs = crs;
    /*ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    //keep size
    //地理坐标 转回 屏幕坐标
    ctx.setTransform(1,0,0,1,0,0);
    ctx.beginPath(); //Start path
    ctx.arc(this._screenX, this._screenY, this.limit / this.ring, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.restore();*/
  }
  transform(origin: ScreenXY, zoom: number) {
    this._point.transform(origin, zoom);
  }
  /**
   * 动画效果
   * @remarks
   * 通过Animator中requestAnimationFrame循环调用，因此注意优化代码，保持帧数
   * @param {number} elapsed - 已逝去的时间，毫秒
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   */
  animate(elapsed: number, ctx: CanvasRenderingContext2D) {
  
    const screenXY: ScreenXY = this._point.screenXY;
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    //keep size
    //地理坐标 转回 屏幕坐标
    // ctx.setTransform(1,0,0,1,0,0);
    /*ctx.arc(this._screenX, this._screenY, this.limit / this.ring, 0, Math.PI * 2, true);
    ctx.fill();*/
    for (let i = 0; i < this.ring; i++) {
      ctx.beginPath(); //Start path
      ctx.arc(screenXY.x, screenXY.y, (elapsed / 1000 * this.velocity + i * this.limit / this.ring) % this.limit, 0, Math.PI * 2, true);
      //ctx.arc(this._screenX, this._screenY, this.limit / this.ring + ((elapsed/1000 + (this.limit - this.limit / this.ring) / this.velocity * (i/(this.ring - 1))) * this.velocity) % this.limit, 0, Math.PI * 2, true);
      ctx.stroke();
    }
    ctx.restore();
  }

}