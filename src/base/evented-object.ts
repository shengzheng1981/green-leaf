import * as Util from '../util/util';
import { IDObject } from "./id-object";

export abstract class EventedObject extends IDObject { 

  private _events: any = {};
  private _eventParents: any = {};
  private _firingCount: number = 0;

  constructor() {
    super();
  }
  /* @method on(type: String, fn: Function, context?: Object): this
	 * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
	 *
	 * @alternative
	 * @method on(eventMap: Object): this
	 * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	 */
	on(types: any, fn?: any, context?: any) {

		// types can be a map of types/handlers
		if (typeof types === 'object') {
			for (let type in types) {
				// we don't process space-separated events here for performance;
				// it's a hot path since Layer uses the on(obj) syntax
				this._on(type, types[type], fn);
			}

		} else {
			// types can be a string of space-separated words
			types = Util.splitWords(types);

			for (let i = 0, len = types.length; i < len; i++) {
				this._on(types[i], fn, context);
			}
		}

		return this;
	}

	/* @method off(type: String, fn?: Function, context?: Object): this
	 * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
	 *
	 * @alternative
	 * @method off(eventMap: Object): this
	 * Removes a set of type/listener pairs.
	 *
	 * @alternative
	 * @method off: this
	 * Removes all listeners to all events on the object. This includes implicitly attached events.
	 */
	off(types: any, fn?: Function, context?: any) {

		if (!types) {
			// clear all listeners if called without arguments
			this._events = {};

		} else if (typeof types === 'object') {
			for (let type in types) {
				this._off(type, types[type], fn);
			}

		} else {
			types = Util.splitWords(types);

			for (let i = 0, len = types.length; i < len; i++) {
				this._off(types[i], fn, context);
			}
		}

		return this;
	}

	// attach listener (without syntactic sugar now)
	_on(type: string, fn: Function, context: any) {
		this._events = this._events || {};

		/* get/init listeners for type */
		let typeListeners = this._events[type];
		if (!typeListeners) {
			typeListeners = [];
			this._events[type] = typeListeners;
		}

		if (context === this) {
			// Less memory footprint.
			context = undefined;
		}
		let newListener = {fn: fn, ctx: context},
		    listeners = typeListeners;

		// check if fn already there
		for (let i = 0, len = listeners.length; i < len; i++) {
			if (listeners[i].fn === fn && listeners[i].ctx === context) {
				return;
			}
		}

		listeners.push(newListener);
	}

	_off(type: string, fn: Function, context: any) {
		let listeners,
		    i,
		    len;

		if (!this._events) { return; }

		listeners = this._events[type];

		if (!listeners) {
			return;
		}

		if (!fn) {
			// Set all removed listeners to noop so they are not called if remove happens in fire
			for (i = 0, len = listeners.length; i < len; i++) {
				listeners[i].fn = Util.falseFn;
			}
			// clear all listeners for a type if function isn't specified
			delete this._events[type];
			return;
		}

		if (context === this) {
			context = undefined;
		}

		if (listeners) {

			// find fn and remove it
			for (i = 0, len = listeners.length; i < len; i++) {
				var l = listeners[i];
				if (l.ctx !== context) { continue; }
				if (l.fn === fn) {

					// set the removed listener to noop so that's not called if remove happens in fire
					l.fn = Util.falseFn;

					if (this._firingCount) {
						/* copy array in case events are being fired */
						this._events[type] = listeners = listeners.slice();
					}
					listeners.splice(i, 1);

					return;
				}
			}
		}
	}

	// @method fire(type: String, data?: Object, propagate?: Boolean): this
	// Fires an event of the specified type. You can optionally provide a data
	// object — the first argument of the listener function will contain its
	// properties. The event can optionally be propagated to event parents.
	fire(type: string, data?: any, propagate?: boolean) {
		if (!this.listens(type, propagate)) { return this; }

		const event = Object.assign({}, data, {
			type: type,
			target: this,
			sourceTarget: data && data.sourceTarget || this
		});

		if (this._events) {
			let listeners = this._events[type];

			if (listeners) {
				this._firingCount = (this._firingCount + 1) || 1;
				for (let i = 0, len = listeners.length; i < len; i++) {
					let l = listeners[i];
					l.fn.call(l.ctx || this, event);
				}

				this._firingCount--;
			}
		}

		if (propagate) {
			// propagate the event to parents (set with addEventParent)
			this._propagateEvent(event);
		}

		return this;
	}

	// @method listens(type: String): Boolean
	// Returns `true` if a particular event type has any listeners attached to it.
	listens(type: string, propagate?: boolean) {
		var listeners = this._events && this._events[type];
		if (listeners && listeners.length) { return true; }

		if (propagate) {
			// also check parents for listeners if event propagates
			for (var id in this._eventParents) {
				if (this._eventParents[id].listens(type, propagate)) { return true; }
			}
		}
		return false;
	}

	// @method once(…): this
	// Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
	once(types: any, fn: Function, context?: any) {

		if (typeof types === 'object') {
			for (var type in types) {
				this.once(type, types[type], fn);
			}
			return this;
		}

		const handler = () => {
			this
			    .off(types, fn, context)
			    .off(types, handler, context);
		};

		// add a listener that's executed once and removed after that
		return this
		    .on(types, fn, context)
		    .on(types, handler, context);
	}

	// @method addEventParent(obj: Evented): this
	// Adds an event parent - an `Evented` that will receive propagated events
	addEventParent(obj: EventedObject) {
		this._eventParents = this._eventParents || {};
		this._eventParents[obj.id] = obj;
		return this;
	}

	// @method removeEventParent(obj: Evented): this
	// Removes an event parent, so it will stop receiving propagated events
	removeEventParent(obj: EventedObject) {
		if (this._eventParents) {
			delete this._eventParents[obj.id];
		}
		return this;
	}

	private _propagateEvent(e: any) {
		for (var id in this._eventParents) {
			this._eventParents[id].fire(e.type, Object.assign({
				layer: e.target,
				propagatedFrom: e.target
			}, e), true);
		}
	}


  // @method addEventListener(…): this
  // Alias to [`on(…)`](#evented-on)
  addEventListener(types: any, fn: Function, context: any) {
    this.on(types, fn, context);
  }


  // @method removeEventListener(…): this
  // Alias to [`off(…)`](#evented-off)
  removeEventListener(types: any, fn: Function, context: any) {
    this.off(types, fn, context);
  }
  // @method clearAllEventListeners(…): this
  // Alias to [`off()`](#evented-off)
  clearAllEventListeners(types: any, fn: Function, context: any) {
    this.off(types, fn, context);
  }
  
  // @method addOneTimeEventListener(…): this
  // Alias to [`once(…)`](#evented-once)
  addOneTimeEventListener(types: any, fn: Function, context: any) {
    this.once(types, fn, context);
  }
  // @method fireEvent(…): this
  // Alias to [`fire(…)`](#evented-fire)
  fireEvent(type: string, data: any, propagate: boolean) {
    this.fire(type, data, propagate);
  }
  // @method hasEventListeners(…): Boolean
  // Alias to [`listens(…)`](#evented-listens)
  hasEventListeners(type: string, propagate: boolean) {
    this.listens(type, propagate);
  }

}