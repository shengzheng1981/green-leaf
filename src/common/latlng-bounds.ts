import { LatLng } from './latlng';

/**
 * 经纬度坐标范围
 * @remark Represents a rectangular geographical area on a map.
 */
export class LatLngBounds { // (LatLng, LatLng) or (LatLng[])

  /**
   * 西南角经纬度
   */
	private _southWest: LatLng;
  /**
   * 东北角经纬度
   */
	private _northEast: LatLng;
  /**
   * 构造函数
   * @param {LatLng | LatLng[]} a - 经纬度或经纬度数组
   * @param {LatLng} b - 经纬度
   */
	constructor(a?: LatLng | LatLng[], b?: LatLng) {
		let latlngs: LatLng[];
		if (a instanceof LatLng && b instanceof LatLng) {
			latlngs = [a, b];
		} else if (Array.isArray(a)){
			latlngs = a;
		} else if (typeof a === 'undefined' && typeof b === 'undefined'){
			latlngs = [];
		} else {
			throw new Error('LatLngBounds constructor has an invalid argument.');
		}
		for (var i = 0, len = latlngs.length; i < len; i++) {
			this.extend(latlngs[i]);
		}
	}
	
	// @method extend(latlng: LatLng): this
	// Extend the bounds to contain the given point

	// @alternative
	// @method extend(otherBounds: LatLngBounds): this
	// Extend the bounds to contain the given bounds
  /**
   * 扩展经纬度范围
   * @param {LatLng | LatLngBounds} obj - 经纬度或经纬度范围
   * @return {LatLngBounds} 返回经纬度范围
   */
	extend(obj: LatLng | LatLngBounds): LatLngBounds {
		let sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof LatLng) {
			sw2 = obj;
			ne2 = obj;

		} else {
			sw2 = obj._southWest;
			ne2 = obj._northEast;

			if (!sw2 || !ne2) { return this; }

		} 

		if (!sw && !ne) {
			this._southWest = new LatLng(sw2.lat, sw2.lng);
			this._northEast = new LatLng(ne2.lat, ne2.lng);
		} else {
			sw.lat = Math.min(sw2.lat, sw.lat);
			sw.lng = Math.min(sw2.lng, sw.lng);
			ne.lat = Math.max(ne2.lat, ne.lat);
			ne.lng = Math.max(ne2.lng, ne.lng);
		}

		return this;
	}

	// @method pad(bufferRatio: Number): LatLngBounds
	// Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
	// For example, a ratio of 0.5 extends the bounds by 50% in each direction.
	// Negative values will retract the bounds.
	/**
   * 缓冲经纬度范围
   * @param {number} bufferRatio - 缓冲比例
   * @return {LatLngBounds} 返回经纬度范围
   */
  pad(bufferRatio: number): LatLngBounds {
		let sw = this._southWest,
		    ne = this._northEast,
		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

		return new LatLngBounds(
		        new LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
		        new LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
	}

	// @method getCenter(): LatLng
	// Returns the center point of the bounds.
  /**
   * 中心点经纬度
   * @remark Returns the center point of the bounds.
   * @return {LatLng} 返回经纬度
   */
	getCenter(): LatLng {
		return new LatLng(
		        (this._southWest.lat + this._northEast.lat) / 2,
		        (this._southWest.lng + this._northEast.lng) / 2);
	}

	// @method getSouthWest(): LatLng
	// Returns the south-west point of the bounds.
  /**
   * 西南角经纬度
   * @remark Returns the south-west point of the bounds.
   * @return {LatLng} 返回经纬度
   */
	getSouthWest(): LatLng {
		return this._southWest;
	}

	// @method getNorthEast(): LatLng
	// Returns the north-east point of the bounds.
  /**
   * 东北角经纬度
   * @remark Returns the north-east point of the bounds.
   * @return {LatLng} 返回经纬度
   */
	getNorthEast(): LatLng {
		return this._northEast;
	}

	// @method getNorthWest(): LatLng
	// Returns the north-west point of the bounds.
  /**
   * 西北角经纬度
   * @remark Returns the north-west point of the bounds.
   * @return {LatLng} 返回经纬度
   */
	getNorthWest(): LatLng {
		return new LatLng(this.getNorth(), this.getWest());
	}

	// @method getSouthEast(): LatLng
	// Returns the south-east point of the bounds.
  /**
   * 东南角经纬度
   * @remark Returns the south-east point of the bounds.
   * @return {LatLng} 返回经纬度
   */
	getSouthEast(): LatLng {
		return new LatLng(this.getSouth(), this.getEast());
	}

	// @method getWest(): Number
	// Returns the west longitude of the bounds
  /**
   * 西边经度
   * @remark Returns the west longitude of the bounds
   * @return {number} 返回经度
   */
	getWest(): number {
		return this._southWest.lng;
	}

	// @method getSouth(): Number
	// Returns the south latitude of the bounds
  /**
   * 南边纬度
   * @remark Returns the south latitude of the bounds
   * @return {number} 返回纬度
   */
	getSouth(): number {
		return this._southWest.lat;
	}

	// @method getEast(): Number
	// Returns the east longitude of the bounds
  /**
   * 东边经度
   * @remark Returns the east longitude of the bounds
   * @return {number} 返回经度
   */
	getEast(): number {
		return this._northEast.lng;
	}

	// @method getNorth(): Number
	// Returns the north latitude of the bounds
  /**
   * 北边纬度
   * @remark Returns the north latitude of the bounds
   * @return {number} 返回纬度
   */
	getNorth(): number {
		return this._northEast.lat;
	}

	// @method contains(otherBounds: LatLngBounds): Boolean
	// Returns `true` if the rectangle contains the given one.

	// @alternative
	// @method contains (latlng: LatLng): Boolean
	// Returns `true` if the rectangle contains the given point.
  /**
   * 判断是否包含经纬度或经纬度范围
   * @param {LatLng | LatLngBounds} obj - 经纬度或经纬度范围
   * @return {boolean} 返回是否包含
   */
	contains(obj: LatLng | LatLngBounds): boolean { // (LatLngBounds) or (LatLng) -> Boolean
		let sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;
		if (obj instanceof LatLngBounds) {
			sw2 = obj.getSouthWest();
			ne2 = obj.getNorthEast();
		} else {
			sw2 = ne2 = obj;
		}

		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	}

	// @method intersects(otherBounds: LatLngBounds): Boolean
	// Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
	/**
   * 判断是否与另一经纬度范围有交叉
   * @param {LatLngBounds} obj - 经纬度范围
   * @return {boolean} 返回是否交叉
   */
  intersects(bounds: LatLngBounds): boolean {
		let sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

		return latIntersects && lngIntersects;
	}

	// @method overlaps(otherBounds: LatLngBounds): Boolean
	// Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
	/**
   * 判断是否与另一经纬度范围有叠盖
   * @param {LatLngBounds} obj - 经纬度范围
   * @return {boolean} 返回是否叠盖
   */
  overlaps(bounds: LatLngBounds): boolean {
		const sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat),
		    lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);

		return latOverlaps && lngOverlaps;
	}

	// @method toBBoxString(): String
	// Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
	/**
   * 输出字符串
   * @return {string} 返回字符串
   */
  toString(): string {
		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
	}

	// @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
	// Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
	/**
   * 判断经纬度范围是否相等（在一定容差内）
   * @param {LatLngBounds} bounds - 经纬度范围
   * @param {number} maxMargin - 容差
   * @return {boolean} 返回是否相等
   */
  equals(bounds: LatLngBounds, maxMargin: number = 1.0E-9): boolean {
		if (!bounds) { return false; }

		return this._southWest.equals(bounds.getSouthWest(), maxMargin) &&
		       this._northEast.equals(bounds.getNorthEast(), maxMargin);
	}

	// @method isValid(): Boolean
	// Returns `true` if the bounds are properly initialized.
  /**
   * 判断经纬度范围是否有效
   * @return {boolean} 返回是否有效
   */
	isValid(): boolean {
		return !!(this._southWest && this._northEast);
	}

}

