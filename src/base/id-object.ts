import { BaseObject } from "./base-object";

export abstract class IDObject extends BaseObject {
  static MAX_ID: number = 0;

  private _id: number;

  get id(): number {
    return this._id;
  }

  constructor() {
    super();
    this._create();
  }
  
  private _create() {
    // const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    // this._id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
    //     return (Math.random() * 16 | 0).toString(16);
    // }).toLowerCase();
    IDObject.MAX_ID += 1;
    this._id = IDObject.MAX_ID;
  }

  toString(): string {
    return this._id.toString();
  }

}