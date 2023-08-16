import { Map } from "../map/map";
import { IDObject } from "./id-object";
/**
 * 可处理Map事件基类
 */
export class HandlerObject extends IDObject {
  protected _map: Map;
  protected _enabled: boolean = false;

  // @section There is static function which can be called without instantiating L.Handler:
  // @function addTo(map: Map, name: String): this
  // Adds a new Handler to the given map with the given name.
  // static addTo(map: Map, name: string) {
  //   map.addHandler(name, this);
  //   return this;
  // }

  constructor(map: Map) {
    super();
		this._map = map;
	}

	// @method enable(): this
	// Enables the handler
	enable() {
		if (this._enabled) { return this; }

		this._enabled = true;
		this.addHooks();
		return this;
	}

	// @method disable(): this
	// Disables the handler
	disable() {
		if (!this._enabled) { return this; }

		this._enabled = false;
		this.removeHooks();
		return this;
	}

	// @method enabled(): Boolean
	// Returns `true` if the handler is enabled
	enabled() {
		return !!this._enabled;
	}

  // @section Extension methods
	// Classes inheriting from `Handler` must implement the two following methods:
	// @method addHooks()
	// Called when the handler is enabled, should add event hooks.
	// @method removeHooks()
	// Called when the handler is disabled, should remove the event hooks added previously.

  addHooks() {

  }

  removeHooks() {

  }

}