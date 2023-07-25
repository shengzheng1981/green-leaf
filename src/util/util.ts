// @property lastId: Number
// Last unique ID used by [`stamp()`](#util-stamp)
export var lastId = 0;

// @function stamp(obj: Object): Number
// Returns the unique ID of an object, assigning it one if it doesn't have it.
export function stamp(obj) {
	/*eslint-disable */
	obj._leaflet_id = obj._leaflet_id || ++lastId;
	return obj._leaflet_id;
	/* eslint-enable */
}
// @function stamp(obj: Object): Number
// Returns the unique ID of an object, assigning it one if it doesn't have it.
// export function stamp(obj: any): string {
// 	/*eslint-disable */
// 	obj._leaflet_id = obj._leaflet_id || (new Date().getTime() / 1000 | 0).toString(16) + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
// 		return (Math.random() * 16 | 0).toString(16);
// 	}).toLowerCase();
// 	return obj._leaflet_id;
// 	/* eslint-enable */
// }

// @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
// Returns the number `num` modulo `range` in such a way so it lies within
// `range[0]` and `range[1]`. The returned value will be always smaller than
// `range[1]` unless `includeMax` is set to `true`.
export function wrapNum(x: number, range: any, includeMax: boolean = false) {
	var max = range[1],
	    min = range[0],
	    d = max - min;
	return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
}

// @function falseFn(): Function
// Returns a function which always returns `false`.
export function falseFn() { return false; }

// @function formatNum(num: Number, digits?: Number): Number
// Returns the number `num` rounded to `digits` decimals, or to 6 decimals by default.
export function formatNum(num: number, digits: number = 6) {
	const pow = Math.pow(10, digits);
	return Math.round(num * pow) / pow;
}

// @function trim(str: String): String
// Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
export function trim(str: string) {
	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

// @function splitWords(str: String): String[]
// Trims and splits the string on whitespace and returns the array of parts.
export function splitWords(str: string) {
	return trim(str).split(/\s+/);
}

// @function setOptions(obj: Object, options: Object): Object
// Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.
export function setOptions(obj: any, options: any) {
	if (!Object.prototype.hasOwnProperty.call(obj, 'options')) {
		obj.options = obj.options ? Object.create(obj.options) : {};
	}
	for (let i in options) {
		obj.options[i] = options[i];
	}
	return obj.options;
}

// @property emptyImageUrl: String
// Data URI string containing a base64-encoded empty GIF image.
// Used as a hack to free memory from unused images on WebKit-powered
// mobile devices (by setting image `src` to this string).
export var emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

function getPrefixed(name: string) {
	return (window as any)['webkit' + name] || (window as any)['moz' + name] || (window as any)['ms' + name];
}

export var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame');
export var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
		getPrefixed('CancelRequestAnimationFrame') || function (id: number) { window.clearTimeout(id); };

// @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
// Schedules `fn` to be executed when the browser repaints. `fn` is bound to
// `context` if given. When `immediate` is set, `fn` is called immediately if
// the browser doesn't have native support for
// [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
// otherwise it's delayed. Returns a request ID that can be used to cancel the request.
export function requestAnimFrame(fn: Function, context?: any, immediate?: boolean) {
	return requestFn.call(window, fn.bind(context));
}

// @function cancelAnimFrame(id: Number): undefined
// Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
export function cancelAnimFrame(id: number) {
	if (id) {
		cancelFn.call(window, id);
	}
}

// @function template(str: String, data: Object): String
// Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
// and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
// `('Hello foo, bar')`. You can also specify functions instead of strings for
// data values — they will be evaluated passing `data` as an argument.
export function template(str: string, data: Object) {
	return str.replace(/\{ *([\w_ -]+) *\}/g, function (str, key) {
		var value = data[key];

		if (value === undefined) {
			throw new Error('No value provided for variable ' + str);

		} else if (typeof value === 'function') {
			value = value(data);
		}
		return value;
	});
}