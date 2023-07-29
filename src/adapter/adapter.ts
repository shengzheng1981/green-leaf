import { Feature } from "../feature/feature";
import { GeometryType } from "../geometry/geometry";

export abstract class Adapter {
  protected _type: GeometryType;
  get type(): GeometryType {
    return this._type;
  }

  constructor(type: GeometryType) {
    this._type = type;
  }

  abstract fetch(): Promise<Feature[]>; 
}