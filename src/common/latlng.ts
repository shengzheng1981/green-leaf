import * as Util from '../util/util';
import { Earth } from '../crs/crs-earth';
import { LatLngBounds } from './latlng-bounds';

/**
 * 经纬度坐标
 */
export class LatLng {
  /**
   * 纬度
   */
	public lat: number;
  /**
   * 经度
   */
	public lng: number;
  /**
   * 海拔
   */
	public alt: number;
  /**
    * 构造函数
    * @param {number} lat - 纬度
    * @param {number} lng - 经度
    * @param {number} alt - 海拔
    */
	constructor(lat: number = 0, lng: number = 0, alt: number = 0) {
		// @property lat: Number
		// Latitude in degrees
		this.lat = lat;
	
		// @property lng: Number
		// Longitude in degrees
		this.lng = lng;
	
		// @property alt: Number
		// Altitude in meters (optional)
		this.alt = alt;
	}

	// @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
	// Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
	/**
   * 判断坐标是否相等（在一定容差内）
   * @param {LatLng} obj - 经纬度
   * @param {number} maxMargin - 容差
   * @return {boolean} 返回是否相等
   */
  equals(obj: LatLng, maxMargin: number = 1.0E-9): boolean {
		if (!obj) { return false; }
		const margin = Math.max(
		        Math.abs(this.lat - obj.lat),
		        Math.abs(this.lng - obj.lng));

		return margin <= maxMargin;
	}

	// @method toString(): String
	// Returns a string representation of the point (for debugging purposes).
  /**
   * 输出字符串
   * @param {number} precision - 保留精度
   * @return {string} 返回字符串
   */
	toString(precision: number = 6): string {
		return 'LatLng(' +
		        Util.formatNum(this.lat, precision) + ', ' +
		        Util.formatNum(this.lng, precision) + ')';
	}
  /**
   * 输出GeoJSON格式
   * @param {number} precision - 保留精度
   * @return {Object} 返回GeoJSON格式
   */
	toGeoJSON(precision: number = 6) {
		return [Util.formatNum(this.lng, precision), Util.formatNum(this.lat, precision)];
	}

	// @method distanceTo(otherLatLng: LatLng): Number
	// Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
	/**
   * 计算与另一点间球面距离
   * @param {LatLng} other - 另一点经纬度
   * @return {number} 返回距离
   */
  distanceTo(other: LatLng): number {
		return new Earth().distance(this, other);
	}

	// @method wrap(): LatLng
	// Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
	/**
   * 根据取值范围返回经纬度
   * @return {LatLng} 返回取值范围内的经纬度
   */
  wrap(): LatLng {
		return new Earth().wrapLatLng(this);
	}

	// @method toBounds(sizeInMeters: Number): LatLngBounds
	// Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
	/**
   * 根据实地距离返回经纬度范围
   * @param {number} sizeInMeters - 实地距离（米）
   * @return {LatLng} 返回经纬度范围
   */
  toLatLngBounds(sizeInMeters: number): LatLngBounds {
		var latAccuracy = 180 * sizeInMeters / 40075017,
		    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

		return new LatLngBounds(
		        new LatLng(this.lat - latAccuracy, this.lng - lngAccuracy),
		        new LatLng(this.lat + latAccuracy, this.lng + lngAccuracy));
	}
  /**
   * 克隆经纬度
   * @return {LatLng} 返回经纬度
   */
	clone(): LatLng {
		return new LatLng(this.lat, this.lng, this.alt);
	}

}
