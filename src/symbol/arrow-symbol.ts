import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";
import { LineSymbol } from "./symbol";

/**
 * 箭头符号
 */
export class ArrowSymbol extends LineSymbol {

  /**
   * 线宽
   */
  public lineWidth: number = 2;
  /**
   * 决定绘制箭头的最小线长
   * @remarks 屏幕坐标，单位pixel
   * 默认 >50pixels will draw arrow
   */
  public minLength: number = 50;
  /**
   * 箭翼长度
   */
  public arrowLength: number = 10;
  /**
   * 箭翼夹角
   * @remarks 默认 angle 30 = Math.PI / 6
   */
  public arrowAngle: number = Math.PI / 6;

  /**
   * 绘制线
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {number[][]} screen - 线对应坐标点的屏幕坐标集合
   */
  draw(ctx: CanvasRenderingContext2D, screenXYs: ScreenXY[]) {
    ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    //keep lineWidth
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.beginPath();
    screenXYs.forEach((screenXY: ScreenXY, index) => {
      const screenX = screenXY.x, screenY = screenXY.y;
      if (index === 0) {
        ctx.moveTo(screenX, screenY);
      } else {
        ctx.lineTo(screenX, screenY);
      }
    });
    ctx.stroke();
    //已知 起点和终点  求沿线距起点定长的点
    const _getPointAlongLine = (p1, p2, d) => {
      //line length
      let l = Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]));
      let t = d / l;
      return [(1 - t) * p1[0] + t * p2[0], (1 - t) * p1[1] + t * p2[1]];
    };
    //已知 起点 y = kx + b   求沿线距起点定长的点 两个点
    const _getPointAlongLine2 = (k, b, p, d) => {
      let x0 = p[0] + Math.sqrt((d * d) / (k * k + 1)), x1 = p[0] - Math.sqrt((d * d) / (k * k + 1));
      return [[x0, k * x0 + b], [x1, k * x1 + b]];
    };
    screenXYs.reduce((prev, cur) => {
      if (prev) {
        const length = Math.sqrt((cur.x - prev.x) * (cur.x - prev.x) + (cur.y - prev.y) * (cur.y - prev.y));
        if (length >= this.minLength) {
          //中点 即箭头
          const [middleX, middleY] = [(prev.x + cur.x) / 2, (prev.y + cur.y) / 2];
          //箭尾垂线的垂足
          const [footX, footY] = _getPointAlongLine([middleX, middleY], [prev.x, prev.y], Math.cos(this.arrowAngle) * this.arrowLength);
          const k = (cur.y - prev.y) / (cur.x - prev.x);
          // 1/k 垂线
          const points = _getPointAlongLine2(-1 / k, footY - footX * -1 / k, [footX, footY], Math.sin(this.arrowAngle) * this.arrowLength);
          //两点
          points.forEach(point => {
            ctx.beginPath();
            ctx.moveTo(middleX, middleY);
            ctx.lineTo(point[0], point[1]);
            ctx.stroke();
          });
        }
        return cur;
      } else {
        return cur;
      }
    });
    ctx.restore();
  }

  getScreenBounds(screenXYs: ScreenXY[]) {
    const bounds: ScreenBounds = new ScreenBounds();
    screenXYs.forEach(screenXY => {
      bounds.extend(screenXY);
    })
    // extend weight
    return bounds;
  }
}