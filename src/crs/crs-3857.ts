import { Earth } from './crs-earth';
import { SphericalMercator } from './projection/projection-spherical-mercator';
import { Transformation } from './transformation/transformation';

/*
 * @namespace CRS
 * @crs L.CRS.EPSG3857
 *
 * The most common CRS for online maps, used by almost all free and commercial
 * tile providers. Uses Spherical Mercator projection. Set in by default in
 * Map's `crs` option.
 */

export class EPSG3857 extends Earth {
	code: string = 'EPSG:3857';
	projection: SphericalMercator = new SphericalMercator();
	transformation: Transformation = new Transformation((0.5 / (Math.PI * SphericalMercator.R)), 0.5, (-0.5 / (Math.PI * SphericalMercator.R)), 0.5);

}

