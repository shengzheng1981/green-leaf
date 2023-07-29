import * as Util from '../util/util';
import { Earth } from '../crs/crs-earth';
import { LatLngBounds } from './latlng-bounds';

/* @class LatLng
 * @aka L.LatLng
 *
 * Represents a geographical point with a certain latitude and longitude.
 *
 * @example
 *
 * ```
 * var latlng = L.latLng(50.5, 30.5);
 * ```
 *
 * All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:
 *
 * ```
 * map.panTo([50, 30]);
 * map.panTo({lon: 30, lat: 50});
 * map.panTo({lat: 50, lng: 30});
 * map.panTo(L.latLng(50, 30));
 * ```
 *
 * Note that `LatLng` does not inherit from Leaflet's `Class` object,
 * which means new classes can't inherit from it, and new methods
 * can't be added to it with the `include` function.
 */

export class LatLng {
	public lat: number;
	public lng: number;
	public alt: number;

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
	equals(obj: LatLng, maxMargin: number = 1.0E-9): boolean {
		if (!obj) { return false; }
		const margin = Math.max(
		        Math.abs(this.lat - obj.lat),
		        Math.abs(this.lng - obj.lng));

		return margin <= maxMargin;
	}

	// @method toString(): String
	// Returns a string representation of the point (for debugging purposes).
	toString(precision: number = 6): string {
		return 'LatLng(' +
		        Util.formatNum(this.lat, precision) + ', ' +
		        Util.formatNum(this.lng, precision) + ')';
	}

	toGeoJSON(precision: number = 6) {
		return [Util.formatNum(this.lng, precision), Util.formatNum(this.lat, precision)];
	}

	// @method distanceTo(otherLatLng: LatLng): Number
	// Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
	distanceTo(other: LatLng): number {
		return new Earth().distance(this, other);
	}

	// @method wrap(): LatLng
	// Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
	wrap(): LatLng {
		return new Earth().wrapLatLng(this);
	}

	// @method toBounds(sizeInMeters: Number): LatLngBounds
	// Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
	toLatLngBounds(sizeInMeters: number): LatLngBounds {
		var latAccuracy = 180 * sizeInMeters / 40075017,
		    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

		return new LatLngBounds(
		        new LatLng(this.lat - latAccuracy, this.lng - lngAccuracy),
		        new LatLng(this.lat + latAccuracy, this.lng + lngAccuracy));
	}

	clone(): LatLng {
		return new LatLng(this.lat, this.lng, this.alt);
	}

}
