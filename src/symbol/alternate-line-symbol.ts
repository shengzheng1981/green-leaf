import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";
import { LineSymbol } from "./symbol";

/**
 * 简单线符号
 * @remarks
 * 最常用的线符号
 */
 export class AlternateLineSymbol extends LineSymbol {

  public color1: string = "#000000";
  public color2: string = "#ffffff";
  public alternate: number = 10;
  /**
   * 绘制线
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {ScreenXY[]} screenXYs - 线对应坐标点的屏幕坐标集合
   */
  draw(ctx: CanvasRenderingContext2D, screenXYs: ScreenXY[]) {
    if (screenXYs.length < 2) return;
    ctx.save();
    ctx.strokeStyle = this.color1;
    ctx.lineWidth = this.lineWidth;
    ctx.setLineDash([this.alternate, this.alternate]);
    ctx.beginPath();
    screenXYs.forEach((screenXY: ScreenXY, index) => {
      if (index === 0) {
        ctx.moveTo(screenXY.x, screenXY.y);
      } else {
        ctx.lineTo(screenXY.x, screenXY.y);
      }
    });
    ctx.stroke();
    ctx.strokeStyle = this.color2;
    ctx.lineDashOffset = this.alternate;
    ctx.beginPath();
    screenXYs.forEach((screenXY: ScreenXY, index) => {
      if (index === 0) {
        ctx.moveTo(screenXY.x, screenXY.y);
      } else {
        ctx.lineTo(screenXY.x, screenXY.y);
      }
    });
    ctx.stroke();
    ctx.restore();
  }
  /**
   * 获取包络矩形
   * @param {ScreenXY[]} screenXYs - 线对应坐标点的屏幕坐标集合
   */
  getScreenBounds(screenXYs: ScreenXY[]) {
    const bounds: ScreenBounds = new ScreenBounds();
    screenXYs.forEach(screenXY => {
      bounds.extend(screenXY);
    })
    // extend weight
    return bounds;
  }
}