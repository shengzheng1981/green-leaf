import { CommonObject } from "../base/common-object";

/**
 * 文本符号
 * @remarks
 * 常用于文本标注
 */
 export class Text extends CommonObject {
  /**
   * 边框宽
   */
  public lineWidth: number = 3;
  /**
   * 边框色
   */
  public strokeStyle: string = "#ff0000"; //#ffffff
  /**
   * 填充色
   */
  public fillStyle: string = "#ffffff";    //#ffffff
  /**
   * X偏移
   */
  public offsetX: number = 0;
  /**
   * Y偏移
   */
  public offsetY: number = 1;
  /**
   * 周边留白
   */
  public padding: number = 5;
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
   * 放置位置
   */
  public placement: string = "BOTTOM";   //BOTTOM TOP LEFT RIGHT
  /**
   * 自动调整位置
   */
  public auto: boolean = false;
  /**
   * 标注点符号的宽度
   */
  public pointSymbolWidth: number = 0;
  /**
   * 标注点符号的高度
   */
  public pointSymbolHeight: number = 0;

  /**
   * 自动调整位置
   * @remarks 按逆时针方向寻找合适位置
   */
  replacement() {
      if (this.auto) {
          switch (this.placement) {
              case "BOTTOM":
                  this.placement = "RIGHT";
                  break;
              case "RIGHT":
                  this.placement = "TOP";
                  break;
              case "TOP":
                  this.placement = "LEFT";
                  break;
              case "LEFT":
                  this.placement = "BOTTOM";
                  break;
          }
      }
  }

}