import { Animation } from "../../animation/animation";
import { Canvas, CanvasOptions } from "./canvas";
import { Map } from '../map';

export class AnimaterOptions extends CanvasOptions {
  pane: string = 'animatePane';
}

export class Animater extends Canvas {
  options: AnimaterOptions = new AnimaterOptions();

  _animations: Animation[];
  private _frame: any;
  private _start: number;

  constructor(map: Map, options?: Object) {
    super(map, options);
    this._animations = [];
  }

  _onZoomEnd() {
    super._onZoomEnd();

    this._animations.forEach(animation => {
      animation.transform(this._origin, this._zoom);
    });
  }

  addAnimation(animation: Animation) {
    animation.transform(this._origin, this._zoom);
    this._animations.push(animation);
  }

  // removeAnimation(animation: Animation) {
  //   const index = this._animations.findIndex(item => item.id == animation.id);
  //   this._animations.splice(index, 1);
  //   this._updateGeometry();
  // }

  // clearGraphicLayers() {
  //   this._graphicLayers = [];
  //   this._updateGeometry();
  // }

  _draw() {
    if (this._ctx) {
      let bounds = this._redrawBounds;
      this._ctx.save();
      if (bounds) {
        var size = bounds.getSize();
        this._ctx.beginPath();
        this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
        this._ctx.clip();
      }

      this._drawing = true;
      // console.time("draw");
      this._frame && window.cancelAnimationFrame(this._frame);
      this._start = undefined;

      //this上下文绑定
      this._animate = this._animate.bind(this);
      //动画循环
      this._frame = window.requestAnimationFrame(this._animate);

      // console.timeEnd("draw");
      this._drawing = false;

      this._ctx.restore();  // Restore state before clipping.
    }
  }

  /**
     * 动画循环
     * @param {number} timestamp - 时间戳
     */
  _animate(timestamp) {
    if (this._start === undefined) {
      this._start = timestamp;
    }
    //计算逝去时间，毫秒
    const elapsed = timestamp - this._start;

    this._ctx.save();
    this._ctx.setTransform(1, 0, 0, 1, 0, 0);
    this._ctx.clearRect(0, 0, this._container.width, this._container.height);
    this._ctx.restore();

    //遍历所以动画效果，执行动画
    this._animations.forEach(animation => {
      animation.animate(elapsed, this._ctx);
    });
    //循环，下一帧
    this._frame = window.requestAnimationFrame(this._animate);
  }
}