import * as Browser from '../util/browser';
import * as DomEvent from '../util/dom-event';
import * as DomUtil from '../util/dom-util';
import * as Util from '../util/util';
import { EventedObject } from './evented-object';
import { ScreenXY } from '../common/screen-xy';
import { OptionsObject } from './options-object';

/*
 * @class Draggable
 * @aka L.Draggable
 * @inherits Evented
 *
 * A class for making DOM elements draggable (including touch support).
 * Used internally for map and marker dragging. Only works for elements
 * that were positioned with [`L.DomUtil.setPosition`](#domutil-setposition).
 *
 * @example
 * ```js
 * var draggable = new L.Draggable(elementToDrag);
 * draggable.enable();
 * ```
 */

const START = Browser.touch ? 'touchstart mousedown' : 'mousedown';
const END = {
	mousedown: 'mouseup',
	touchstart: 'touchend',
	pointerdown: 'touchend',
	MSPointerDown: 'touchend'
};
const MOVE = {
	mousedown: 'mousemove',
	touchstart: 'touchmove',
	pointerdown: 'touchmove',
	MSPointerDown: 'touchmove'
};
/**
 * 可拖拽选项
 */
export class DraggableOptions extends OptionsObject {
  // @section
  // @aka Draggable options
  // @option clickTolerance: Number = 3
  // The max number of pixels a user can shift the mouse pointer during a click
  // for it to be considered a valid click (as opposed to a mouse drag).
  clickTolerance: number = 3; 

  preventOutline: boolean = false;
}
/**
 * 可拖拽类
 */
export class DraggableObject extends EventedObject {
	static _dragging: DraggableObject;
  options: DraggableOptions = new DraggableOptions();

	_element: HTMLElement;
	_dragStartTarget: HTMLElement;
	_enabled: boolean;
	_moved: boolean;

	_lastTarget: HTMLElement;
	_lastEvent: any;
	_parentScale: any;

	_startPoint: ScreenXY;
	_moving: boolean;
	_startPos: ScreenXY;
	_newPos: ScreenXY;
	_absPos: ScreenXY;
	
	_animRequest: number;

	// @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
	// Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
	constructor(element: HTMLElement, dragStartTarget?: HTMLElement, options?: any) {
		super();
    this.options.assign(options);

		this._element = element;
		this._dragStartTarget = dragStartTarget || element;
	}

	// @method enable()
	// Enables the dragging ability
	enable() {
		if (this._enabled) { return; }

		DomEvent.on(this._dragStartTarget, START, this._onDown, this);

		this._enabled = true;
	}

	// @method disable()
	// Disables the dragging ability
	disable() {
		if (!this._enabled) { return; }

		// If we're currently dragging this draggable,
		// disabling it counts as first ending the drag.
		if (DraggableObject._dragging === this) {
			this.finishDrag();
		}

		DomEvent.off(this._dragStartTarget, START, this._onDown, this);

		this._enabled = false;
		this._moved = false;
	}

	_onDown(e: any) {
		// Ignore simulated events, since we handle both touch and
		// mouse explicitly; otherwise we risk getting duplicates of
		// touch events, see #4315.
		// Also ignore the event if disabled; this happens in IE11
		// under some circumstances, see #3666.
		if (e._simulated || !this._enabled) { return; }

		this._moved = false;

		if (DomUtil.hasClass(this._element, 'leaflet-zoom-anim')) { return; }

		if (DraggableObject._dragging || e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }
		DraggableObject._dragging = this;  // Prevent dragging multiple objects at once.
		
		if (this._moving) { return; }

		// @event down: Event
		// Fired when a drag is about to start.
		this.fire('down');

		var first = e.touches ? e.touches[0] : e,
		    sizedParent = DomUtil.getSizedParentNode(this._element);

		this._startPoint = new ScreenXY(first.clientX, first.clientY);

		// Cache the scale, so that we can continuously compensate for it during drag (_onMove).
		this._parentScale = DomUtil.getScale(sizedParent);

		DomEvent.on(document, MOVE[e.type], this._onMove, this);
		DomEvent.on(document, END[e.type], this._onUp, this);
	}

	_onMove(e: any) {
		// Ignore simulated events, since we handle both touch and
		// mouse explicitly; otherwise we risk getting duplicates of
		// touch events, see #4315.
		// Also ignore the event if disabled; this happens in IE11
		// under some circumstances, see #3666.
		if (e._simulated || !this._enabled) { return; }

		if (e.touches && e.touches.length > 1) {
			this._moved = true;
			return;
		}

		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
		    offset = new ScreenXY(first.clientX, first.clientY).subtract(this._startPoint);

		if (!offset.x && !offset.y) { return; }
		if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) { return; }

		// We assume that the parent container's position, border and scale do not change for the duration of the drag.
		// Therefore there is no need to account for the position and border (they are eliminated by the subtraction)
		// and we can use the cached value for the scale.
		offset.x /= this._parentScale.x;
		offset.y /= this._parentScale.y;

		DomEvent.preventDefault(e);

		if (!this._moved) {
			// @event dragstart: Event
			// Fired when a drag starts
			this.fire('dragstart');

			this._moved = true;
			this._startPos = DomUtil.getPosition(this._element).subtract(offset);

			DomUtil.addClass(document.body, 'leaflet-dragging');

			this._lastTarget = e.target || e.srcElement;
			// IE and Edge do not give the <use> element, so fetch it
			// if necessary
			// if (window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance) {
			// 	this._lastTarget = this._lastTarget.correspondingUseElement;
			// }
			DomUtil.addClass(this._lastTarget, 'leaflet-drag-target');
		}

		this._newPos = this._startPos.add(offset);
		this._moving = true;

		Util.cancelAnimFrame(this._animRequest);
		this._lastEvent = e;
		this._animRequest = Util.requestAnimFrame(this._updatePosition, this, true);
	}

	_updatePosition() {
		var e = {originalEvent: this._lastEvent};

		// @event predrag: Event
		// Fired continuously during dragging *before* each corresponding
		// update of the element's position.
		this.fire('predrag', e);
		DomUtil.setPosition(this._element, this._newPos);

		// @event drag: Event
		// Fired continuously during dragging.
		this.fire('drag', e);
	}

	_onUp(e: any) {
		// Ignore simulated events, since we handle both touch and
		// mouse explicitly; otherwise we risk getting duplicates of
		// touch events, see #4315.
		// Also ignore the event if disabled; this happens in IE11
		// under some circumstances, see #3666.
		if (e._simulated || !this._enabled) { return; }
		this.finishDrag();
	}

	finishDrag() {
		DomUtil.removeClass(document.body, 'leaflet-dragging');

		if (this._lastTarget) {
			DomUtil.removeClass(this._lastTarget, 'leaflet-drag-target');
			this._lastTarget = null;
		}

		for (var i in MOVE) {
			DomEvent.off(document, MOVE[i], this._onMove, this);
			DomEvent.off(document, END[i], this._onUp, this);
		}

		if (this._moved && this._moving) {
			// ensure drag is not fired after dragend
			Util.cancelAnimFrame(this._animRequest);

			// @event dragend: DragEndEvent
			// Fired when the drag ends.
			this.fire('dragend', {
				distance: this._newPos.distanceTo(this._startPos)
			});
		}

		this._moving = false;
		DraggableObject._dragging = null;
	}

}
