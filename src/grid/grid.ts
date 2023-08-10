import * as Browser from '../util/browser';
import * as Util from '../util/util';
import * as DomUtil from '../util/dom-util';
import { EventedObject } from '../base/evented-object';
import { Map } from '../map/map';
import { ScreenXY } from '../common/screen-xy';
import { ScreenBounds } from '../common/screen-bounds';
import { LatLngBounds } from '../common/latlng-bounds';
import { OptionsObject } from '../base/options-object';

/*
 * @class GridLayer
 * @inherits Layer
 * @aka L.GridLayer
 *
 * Generic class for handling a tiled grid of HTML elements. This is the base class for all tile layers and replaces `TileLayer.Canvas`.
 * GridLayer can be extended to create a tiled grid of HTML elements like `<canvas>`, `<img>` or `<div>`. GridLayer will handle creating and animating these DOM elements for you.
 *
 *
 * @section Synchronous usage
 * @example
 *
 * To create a custom layer, extend GridLayer and implement the `createTile()` method, which will be passed a `Point` object with the `x`, `y`, and `z` (zoom level) coordinates to draw your tile.
 *
 * ```js
 * var CanvasLayer = L.GridLayer.extend({
 *     createTile: function(coords){
 *         // create a <canvas> element for drawing
 *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
 *
 *         // setup tile width and height according to the options
 *         var size = this.getTileSize();
 *         tile.width = size.x;
 *         tile.height = size.y;
 *
 *         // get a canvas context and draw something on it using coords.x, coords.y and coords.z
 *         var ctx = tile.getContext('2d');
 *
 *         // return the tile so it can be rendered on screen
 *         return tile;
 *     }
 * });
 * ```
 *
 * @section Asynchronous usage
 * @example
 *
 * Tile creation can also be asynchronous, this is useful when using a third-party drawing library. Once the tile is finished drawing it can be passed to the `done()` callback.
 *
 * ```js
 * var CanvasLayer = L.GridLayer.extend({
 *     createTile: function(coords, done){
 *         var error;
 *
 *         // create a <canvas> element for drawing
 *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
 *
 *         // setup tile width and height according to the options
 *         var size = this.getTileSize();
 *         tile.width = size.x;
 *         tile.height = size.y;
 *
 *         // draw something asynchronously and pass the tile to the done() callback
 *         setTimeout(function() {
 *             done(error, tile);
 *         }, 1000);
 *
 *         return tile;
 *     }
 * });
 * ```
 *
 * @section
 */
export class GridOptions extends OptionsObject {
  // @option tileSize: Number|Point = 256
		// Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
		tileSize: number = 256;

		// @option opacity: Number = 1.0
		// Opacity of the tiles. Can be used in the `createTile()` function.
		opacity: number = 1;

		// @option updateWhenIdle: Boolean = (depends)
		// Load new tiles only when panning ends.
		// `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
		// `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
		// [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
		updateWhenIdle: boolean = Browser.mobile;

		// @option updateWhenZooming: Boolean = true
		// By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
		updateWhenZooming: boolean = true;

		// @option updateInterval: Number = 200
		// Tiles will not update more than once every `updateInterval` milliseconds when panning.
		updateInterval: number = 200;

		// @option zIndex: Number = 1
		// The explicit zIndex of the tile layer.
		zIndex: number = 1;

		// @option bounds: LatLngBounds = undefined
		// If set, tiles will only be loaded inside the set `LatLngBounds`.
		bounds: LatLngBounds = null;

		// @option minZoom: Number = 0
		// The minimum zoom level down to which this layer will be displayed (inclusive).
		minZoom: number = 0;

		// @option maxZoom: Number = undefined
		// The maximum zoom level up to which this layer will be displayed (inclusive).
		maxZoom: number = 18;

		// @option maxNativeZoom: Number = undefined
		// Maximum zoom number the tile source has available. If it is specified,
		// the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
		// from `maxNativeZoom` level and auto-scaled.
		maxNativeZoom: number = undefined;

		// @option minNativeZoom: Number = undefined
		// Minimum zoom number the tile source has available. If it is specified,
		// the tiles on all zoom levels lower than `minNativeZoom` will be loaded
		// from `minNativeZoom` level and auto-scaled.
		minNativeZoom: number = undefined;

		// @option noWrap: Boolean = false
		// Whether the layer is wrapped around the antimeridian. If `true`, the
		// GridLayer will only be displayed once at low zoom levels. Has no
		// effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
		// in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
		// tiles outside the CRS limits.
		noWrap: boolean = false;

		// @option pane: String = 'tilePane'
		// `Map pane` where the grid layer will be added.
		pane: string = 'tilePane';

		// @option className: String = ''
		// A custom class name to assign to the tile layer. Empty by default.
		className: string = '';

		// @option keepBuffer: Number = 2
		// When panning the map, keep this many rows and columns of tiles before unloading them.
		keepBuffer: number = 2;

    // @option zoomOffset: Number = 0
		// The zoom number used in tile URLs will be offset with this value.
		zoomOffset: number = 0;
}

export class Grid extends EventedObject {

  options: GridOptions = new GridOptions();

  _map: Map;
  _container: HTMLElement;
  _loading: boolean;
  _noPrune: boolean;
  _tiles: Object = {};
  _fadeFrame: number;
  _tileSize: ScreenXY;
  _tileZoom: number;
  _levels: Object = {};
  _level: any;
  _globalTileRange: ScreenBounds;

	constructor(options?: Object) {
		super();
    this.options.assign(options);
	}

  addTo(map: Map) {
    this._map = map;
    if (this._container) { return; }

		this._container = DomUtil.create('div', 'leaflet-layer ' + (this.options.className || ''));

		if (this.options.opacity < 1) {
			this._updateOpacity();
		}

		this._map.getPane(this.options.pane).appendChild(this._container);

    this._levels = {};
    this._tiles = {};

    if (this._map.loaded) this._resetView(); // implicit _update() call

    this._map.on('viewprereset', this._invalidateAll, this);
    this._map.on('viewreset', this._resetView, this);
		this._map.on('zoom', this._resetView, this);
		this._map.on('zoomanim', this._animateZoom, this);
		this._map.on('moveend', this._onMoveEnd, this);
  }

  removeFrom(map: Map) {
    this._map.off('viewprereset', this._invalidateAll, this);
    this._map.off('viewreset', this._resetView, this);
		this._map.off('zoom', this._resetView, this);
		this._map.off('zoomanim', this._animateZoom, this);
		this._map.off('moveend', this._onMoveEnd, this);
    this._removeAllTiles();
    DomUtil.remove(this._container);
    // this._map._removeZoomLimit(this);
    this._container = null;
    this._tileZoom = undefined;
  }
	// onAdd: function () {
	// 	this._initContainer();

	// 	this._levels = {};
	// 	this._tiles = {};

	// 	this._resetView(); // implicit _update() call
	// },

	// beforeAdd: function (map) {
	// 	map._addZoomLimit(this);
	// },

	// onRemove: function (map) {
	// 	this._removeAllTiles();
	// 	DomUtil.remove(this._container);
	// 	map._removeZoomLimit(this);
	// 	this._container = null;
	// 	this._tileZoom = undefined;
	// },

	// @method getContainer: HTMLElement
	// Returns the HTML element that contains the tiles for this layer.
	getContainer() {
		return this._container;
	}

	// @method setOpacity(opacity: Number): this
	// Changes the [opacity](#gridlayer-opacity) of the grid layer.
	setOpacity(opacity) {
		this.options.opacity = opacity;
		this._updateOpacity();
	}

	// @method isLoading: Boolean
	// Returns `true` if any tile in the grid layer has not finished loading.
	isLoading() {
		return this._loading;
	}

	// @method redraw: this
	// Causes the layer to clear all the tiles and request them again.
	redraw() {
		if (this._map) {
			this._removeAllTiles();
			this._update();
		}
	}

	// @section Extension methods
	// Layers extending `GridLayer` shall reimplement the following method.
	// @method createTile(coords: Object, done?: Function): HTMLElement
	// Called only internally, must be overridden by classes extending `GridLayer`.
	// Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
	// is specified, it must be called when the tile has finished loading and drawing.
	createTile(coords, done): HTMLElement {
		return document.createElement('div');
	}

	// @section
	// @method getTileSize: Point
	// Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
	getTileSize() {
		return new ScreenXY(this.options.tileSize, this.options.tileSize);
	}

	_updateOpacity() {
		if (!this._map) { return; }

		// IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
		if (Browser.ielt9) { return; }

		DomUtil.setOpacity(this._container, this.options.opacity);

		let now = +new Date(),
		    nextFrame = false,
		    willPrune = false;

		for (let key in this._tiles) {
			let tile = this._tiles[key];
			if (!tile.current || !tile.loaded) { continue; }

			let fade = Math.min(1, (now - tile.loaded) / 200);

			DomUtil.setOpacity(tile.el, fade);
			if (fade < 1) {
				nextFrame = true;
			} else {
				if (tile.active) {
					willPrune = true;
				} else {
					this._onOpaqueTile(tile);
				}
				tile.active = true;
			}
		}

		if (willPrune && !this._noPrune) { this._pruneTiles(); }

		if (nextFrame) {
			Util.cancelAnimFrame(this._fadeFrame);
			this._fadeFrame = Util.requestAnimFrame(this._updateOpacity, this);
		}
	}

	_onOpaqueTile(tile){

  }

	_updateLevels() {

		var zoom = this._tileZoom,
		    maxZoom = this.options.maxZoom;

		if (zoom === undefined) { return undefined; }

		for (let z in this._levels) {
			// z = Number(z);
			if (this._levels[z].el.children.length || Number(z) == zoom) {
				this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - Number(z));
				this._onUpdateLevel(z);
			} else {
				DomUtil.remove(this._levels[z].el);
				this._removeTilesAtZoom(z);
				this._onRemoveLevel(z);
				delete this._levels[z];
			}
		}

		var level = this._levels[zoom],
		    map = this._map;

		if (!level) {
			level = this._levels[zoom] = {};

			level.el = DomUtil.create('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
			level.el.style.zIndex = maxZoom;

			level.origin = map.latLngToWorldPixel(map.worldPixelToLatLng(map.getPixelOrigin()), zoom).round();
			level.zoom = zoom;

			this._setZoomTransform(level, map.getCenter(), map.getZoom());

			// force the browser to consider the newly added element for transition
			// Util.falseFn(level.el.offsetWidth);

			this._onCreateLevel(level);
		}

		this._level = level;

		return level;
	}

	_onUpdateLevel(level){

  }

	_onRemoveLevel(level){

  }

	_onCreateLevel(level){

  }

	_pruneTiles() {
		if (!this._map) return;
		let zoom = this._map.getZoom();
		if (zoom > this.options.maxZoom ||
			zoom < this.options.minZoom) {
			this._removeAllTiles();
			return;
		}

		for (let key in this._tiles) {
			let tile = this._tiles[key];
			tile.retain = tile.current;
		}

		for (let key in this._tiles) {
			let tile = this._tiles[key];
			if (tile.current && !tile.active) {
				let coords = tile.coords;
				if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
					this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
				}
			}
		}

		for (let key in this._tiles) {
			if (!this._tiles[key].retain) {
				this._removeTile(key);
			}
		}
	}

	_removeTilesAtZoom(zoom) {
		for (var key in this._tiles) {
			if (this._tiles[key].coords.z !== zoom) {
				continue;
			}
			this._removeTile(key);
		}
	}

	_removeAllTiles() {
		for (var key in this._tiles) {
			this._removeTile(key);
		}
	}

	_invalidateAll() {
		for (var z in this._levels) {
			DomUtil.remove(this._levels[z].el);
			this._onRemoveLevel(Number(z));
			delete this._levels[z];
		}
		this._removeAllTiles();

		this._tileZoom = undefined;
	}

	_retainParent(x, y, z, minZoom) {
		let x2 = Math.floor(x / 2),
		    y2 = Math.floor(y / 2),
		    z2 = z - 1;

		var key = this._tileCoordsToKey({x: x2, y: y2, z: z2}),
		    tile = this._tiles[key];

		if (tile && tile.active) {
			tile.retain = true;
			return true;

		} else if (tile && tile.loaded) {
			tile.retain = true;
		}

		if (z2 > minZoom) {
			return this._retainParent(x2, y2, z2, minZoom);
		}

		return false;
	}

	_retainChildren(x, y, z, maxZoom) {

		for (let i = 2 * x; i < 2 * x + 2; i++) {
			for (let j = 2 * y; j < 2 * y + 2; j++) {
				let key = this._tileCoordsToKey({x: i, y: j, z: z + 1}),
				    tile = this._tiles[key];

				if (tile && tile.active) {
					tile.retain = true;
					continue;

				} else if (tile && tile.loaded) {
					tile.retain = true;
				}

				if (z + 1 < maxZoom) {
					this._retainChildren(i, j, z + 1, maxZoom);
				}
			}
		}
	}

	_resetView(e?) {
		const animating = e && (e.pinch || e.flyTo);
		this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
	}

	_animateZoom(e) {
		this._setView(e.center, e.zoom, true, e.noUpdate);
	}

	_clampZoom(zoom) {
		const options = this.options;

		if (undefined !== options.minNativeZoom && zoom < options.minNativeZoom) {
			return options.minNativeZoom;
		}

		if (undefined !== options.maxNativeZoom && options.maxNativeZoom < zoom) {
			return options.maxNativeZoom;
		}

		return zoom;
	}

  _abortLoading() {

  }

	_setView(center, zoom, noPrune?, noUpdate?) {
		var tileZoom = Math.round(zoom);
		if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
		    (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
			tileZoom = undefined;
		} else {
			tileZoom = this._clampZoom(tileZoom);
		}

		var tileZoomChanged = this.options.updateWhenZooming && (tileZoom !== this._tileZoom);

		if (!noUpdate || tileZoomChanged) {

			this._tileZoom = tileZoom;

			if (this._abortLoading) {
				this._abortLoading();
			}

			this._updateLevels();
			this._resetGrid();

			if (tileZoom !== undefined) {
				this._update(center);
			}

			if (!noPrune) {
				this._pruneTiles();
			}

			// Flag to prevent _updateOpacity from pruning tiles during
			// a zoom anim or a pinch gesture
			this._noPrune = !!noPrune;
		}

		this._setZoomTransforms(center, zoom);
	}

	_setZoomTransforms(center, zoom) {
		for (let i in this._levels) {
			this._setZoomTransform(this._levels[i], center, zoom);
		}
	}

	_setZoomTransform(level, center, zoom) {
		let scale = this._map.getZoomScale(zoom, level.zoom),
		    translate = level.origin.multiplyBy(scale)
		        .subtract(this._map._getNewPixelOrigin(center, zoom)).round();

		if (Browser.any3d) {
			DomUtil.setTransform(level.el, translate, scale);
		} else {
			DomUtil.setPosition(level.el, translate);
		}
	}

	_resetGrid() {
		let crs = this._map.getCRS(),
		    tileSize = this._tileSize = this.getTileSize(),
		    tileZoom = this._tileZoom;

		const bounds = this._map.getPixelWorldBounds(this._tileZoom);
		if (bounds) {
			this._globalTileRange = this._pxBoundsToTileRange(bounds);
		}

	}

	_onMoveEnd() {
		if (!this._map || this._map._animatingZoom) { return; }

		this._update();
	}

	_getTiledPixelBounds(center) {
		let map = this._map,
		    mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
		    scale = map.getZoomScale(mapZoom, this._tileZoom),
		    pixelCenter = map.latLngToWorldPixel(center, this._tileZoom).floor(),
		    halfSize = map.getSize().divideBy(scale * 2);

		return new ScreenBounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
	}

	// Private method to load tiles in the grid's active zoom level according to map bounds
	_update(center?) {
		var map = this._map;
		if (!map) { return; }
		var zoom = this._clampZoom(map.getZoom());

		if (center === undefined) { center = map.getCenter(); }
		if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

		var pixelBounds = this._getTiledPixelBounds(center),
		    tileRange = this._pxBoundsToTileRange(pixelBounds),
		    tileCenter = tileRange.getCenter(),
		    queue = [],
		    margin = this.options.keepBuffer,
		    noPruneRange = new ScreenBounds(tileRange.getBottomLeft().subtract(new ScreenXY(margin, -margin)),
		                              tileRange.getTopRight().add(new ScreenXY(margin, -margin)));

		// Sanity check: panic if the tile range contains Infinity somewhere.
		if (!(isFinite(tileRange.min.x) &&
		      isFinite(tileRange.min.y) &&
		      isFinite(tileRange.max.x) &&
		      isFinite(tileRange.max.y))) { throw new Error('Attempted to load an infinite number of tiles'); }

		for (var key in this._tiles) {
			var c = this._tiles[key].coords;
			if (c.z !== this._tileZoom || !noPruneRange.contains(new ScreenXY(c.x, c.y))) {
				this._tiles[key].current = false;
			}
		}

		// _update just loads more tiles. If the tile zoom level differs too much
		// from the map's, let _setView reset levels and prune old tiles.
		if (Math.abs(zoom - this._tileZoom) > 1) { this._setView(center, zoom); return; }

		// create a queue of coordinates to load tiles from
		for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
			for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
        const coords = {x: i, y: j, z: this._tileZoom};

				if (!this._isValidTile(coords)) { continue; }

				var tile = this._tiles[this._tileCoordsToKey(coords)];
				if (tile) {
					tile.current = true;
				} else {
					queue.push(coords);
				}
			}
		}

		// sort tile queue to load tiles in order of their distance to center
		queue.sort(function (a, b) {
			return ((a.x - tileCenter.x) * (a.x - tileCenter.x) + (a.y - tileCenter.y) * (a.y - tileCenter.y))
       - ((b.x - tileCenter.x) * (b.x - tileCenter.x) + (b.y - tileCenter.y) * (b.y - tileCenter.y));
		});

		if (queue.length !== 0) {
			// if it's the first batch of tiles to load
			if (!this._loading) {
				this._loading = true;
				// @event loading: Event
				// Fired when the grid layer starts loading tiles.
				this.fire('loading');
			}

			// create DOM fragment to append tiles in one batch
			var fragment = document.createDocumentFragment();

			for (i = 0; i < queue.length; i++) {
				this._addTile(queue[i], fragment);
			}

			this._level.el.appendChild(fragment);
		}
	}

	_isValidTile(coords) {
		const crs = this._map.getCRS();

		if (!crs.infinite) {
			// don't load tile if it's out of bounds and not wrapped
			const bounds = this._globalTileRange;
			if ((coords.x < bounds.min.x || coords.x > bounds.max.x) ||
			    (coords.y < bounds.min.y || coords.y > bounds.max.y)) { return false; }
		}

		if (!this.options.bounds) { return true; }

		// don't load tile if it doesn't intersect the bounds in options
    // bounds: LatLngBounds
		const tileBounds = this._tileCoordsToBounds(coords);
		return this.options.bounds.overlaps(tileBounds);
	}

	_keyToBounds(key) {
		return this._tileCoordsToBounds(this._keyToTileCoords(key));
	}

	_tileCoordsToNwSe(coords) {
		const map = this._map,
		    tileSize = this.getTileSize(),
		    nwPoint = new ScreenXY(coords.x, coords.y).scaleBy(tileSize),
		    sePoint = nwPoint.add(tileSize),
		    nw = map.worldPixelToLatLng(nwPoint, coords.z),
		    se = map.worldPixelToLatLng(sePoint, coords.z);
		return [nw, se];
	}

	// converts tile coordinates to its geographical bounds
	_tileCoordsToBounds(coords) {
		let bp = this._tileCoordsToNwSe(coords),
		    bounds = new LatLngBounds(bp[0], bp[1]);

		if (!this.options.noWrap) {
			bounds = this._map.wrapLatLngBounds(bounds);
		}
		return bounds;
	}
	// converts tile coordinates to key for the tile cache
	_tileCoordsToKey(coords) {
		return coords.x + ':' + coords.y + ':' + coords.z;
	}

	// converts tile cache key to coordinates
	_keyToTileCoords(key) {
		let k = key.split(':');
		return {x: +k[0], y: +k[1], z: +k[2]};
	}

	_removeTile(key) {
		var tile = this._tiles[key];
		if (!tile) { return; }

		DomUtil.remove(tile.el);

		delete this._tiles[key];

		// @event tileunload: TileEvent
		// Fired when a tile is removed (e.g. when a tile goes off the screen).
		this.fire('tileunload', {
			tile: tile.el,
			coords: this._keyToTileCoords(key)
		});
	}

	_initTile(tile) {
		DomUtil.addClass(tile, 'leaflet-tile');

		const tileSize = this.getTileSize();
		tile.style.width = tileSize.x + 'px';
		tile.style.height = tileSize.y + 'px';

		tile.onselectstart = Util.falseFn;
		tile.onmousemove = Util.falseFn;
	}

	_addTile(coords, container) {
		let tilePos = this._getTilePos(coords),
		    key = this._tileCoordsToKey(coords);

    let tile = this.createTile(coords, () => {
      this._tileReady(coords, null, tile);
    });

		this._initTile(tile);

		// if createTile is defined with a second argument ("done" callback),
		// we know that tile is async and will be ready later; otherwise
		if (this.createTile.length < 2) {
			// mark tile as ready, but delay one frame for opacity animation to happen
			Util.requestAnimFrame(() => {
        this._tileReady(coords, null, tile);
      });
		}

		DomUtil.setPosition(tile, tilePos);

		// save tile in cache
		this._tiles[key] = {
			el: tile,
			coords: coords,
			current: true
		};

		container.appendChild(tile);
		// @event tileloadstart: TileEvent
		// Fired when a tile is requested and starts loading.
		this.fire('tileloadstart', {
			tile: tile,
			coords: coords
		});
	}

	_tileReady(coords, err, tile) {
		if (err) {
			// @event tileerror: TileErrorEvent
			// Fired when there is an error loading a tile.
			this.fire('tileerror', {
				error: err,
				tile: tile,
				coords: coords
			});
		}

		let key = this._tileCoordsToKey(coords);

		tile = this._tiles[key];
		if (!tile) { return; }

		tile.loaded = +new Date();
		if (this._map._fadeAnimated) {
			DomUtil.setOpacity(tile.el, 0);
			Util.cancelAnimFrame(this._fadeFrame);
			this._fadeFrame = Util.requestAnimFrame(this._updateOpacity, this);
		} else {
			tile.active = true;
			this._pruneTiles();
		}

		if (!err) {
			DomUtil.addClass(tile.el, 'leaflet-tile-loaded');

			// @event tileload: TileEvent
			// Fired when a tile loads.
			this.fire('tileload', {
				tile: tile.el,
				coords: coords
			});
		}

		if (this._noTilesToLoad()) {
			this._loading = false;
			// @event load: Event
			// Fired when the grid layer loaded all visible tiles.
			this.fire('load');

			if (Browser.ielt9 || !this._map._fadeAnimated) {
				Util.requestAnimFrame(this._pruneTiles, this);
			} else {
				// Wait a bit more than 0.2 secs (the duration of the tile fade-in)
				// to trigger a pruning.
				setTimeout(() => {
          this._pruneTiles();
        }, 250);
			}
		}
	}

	_getTilePos(coords) {
		return new ScreenXY(coords.x, coords.y).scaleBy(this.getTileSize()).subtract(this._level.origin);
	}

	_pxBoundsToTileRange(bounds) {
		var tileSize = this.getTileSize();
		return new ScreenBounds(
			bounds.min.unscaleBy(tileSize).floor(),
			bounds.max.unscaleBy(tileSize).ceil().subtract(new ScreenXY(1, 1)));
	}

	_noTilesToLoad() {
		for (var key in this._tiles) {
			if (!this._tiles[key].loaded) { return false; }
		}
		return true;
	}
}

