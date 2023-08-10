import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";
import { PointSymbol } from "./symbol";

/**
 * 字符符号
 * @remarks
 * 中英文皆可，注意控制长度，推荐单个字符
 */
export class LetterSymbol extends PointSymbol {

  /**
   * 外圈半径
   */
  public radius: number = 10;
  /**
   * 字符，中英文皆可，推荐单个字符
   */
  public letter: string = "";
  /**
   * 字体颜色
   */
  public fontColor: string = "#ff0000";
  /**
   * 字体大小
   */
  public fontSize: number = 12;
  /**
   * 字体
   */
  public fontFamily: string = "YaHei";
  /**
   * 字体粗细
   */
  public fontWeight: string = "Bold";

  /**
   * 绘制字符符号
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {number} screenX - 屏幕坐标X
   * @param {number} screenY - 屏幕坐标Y
   */
  draw(ctx: CanvasRenderingContext2D, screenXY: ScreenXY) {
    ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath(); //Start path
    //keep size
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    //绘制外圈
    ctx.arc(screenXY.x, screenXY.y, this.radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = this.fontColor;
    ctx.font = this.fontSize + "px/1 " + this.fontFamily + " " + this.fontWeight;
    //绘制字符
    ctx.fillText(this.letter, screenXY.x, screenXY.y);
    ctx.restore();
  }

  getScreenBounds(screenXY: ScreenXY) {
    let r = this.radius,
    w = this.stroke ? this.weight / 2 : 0,
    p = new ScreenXY(r + w, r + w);
    return new ScreenBounds(screenXY.subtract(p), screenXY.add(p));
  }
 
}