import * as DomUtil from '../../util/dom-util';
import * as DomEvent from '../../util/dom-event';
import * as Browser from '../../util/browser';
import * as Util from '../../util/util';
import { EventedObject } from '../../base/evented-object';
import { LatLng } from '../../common/latlng';
import { ScreenXY } from '../../common/screen-xy';
import { ScreenBounds } from '../../common/screen-bounds';
import { Map } from '../map';
import { Geometry } from '../../geometry/geometry';
import { OptionsObject } from '../../base/options-object';
/*
 * @class Canvas
 * @inherits Renderer
 * @aka L.Canvas
 *
 * Allows vector layers to be displayed with [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
 * Inherits `Renderer`.
 *
 * Due to [technical limitations](http://caniuse.com/#search=canvas), Canvas is not
 * available in all web browsers, notably IE8, and overlapping geometries might
 * not display properly in some edge cases.
 *
 * @example
 *
 * Use Canvas by default for all paths in the map:
 *
 * ```js
 * var map = L.map('map', {
 * 	renderer: L.canvas()
 * });
 * ```
 *
 * Use a Canvas renderer with extra padding for specific vector geometries:
 *
 * ```js
 * var map = L.map('map');
 * var myRenderer = L.canvas({ padding: 0.5 });
 * var line = L.polyline( coordinates, { renderer: myRenderer } );
 * var circle = L.circle( center, { renderer: myRenderer } );
 * ```
 */
export class CanvasOptions extends OptionsObject {
  pane: string = 'overlayPane';
  // @option padding: Number = 0.1
  // How much to extend the clip area around the map view (relative to its size)
  // e.g. 0.1 would be 10% of map view in each direction
  padding: number = 0.1;

  // @option tolerance: Number = 0
  // How much to extend click tolerance round a path/object on the map
  tolerance: number = 0;
}

export class Canvas extends EventedObject {

  options: CanvasOptions = new CanvasOptions();

  _map: Map;

  _zoom: number;
  _center: LatLng;
  _origin: ScreenXY;
  _bounds: ScreenBounds;

  _container: HTMLCanvasElement;
  _ctx: CanvasRenderingContext2D;
  _drawing: boolean;
  _redrawRequest: number;
  _redrawBounds: ScreenBounds;

  constructor(map: Map, options?: Object) {
    super();
    this._map = map;
    this.options.assign(options);
  }

  init() {
    const container = this._container = document.createElement('canvas');

    this._ctx = container.getContext('2d') as CanvasRenderingContext2D;

    if (this._container) {
      this._map.getPane(this.options.pane).appendChild(this._container);
      // this._update();
      // this.on('update', this._updateGeometry, this);

      DomUtil.addClass(this._container, 'leaflet-zoom-animated');
    }

    this._map.on('viewreset', this._reset, this);
    this._map.on('zoom', this._onZoom, this);
    this._map.on('zoomanim', this._onAnimZoom, this);
    this._map.on('moveend', this._updateCanvas, this);
    this._map.on('zoomend', this._onZoomEnd, this);
  }

  destroy() {
    this._map.off('viewreset', this._reset, this);
    this._map.off('zoom', this._onZoom, this);
    this._map.off('zoomanim', this._onAnimZoom, this);
    this._map.off('moveend', this._updateCanvas, this);
    this._map.off('zoomend', this._onZoomEnd, this);
    if (this._redrawRequest) {
      Util.cancelAnimFrame(this._redrawRequest);
    }
    delete this._ctx;
    if (this._container) {
      // this.off('update', this._updateGeometry, this);
      DomUtil.remove(this._container);
      DomEvent.off(this._container);
      delete this._container;
    }
  }

  _onZoomEnd() {
    this._zoom = this._map.getZoom();
    this._origin = this._map.getPixelOrigin();
  }

  _onAnimZoom(ev: any) {
    this._updateTransform(ev.center, ev.zoom);
  }

  _onZoom() {
    this._updateTransform(this._map.getCenter(), this._map.getZoom());
  }

  _updateTransform(center: LatLng, zoom: number) {
    if (!this._container) return;
    let scale = this._map.getZoomScale(zoom, this._zoom),
      position = DomUtil.getPosition(this._container),
      viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding),
      currentCenterPoint = this._map.latLngToWorldPixel(this._center || this._map.getCenter(), zoom),
      destCenterPoint = this._map.latLngToWorldPixel(center, zoom),
      centerOffset = destCenterPoint.subtract(currentCenterPoint),

      topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);

    if (Browser.any3d) {
      DomUtil.setTransform(this._container, topLeftOffset, scale);
    } else {
      DomUtil.setPosition(this._container, topLeftOffset);
    }
  }

  // update geometry
  _updateGeometry() {
    this._redrawBounds = null;
    this._redraw();
  }

  // update center/zoom/bounds/position
  _updateCanvas() {
    if (this._map._animatingZoom && this._bounds) { return; }

    // Update pixel bounds of renderer container (for positioning/sizing/clipping later)
    // Subclasses are responsible of firing the 'update' event.
    const p = this.options.padding,
      size = this._map.getSize(),
      min = this._map.containerPixelToCanvasPixel(size.multiplyBy(-p)).round();

    this._bounds = new ScreenBounds(min, min.add(size.multiplyBy(1 + p * 2)).round());

    this._center = this._map.getCenter();
    this._zoom = this._map.getZoom();
    this._origin = this._map.getPixelOrigin();

    const b = this._bounds,
      container = this._container,
      bsize = b.getSize(),
      m = Browser.retina ? 2 : 1;

    if (container) {
      DomUtil.setPosition(container, b.min);

      // set canvas size (also clearing it); use double size on retina
      container.width = m * bsize.x;
      container.height = m * bsize.y;
      container.style.width = bsize.x + 'px';
      container.style.height = bsize.y + 'px';
    }

    if (this._ctx) {
      if (Browser.retina) {
        this._ctx.scale(2, 2);
      }

      // translate so we use the same path coordinates after canvas element moves
      this._ctx.translate(-b.min.x, -b.min.y);
    }

    // Tell paths to redraw themselves
    this._updateGeometry();
    this.fire('update');
  }

  _reset() {
    // this._update();
    this._updateTransform(this._center, this._zoom);
    this._updateGeometry();
  }

  _requestRedraw(geometry: Geometry) {
    if (!this._map) { return; }

    this._extendRedrawBounds(geometry);
    this._redrawRequest = this._redrawRequest || Util.requestAnimFrame(this._redraw, this);
  }

  _extendRedrawBounds(geometry: Geometry) {
    if (geometry.screenBounds) {
      // var padding = (layer.options.weight || 0) + 1;
      this._redrawBounds = this._redrawBounds || new ScreenBounds();
      // this._redrawBounds.extend(layer.screenBounds.min.subtract(new ScreenXY(padding, padding)));
      // this._redrawBounds.extend(layer.screenBounds.max.add(new ScreenXY(padding, padding)));
      this._redrawBounds.extend(geometry.screenBounds.min);
      this._redrawBounds.extend(geometry.screenBounds.max);
    }
  }

  _redraw() {
    this._redrawRequest = null;

    if (this._redrawBounds) {
      this._redrawBounds.min.floor(false);
      this._redrawBounds.max.ceil(false);
    }

    this._clear(); // clear layers in redraw bounds
    this._draw(); // draw layers

    this._redrawBounds = null;
  }

  _clear() {
    if (this._ctx) {
      const bounds = this._redrawBounds;
      if (bounds) {
        const size = bounds.getSize();
        this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
      } else {
        if (this._container) {
          this._ctx.save();
          this._ctx.setTransform(1, 0, 0, 1, 0, 0);
          this._ctx.clearRect(0, 0, this._container.width, this._container.height);
          this._ctx.restore();
        }
      }
    }
  }

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

      // console.timeEnd("draw");
      this._drawing = false;

      this._ctx.restore();  // Restore state before clipping.
    }
  }

}
