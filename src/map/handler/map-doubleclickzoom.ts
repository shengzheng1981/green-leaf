import { HandlerObject } from '../../base/handler-object';

/*
 * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
 */

export class DoubleClickZoomHandler extends HandlerObject {
	addHooks() {
		this._map.on('dblclick', this._onDoubleClick, this);
	}

	removeHooks() {
		this._map.off('dblclick', this._onDoubleClick, this);
	}

	_onDoubleClick(e: any) {
		var map = this._map,
		    oldZoom = map.getZoom(),
		    delta = map.options.zoomDelta,
		    zoom = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;

		if (map.options.doubleClickZoom === 'center') {
			map.setZoom(zoom);
		} else {
			map.setZoomAround(e.containerPixel, zoom);
		}
	}
}

