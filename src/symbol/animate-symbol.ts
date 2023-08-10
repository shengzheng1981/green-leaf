import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";
import { PointSymbol } from "./symbol";

export abstract class AnimatePointSymbol extends PointSymbol {
  /**
   * 绘制点（虚函数）
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {number} screenX - 屏幕坐标X
   * @param {number} screenY - 屏幕坐标Y
   */
  abstract draw(ctx: CanvasRenderingContext2D, screenXY: ScreenXY);
  /**
   * 动画效果
   * @remarks
   * 通过Animator中requestAnimationFrame循环调用，因此注意优化代码，保持帧数
   * @param {number} elapsed - 已逝去的时间，毫秒
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   */
  abstract animate(timestamp: number);
  abstract getScreenBounds(screenXY: ScreenXY);
}

export class SimpleAnimatePointSymbol extends AnimatePointSymbol {

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

  _screenXY: ScreenXY;
  _ctx: CanvasRenderingContext2D;
  _start: number;
  _frame: number;
  draw(ctx: CanvasRenderingContext2D, screenXY: ScreenXY) {
    this._screenXY = screenXY;
    this._ctx = ctx;
    this._frame && window.cancelAnimationFrame(this._frame);
    this._start = undefined;
    //this上下文绑定
    this.animate = this.animate.bind(this);
    //动画循环
    this._frame = window.requestAnimationFrame(this.animate);
  }
  getScreenBounds(screenXY: ScreenXY) {
    let r = this.limit,
      w = this.stroke ? Math.ceil(this.weight / 2) : 0,
      p = new ScreenXY(r + w, r + w);
    return new ScreenBounds(screenXY.subtract(p), screenXY.add(p));
  }
  /**
   * 动画效果
   * @remarks
   * 通过Animator中requestAnimationFrame循环调用，因此注意优化代码，保持帧数
   * @param {number} elapsed - 已逝去的时间，毫秒
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   */
  animate(timestamp: number) {
    const screenXY: ScreenXY = this._screenXY;
    const ctx = this._ctx;
    if (this._start === undefined) {
      this._start = timestamp;
    }
    const elapsed = timestamp - this._start;
    ctx.save();

    const bounds = this.getScreenBounds(screenXY);
    const size = bounds.getSize();
    ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);

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
    //循环，下一帧
    this._frame = window.requestAnimationFrame(this.animate);
  }

}