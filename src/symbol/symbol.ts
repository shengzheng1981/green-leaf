import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";

/**
 * 符号基类
 * @remarks
 * 如按现实世界来抽取对象基类，下述属性不应放在基类
 * 但考虑到Canvas的上下文设定，才决定抽取到基类
 */
export abstract class Symbol {


  /**
   * 线宽
   */
  public lineWidth: number = 2;

  public stroke: boolean = true;

  /**
   * 描边样式
   */
  public strokeStyle: string = "#ff0000";
  public strokeColor: string = "#ff0000";
  public strokeOpacity: number = 1;

  public fill: boolean = true;
  /**
   * 填充样式
   */
  public fillStyle: string = "#ff000088";
  public fillColor: string = "#ff0000";
  public fillOpacity: number = 0.5;

  get weight() {
    return this.lineWidth;
  }

  set weight(value: number) {
    this.lineWidth = value;
  }

  // abstract contain(screenXY: ScreenXY): boolean;
}

/**
 * 点符号基类
 */
export abstract class PointSymbol extends Symbol {


  /**
   * 绘制点（虚函数）
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {number} screenX - 屏幕坐标X
   * @param {number} screenY - 屏幕坐标Y
   */
  abstract draw(ctx: CanvasRenderingContext2D, screenXY: ScreenXY);

  abstract getScreenBounds(screenXY: ScreenXY);
}

/**
 * 线符号基类
 */
export abstract class LineSymbol extends Symbol {

  public lineWidth: number = 3;


  /**
   * 绘制线（虚函数）
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {number[][]} screenXYs - 线对应坐标点的屏幕坐标集合
   */
  abstract draw(ctx: CanvasRenderingContext2D, screenXYs: ScreenXY[]);

  abstract getScreenBounds(screenXYs: ScreenXY[]);
}
/**
* 面符号基类
* @remarks
* aka 填充符号
*/
export abstract class FillSymbol extends Symbol {

  /**
   * 绘制面（虚函数）
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {number[][][]} screenXYs - 面对应坐标点的屏幕坐标集合
   */
  abstract draw(ctx: CanvasRenderingContext2D, screenXYs: ScreenXY[][]);

  abstract getScreenBounds(screenXYs: ScreenXY[][]);
}

/**
 * 简单圆点符号
 * @remarks
 * 最常用的点符号
 */
export class SimplePointSymbol extends PointSymbol {
  /**
   * 圆点半径，像素值
   */
  public radius: number = 10;
  /**
   * 绘制点
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {number} screenX - 屏幕坐标X
   * @param {number} screenY - 屏幕坐标Y
   */
  draw(ctx: CanvasRenderingContext2D, screenXY: ScreenXY) {
    //ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath(); //Start path
    ctx.arc(screenXY.x, screenXY.y, this.radius, 0, Math.PI * 2, false);
    // ctx.globalAlpha = this.fillOpacity;
    // ctx.fillStyle = this.fillColor;
    ctx.fill('evenodd');
    // ctx.globalAlpha = this.strokeOpacity;
    // ctx.strokeStyle = this.strokeColor;
    // ctx.lineWidth = this.lineWidth;
    ctx.stroke();
    //ctx.restore();
  }

  getScreenBounds(screenXY: ScreenXY) {
    let r = this.radius,
      w = this.stroke ? this.weight / 2 : 0,
      p = new ScreenXY(r + w, r + w);
    return new ScreenBounds(screenXY.subtract(p), screenXY.add(p));
  }

  
}

/**
 * 图标符号
 * @remarks
 * 常用于POI兴趣点的渲染
 */
export class SimpleMarkerSymbol extends PointSymbol {

  /**
   * 宽
   */
  public width: number = 16;
  /**
   * 高
   */
  public height: number = 16;
  /**
   * offset，坐标点对应图标的位置
   * 例如，宽16px，高16px，offsetX为-8，offsetY为-8：
   * 该图标的中心点对应渲染点的坐标。
   */
  public offsetX: number = -8;
  /**
   * offset，坐标点对应图标的位置
   * 例如，宽16px，高16px，offsetX为-8，offsetY为-8：
   * 该图标的中心点对应渲染点的坐标。
   */
  public offsetY: number = -8;
  /**
   * 图标位图
   */
  public image: ImageBitmap | HTMLImageElement;
  /**
   * 图标url
   */
  public url: string;

  private _loaded: boolean;
  /**
   * 记录是否已完成异步图标加载
   */
  get loaded(): boolean {
    return this._loaded;
  }
  /**
   * 异步加载图标
   * @return {Color} 生成随机色带
   */
  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => {
        createImageBitmap(img).then(icon => {
          this.image = icon;
          this._loaded = true;
          resolve(icon);
        }, err => reject(err));
      };
      img.onerror = reject;
      img.src = this.url;
    })
  }

  /**
   * 绘制图标
   * @remarks
   * 注意异步加载
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {number} screenX - 屏幕坐标X
   * @param {number} screenY - 屏幕坐标Y
   */
  draw(ctx: CanvasRenderingContext2D, screenXY: ScreenXY) {
    // if (!this._loaded) {
    //     this.image = new Image();
    //     this.image.src = this.url;
    //     this.image.onload = () => {
    //       ctx.drawImage(this.image, screenXY.x + this.offsetX, screenXY.y + this.offsetY, this.width, this.height);
    //     }
    //     this._loaded = true;
    // } else {
    //   if (!this._loading) {
    //     ctx.drawImage(this.image, screenXY.x + this.offsetX, screenXY.y + this.offsetY, this.width, this.height);
    //   }
    // }
    // find a better way
    // now we need await image load
    if (!this._loaded) {
      this.image = new Image();
      this.image.src = this.url;
      this._loaded = true;
    } else {
      ctx.drawImage(this.image, screenXY.x + this.offsetX, screenXY.y + this.offsetY, this.width, this.height);
    }
  }

  getScreenBounds(screenXY: ScreenXY) {
    let p1 = new ScreenXY(this.offsetX, this.offsetY);
    let p2 = new ScreenXY(this.offsetX + this.width, this.offsetY + this.height);
    return new ScreenBounds(screenXY.add(p1), screenXY.add(p2));
  }
}

/**
 * 简单线符号
 * @remarks
 * 最常用的线符号
 */
export class SimpleLineSymbol extends LineSymbol {

  /**
   * 绘制线
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {number[][]} screen - 线对应坐标点的屏幕坐标集合
   */
  draw(ctx: CanvasRenderingContext2D, screenXYs: ScreenXY[]) {
    if (screenXYs.length < 2) return;
    // ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    screenXYs.forEach((screenXY: ScreenXY, index) => {
      if (index === 0) {
        ctx.moveTo(screenXY.x, screenXY.y);
      } else {
        ctx.lineTo(screenXY.x, screenXY.y);
      }
    });
    ctx.stroke();
    // ctx.restore();
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

/**
 * 简单面符号
 * @remarks
 * 最常用的面填充符号
 */
export class SimpleFillSymbol extends FillSymbol {

  /**
   * 重写线宽默认值，基类为1，按需设置，可省略
   */
  public lineWidth: number = 2;
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
    ctx.fillStyle = this.fillStyle;
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