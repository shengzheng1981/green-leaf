import * as Util from './util';
import * as Browser from './browser';
import * as DomEvent from './dom-event';
import { ScreenXY } from '../common/screen-xy';

/*
 * @namespace DomUtil
 *
 * Utility functions to work with the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
 * tree, used by Leaflet internally.
 *
 * Most functions expecting or returning a `HTMLElement` also work for
 * SVG elements. The only difference is that classes refer to CSS classes
 * in HTML and SVG classes in SVG.
 */


// @property TRANSFORM: String
// Vendor-prefixed transform style name (e.g. `'webkitTransform'` for WebKit).
export const TRANSFORM = testProp(
	['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

// webkitTransition comes first because some browser versions that drop vendor prefix don't do
// the same for the transitionend event, in particular the Android 4.1 stock browser

// @property TRANSITION: String
// Vendor-prefixed transition style name.
export const TRANSITION = testProp(
	['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

// @property TRANSITION_END: String
// Vendor-prefixed transitionend event name.
export const TRANSITION_END =
	TRANSITION === 'webkitTransition' || TRANSITION === 'OTransition' ? TRANSITION + 'End' : 'transitionend';


// @function get(id: String|HTMLElement): HTMLElement
// Returns an element given its DOM id, or returns the element itself
// if it was passed directly.
export function get(id: string|HTMLElement) {
	return typeof id === 'string' ? document.getElementById(id) : id;
}

// @function getStyle(el: HTMLElement, styleAttrib: String): String
// Returns the value for a certain style attribute on an element,
// including computed values or values set through CSS.
export function getStyle(el: any, style: string) {
	let value = el.style[style] || (el.currentStyle && el.currentStyle[style]);

	if ((!value || value === 'auto') && document.defaultView) {
		const css: any = document.defaultView.getComputedStyle(el, null);
		value = css ? css[style] : null;
	}
	return value === 'auto' ? null : value;
}

// @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
// Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
export function create(tagName: string, className?: string, container?: HTMLElement) {
	const el = document.createElement(tagName);
	el.className = className || '';

	if (container) {
		container.appendChild(el);
	}
	return el;
}

// @function remove(el: HTMLElement)
// Removes `el` from its parent element
export function remove(el: HTMLElement) {
	const parent = el.parentNode;
	if (parent) {
		parent.removeChild(el);
	}
}

// @function empty(el: HTMLElement)
// Removes all of `el`'s children elements from `el`
export function empty(el: HTMLElement) {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
}

// @function toFront(el: HTMLElement)
// Makes `el` the last child of its parent, so it renders in front of the other children.
export function toFront(el: HTMLElement) {
	const parent = el.parentNode;
	if (parent && parent.lastChild !== el) {
		parent.appendChild(el);
	}
}

// @function toBack(el: HTMLElement)
// Makes `el` the first child of its parent, so it renders behind the other children.
export function toBack(el: HTMLElement) {
	const parent = el.parentNode;
	if (parent && parent.firstChild !== el) {
		parent.insertBefore(el, parent.firstChild);
	}
}

// @function hasClass(el: HTMLElement, name: String): Boolean
// Returns `true` if the element's class attribute contains `name`.
export function hasClass(el: any, name: string) {
	if (el.classList !== undefined) {
		return el.classList.contains(name);
	}
	const className = getClass(el);
	return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
}

// @function addClass(el: HTMLElement, name: String)
// Adds `name` to the element's class attribute.
export function addClass(el: any, name: string) {
	if (el.classList !== undefined) {
		const classes = Util.splitWords(name);
		for (let i = 0, len = classes.length; i < len; i++) {
			el.classList.add(classes[i]);
		}
	} else if (!hasClass(el, name)) {
		const className = getClass(el);
		setClass(el, (className ? className + ' ' : '') + name);
	}
}

// @function removeClass(el: HTMLElement, name: String)
// Removes `name` from the element's class attribute.
export function removeClass(el: any, name: string) {
	if (el.classList !== undefined) {
		el.classList.remove(name);
	} else {
		setClass(el, Util.trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
	}
}

// @function setClass(el: HTMLElement, name: String)
// Sets the element's class.
export function setClass(el: any, name: string) {
	if (el.className.baseVal === undefined) {
		el.className = name;
	} else {
		// in case of SVG element
		el.className.baseVal = name;
	}
}

// @function getClass(el: HTMLElement): String
// Returns the element's class.
export function getClass(el: any) {
	// Check if the element is an SVGElementInstance and use the correspondingElement instead
	// (Required for linked SVG elements in IE11.)
	if (el.correspondingElement) {
		el = el.correspondingElement;
	}
	return el.className.baseVal === undefined ? el.className : el.className.baseVal;
}

// @function setOpacity(el: HTMLElement, opacity: Number)
// Set the opacity of an element (including old IE support).
// `opacity` must be a number from `0` to `1`.
export function setOpacity(el: HTMLElement, value: number) {
	el.style.opacity = value.toString();
}

// @function testProp(props: String[]): String|false
// Goes through the array of style names and returns the first name
// that is a valid style name for an element. If no such name is found,
// it returns false. Useful for vendor-prefixed styles like `transform`.
export function testProp(props: string[]) {
	const style = document.documentElement.style;

	for (let i = 0; i < props.length; i++) {
		if (props[i] in style) {
			return props[i];
		}
	}
	return false;
}

// @function setTransform(el: HTMLElement, offset: ScreenXY, scale?: Number)
// Resets the 3D CSS transform of `el` so it is translated by `offset` pixels
// and optionally scaled by `scale`. Does not have an effect if the
// browser doesn't support 3D CSS transforms.
export function setTransform(el: HTMLElement, offset: ScreenXY, scale?: number) {
	const pos = offset || new ScreenXY(0, 0);
	if (TRANSFORM) {
		(el as any).style[TRANSFORM as string] =
		(Browser.ie3d ?
			'translate(' + pos.x + 'px,' + pos.y + 'px)' :
			'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
		(scale ? ' scale(' + scale + ')' : '');
	}
}

// @function setPosition(el: HTMLElement, position: ScreenXY)
// Sets the position of `el` to coordinates specified by `position`,
// using CSS translate or top/left positioning depending on the browser
// (used by Leaflet internally to position its layers).
export function setPosition(el: HTMLElement, position: ScreenXY) {

	/*eslint-disable */
	(el as any)._leaflet_pos = position;
	/* eslint-enable */

	if (Browser.any3d) {
		setTransform(el, position);
	} else {
		el.style.left = position.x + 'px';
		el.style.top = position.y + 'px';
	}
}

// @function getPosition(el: HTMLElement): ScreenXY
// Returns the coordinates of an element previously positioned with setPosition.
export function getPosition(el: HTMLElement): ScreenXY {
	// this method is only used for elements previously positioned using setPosition,
	// so it's safe to cache the position for performance

	return (el as any)._leaflet_pos || new ScreenXY(0, 0);
}

// @function getSizedParentNode(el: HTMLElement): HTMLElement
// Finds the closest parent node which size (width and height) is not null.
export function getSizedParentNode(element: HTMLElement) {
	do {
		element = element.parentNode as HTMLElement;
	} while ((!element.offsetWidth || !element.offsetHeight) && element !== document.body);
	return element;
}

// @function getScale(el: HTMLElement): Object
// Computes the CSS scale currently applied on the element.
// Returns an object with `x` and `y` members as horizontal and vertical scales respectively,
// and `boundingClientRect` as the result of [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).
export function getScale(element: HTMLElement) {
	const rect = element.getBoundingClientRect(); // Read-only in old browsers.

	return {
		x: rect.width / element.offsetWidth || 1,
		y: rect.height / element.offsetHeight || 1,
		boundingClientRect: rect
	};
}
