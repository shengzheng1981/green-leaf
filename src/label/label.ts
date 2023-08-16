import { Feature } from "../feature/feature";
import { Field } from "../feature/field";
import { Text } from "../text/text";
import { Collision, NullCollision, SimpleCollision } from "./collision";

/**
 * 图层标注设置
 */
export class Label {
  /**
   * 标注字段
   */
  field: Field;
  /**
   * 标注符号
   * @remarks
   * 参考Renderer和Feature中的相关重要说明
   */
  text: Text = new Text();
  /**
   * 标注冲突解决方式
   */
  collision: Collision = new SimpleCollision();

  /**
   * 绘制图层标注
   * @param {Feature[]} features - 准备绘制标注的要素集合
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {Projection} projection - 坐标投影转换
   */
  draw(ctx: CanvasRenderingContext2D, features: Feature[]) {
    //通过冲突检测，得到要绘制的要素集合
    const remain: Feature[] = this.collision.test(ctx, features, this.field, this.text);
    //遍历绘制要素标注
    remain.forEach((feature: Feature) => {
      feature.label(ctx, this.field, this.text);
    });
  }
}