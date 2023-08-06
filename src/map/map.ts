import * as Util from '../util/util';
import * as Browser from '../util/browser';
import * as DomUtil from '../util/dom-util';
import * as DomEvent from '../util/dom-event';
import { EventedObject } from '../base/evented-object';
import { LatLng } from '../common/latlng';
import { LatLngBounds } from '../common/latlng-bounds';
import { ScreenBounds } from '../common/screen-bounds';
import { ScreenXY } from '../common/screen-xy';
import { Earth } from '../crs/crs-earth';
import { EPSG3857 } from '../crs/crs-3857';

import { Canvas } from './canvas';
import { PosAnimation } from './position-animation';
import { HandlerObject } from '../base/handler-object';
import { DragHandler } from './handler/map-drag';
import { ScrollWheelZoomHandler } from './handler/map-scrollwheelzoom';
import { DoubleClickZoomHandler } from './handler/map-doubleclickzoom';
import { Graphic } from '../graphic/graphic';
import { GraphicLayer } from '../layer/graphic-layer';
import { FeatureLayer } from '../layer/feature-layer';
import { RasterLayer } from '../layer/raster-layer';
import { Animation } from '../animation/animation';
import { OptionsObject } from '../base/options-object';
import { CRS } from '../crs/crs';
import { Viewer } from './canvas/viewer';
import { Animater } from './canvas/animater';
// import { Layer } from '../layer/layer';


/*
 * @class Map
 * @aka L.Map
 * @inherits Evented
 *
 * The central class of the API — it is used to create a map on a page and manipulate it.
 *
 * @example
 *
 * ```js
 * // initialize the map on the "map" div with a given center and zoom
 * var map = L.map('map', {
 * 	center: [51.505, -0.09],
 * 	zoom: 13
 * });
 * ```
 *
 */

export class MapOptions extends OptionsObject {
  // @section Map State Options
  // @option crs: CRS = L.CRS.EPSG3857
  // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
  // sure what it means.
  // crs: Earth = new EPSG3857();

  // @option center: LatLng = undefined
  // Initial geographic center of the map
  center: LatLng = undefined;

  // @option zoom: Number = undefined
  // Initial map zoom level
  zoom: number = undefined;

  // @option minZoom: Number = *
  // Minimum zoom level of the map.
  // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
  // the lowest of their `minZoom` options will be used instead.
  minZoom: number = 1;

  // @option maxZoom: Number = *
  // Maximum zoom level of the map.
  // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
  // the highest of their `maxZoom` options will be used instead.
  maxZoom: number = 20;

  // @section Animation Options
  // @option zoomAnimation: Boolean = true
  // Whether the map zoom animation is enabled. By default it's enabled
  // in all browsers that support CSS3 Transitions except Android.
  zoomAnimation: boolean = true;

  // @option zoomAnimationThreshold: Number = 4
  // Won't animate zoom if the zoom difference exceeds this value.
  zoomAnimationThreshold: number = 4;

  // @option fadeAnimation: Boolean = true
  // Whether the tile fade animation is enabled. By default it's enabled
  // in all browsers that support CSS3 Transitions except Android.
  fadeAnimation: boolean = true;

  // @option markerZoomAnimation: Boolean = true
  // Whether markers animate their zoom with the zoom animation, if disabled
  // they will disappear for the length of the animation. By default it's
  // enabled in all browsers that support CSS3 Transitions except Android.
  markerZoomAnimation: boolean = true;

  // @option transform3DLimit: Number = 2^23
  // Defines the maximum size of a CSS translation transform. The default
  // value should not be changed unless a web browser positions layers in
  // the wrong place after doing a large `panBy`.
  transform3DLimit: number = 8388608; // Precision limit of a 32-bit float

  // @section Interaction Options
  // @option zoomSnap: Number = 1
  // Forces the map's zoom level to always be a multiple of this, particularly
  // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
  // By default, the zoom level snaps to the nearest integer; lower values
  // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
  // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
  zoomSnap: number = 1;

  // @option zoomDelta: Number = 1
  // Controls how much the map's zoom level will change after a
  // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
  // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
  // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
  zoomDelta: number = 1;

  // @option trackResize: Boolean = true
  // Whether the map automatically handles browser window resize to update itself.
  trackResize: boolean = true;

  // @section Mouse wheel options
  // @option scrollWheelZoom: Boolean|String = true
  // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
  // it will zoom to the center of the view regardless of where the mouse was.
  scrollWheelZoom: boolean | string = true;

  // @option wheelDebounceTime: Number = 40
  // Limits the rate at which a wheel can fire (in milliseconds). By default
  // user can't zoom via wheel more often than once per 40 ms.
  wheelDebounceTime: number = 40;

  // @option wheelPxPerZoomLevel: Number = 60
  // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
  // mean a change of one full zoom level. Smaller values will make wheel-zooming
  // faster (and vice versa).
  wheelPxPerZoomLevel: number = 60;

  // @option dragging: Boolean = true
  // Whether the map be draggable with mouse/touch or not.
  dragging: boolean = true;

  // @section Panning Inertia Options
  // @option inertia: Boolean = *
  // If enabled, panning of the map will have an inertia effect where
  // the map builds momentum while dragging and continues moving in
  // the same direction for some time. Feels especially nice on touch
  // devices. Enabled by default unless running on old Android devices.
  inertia: boolean = !Browser.android23;

  // @option inertiaDeceleration: Number = 3000
  // The rate with which the inertial movement slows down, in pixels/second².
  inertiaDeceleration: number = 3400; // px/s^2

  // @option inertiaMaxSpeed: Number = Infinity
  // Max speed of the inertial movement, in pixels/second.
  inertiaMaxSpeed: number = Infinity; // px/s

  // @option easeLinearity: Number = 0.2
  easeLinearity: number = 0.2;

  // TODO refactor, move to CRS
  // @option worldCopyJump: Boolean = false
  // With this option enabled, the map tracks when you pan to another "copy"
  // of the world and seamlessly jumps to the original one so that all overlays
  // like markers and vector layers are still visible.
  worldCopyJump: boolean = false;

  // @option maxBoundsViscosity: Number = 0.0
  // If `maxBounds` is set, this option will control how solid the bounds
  // are when dragging the map around. The default value of `0.0` allows the
  // user to drag outside the bounds at normal speed, higher values will
  // slow down map dragging outside bounds, and `1.0` makes the bounds fully
  // solid, preventing the user from dragging outside the bounds.
  maxBounds: LatLngBounds = undefined;
  maxBoundsViscosity: number = 0.0;

  // @option doubleClickZoom: Boolean|String = true
  // Whether the map can be zoomed in by double clicking on it and
  // zoomed out by double clicking while holding shift. If passed
  // `'center'`, double-click zoom will zoom to the center of the
  //  view regardless of where the mouse was.
  doubleClickZoom: boolean | string = true;
}

export class Map extends EventedObject {

  options: MapOptions = new MapOptions();

  _container: HTMLElement;
  _containerId: string;
  _loaded: boolean = false;
  // container size changed
  _sizeChanged: boolean = true;
  _size: ScreenXY;

  _panes: any = {};
  _paneRenderers: any = {};
  // other pane's parent
  _mapPane: HTMLElement;
  // proxy pane
  _proxy: any;

  // event target
  _targets: any = {};

  // relate crs
  _crs: Earth;
  // map pane origin absolute pixel 
  _pixelOrigin: ScreenXY;

  _zoom: number;
  _lastCenter: LatLng;

  _canvas: Canvas;
  _viewer: Viewer;
  _animater: Animater;
  _layers: any = {};
  _sizeTimer: number;

  _resizeRequest: number;

  // animate
  _panAnim: PosAnimation;

  _fadeAnimated: boolean = true;
  _zoomAnimated: boolean = true;

  _animatingZoom: boolean;
  _animateToZoom: number;
  _animateToCenter: LatLng;

  // handlers
  _handlers: HandlerObject[] = [];

  _mouseEvents: string[] = ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'];

  get loaded(): boolean {
    return this._loaded;
  }

  constructor(id: HTMLElement | string, options?: Object) { // (HTMLElement or String, Object)
    super();
    this.options.assign(options);

    // Make sure to assign internal flags at the beginning,
    // to avoid inconsistent state in some edge cases.
    this._layers = {};

    this._initContainer(id);
    this._initLayout();

    // hack for https://github.com/Leaflet/Leaflet/issues/1980
    // this._onResize = Util.bind(this._onResize, this);

    this._initEvents();

    if (this.options.zoom !== undefined) {
      this._zoom = this._limitZoom(this.options.zoom);
    }

    this._crs = new EPSG3857();
    // this._canvas = new Canvas(this);
    // this._canvas.init();
    this._viewer = new Viewer(this);
    this._viewer.init();
    this._animater = new Animater(this);
    this._animater.init();

    if (this.options.center && this.options.zoom !== undefined) {
      this.setView(this.options.center, this.options.zoom, { reset: true });
    }

    // don't animate on browsers without hardware-accelerated transitions or old Android/Opera
    this._zoomAnimated = DomUtil.TRANSITION && Browser.any3d && !Browser.mobileOpera &&
      this.options.zoomAnimation;

    // zoom transitions run with the same duration for all layers, so if one of transitionend events
    // happens after starting zoom animation (propagating to the map pane), we know that it ended globally
    if (this._zoomAnimated) {
      this._createAnimProxy();
      DomEvent.on(this._proxy, DomUtil.TRANSITION_END, this._catchTransitionEnd, this);
    }

    if (this.options.dragging) this.addHandler('dragging', new DragHandler(this));
    if (this.options.scrollWheelZoom) this.addHandler('scrollWheelZoom', new ScrollWheelZoomHandler(this));
    if (this.options.doubleClickZoom) this.addHandler('doubleClickZoom', new DoubleClickZoomHandler(this));
  }


  // @section Methods for modifying map state

  // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
  // Sets the view of the map (geographical center and zoom) with the given
  // animation options.
  setView(center: LatLng, zoom?: number, options?: any) {

    zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
    center = this._limitCenter(center, zoom, this.options.maxBounds);
    options = options || {};

    this._stop();

    if (this._loaded && !options.reset && options !== true) {

      if (options.animate !== undefined) {
        options.zoom = Object.assign({ animate: options.animate }, options.zoom);
        options.pan = Object.assign({ animate: options.animate, duration: options.duration }, options.pan);
      }

      // try animating pan or zoom
      const moved = (this._zoom !== zoom) ?
        this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
        this._tryAnimatedPan(center, options.pan);

      if (moved) {
        // prevent resize handler call, the view will refresh after animation anyway
        clearTimeout(this._sizeTimer);
        return this;
      }
    }

    // animation didn't start, just reset the map view
    this._resetView(center, zoom);

    return this;
  }

  // @method setZoom(zoom: Number, options?: Zoom/pan options): this
  // Sets the zoom of the map.
  setZoom(zoom: number, options?: any) {
    if (!this._loaded) {
      this._zoom = zoom;
      return this;
    }
    return this.setView(this.getCenter(), zoom, { zoom: options });
  }

  // @method zoomIn(delta?: Number, options?: Zoom options): this
  // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
  zoomIn(delta?: number, options?: any) {
    delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
    return this.setZoom(this._zoom + (delta as number), options);
  }

  // @method zoomOut(delta?: Number, options?: Zoom options): this
  // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
  zoomOut(delta?: number, options?: any) {
    delta = delta || (Browser.any3d ? this.options.zoomDelta : 1);
    return this.setZoom(this._zoom - (delta as number), options);
  }

  // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
  // Zooms the map while keeping a specified geographical point on the map
  // stationary (e.g. used internally for scroll zoom and double-click zoom).
  // @alternative
  // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
  // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
  setZoomAround(specified: LatLng | ScreenXY, zoom: number, options?: any) {
    var scale = this.getZoomScale(zoom),
      viewHalf = this.getSize().divideBy(2),
      containerPoint = specified instanceof ScreenXY ? specified : this.latLngToContainerPixel(specified),

      centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
      newCenter = this.containerPixelToLatLng(viewHalf.add(centerOffset));

    return this.setView(newCenter, zoom, { zoom: options });
  }

  _getLatLngBoundsCenterZoom(bounds: LatLngBounds, options?: any) {
    options = options || {};
    // bounds = bounds.getBounds ? bounds.getBounds() : bounds;
    // pixel
    const paddingTL = new ScreenXY(options.padding || 0, options.padding || 0),
      paddingBR = new ScreenXY(options.padding || 0, options.padding || 0);

    let zoom = this.getLatLngBoundsZoom(bounds, false, paddingTL.add(paddingBR));

    zoom = (typeof options.maxZoom === 'number') ? Math.min(options.maxZoom, zoom) : zoom;

    if (zoom === Infinity) {
      return {
        center: bounds.getCenter(),
        zoom: zoom
      };
    }

    const paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

      swPoint = this.latLngToWorldPixel(bounds.getSouthWest(), zoom),
      nePoint = this.latLngToWorldPixel(bounds.getNorthEast(), zoom),
      center = this.worldPixelToLatLng(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

    return {
      center: center,
      zoom: zoom
    };
  }

  // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
  // Sets a map view that contains the given geographical bounds with the
  // maximum zoom level possible.
  fitBounds(bounds: LatLngBounds, options?: any) {
    const target = this._getLatLngBoundsCenterZoom(bounds, options);
    return this.setView(target.center, target.zoom, options);
  }

  // @method fitWorld(options?: fitBounds options): this
  // Sets a map view that mostly contains the whole world with the maximum
  // zoom level possible.
  fitWorld(options?: any) {
    return this.fitBounds(new LatLngBounds(new LatLng(-90, -180), new LatLng(90, 180)), options);
  }

  // @method panTo(latlng: LatLng, options?: Pan options): this
  // Pans the map to a given center.
  panTo(center: LatLng, options?: any) { // (LatLng)
    return this.setView(center, this._zoom, { pan: options });
  }

  // @method panBy(offset: Point, options?: Pan options): this
  // Pans the map by a given number of pixels (animated).
  panBy(offset: ScreenXY, options?: any) {
    offset = offset.round();
    options = options || {};

    if (!offset.x && !offset.y) {
      return this.fire('moveend');
    }
    // If we pan too far, Chrome gets issues with tiles
    // and makes them disappear or appear in the wrong place (slightly offset) #2602
    if (options.animate !== true && !this.getSize().contains(offset)) {
      this._resetView(this.worldPixelToLatLng(this.latLngToWorldPixel(this.getCenter()).add(offset)), this.getZoom());
      return this;
    }

    if (!this._panAnim) {
      this._panAnim = new PosAnimation(this._mapPane);

      this._panAnim.on({
        'step': this._onPanTransitionStep,
        'end': this._onPanTransitionEnd
      }, this);
    }

    // don't fire movestart if animating inertia
    if (!options.noMoveStart) {
      this.fire('movestart');
    }

    // animate pan unless animate: false specified
    if (options.animate !== false) {
      DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');

      const newPos = this._getMapPanePos().subtract(offset).round();
      this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
    } else {
      this._rawPanBy(offset);
      this.fire('move').fire('moveend');
    }

    return this;
  }

  // @method setMinZoom(zoom: Number): this
  // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
  setMinZoom(zoom: number) {
    var oldZoom = this.options.minZoom;
    this.options.minZoom = zoom;

    if (this._loaded && oldZoom !== zoom) {
      this.fire('zoomlevelschange');

      if (this.getZoom() < this.options.minZoom) {
        return this.setZoom(zoom);
      }
    }

    return this;
  }

  // @method setMaxZoom(zoom: Number): this
  // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
  setMaxZoom(zoom: number) {
    var oldZoom = this.options.maxZoom;
    this.options.maxZoom = zoom;

    if (this._loaded && oldZoom !== zoom) {
      this.fire('zoomlevelschange');

      if (this.getZoom() > this.options.maxZoom) {
        return this.setZoom(zoom);
      }
    }

    return this;
  }

  // @method invalidateSize(options: Zoom/pan options): this
  // Checks if the map container size changed and updates the map if so —
  // call it after you've changed the map size dynamically, also animating
  // pan by default. If `options.pan` is `false`, panning will not occur.
  // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
  // that it doesn't happen often even if the method is called many
  // times in a row.

  // @alternative
  // @method invalidateSize(animate: Boolean): this
  // Checks if the map container size changed and updates the map if so —
  // call it after you've changed the map size dynamically, also animating
  // pan by default.
  invalidateSize(options: any) {
    if (!this._loaded) { return this; }

    options = Object.assign({
      animate: false,
      pan: true
    }, options === true ? { animate: true } : options);

    const oldSize = this.getSize();
    this._sizeChanged = true;
    this._lastCenter = null;

    const newSize = this.getSize(),
      oldCenter = oldSize.divideBy(2).round(),
      newCenter = newSize.divideBy(2).round(),
      offset = oldCenter.subtract(newCenter);

    if (!offset.x && !offset.y) { return this; }

    if (options.animate && options.pan) {
      this.panBy(offset);

    } else {
      if (options.pan) {
        this._rawPanBy(offset);
      }

      this.fire('move');

      if (options.debounceMoveend) {
        clearTimeout(this._sizeTimer);
        this._sizeTimer = setTimeout(() => {
          this.fire('moveend');
        }, 200);
      } else {
        this.fire('moveend');
      }
    }

    // @section Map state change events
    // @event resize: ResizeEvent
    // Fired when the map is resized.
    return this.fire('resize', {
      oldSize: oldSize,
      newSize: newSize
    });
  }

  // @section Methods for modifying map state
  // @method stop(): this
  // Stops the currently running `panTo` or `flyTo` animation, if any.
  stop() {
    this.setZoom(this._limitZoom(this._zoom));
    if (!this.options.zoomSnap) {
      this.fire('viewreset');
    }
    return this._stop();
  }


  // @method remove(): this
  // Destroys the map and clears all related event listeners.
  remove() {
    this._initEvents(true);
    this._stop();
    // this._canvas.destroy();
    this._viewer.destroy();
    this._animater.destroy();
    DomUtil.remove(this._mapPane);

    if (this._resizeRequest) {
      Util.cancelAnimFrame(this._resizeRequest);
      this._resizeRequest = null;
    }

    this.clearHandlers();

    if (this._loaded) {
      // @section Map state change events
      // @event unload: Event
      // Fired when the map is destroyed with [remove](#map-remove) method.
      this.fire('unload');
    }

    for (let i in this._layers) {
      this._layers[i].remove();
    }
    for (let i in this._panes) {
      DomUtil.remove(this._panes[i]);
    }

    this._layers = {};
    this._panes = {};
    delete this._mapPane;
    // delete this._canvas;
    delete this._viewer;
    delete this._animater;
    return this;
  }

  // @section Other Methods
  // @method createPane(name: String, container?: HTMLElement): HTMLElement
  // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
  // then returns it. The pane is created as a child of `container`, or
  // as a child of the main map pane if not set.
  createPane(name: string, container?: HTMLElement) {
    const className = 'leaflet-pane' + (name ? ' leaflet-' + name.replace('Pane', '') + '-pane' : ''),
      pane = DomUtil.create('div', className, container || this._mapPane);

    if (name) {
      this._panes[name] = pane;
    }
    return pane;
  }

  // @section Methods for Getting Map State

  // @method getCenter(): LatLng
  // Returns the geographical center of the map view
  getCenter() {
    if (this._lastCenter && !this._moved()) {
      return this._lastCenter;
    }
    return this.canvasPixelToLatLng(this._getCenterCanvasPixel());
  }

  // @method getZoom(): Number
  // Returns the current zoom level of the map view
  getZoom() {
    return this._zoom;
  }

  // @method getBounds(): LatLngBounds
  // Returns the geographical bounds visible in the current map view
  getLatLngBounds(): LatLngBounds {
    const bounds = this.getPixelBounds(),
      sw = this.worldPixelToLatLng(bounds.getBottomLeft()),
      ne = this.worldPixelToLatLng(bounds.getTopRight());

    return new LatLngBounds(sw, ne);
  }

  // @method getMinZoom(): Number
  // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
  getMinZoom(): number {
    return this.options.minZoom === undefined ? 1 : this.options.minZoom;
  }

  // @method getMaxZoom(): Number
  // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
  getMaxZoom(): number {
    return this.options.maxZoom === undefined ? 20 : this.options.maxZoom;
  }

  // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
  // Returns the maximum zoom level on which the given bounds fit to the map
  // view in its entirety. If `inside` (optional) is set to `true`, the method
  // instead returns the minimum zoom level on which the map view fits into
  // the given bounds in its entirety.
  getLatLngBoundsZoom(bounds: LatLngBounds, inside: boolean = false, padding: ScreenXY = new ScreenXY()): number { // (LatLngBounds[, Boolean, Point]) -> Number
    let zoom = this.getZoom() || 0,
      min = this.getMinZoom(),
      max = this.getMaxZoom(),
      nw = bounds.getNorthWest(),
      se = bounds.getSouthEast(),
      size = this.getSize().subtract(padding),
      boundsSize = new ScreenBounds(this.latLngToWorldPixel(se, zoom), this.latLngToWorldPixel(nw, zoom)).getSize(),
      snap = Browser.any3d ? this.options.zoomSnap : 1,
      scalex = size.x / boundsSize.x,
      scaley = size.y / boundsSize.y,
      scale = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);

    zoom = this.getScaleZoom(scale, zoom);

    if (snap) {
      zoom = Math.round(zoom / (snap / 100)) * (snap / 100); // don't jump if within 1% of a snap level
      zoom = inside ? Math.ceil(zoom / snap) * snap : Math.floor(zoom / snap) * snap;
    }

    return Math.max(min, Math.min(max, zoom));
  }

  // @method getSize(): Point
  // Returns the current size of the map container (in pixels).
  getSize(): ScreenXY {
    if (!this._size || this._sizeChanged) {
      this._size = new ScreenXY(
        this._container.clientWidth || 0,
        this._container.clientHeight || 0);

      this._sizeChanged = false;
    }
    return this._size.clone();
  }

  // @method getPixelBounds(): Bounds
  // Returns the bounds of the current map view in projected pixel
  // coordinates (sometimes useful in layer and overlay implementations).
  getPixelBounds(center?: LatLng, zoom?: number) {
    const topLeftPoint = this._getTopLeftPixel(center, zoom);
    return new ScreenBounds(topLeftPoint, topLeftPoint.add(this.getSize()));
  }

  // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
  // the map pane? "left point of the map layer" can be confusing, specially
  // since there can be negative offsets.
  // @method getPixelOrigin(): Point
  // Returns the projected pixel coordinates of the top left point of
  // the map layer (useful in custom layer and overlay implementations).
  getPixelOrigin(): ScreenXY {
    return this._pixelOrigin;
  }

  // @method getPixelWorldBounds(zoom?: Number): Bounds
  // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
  // If `zoom` is omitted, the map's current zoom level is used.
  getPixelWorldBounds(zoom?: number) {
    return this._crs.getScreenBounds(zoom === undefined ? this.getZoom() : zoom);
  }

  // @section Other Methods

  // @method getPane(pane: String|HTMLElement): HTMLElement
  // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
  getPane(pane: string | HTMLElement): HTMLElement {
    return typeof pane === 'string' ? this._panes[pane] : pane;
  }

  // @method getPanes(): Object
  // Returns a plain object containing the names of all [panes](#map-pane) as keys and
  // the panes as values.
  getPanes() {
    return this._panes;
  }

  // @method getContainer: HTMLElement
  // Returns the HTML element that contains the map.
  getContainer() {
    return this._container;
  }


  // @section Conversion Methods

  // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
  // Returns the scale factor to be applied to a map transition from zoom level
  // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
  getZoomScale(toZoom: number, fromZoom?: number) {
    // TODO replace with universal implementation after refactoring projections
    fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
    return this._crs.scale(toZoom) / this._crs.scale(fromZoom);
  }

  // @method getScaleZoom(scale: Number, fromZoom: Number): Number
  // Returns the zoom level that the map would end up at, if it is at `fromZoom`
  // level and everything is scaled by a factor of `scale`. Inverse of
  // [`getZoomScale`](#map-getZoomScale).
  getScaleZoom(scale: number, fromZoom: number) {
    fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
    const zoom = this._crs.zoom(scale * this._crs.scale(fromZoom));
    return isNaN(zoom) ? Infinity : zoom;
  }

  // @method project(latlng: LatLng, zoom: Number): Point
  // Projects a geographical coordinate `LatLng` according to the projection
  // of the map's CRS, then scales it according to `zoom` and the CRS's
  // `Transformation`. The result is pixel coordinate relative to
  // the CRS origin.
  latLngToWorldPixel(latlng: LatLng, zoom?: number): ScreenXY {
    zoom = zoom === undefined ? this._zoom : zoom;
    return this._crs.latLngToScreenXY(latlng, zoom);
  }

  // @method unproject(point: Point, zoom: Number): LatLng
  // Inverse of [`project`](#map-project).
  worldPixelToLatLng(screenXY: ScreenXY, zoom?: number): LatLng {
    zoom = zoom === undefined ? this._zoom : zoom;
    return this._crs.screenXYToLatLng(screenXY, zoom);
  }

  // @method layerPointToLatLng(point: Point): LatLng
  // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
  // returns the corresponding geographical coordinate (for the current zoom level).
  canvasPixelToLatLng(pixel: ScreenXY): LatLng {
    const absolute: ScreenXY = pixel.add(this._pixelOrigin);
    return this.worldPixelToLatLng(absolute);
  }

  // @method latLngToLayerPoint(latlng: LatLng): Point
  // Given a geographical coordinate, returns the corresponding pixel coordinate
  // relative to the [origin pixel](#map-getpixelorigin).
  latLngToCanvasPixel(latlng: LatLng): ScreenXY {
    const absolute: ScreenXY = this.latLngToWorldPixel(latlng).round(false);
    return absolute.subtract(this._pixelOrigin);
  }

  // @method wrapLatLng(latlng: LatLng): LatLng
  // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
  // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
  // CRS's bounds.
  // By default this means longitude is wrapped around the dateline so its
  // value is between -180 and +180 degrees.
  wrapLatLng(latlng: LatLng): LatLng {
    return this._crs.wrapLatLng(latlng);
  }

  // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
  // Returns a `LatLngBounds` with the same size as the given one, ensuring that
  // its center is within the CRS's bounds.
  // By default this means the center longitude is wrapped around the dateline so its
  // value is between -180 and +180 degrees, and the majority of the bounds
  // overlaps the CRS's bounds.
  wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds {
    return this._crs.wrapLatLngBounds(bounds);
  }

  // @method distance(latlng1: LatLng, latlng2: LatLng): Number
  // Returns the distance between two geographical coordinates according to
  // the map's CRS. By default this measures distance in meters.
  distance(latlng1: LatLng, latlng2: LatLng): number {
    return this._crs.distance(latlng1, latlng2);
  }

  // @method containerPointToLayerPoint(point: Point): Point
  // Given a pixel coordinate relative to the map container, returns the corresponding
  // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
  containerPixelToCanvasPixel(pixel: ScreenXY): ScreenXY { // (Point)
    return pixel.subtract(this._getMapPanePos());
  }

  // @method layerPointToContainerPoint(point: Point): Point
  // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
  // returns the corresponding pixel coordinate relative to the map container.
  canvasPixelToContainerPixel(pixel: ScreenXY): ScreenXY { // (Point)
    return pixel.add(this._getMapPanePos());
  }

  // @method containerPointToLatLng(point: Point): LatLng
  // Given a pixel coordinate relative to the map container, returns
  // the corresponding geographical coordinate (for the current zoom level).
  containerPixelToLatLng(pixel: ScreenXY): LatLng {
    return this.canvasPixelToLatLng(this.containerPixelToCanvasPixel(pixel));
  }

  // @method latLngToContainerPoint(latlng: LatLng): Point
  // Given a geographical coordinate, returns the corresponding pixel coordinate
  // relative to the map container.
  latLngToContainerPixel(latlng: LatLng): ScreenXY {
    return this.canvasPixelToContainerPixel(this.latLngToCanvasPixel(latlng));
  }

  // @method mouseEventToContainerPoint(ev: MouseEvent): Point
  // Given a MouseEvent object, returns the pixel coordinate relative to the
  // map container where the event took place.
  mouseEventToContainerPixel(e: MouseEvent) {
    return DomEvent.getMousePosition(e, this._container);
  }

  // @method mouseEventToLayerPoint(ev: MouseEvent): Point
  // Given a MouseEvent object, returns the pixel coordinate relative to
  // the [origin pixel](#map-getpixelorigin) where the event took place.
  mouseEventToCanvasPixel(e: MouseEvent) {
    return this.containerPixelToCanvasPixel(this.mouseEventToContainerPixel(e));
  }

  // @method mouseEventToLatLng(ev: MouseEvent): LatLng
  // Given a MouseEvent object, returns geographical coordinate where the
  // event took place.
  mouseEventToLatLng(e: MouseEvent) { // (MouseEvent)
    return this.canvasPixelToLatLng(this.mouseEventToCanvasPixel(e));
  }


  // map initialization methods

  _initContainer(id: HTMLElement | string) {
    const container: any = DomUtil.get(id);

    if (!container) {
      throw new Error('Map container not found.');
    } else if (container._leaflet_id) {
      throw new Error('Map container is already initialized.');
    }
    this._container = container;
    DomEvent.on(container, 'scroll', this._onScroll, this);
    this._containerId = Util.stamp(container);
  }

  _initLayout() {
    const container = this._container;
    this._fadeAnimated = this.options.fadeAnimation && Browser.any3d;

    DomUtil.addClass(container, 'leaflet-container' +
      (Browser.touch ? ' leaflet-touch' : '') +
      (Browser.retina ? ' leaflet-retina' : '') +
      (Browser.ielt9 ? ' leaflet-oldie' : '') +
      (Browser.safari ? ' leaflet-safari' : '') +
      (this._fadeAnimated ? ' leaflet-fade-anim' : ''));

    const position = DomUtil.getStyle(container, 'position');

    if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
      container.style.position = 'relative';
    }

    this._initPanes();
  }

  _initPanes() {
    const panes: any = this._panes = {};
    this._paneRenderers = {};

    // @section
    //
    // Panes are DOM elements used to control the ordering of layers on the map. You
    // can access panes with [`map.getPane`](#map-getpane) or
    // [`map.getPanes`](#map-getpanes) methods. New panes can be created with the
    // [`map.createPane`](#map-createpane) method.
    //
    // Every map has the following default panes that differ only in zIndex.
    //
    // @pane mapPane: HTMLElement = 'auto'
    // Pane that contains all other map panes

    this._mapPane = this.createPane('mapPane', this._container);
    DomUtil.setPosition(this._mapPane, new ScreenXY(0, 0));

    // @pane tilePane: HTMLElement = 200
    // Pane for `GridLayer`s and `TileLayer`s
    this.createPane('tilePane');
    // @pane overlayPane: HTMLElement = 400
    // Pane for vectors (`Path`s, like `Polyline`s and `Polygon`s), `ImageOverlay`s and `VideoOverlay`s
    this.createPane('overlayPane');
    // @pane overlayPane: HTMLElement = 500
    this.createPane('animatePane');
    // @pane shadowPane: HTMLElement = 500
    // Pane for overlay shadows (e.g. `Marker` shadows)
    // this.createPane('shadowPane');
    // @pane markerPane: HTMLElement = 600
    // Pane for `Icon`s of `Marker`s
    // this.createPane('markerPane');
    // @pane tooltipPane: HTMLElement = 650
    // Pane for `Tooltip`s.
    this.createPane('tooltipPane');
    // @pane popupPane: HTMLElement = 700
    // Pane for `Popup`s.
    this.createPane('popupPane');

  }


  // private methods that modify map state

  // @section Map state change events
  _resetView(center: LatLng, zoom: number) {
    DomUtil.setPosition(this._mapPane, new ScreenXY(0, 0));

    const loading = !this._loaded;
    this._loaded = true;
    zoom = this._limitZoom(zoom);

    this.fire('viewprereset');

    const zoomChanged = this._zoom !== zoom;
    this
      ._moveStart(zoomChanged, false)
      ._move(center, zoom)
      ._moveEnd(zoomChanged);

    // @event viewreset: Event
    // Fired when the map needs to redraw its content (this usually happens
    // on map zoom or load). Very useful for creating custom overlays.
    this.fire('viewreset');

    // @event load: Event
    // Fired when the map is initialized (when its center and zoom are set
    // for the first time).
    if (loading) {
      this.fire('load');
    }
  }

  _moveStart(zoomChanged: boolean, noMoveStart: boolean) {
    // @event zoomstart: Event
    // Fired when the map zoom is about to change (e.g. before zoom animation).
    // @event movestart: Event
    // Fired when the view of the map starts changing (e.g. user starts dragging the map).
    if (zoomChanged) {
      this.fire('zoomstart');
    }
    if (!noMoveStart) {
      this.fire('movestart');
    }
    return this;
  }

  _move(center: LatLng, zoom?: number, data?: any) {
    if (zoom === undefined) {
      zoom = this._zoom;
    }
    const zoomChanged = this._zoom !== zoom;

    this._zoom = zoom;
    this._lastCenter = center;
    this._pixelOrigin = this._getNewPixelOrigin(center);

    // @event zoom: Event
    // Fired repeatedly during any change in zoom level, including zoom
    // and fly animations.
    if (zoomChanged || (data && data.pinch)) {	// Always fire 'zoom' if pinching because #3530
      this.fire('zoom', data);
    }

    // @event move: Event
    // Fired repeatedly during any movement of the map, including pan and
    // fly animations.
    return this.fire('move', data);
  }

  _moveEnd(zoomChanged: boolean) {
    // @event zoomend: Event
    // Fired when the map has changed, after any animations.
    if (zoomChanged) {
      this.fire('zoomend');
    }

    // @event moveend: Event
    // Fired when the center of the map stops changing (e.g. user stopped
    // dragging the map).
    return this.fire('moveend');
  }

  _stop() {
    if (this._panAnim) {
      this._panAnim.stop();
    }
    return this;
  }

  _rawPanBy(offset: ScreenXY) {
    DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
  }

  _getZoomSpan() {
    return this.getMaxZoom() - this.getMinZoom();
  }

  // DOM event handling

  // @section Interaction events
  _initEvents(remove?: boolean) {
    this._targets = {};
    this._targets[this._containerId] = this;

    const onOff = remove ? DomEvent.off : DomEvent.on;

    // @event click: MouseEvent
    // Fired when the user clicks (or taps) the map.
    // @event dblclick: MouseEvent
    // Fired when the user double-clicks (or double-taps) the map.
    // @event mousedown: MouseEvent
    // Fired when the user pushes the mouse button on the map.
    // @event mouseup: MouseEvent
    // Fired when the user releases the mouse button on the map.
    // @event mouseover: MouseEvent
    // Fired when the mouse enters the map.
    // @event mouseout: MouseEvent
    // Fired when the mouse leaves the map.
    // @event mousemove: MouseEvent
    // Fired while the mouse moves over the map.
    // @event contextmenu: MouseEvent
    // Fired when the user pushes the right mouse button on the map, prevents
    // default browser context menu from showing if there are listeners on
    // this event. Also fired on mobile when the user holds a single touch
    // for a second (also called long press).
    // @event keypress: KeyboardEvent
    // Fired when the user presses a key from the keyboard that produces a character value while the map is focused.
    // @event keydown: KeyboardEvent
    // Fired when the user presses a key from the keyboard while the map is focused. Unlike the `keypress` event,
    // the `keydown` event is fired for keys that produce a character value and for keys
    // that do not produce a character value.
    // @event keyup: KeyboardEvent
    // Fired when the user releases a key from the keyboard while the map is focused.

    onOff(this._container, 'click dblclick mousedown mouseup ' +
      'mouseover mouseout mousemove contextmenu keypress keydown keyup', this._handleDOMEvent, this);
    // onOff(this._container, 'click dblclick mousedown mouseup ' +
    // 	'mouseover mouseout contextmenu keypress keydown keyup', this._handleDOMEvent, this);

    if (this.options.trackResize) {
      onOff(window, 'resize', this._onResize, this);
    }

    if (Browser.any3d && this.options.transform3DLimit) {
      (remove ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
    }
  }

  _onResize() {
    Util.cancelAnimFrame(this._resizeRequest);
    this._resizeRequest = Util.requestAnimFrame(() => {
      this.invalidateSize({ debounceMoveend: true });
    }, this);
  }

  _onScroll() {
    this._container.scrollTop = 0;
    this._container.scrollLeft = 0;
  }

  _onMoveEnd() {
    const pos = this._getMapPanePos();
    if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1203873 but Webkit also have
      // a pixel offset on very high values, see: http://jsfiddle.net/dg6r5hhb/
      this._resetView(this.getCenter(), this.getZoom());
    }
  }

  _findEventTargets(e: any, type: string) {
    var targets = [],
      target,
      isHover = type === 'mouseout' || type === 'mouseover',
      src = e.target || e.srcElement,
      dragging = false;

    while (src) {
      target = this._targets[Util.stamp(src)];
      if (target && (type === 'click' || type === 'preclick') && !e._simulated && this._draggableMoved(target)) {
        // Prevent firing click after you just dragged an object.
        dragging = true;
        break;
      }
      if (target && target.listens(type, true)) {
        if (isHover && !DomEvent.isExternalTarget(src, e)) { break; }
        targets.push(target);
        if (isHover) { break; }
      }
      if (src === this._container) { break; }
      src = src.parentNode;
    }
    if (!targets.length && !dragging && !isHover && DomEvent.isExternalTarget(src, e)) {
      targets = [this];
    }
    return targets;
  }

  _handleDOMEvent(e: any) {
    if (!this._loaded || DomEvent.skipped(e)) { return; }
    this._fireDOMEvent(e, e.type);
  }

  _fireDOMEvent(e: any, type: string, targets?: any) {
    if (e.type === 'click') {
      // Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
      // @event preclick: MouseEvent
      // Fired before mouse click on the map (sometimes useful when you
      // want something to happen on click before any existing click
      // handlers start running).
      // var synth = Util.extend({}, e);
      const synth = Object.assign({}, e);
      synth.type = 'preclick';
      this._fireDOMEvent(synth, synth.type, targets);
    }

    if (e._stopped) { return; }

    // Find the layer the event is propagating from and its parents.
    targets = (targets || []).concat(this._findEventTargets(e, type));

    if (!targets.length) { return; }

    var target = targets[0];
    if (type === 'contextmenu' && target.listens(type, true)) {
      DomEvent.preventDefault(e);
    }

    var data: any = {
      originalEvent: e
    };

    if (e.type !== 'keypress' && e.type !== 'keydown' && e.type !== 'keyup') {
      var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
      data.containerPixel = isMarker ?
        this.latLngToContainerPixel(target.getLatLng()) : this.mouseEventToContainerPixel(e);
      data.canvasPixel = this.containerPixelToCanvasPixel(data.containerPixel);
      data.latlng = isMarker ? target.getLatLng() : this.canvasPixelToLatLng(data.canvasPixel);
    }

    for (let i = 0; i < targets.length; i++) {
      targets[i].fire(type, data, true);
      if (data.originalEvent._stopped || this._mouseEvents.indexOf(type) !== -1) { return; }
    }
  }

  _draggableMoved(obj: any) {
    obj = obj.dragging && obj.dragging.enabled() ? obj : this;
    return obj.dragging && obj.dragging.moved()
  }

  // @section Other Methods

  // @method whenReady(fn: Function, context?: Object): this
  // Runs the given function `fn` when the map gets initialized with
  // a view (center and zoom) and at least one layer, or immediately
  // if it's already initialized, optionally passing a function context.
  whenReady(callback: Function, context?: any) {
    if (this._loaded) {
      callback.call(context || this, { target: this });
    } else {
      this.on('load', callback, context);
    }
    return this;
  }


  // private methods for getting map state

  _getMapPanePos() {
    return DomUtil.getPosition(this._mapPane) || new ScreenXY(0, 0);
  }

  _moved() {
    const pos = this._getMapPanePos();
    return pos && !pos.equals(new ScreenXY(0, 0));
  }

  _getTopLeftPixel(center: LatLng, zoom?: number) {
    const pixelOrigin = center && zoom !== undefined ?
      this._getNewPixelOrigin(center, zoom) :
      this.getPixelOrigin();
    return pixelOrigin.subtract(this._getMapPanePos());
  }

  _getNewPixelOrigin(center: LatLng, zoom?: number) {
    const viewHalf = this.getSize().divideBy(2);
    return this.latLngToWorldPixel(center, zoom).subtract(viewHalf).add(this._getMapPanePos()).round(false);
  }

  // layer point of the current center
  _getCenterCanvasPixel() {
    return this.containerPixelToCanvasPixel(this.getSize().divideBy(2));
  }

  // offset of the specified place to the current center in pixels
  _getCenterOffset(latlng: LatLng) {
    return this.latLngToCanvasPixel(latlng).subtract(this._getCenterCanvasPixel());
  }

  // adjust center for view to get inside bounds
  _limitCenter(center: LatLng, zoom: number, bounds: LatLngBounds) {

    if (!bounds) { return center; }

    const centerPoint = this.latLngToWorldPixel(center, zoom),
      viewHalf = this.getSize().divideBy(2),
      viewBounds = new ScreenBounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
      offset = this._getBoundsOffset(viewBounds, bounds, zoom);

    // If offset is less than a pixel, ignore.
    // This prevents unstable projections from getting into
    // an infinite loop of tiny offsets.
    if (offset.round().equals(new ScreenXY(0, 0))) {
      return center;
    }

    return this.worldPixelToLatLng(centerPoint.add(offset), zoom);
  }

  // adjust offset for view to get inside bounds
  _limitOffset(offset: ScreenXY, bounds: LatLngBounds) {
    if (!bounds) { return offset; }

    const viewBounds = this.getPixelBounds(),
      newBounds = new ScreenBounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

    return offset.add(this._getBoundsOffset(newBounds, bounds));
  }

  // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
  _getBoundsOffset(pxBounds: ScreenBounds, maxBounds: LatLngBounds, zoom?: number) {
    const projectedMaxBounds = new ScreenBounds(
      this.latLngToWorldPixel(maxBounds.getNorthEast(), zoom),
      this.latLngToWorldPixel(maxBounds.getSouthWest(), zoom)
    ),
      minOffset = projectedMaxBounds.min.subtract(pxBounds.min),
      maxOffset = projectedMaxBounds.max.subtract(pxBounds.max),

      dx = this._rebound(minOffset.x, -maxOffset.x),
      dy = this._rebound(minOffset.y, -maxOffset.y);

    return new ScreenXY(dx, dy);
  }

  _rebound(left: number, right: number) {
    return left + right > 0 ?
      Math.round(left - right) / 2 :
      Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
  }

  _limitZoom(zoom: number) {
    let min = this.getMinZoom(),
      max = this.getMaxZoom(),
      snap = Browser.any3d ? this.options.zoomSnap : 1;
    if (snap) {
      zoom = Math.round(zoom / snap) * snap;
    }
    return Math.max(min, Math.min(max, zoom));
  }

  _onPanTransitionStep() {
    this.fire('move');
  }

  _onPanTransitionEnd() {
    DomUtil.removeClass(this._mapPane, 'leaflet-pan-anim');
    this.fire('moveend');
  }

  _tryAnimatedPan(center: LatLng, options: any) {
    // difference between the new and current centers in pixels
    var offset = this._getCenterOffset(center).trunc(false);

    // don't animate too far unless animate: true specified in options
    if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

    this.panBy(offset, options);

    return true;
  }

  _createAnimProxy() {

    const proxy = this._proxy = DomUtil.create('div', 'leaflet-proxy leaflet-zoom-animated');
    this._panes.mapPane.appendChild(proxy);

    this.on('zoomanim', (e: any) => {
      if (!DomUtil.TRANSFORM) return;
      const prop: string = DomUtil.TRANSFORM,
        transform = this._proxy.style[prop];

      DomUtil.setTransform(this._proxy, this.latLngToWorldPixel(e.center, e.zoom), this.getZoomScale(e.zoom, 1));

      // workaround for case when transform is the same and so transitionend event is not fired
      if (transform === this._proxy.style[prop] && this._animatingZoom) {
        this._onZoomTransitionEnd();
      }
    });

    this.on('load moveend', this._animMoveEnd, this);

    this._on('unload', this._destroyAnimProxy, this);
  }

  _destroyAnimProxy() {
    DomUtil.remove(this._proxy);
    this.off('load moveend', this._animMoveEnd, this);
    delete this._proxy;
  }

  _animMoveEnd() {
    const c = this.getCenter(),
      z = this.getZoom();
    DomUtil.setTransform(this._proxy, this.latLngToWorldPixel(c, z), this.getZoomScale(z, 1));
    // console.log(c.lat, c.lng);
  }

  _catchTransitionEnd(e: any) {
    if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
      this._onZoomTransitionEnd();
    }
  }

  _nothingToAnimate() {
    return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
  }

  _tryAnimatedZoom(center: LatLng, zoom: number, options: any) {

    if (this._animatingZoom) { return true; }

    options = options || {};

    // don't animate if disabled, not supported or zoom difference is too large
    if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
      Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

    // offset is the pixel coords of the zoom origin relative to the current center
    const scale = this.getZoomScale(zoom),
      offset = this._getCenterOffset(center).divideBy(1 - 1 / scale);

    // don't animate if the zoom origin isn't within one screen from the current center, unless forced
    if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

    Util.requestAnimFrame(() => {
      this
        ._moveStart(true, false)
        ._animateZoom(center, zoom, true);
    });

    return true;
  }

  _animateZoom(center: LatLng, zoom: number, startAnim: boolean, noUpdate?: boolean) {
    if (!this._mapPane) { return; }

    if (startAnim) {
      this._animatingZoom = true;

      // remember what center/zoom to set after animation
      this._animateToCenter = center;
      this._animateToZoom = zoom;

      DomUtil.addClass(this._mapPane, 'leaflet-zoom-anim');
    }

    // @section Other Events
    // @event zoomanim: ZoomAnimEvent
    // Fired at least once per zoom animation. For continuous zoom, like pinch zooming, fired once per frame during zoom.
    this.fire('zoomanim', {
      center: center,
      zoom: zoom,
      noUpdate: noUpdate
    });

    // Work around webkit not firing 'transitionend', see https://github.com/Leaflet/Leaflet/issues/3689, 2693
    setTimeout(() => {
      this._onZoomTransitionEnd();
    }, 250);
  }

  _onZoomTransitionEnd() {
    if (!this._animatingZoom) { return; }

    if (this._mapPane) {
      DomUtil.removeClass(this._mapPane, 'leaflet-zoom-anim');
    }

    this._animatingZoom = false;

    this._move(this._animateToCenter, this._animateToZoom);

    // This anim frame should prevent an obscure iOS webkit tile loading race condition.
    Util.requestAnimFrame(() => {
      this._moveEnd(true);
    }, this);
  }

  getCRS() {
    return this._crs;
  }

  addGraphic(graphic: Graphic) {
    // this._canvas.addGraphic(graphic);
    this._viewer.addGraphic(graphic);
  }

  addGraphicLayer(graphicLayer: GraphicLayer) {
    graphicLayer.crs = this._crs;
    // this._canvas.addGraphicLayer(graphicLayer);
    this._viewer.addGraphicLayer(graphicLayer);
  }

  addFeatureLayer(featureLayer: FeatureLayer) {
    featureLayer.crs = this._crs;
    // this._canvas.addFeatureLayer(featureLayer);
    this._viewer.addFeatureLayer(featureLayer);
  }

  addRasterLayer(rasterLayer: RasterLayer) {
    rasterLayer.crs = this._crs;
    // this._canvas.addRasterLayer(rasterLayer);
    this._viewer.addRasterLayer(rasterLayer);
  }

  addAnimation(animation: Animation) {
  	animation.project(this._crs);
  	this._animater.addAnimation(animation);
  }

  addHandler(name: string, handler: HandlerObject) {
    this._handlers.push(handler);
    this[name] = handler;
    if (this.options[name]) {
      handler.enable();
    }

    return this;
  }

  clearHandlers() {
    for (let i = 0, len = this._handlers.length; i < len; i++) {
      this._handlers[i].disable();
    }
  }

}
