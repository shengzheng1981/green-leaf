import { BaseObject } from "./base-object";

export abstract class OptionsObject extends BaseObject {

  constructor() {
    super();
  }
  
  assign(options: Object) {
    if (options !== undefined) {
      for (let key in options) {
        if(this.hasOwnProperty(key)){
          this[key] = options[key];
        }
      }
    }
  }
 
}