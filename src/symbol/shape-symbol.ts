import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";
import { PointSymbol } from "./symbol";
/**
 * 形状点符号（正多边形）
 */
export class ShapeSymbol extends PointSymbol {
  /**
   * 圆点半径，像素值
  */
  public radius: number = 10;
  /**
   * 边数
  */
  public sides: number = 4;
  /**
   * 旋转度数
  */
  public angle: number = 0;  //(0, 360)
  /**
   * 旋转弧度
  */
  get radian() {
    return this.angle * Math.PI / 180;
  }
  /**
   * 绘制点（虚函数）
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {ScreenXY} screenXY - 屏幕坐标
   */
  draw(ctx: CanvasRenderingContext2D, screenXY: ScreenXY) {
    ctx.save();
    //keep size
    //地理坐标 转回 屏幕坐标
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath(); //Start path
    const screenX = screenXY.x;
    const screenY = screenXY.y;
    //ctx.arc(screenX, screenY, this.radius, 0, Math.PI * 2, true);
    ctx.moveTo(screenX + this.radius * Math.sin(this.radian), screenY - this.radius * Math.cos(this.radian));
    for (let i = 1; i < this.sides; i++) {
      let rad = 2 * Math.PI / this.sides * i;
      ctx.lineTo(screenX + this.radius * Math.sin(this.radian + rad), screenY - this.radius * Math.cos(this.radian + rad));
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  /**
   * 获取包络矩形
   * @param {ScreenXY} screenXY - 屏幕坐标
   */
  getScreenBounds(screenXY: ScreenXY) {
    let r = this.radius,
      w = this.stroke ? this.weight / 2 : 0,
      p = new ScreenXY(r + w, r + w);
    return new ScreenBounds(screenXY.subtract(p), screenXY.add(p));
  }
}