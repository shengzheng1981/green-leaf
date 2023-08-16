import { ScreenXY } from "../common/screen-xy";
import { CRS } from "../crs/crs";
import { Polyline } from "../geometry/polyline";

/**
 * 线默认动画效果类
 * @remarks
 * 类似航线效果
 */
export class LineAnimation extends Animation {
  /**
   * 线
   */
  private _polyline: Polyline;

  private _start: number[];
  private _end: number[];

  private _control: number[];
  private _percent = 0;

  /**
   * 线宽
   */
  lineWidth: number = 2;
  /**
   * 起始色
   */
  startColor: string = "#ff0000";
  /**
   * 终止色
   */
  endColor: string = "#ffff00";
  /**
   * 二次贝塞尔曲线控制点与线段夹角
   */
  angle: number = Math.PI / 4;
  /**
   * 构造函数
   * @param {Polyline} geometry - 线
   */
  constructor(geometry: Polyline) {
      super();
      this._polyline = geometry;
  }
  /**
   * 数据投影
   * @param {CRS} crs - 坐标系
   */
  project(crs: CRS) {
    this._polyline.crs = crs;
  }
  /**
   * 数据变换
   * @param {ScreenXY} origin - 窗口坐标原点
   * @param {number} zoom - 当前缩放级别
   */
  transform(origin: ScreenXY, zoom: number) {
    this._polyline.transform(origin, zoom);
    //TODO: polyline, not line; but now just line
    const start = this._polyline._screenXYs[0];
    const end = this._polyline._screenXYs[1];
    this._start = [start.x, start.y];
    this._end = [end.x, end.y];

    const k = (this._end[1] - this._start[1]) / (this._end[0] - this._start[0]);
    const d = Math.sqrt( (this._end[1] - this._start[1]) * (this._end[1] - this._start[1])  + (this._end[0] - this._start[0]) * (this._end[0] - this._start[0]));
    const s = d/2 / Math.cos(this.angle);
    //const a = (Math.atan(k) < 0 ? (Math.PI +  Math.atan(k)) : Math.atan(k)) - this.angle;
    //this._control = this._start[0] >= this._end[0] ? [this._start[0] + s * Math.cos(a), this._start[1] + s * Math.sin(a)] : [this._end[0] + s * Math.cos(a), this._end[1] + s * Math.sin(a)];
    const a = Math.atan(k) - this.angle;
    if (Math.atan(k) < 0) {
        if (this._end[0] > this._start[0]) {
            this._control = [this._start[0] + s * Math.cos(a), this._start[1] + s * Math.sin(a)];
        } else {
            this._control = [this._end[0] + s * Math.cos(a), this._end[1] + s * Math.sin(a)];
        }
    } else {
        if (this._end[0] > this._start[0]) {
            this._control = [this._start[0] + s * Math.cos(a), this._start[1] + s * Math.sin(a)];
        } else {
            this._control = [this._end[0] + s * Math.cos(a), this._end[1] + s * Math.sin(a)];
        }
    }
    this._percent = 0;
  }

  /**
   * 动画效果
   * @remarks
   * 通过Animator中requestAnimationFrame循环调用，因此注意优化代码，保持帧数
   * @param {number} elapsed - 已逝去的时间，毫秒
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   */
  animate(elapsed: number, ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.lineWidth = this.lineWidth;
      //keep size
      //地理坐标 转回 屏幕坐标
      // ctx.setTransform(1,0,0,1,0,0);

      const lineGradient = ctx.createLinearGradient(this._start[0], this._start[1], this._end[0], this._end[1]);
      lineGradient.addColorStop(0, this.startColor);
      lineGradient.addColorStop(1, this.endColor);
      ctx.strokeStyle = lineGradient;    //设置线条样式

      this._drawCurvePath(ctx, this._start, this._control, this._end, this._percent);

      this._percent += 0.8; //控制动画速度

      if (this._percent >= 100) { //没有画完接着调用,画完的话重置进度
          this._percent = 0;
      }
      ctx.restore();
  }

  _drawCurvePath(ctx, start, point, end, percent) {
      ctx.beginPath();
      ctx.moveTo(start[0], start[1]);
      for (let t = 0; t <= percent / 100; t += 0.005) {
          let x = this._quadraticBezier(start[0], point[0], end[0], t);
          let y = this._quadraticBezier(start[1], point[1], end[1], t);
          ctx.lineTo(x, y);
      }
      ctx.stroke();
  }

  _quadraticBezier(p0, p1, p2, t) {
      let k = 1 - t;
      return k * k * p0 + 2 * (1 - t) * t * p1 + t * t * p2; // 二次贝赛尔曲线方程
  }
}