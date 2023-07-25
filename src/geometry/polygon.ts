import { LatLng } from "../common/latlng";
import { LatLngBounds } from "../common/latlng-bounds";
import { PlaneBounds } from "../common/plane-bounds";
import { PlaneXY } from "../common/plane-xy";
import { ScreenXY } from "../common/screen-xy";
import { FillSymbol, SimpleFillSymbol } from "../symbol/symbol";
import { Geometry, GeometryType } from "./geometry";


/**
 * 面
 * @remarks
 * 数据结构：[ring[point[x,y]]]：such as [[[1,1],[2,2],[1,2]], [[1.5,1.5],[1.9,1.9],[1.5,1.9]]]
 */
export class Polygon extends Geometry {
  protected _type: GeometryType = GeometryType.Polygon;
  _latlngs: LatLng[][];
  _planeXYs: PlaneXY[][];
  _screenXYs: ScreenXY[][];

  constructor(latlngs: LatLng[][]) {
    super();
    this._setLatLngs(latlngs);
  }
  getLatLngs() {
		return this._latlngs;
	}

	_setLatLngs(latlngs: LatLng[][]) {
		this._latlngBounds = new LatLngBounds();
		this._latlngs = [];
    latlngs.forEach(ring => {
      const latLngRing = [];
      ring.forEach(latlng => {
        this._latlngBounds.extend(latlng);
        latLngRing.push(latlng);
      })
      this._latlngs.push(latLngRing);
    })
	}

	// @method setLatLngs(latlngs: LatLng[]): this
	// Replaces all the points in the polyline with the given array of geographical points.
	setLatLngs(latlngs: LatLng[][]) {
		this._setLatLngs(latlngs);
		// return this.redraw();
	}

  /**
   * 投影变换
   * @param {Projection} projection - 坐标投影转换
   */
  project() {
		if (!this._crs) return;
		this._planeBounds = new PlaneBounds();
		this._planeXYs = [];
    this._latlngs.forEach(ring => {
      const planeRing = [];
      ring.forEach(latlng => {
        const planeXY: PlaneXY = this._crs.projection.project(latlng);
        this._planeBounds.extend(planeXY);
        planeRing.push(planeXY);
      })
      this._planeXYs.push(planeRing);
    })
	}

  transform(origin: ScreenXY, zoom: number, symbol?: FillSymbol) {
		if (!this._crs && !this._planeXYs) return;
		this._screenXYs = this._planeXYs.map(ring => {
      return ring.map(planeXY => {
        return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
      })
		})
		this._screenBounds = symbol.getScreenBounds(this._screenXYs);
	}

  /**
   * 输出GeoJSON格式字符串
   */
  toGeoJSON(precision: number = 6) {
    const coords = [];
    this._latlngs.forEach(ring => {
      const outRing = [];
      ring.forEach(latlng => {
        this._latlngBounds.extend(latlng);
        outRing.push(latlng.toGeoJSON(precision));
      })
      coords.push(outRing);
    })
    return {
      type: "Polygon",
      coordinates: coords
    }
  }

  /**
   * 绘制面
   * @param {CanvasRenderingContext2D} ctx - 绘图上下文
   * @param {Projection} projection - 坐标投影转换
   * @param {Bound} extent - 当前可视范围
   * @param {Symbol} symbol - 渲染符号
   */
  draw(ctx: CanvasRenderingContext2D, symbol?: FillSymbol) {
    if (!this._crs) return;
		// this._screenXYs = this._planeXYs.map(planeXY => {
		// 	return this._crs.planeXYToScreenXY(planeXY, zoom).round(false).subtract(origin);
		// })
		symbol = symbol || new SimpleFillSymbol();
		// this._screenBounds = symbol.getScreenBounds(this._screenXYs);
		symbol.draw(ctx, this._screenXYs);
  }

  contains(screenXY: ScreenXY) {
    let inside = false,
      ring, p1, p2, i, j, k, len, len2;

		if (!this._screenBounds || !this._screenBounds.contains(screenXY)) { return false; }

		// ray casting algorithm for detecting if point is in polygon
		for (i = 0, len = this._screenXYs.length; i < len; i++) {
			ring = this._screenXYs[i];

			for (j = 0, len2 = ring.length, k = len2 - 1; j < len2; k = j++) {
				p1 = ring[j];
				p2 = ring[k];

				if (((p1.y > screenXY.y) !== (p2.y > screenXY.y)) && (screenXY.x < (p2.x - p1.x) * (screenXY.y - p1.y) / (p2.y - p1.y) + p1.x)) {
					inside = !inside;
				}
			}
		}
    return inside;
  }
  // /**
  //  * 获取面的周长
  //  * @remarks
  //  * from Leaflet
  //  * @param {Projection} projection - 坐标投影转换
  //  * @return {number} 周长
  //  */
  // getLength(projection: Projection = new WebMercator()) {
  //   if (!this._projected) this.project(projection);
  //   let sum = 0;
  //   this._coordinates.forEach((ring, index) => {
  //     if (index == 0) {
  //       ring.forEach((point, index) => {
  //         if (index > 0) {
  //           sum += Math.sqrt(Math.pow(point[0] - ring[index - 1][0], 2) + Math.pow(point[1] - ring[index - 1][1], 2));
  //         }
  //       })
  //     }
  //   });
  //   return sum;
  // }

  // /**
  //  * 获取面的面积
  //  * @remarks
  //  * from Leaflet
  //  * @param {Projection} projection - 坐标投影转换
  //  * @return {number} 面积
  //  */
  // getArea(projection: Projection = new WebMercator()) {
  //   if (!this._projected) this.project(projection);
  //   let sum = 0;
  //   this._coordinates.forEach((ring, index) => {
  //     if (index == 0) {
  //       ring.forEach((point, index) => {
  //         if (index > 0) {
  //           //梯形面积
  //           sum += 1 / 2 * (point[0] - ring[index - 1][0]) * (point[1] + ring[index - 1][1]);
  //         }
  //       })
  //       sum += 1 / 2 * (ring[0][0] - ring[ring.length - 1][0]) * (ring[ring.length - 1][1] + ring[0][1]);
  //     }
  //   });
  //   //顺时针为正，逆时针为负
  //   return Math.abs(sum);
  // }

}