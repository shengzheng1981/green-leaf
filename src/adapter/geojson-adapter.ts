import { LatLng } from "../common/latlng";
import { Feature } from "../feature/feature";
import { GeometryType } from "../geometry/geometry";
import { MultiplePoint } from "../geometry/multiple-point";
import { MultiplePolygon } from "../geometry/multiple-polygon";
import { MultiplePolyline } from "../geometry/multiple-polyline";
import { Point } from "../geometry/point";
import { Polygon } from "../geometry/polygon";
import { Polyline } from "../geometry/polyline";
import { Adapter } from "./adapter";

export class GeoJSONAdapter extends Adapter {
  private _url: string;
  constructor(type: GeometryType, url: string) {
    super(type);
    this._url = url;
  }

  async fetch(): Promise<Feature[]> {
    const response = await fetch(this._url);
    const data = await response.json();
    const features: Feature[] = [];
    Array.isArray(data.features) && data.features.forEach(item => {
      switch (item.geometry.type) {
        case "Point":
          if (this._type == GeometryType.Point) {
            //TODO: each feature has one type that is ridiculous, cause geojson is a featurecollection, not a featurelayer.
            // this._type = GeometryType.Point;
            const point = new Point(new LatLng(item.geometry.coordinates[1], item.geometry.coordinates[0]));
            features.push(new Feature(point, item.properties));
          }
          break;
        case "LineString":
          if (this._type = GeometryType.Polyline) {
            const polyline = new Polyline(item.geometry.coordinates.map(latlng => {
              return new LatLng(latlng[1], latlng[0])
            }));
            features.push(new Feature(polyline, item.properties));
          }
          break;
        case "Polygon":
          if (this._type = GeometryType.Polygon) {
            const polygon = new Polygon(item.geometry.coordinates.map(ring => {
              return ring.map(latlng => {
                return new LatLng(latlng[1], latlng[0])
              })
            }));
            features.push(new Feature(polygon, item.properties));
          }
          break;
        case "MultiPoint":
          if (this._type == GeometryType.Point) {
            const multipoint = new MultiplePoint(item.geometry.coordinates.map(latlng => {
              return new LatLng(latlng[1], latlng[0])
            }));
            features.push(new Feature(multipoint, item.properties));
          }
          break;
        case "MultiLineString":
          if (this._type = GeometryType.Polyline) {
            const multipolyline = new MultiplePolyline(item.geometry.coordinates.map(polyline => {
              return polyline.map(latlng => {
                return new LatLng(latlng[1], latlng[0])
              })
            }));
            features.push(new Feature(multipolyline, item.properties));
          }
          break;
        case "MultiPolygon":
          if (this._type = GeometryType.Polygon) {
            const multipolygon = new MultiplePolygon(item.geometry.coordinates.map(polygon => {
              return polygon.map(ring => {
                return ring.map(latlng => {
                  return new LatLng(latlng[1], latlng[0])
                })
              })
            }));
            features.push(new Feature(multipolygon, item.properties));
          }
          break;
      }
    });
    return features;
  }
}