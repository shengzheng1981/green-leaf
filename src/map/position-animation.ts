import * as Util from '../util/util';
import * as DomUtil from '../util/dom-util';
import { EventedObject } from '../base/evented-object';
import { ScreenXY } from '../common/screen-xy';



/*
 * @class PosAnimation
 * @aka L.PosAnimation
 * @inherits Evented
 * Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.
 *
 * @example
 * ```js
 * var fx = new L.PosAnimation();
 * fx.run(el, [300, 500], 0.5);
 * ```
 *
 * @constructor L.PosAnimation()
 * Creates a `PosAnimation` object.
 *
 */
export class PosAnimation extends EventedObject {
	private _el: HTMLElement;
	private _startPos: ScreenXY;
	private _inProgress: boolean;
	private _duration: number = 0.25;
	private _easeOutPower: number;
	private _offset: ScreenXY;
	private _startTime: number;
	private _animId: number;

	constructor(el: HTMLElement) {
		super();
		this._el = el;
	}

	// @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
	// Run an animation of a given element to a new position, optionally setting
	// duration in seconds (`0.25` by default) and easing linearity factor (3rd
	// argument of the [cubic bezier curve](http://cubic-bezier.com/#0,0,.5,1),
	// `0.5` by default).
	run(el: HTMLElement, newPos: ScreenXY, duration?: number, easeLinearity?: number) {
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._duration = duration || 0.25;
		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

		this._startPos = DomUtil.getPosition(el);
		this._offset = newPos.subtract(this._startPos);
		this._startTime = +new Date();

		// @event start: Event
		// Fired when the animation starts
		this.fire('start');

		this._animate();
	}

	// @method stop()
	// Stops the animation (if currently running).
	stop() {
		if (!this._inProgress) { return; }

		this._step(true);
		this._complete();
	}

	_animate() {
		// animation loop
		this._animId = Util.requestAnimFrame(this._animate, this);
		this._step();
	}

	_step(round?: boolean) {
		var elapsed = (+new Date()) - this._startTime,
		    duration = this._duration * 1000;

		if (elapsed < duration) {
			this._runFrame(this._easeOut(elapsed / duration), round);
		} else {
			this._runFrame(1);
			this._complete();
		}
	}

	_runFrame(progress: number, round?: boolean) {
		var pos = this._startPos.add(this._offset.multiplyBy(progress));
		if (round) {
			pos.round(false);
		}
		DomUtil.setPosition(this._el, pos);

		// @event step: Event
		// Fired continuously during the animation.
		this.fire('step');
	}

	private _complete() {
		Util.cancelAnimFrame(this._animId);

		this._inProgress = false;
		// @event end: Event
		// Fired when the animation ends.
		this.fire('end');
	}

	private _easeOut(t: number) {
		return 1 - Math.pow(1 - t, this._easeOutPower);
	}
}
