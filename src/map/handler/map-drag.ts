import * as Util from '../../util/util';
import * as DomUtil from '../../util/dom-util';
import { HandlerObject } from '../../base/handler-object';
import { DraggableObject } from '../../base/draggable-object';
import { ScreenXY } from '../../common/screen-xy';
import { ScreenBounds } from '../../common/screen-bounds';
import { LatLng } from '../../common/latlng';

export class DragHandler extends HandlerObject {
	_draggable: DraggableObject;
	_viscosity: number;
	_lastPos: ScreenXY;
	_absPos: ScreenXY;
	_offsetLimit: ScreenBounds;
	_lastTime: number;
	_times: number[];
	_positions: ScreenXY[];
	_initialWorldOffset: number;
	_worldWidth: number;

	addHooks() {
		if (!this._draggable) {
			var map = this._map;

			this._draggable = new DraggableObject(map._mapPane, map._container);

			this._draggable.on({
				dragstart: this._onDragStart,
				drag: this._onDrag,
				dragend: this._onDragEnd
			}, this);

			this._draggable.on('predrag', this._onPreDragLimit, this);
			if (map.options.worldCopyJump) {
				this._draggable.on('predrag', this._onPreDragWrap, this);
				map.on('zoomend', this._onZoomEnd, this);

				map.whenReady(this._onZoomEnd, this);
			}
		}
		DomUtil.addClass(this._map._container, 'leaflet-grab leaflet-touch-drag');
		this._draggable.enable();
		this._positions = [];
		this._times = [];
	}

	removeHooks() {
		DomUtil.removeClass(this._map._container, 'leaflet-grab');
		DomUtil.removeClass(this._map._container, 'leaflet-touch-drag');
		this._draggable.disable();
	}

	moved() {
		return this._draggable && this._draggable._moved;
	}

	moving() {
		return this._draggable && this._draggable._moving;
	}

	_onDragStart() {
		var map = this._map;

		map._stop();
		if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
			var bounds = this._map.options.maxBounds;

			this._offsetLimit = new ScreenBounds(
				this._map.latLngToContainerPixel(bounds.getNorthWest()).multiplyBy(-1),
				this._map.latLngToContainerPixel(bounds.getSouthEast()).multiplyBy(-1)
					.add(this._map.getSize()));

			this._viscosity = Math.min(1.0, Math.max(0.0, this._map.options.maxBoundsViscosity));
		} else {
			this._offsetLimit = null;
		}

		map
		    .fire('movestart')
		    .fire('dragstart');

		if (map.options.inertia) {
			this._positions = [];
			this._times = [];
		}
	}

	_onDrag(e: any) {
		if (this._map.options.inertia) {
			var time = this._lastTime = +new Date(),
			    pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;

			this._positions.push(pos);
			this._times.push(time);

			this._prunePositions(time);
		}

		this._map
		    .fire('move', e)
		    .fire('drag', e);
	}

	_prunePositions(time: number) {
		while (this._positions.length > 1 && time - this._times[0] > 50) {
			this._positions.shift();
			this._times.shift();
		}
	}

	_onZoomEnd() {
		var pxCenter = this._map.getSize().divideBy(2),
		    pxWorldCenter = this._map.latLngToCanvasPixel(new LatLng(0, 0));

		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
		this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
	}

	_viscousLimit(value: number, threshold: number) {
		return value - (value - threshold) * this._viscosity;
	}

	_onPreDragLimit() {
		if (!this._viscosity || !this._offsetLimit) { return; }

		var offset = this._draggable._newPos.subtract(this._draggable._startPos);

		var limit = this._offsetLimit;
		if (offset.x < limit.min.x) { offset.x = this._viscousLimit(offset.x, limit.min.x); }
		if (offset.y < limit.min.y) { offset.y = this._viscousLimit(offset.y, limit.min.y); }
		if (offset.x > limit.max.x) { offset.x = this._viscousLimit(offset.x, limit.max.x); }
		if (offset.y > limit.max.y) { offset.y = this._viscousLimit(offset.y, limit.max.y); }

		this._draggable._newPos = this._draggable._startPos.add(offset);
	}

	_onPreDragWrap() {
		// TODO refactor to be able to adjust map pane position after zoom
		var worldWidth = this._worldWidth,
		    halfWidth = Math.round(worldWidth / 2),
		    dx = this._initialWorldOffset,
		    x = this._draggable._newPos.x,
		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

		this._draggable._absPos = this._draggable._newPos.clone();
		this._draggable._newPos.x = newX;
	}

	_onDragEnd(e: any) {
		var map = this._map,
		    options = map.options,

		    noInertia = !options.inertia || this._times.length < 2;

		map.fire('dragend', e);

		if (noInertia) {
			map.fire('moveend');

		} else {
			this._prunePositions(+new Date());

			var direction = this._lastPos.subtract(this._positions[0]),
			    duration = (this._lastTime - this._times[0]) / 1000,
			    ease = options.easeLinearity,

			    speedVector = direction.multiplyBy(ease / duration),
			    speed = speedVector.distanceTo(new ScreenXY(0, 0)),

			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();
			
			if (!offset.x && !offset.y) {
				map.fire('moveend');
			} else {
				offset = map._limitOffset(offset, map.options.maxBounds);

				Util.requestAnimFrame(function () {
					map.panBy(offset, {
						duration: decelerationDuration,
						easeLinearity: ease,
						noMoveStart: true,
						animate: true
					});
				});
			}
		}
	}
}

// @section Handlers
// @property dragging: Handler
// Map dragging handler (by both mouse and touch).
// Map.addInitHook('addHandler', 'dragging', Drag);
