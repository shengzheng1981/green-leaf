import { ScreenBounds } from "../common/screen-bounds";
import { ScreenXY } from "../common/screen-xy";
import { CRS } from "../crs/crs";
import { Graphic } from "../graphic/graphic";
import { Layer } from "./layer";

export class GraphicLayer extends Layer {

	private _first: Graphic;
  private _last: Graphic;
  private _graphics: any = {};     //Map<string, Graphic>
  private _crs: CRS; 

  constructor() {
    super();
  }

  set crs(value: CRS) {
    this._crs = value;
    let graphic = this._first;
    while (graphic) {
      graphic.geometry.crs = value;
      graphic = graphic.next;
    }
  } 

  addGraphic(graphic: Graphic, last: boolean = true) {
    this._graphics[graphic.id] = graphic;
    graphic.geometry.crs = this._crs;
    if (!this._first) {
      this._first = graphic;
      this._last = graphic;
    } else {
      if (!last) {
        this._first.prev = graphic;
        graphic.next = this._first;
        this._first = graphic;
      } else {
        this._last.next = graphic;
        graphic.prev = this._last;
        this._last = graphic;
      }
    }
  }

  removeGraphic(graphic: Graphic) {
    if (this._first == graphic) {
      this._first = graphic.next;
    } 
    if (this._last == graphic) {
      this._last = graphic.prev;
    }
    if (graphic.prev) {
      graphic.prev.next = graphic.next;
    }
    if (graphic.next) {
      graphic.next.prev = graphic.prev;
    }
    graphic.prev = null;
    graphic.next = null;
    delete this._graphics[graphic.id];
  }

  transform(origin: ScreenXY, zoom: number) {
    let graphic = this._first;
    while (graphic) {
      graphic.transform(origin, zoom);
      graphic = graphic.next;
    }
  }

  draw(ctx: CanvasRenderingContext2D, zoom: number, redrawBounds?: ScreenBounds) {
    if (!this.visible || this.minZoom >= zoom || this.maxZoom <= zoom) return;
    let graphic = this._first;
    // let count = 0;
    while (graphic) {
      if (!redrawBounds || (graphic.geometry && graphic.geometry.screenBounds && graphic.geometry.screenBounds.intersects(redrawBounds))) {
        graphic.draw(ctx);
        // count += 1;
      }
      graphic = graphic.next;
    }
    // console.log("count:", count);
  }

  query(screenXY: ScreenXY, zoom: number, bounds: ScreenBounds) {
    if (!this.visible || this.minZoom >= zoom || this.maxZoom <= zoom) return [];
    let graphic = this._first;
    const graphics: Graphic[] = [];
    while (graphic) {
      if (graphic.geometry && graphic.geometry.screenBounds && graphic.geometry.screenBounds.intersects(bounds)) {
        if (graphic.geometry.contains(screenXY)) {
          graphics.push(graphic);
        }
      }
      graphic = graphic.next;
    }
    return graphics;
  }

  on(types: any, fn?: any, context?: any) {
    let graphic = this._first;
    while (graphic) {
      graphic.on(types, fn, context);
      graphic = graphic.next;
    }
    return this;
  }
}