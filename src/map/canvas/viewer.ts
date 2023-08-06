import * as DomUtil from '../../util/dom-util';
import * as DomEvent from '../../util/dom-event';
import { LatLng } from '../../common/latlng';
import { ScreenXY } from '../../common/screen-xy';
import { ScreenBounds } from '../../common/screen-bounds';
import { Map } from '../map';
import { Graphic } from '../../graphic/graphic';
import { GraphicLayer } from '../../layer/graphic-layer';
import { FeatureLayer } from '../../layer/feature-layer';
import { RasterLayer } from '../../layer/raster-layer';
import { Canvas, CanvasOptions } from "./canvas";

export class ViewerOptions extends CanvasOptions {
  pane: string = 'overlayPane';
}

export class Viewer extends Canvas {
  options: ViewerOptions = new ViewerOptions();

  _graphicLayer: GraphicLayer = new GraphicLayer();
  _graphicLayers: GraphicLayer[];
  _featureLayers: FeatureLayer[];
  _rasterLayers: RasterLayer[];

  //mouse hover relate
  private _hoveredElement: any;
  private _mouseHoverThrottled: boolean;

  constructor(map: Map, options?: Object) {
    super(map, options);
    this._graphicLayer.crs = map.getCRS();
    this._graphicLayers = [];
    this._featureLayers = [];
    this._rasterLayers = [];
    // this.options.assign(options);
  }

  init() {
    super.init();
    if (this._container) {
      DomEvent.on(this._container, 'mousemove', this._onMouseMove, this);
      DomEvent.on(this._container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this);
      DomEvent.on(this._container, 'mouseout', this._handleMouseOut, this);
    }
  }

  destroy() {
    if (this._container) {
      DomEvent.off(this._container);
    }
    super.destroy();
  }

  _onZoomEnd() {
    super._onZoomEnd();

    this._graphicLayer.transform(this._origin, this._zoom);
    this._graphicLayers.forEach(layer => {
      layer.transform(this._origin, this._zoom);
    });
    this._featureLayers.forEach(layer => {
      layer.transform(this._origin, this._zoom);
    });
    this._rasterLayers.forEach(layer => {
      layer.transform(this._origin, this._zoom);
    });
  }

  addGraphic(graphic: Graphic) {
    this._graphicLayer.addGraphic(graphic);
    graphic.transform(this._origin, this._zoom);
    this._requestRedraw(graphic.geometry);
  }

  removeGraphic(graphic: Graphic) {
    this._graphicLayer.removeGraphic(graphic);
    this._requestRedraw(graphic.geometry);
  }

  clearGraphics() {
    this._graphicLayer.clearGraphics();
    this._updateGeometry();
  }

  addGraphicLayer(graphicLayer: GraphicLayer) {
    graphicLayer.transform(this._origin, this._zoom);
    this._graphicLayers.push(graphicLayer);
    this._updateGeometry();
  }

  removeGraphicLayer(graphicLayer: GraphicLayer) {
    const index = this._graphicLayers.findIndex(layer => layer.id == graphicLayer.id);
    this._graphicLayers.splice(index, 1);
  }

  clearGraphicLayers() {
    this._graphicLayers = [];
    this._updateGeometry();
  }

  addFeatureLayer(featureLayer: FeatureLayer) {
    featureLayer.transform(this._origin, this._zoom);
    this._featureLayers.push(featureLayer);
    this._updateGeometry();
  }

  removeFeatureLayer(featureLayer: FeatureLayer) {
    const index = this._featureLayers.findIndex(layer => layer.id == featureLayer.id);
    this._featureLayers.splice(index, 1);
  }

  clearFeatureLayers() {
    this._featureLayers = [];
    this._updateGeometry();
  }

  addRasterLayer(rasterLayer: RasterLayer) {
    rasterLayer.transform(this._origin, this._zoom);
    this._rasterLayers.push(rasterLayer);
    this._updateGeometry();
  }

  removeRasterLayer(rasterLayer: RasterLayer) {
    const index = this._rasterLayers.findIndex(layer => layer.id == rasterLayer.id);
    this._rasterLayers.splice(index, 1);
  }

  clearRasterLayers() {
    this._rasterLayers = [];
    this._updateGeometry();
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
      this._rasterLayers.forEach(layer => {
        layer.draw(this._ctx, this._zoom, bounds || this._bounds);
      });

      this._featureLayers.forEach(layer => {
        layer.draw(this._ctx, this._zoom, bounds || this._bounds);
      });

      this._graphicLayers.forEach(layer => {
        layer.draw(this._ctx, this._zoom, bounds || this._bounds);
      });

      this._graphicLayer.draw(this._ctx, this._zoom, bounds || this._bounds);
      // console.timeEnd("draw");
      this._drawing = false;

      this._ctx.restore();  // Restore state before clipping.
    }
  }

  // Canvas obviously doesn't have mouse events for individual drawn objects,
  // so we emulate that by calculating what's under the mouse on mousemove/click manually

  _onClick(e: any) {
    let screenXY = this._map.mouseEventToCanvasPixel(e);
    // spatial query graphic && feature
    let elements: any[] = this._graphicLayer.query(screenXY, this._zoom, this._bounds);
    this._graphicLayers.forEach(layer => {
      elements = elements.concat(layer.query(screenXY, this._zoom, this._bounds));
    })
    this._featureLayers.forEach(layer => {
      elements = elements.concat(layer.query(screenXY, this._zoom, this._bounds));
    })

    if (elements.length > 0) {
      DomEvent.fakeStop(e);
      this._fireEvent(elements, e);
    }
  }

  _onMouseMove(e: any) {
    if (!this._map || !(this._map as any).dragging || (this._map as any).dragging.moving() || this._map._animatingZoom) { return; }

    const point = this._map.mouseEventToCanvasPixel(e);
    this._handleMouseHover(e, point);
  }

  _handleMouseOut(e: any) {
    if (this._hoveredElement) {
      // if we're leaving, fire mouseout
      DomUtil.removeClass(this._container, 'leaflet-interactive');
      this._fireEvent([this._hoveredElement], e, 'mouseout');
      this._hoveredElement = null;
      this._mouseHoverThrottled = false;
    }
  }

  _handleMouseHover(e: any, screenXY: ScreenXY) {
    if (this._mouseHoverThrottled) {
      return;
    }
    // spatial query graphic && feature
    let elements: any[] = this._graphicLayer.query(screenXY, this._zoom, this._bounds);
    this._graphicLayers.forEach(layer => {
      elements = elements.concat(layer.query(screenXY, this._zoom, this._bounds));
    })
    this._featureLayers.forEach(layer => {
      elements = elements.concat(layer.query(screenXY, this._zoom, this._bounds));
    })

    let candidateHoveredElement = elements.length > 0 ? elements[0] : null;
    if (candidateHoveredElement !== this._hoveredElement) {
      this._handleMouseOut(e);

      if (candidateHoveredElement) {
        DomUtil.addClass(this._container, 'leaflet-interactive'); // change cursor
        this._fireEvent([candidateHoveredElement], e, 'mouseover');
        this._hoveredElement = candidateHoveredElement;
      }
    }

    if (this._hoveredElement) {
      this._fireEvent([this._hoveredElement], e);
    }
    // throttle 
    this._mouseHoverThrottled = true;
    setTimeout(() => {
      this._mouseHoverThrottled = false;
    }, 32);
  }

  _fireEvent(layers: any, e: any, type?: string) {
    this._map._fireDOMEvent(e, type || e.type, layers);
  }
}