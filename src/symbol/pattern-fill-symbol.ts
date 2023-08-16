import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";
import { FillSymbol } from "./symbol";

/**
 * 模式填充面符号
 * @remarks
 * 最常用的面填充符号
 */
export abstract class PatternFillSymbol extends FillSymbol {

  /**
   * 绘制面
   * @remarks
   * 奇偶填充
   * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fill
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {number[][][]} screen - 面对应坐标点的屏幕坐标集合
   */
  draw(ctx: CanvasRenderingContext2D, screenXYs: ScreenXY[][]) {
    // ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.createPattern(ctx);
    // ctx.fillStyle = this.fillStyle;
    ctx.lineWidth = this.lineWidth;
    //TODO:  exceeding the maximum extent(bound), best way is overlap by extent. find out: maximum is [-PI*R, PI*R]??
    ctx.beginPath();
    screenXYs.forEach(ring => {
      if (ring.length < 3) return;
      ring.forEach((screenXY: ScreenXY, index) => {
        if (index === 0) {
          ctx.moveTo(screenXY.x, screenXY.y);
        } else {
          ctx.lineTo(screenXY.x, screenXY.y);
        }
      });
    });
    ctx.closePath();
    //奇偶填充
    //https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fill
    ctx.fill("evenodd");
    ctx.stroke();
    // ctx.restore();
  }

  abstract createPattern(ctx: CanvasRenderingContext2D);

  getScreenBounds(screenXYs: ScreenXY[][]) {
    const bounds: ScreenBounds = new ScreenBounds();
    screenXYs.forEach(ring => {
      ring.forEach(screenXY => {
        bounds.extend(screenXY);
      })
    })
    // extend weight
    return bounds;
  }
}

export class LinePatternFillSymbol extends PatternFillSymbol {

  public patternLineWidth: number = 2;
  public size: number = 16;
  public angle: number = 45;   //(0, 180)

  get radian() {
    return this.angle * Math.PI / 180;
  }
  createPattern(ctx: CanvasRenderingContext2D) {
    const canvas = document.createElement("canvas");
    const width = this.size;
    const height = this.angle == 0 || this.angle == 90 || this.angle == 180 ? this.size : Math.round(this.size * Math.abs(Math.tan(this.radian)));
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    context.strokeStyle = this.strokeStyle;
    context.lineWidth = this.patternLineWidth;

    if (this.angle == 0 || this.angle == 180) {
      context.beginPath();
      context.moveTo(0, height / 2);
      context.lineTo(width, height / 2);
      context.stroke();
    } else if (this.angle == 90) {
      context.beginPath();
      context.moveTo(width / 2, 0);
      context.lineTo(width / 2, height);
      context.stroke();
    } else if (this.angle < 90 && this.angle > 0) {
      // 中间过中心
      context.setTransform(1, Math.tan(this.radian), 0, 1, width / 2, height / 2);
      context.beginPath();
      context.moveTo(-width / 2, 0);
      context.lineTo(width / 2, 0);
      context.stroke();
      // 上半从中点开始到右上角
      // context.setTransform(1, Math.tan(this.angle), 0, 1, this.size/2, 0);
      context.beginPath();
      context.moveTo(0, -height / 2);
      context.lineTo(width / 2, -height / 2);
      // context.moveTo(0, 0);
      // context.lineTo(this.size/2, 0);
      context.stroke();
      // 下半从左下角开始到中点
      // context.setTransform(1, Math.tan(this.angle), 0, 1, this.size/2, this.size);
      context.beginPath();
      context.moveTo(-width / 2, height / 2);
      context.lineTo(0, height / 2);
      // context.moveTo(-this.size/2, 0);
      // context.lineTo(0, 0);
      context.stroke();
    } else if (this.angle < 180 && this.angle > 90) {
      // 中间过中心
      context.setTransform(1, - Math.tan(Math.PI - this.radian), 0, 1, width / 2, height / 2);
      context.beginPath();
      context.moveTo(-width / 2, 0);
      context.lineTo(width / 2, 0);
      context.stroke();
      // 上半从左上角开始到中点
      // context.setTransform(1, Math.tan(this.angle), 0, 1, this.size/2, 0);
      context.beginPath();
      context.moveTo(-width / 2, -height / 2);
      context.lineTo(0, -height / 2);
      // context.moveTo(0, 0);
      // context.lineTo(this.size/2, 0);
      context.stroke();
      // 下半从中点开始到右下角
      // context.setTransform(1, Math.tan(this.angle), 0, 1, this.size/2, this.size);
      context.beginPath();
      context.moveTo(0, height / 2);
      context.lineTo(width / 2, height / 2);
      // context.moveTo(-this.size/2, 0);
      // context.lineTo(0, 0);
      context.stroke();
    }

    return ctx.createPattern(canvas, "repeat");
  }

}