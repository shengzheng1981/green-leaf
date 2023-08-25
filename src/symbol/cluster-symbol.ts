import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";
import { Color } from "../util/color";
import { PointSymbol } from "./symbol";

/**
 * 聚合符号
 * @remarks
 * 限制用于点图层
 */
export class ClusterSymbol extends PointSymbol {

  /**
   * 聚合数量
   */
  private _count: number = 2;
  /**
   * 聚合符号的默认半径
   */
  public radius: number = 10;
  /**
   * 重写描边样式
   */
  public strokeStyle: string = "#ffffff"; //#ff0000
  /**
   * 聚合外圈填充样式
   */
  public outerFillStyle: string = "#ffffff";    //#ff0000
  /**
   * 聚合数量字体颜色
   */
  public fontColor: string = "#ffffff";
  /**
   * 聚合数量字体
   */
  public fontFamily: string = "YaHei";
  /**
   * 聚合数量字体粗细
   */
  public fontWeight: string = "Bold";
  /**
   * 色带起始色
   */
  public startColor: string = "#19caad";
  /**
   * 色带终止色
   */
  public endColor: string = "#f4606c";
  /**
   * 聚合数量文本
   * @remarks
   * 大于99，标记为99+
   */
  get text(): string {
    return this._count <= 99 ? this._count.toString() : "99+";
  }
  /**
   * 内圈半径
   */
  get inner(): number {
    return this._count <= 15 ? this.radius + this._count : this.radius + 15;
  }
  /**
   * 外圈半径
   */
  get outer(): number {
    return this.inner + 4;
  }
  /**
   * 字体随数量递增，同时控制为非无限递增
   */
  get fontSize(): number {
    if (this._count < 10) {
      return 12;
    } else if (this._count >= 10 && this._count < 30) {
      return 14;
    } else if (this._count >= 30 && this._count < 50) {
      return 16;
    } else if (this._count >= 30 && this._count < 50) {
      return 18;
    } else if (this._count > 50) {
      return 20;
    }
  }
  /**
   * 聚合的内圈填充样式
   * @remarks
   * 采用色带，色带可自定义扩展
   */
  get innerFillStyle(): string {
    //TODO 优化 setter hex, getter color
    const colors = Color.ramp(Color.fromHex(this.startColor), Color.fromHex(this.endColor), 16);
    return colors[this._count <= 15 ? this._count : 15].toString();
  }

  /**
   * 创建聚合符号
   * @param {number} count - 聚合数量
   */
  constructor(count: number) {
    super();
    this._count = count;
  }

  /**
   * 绘制聚合符号
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {ScreenXY} screenXY - 屏幕坐标
   */
  draw(ctx: CanvasRenderingContext2D, screenXY: ScreenXY) {
    ctx.save();
    // ctx.setTransform(1,0,0,1,0,0);
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.outerFillStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath(); //Start path
    //keep size 画外圈
    ctx.arc(screenXY.x, screenXY.y, this.outer, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = this.innerFillStyle;
    ctx.beginPath(); //Start path
    //keep size 画内圈
    ctx.arc(screenXY.x, screenXY.y, this.inner, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.stroke();
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = this.fontColor;
    ctx.font = this.fontSize + "px/1 " + this.fontFamily + " " + this.fontWeight;
    ctx.fillText(this.text, screenXY.x, screenXY.y);
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