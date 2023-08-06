import { ScreenXY } from "../common/screen-xy";
import { CRS } from "../crs/crs";

/**
 * 动画效果基类
 * @remarks
 * 动画两种实现方式：
 * 1.针对单个图形要素，实现动画，使用时，逻辑较清晰；
 * 2.针对整个图层，类似Symbol，使用时，可能存在效率问题；
 * 目前暂实现1，针对2，目前保留部分已注释的代码，便于日后参考。
 */
export abstract class Animation {

  /**
   * 投影变换虚函数
   * @param {Projection} projection - 坐标投影转换
   */
  abstract project(crs: CRS);


  abstract transform(origin: ScreenXY, zoom: number);
  /**
   * 动画效果
   * @remarks
   * 通过Animator中requestAnimationFrame循环调用，因此注意优化代码，保持帧数
   * @param {number} elapsed - 已逝去的时间，毫秒
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   */
  abstract animate(elapsed: number, ctx: CanvasRenderingContext2D);

}



