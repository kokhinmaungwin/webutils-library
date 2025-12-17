/*!
 * WebUtils Library v1.0.0
 * Author: Khin Maung Win
 * License: MIT
 * Standalone utility library for all websites (TypeScript version)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const WebUtils = {
    // Select element(s) by CSS selector
    $: (selector, all = false) => {
        return all ? document.querySelectorAll(selector) : document.querySelector(selector);
    },
    // Add class to element(s)
    addClass: (el, className) => {
        if (!el)
            return;
        if (NodeList.prototype.isPrototypeOf(el) || Array.isArray(el)) {
            el.forEach(e => e.classList.add(className));
        }
        else {
            el.classList.add(className);
        }
    },
    // Remove class from element(s)
    removeClass: (el, className) => {
        if (!el)
            return;
        if (NodeList.prototype.isPrototypeOf(el) || Array.isArray(el)) {
            el.forEach(e => e.classList.remove(className));
        }
        else {
            el.classList.remove(className);
        }
    },
    // Toggle class
    toggleClass: (el, className) => {
        if (!el)
            return;
        if (NodeList.prototype.isPrototypeOf(el) || Array.isArray(el)) {
            el.forEach(e => e.classList.toggle(className));
        }
        else {
            el.classList.toggle(className);
        }
    },
    // Attach event listener
    on: (el, event, handler) => {
        if (!el)
            return;
        if (NodeList.prototype.isPrototypeOf(el) || Array.isArray(el)) {
            el.forEach(e => e.addEventListener(event, handler));
        }
        else {
            el.addEventListener(event, handler);
        }
    },
    // Detach event listener
    off: (el, event, handler) => {
        if (!el)
            return;
        if (NodeList.prototype.isPrototypeOf(el) || Array.isArray(el)) {
            el.forEach(e => e.removeEventListener(event, handler));
        }
        else {
            el.removeEventListener(event, handler);
        }
    },
    // Get cookie by name
    getCookie: (name) => {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    },
    // Set cookie
    setCookie: (name, value, days = 7) => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    },
    // Delete cookie
    deleteCookie: (name) => {
        document.cookie = name + '=; Max-Age=0; path=/';
    },
    // Get URL query params as object
    getQueryParams: () => {
        return Object.fromEntries(new URLSearchParams(window.location.search));
    },
    // Simple fetch JSON wrapper (GET only)
    fetchJson: (url_1, ...args_1) => __awaiter(void 0, [url_1, ...args_1], void 0, function* (url, options = {}) {
        try {
            const res = yield fetch(url, options);
            if (!res.ok)
                throw new Error(`HTTP error! Status: ${res.status}`);
            return yield res.json();
        }
        catch (err) {
            console.error("fetchJson error:", err);
            throw err;
        }
    }),
    // Capitalize first letter of string
    capitalize: (str) => {
        if (typeof str !== 'string')
            return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    // Truncate string to length with ellipsis
    truncate: (str, length = 100) => {
        if (typeof str !== 'string')
            return '';
        if (str.length <= length)
            return str;
        return str.slice(0, length) + '...';
    },
    // Debounce function for optimizing frequent calls
    debounce: function (func, wait = 300) {
        let timeout;
        return function (...args) {
            if (timeout)
                clearTimeout(timeout);
            timeout = window.setTimeout(() => func.apply(this, args), wait);
        };
    },
    // Throttle function to limit calls per interval
    throttle: function (func, limit = 300) {
        let inThrottle = false;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    },
    // Format date to YYYY-MM-DD
    formatDate: (date) => {
        if (!(date instanceof Date))
            date = new Date(date);
        const yyyy = date.getFullYear();
        const mm = ('0' + (date.getMonth() + 1)).slice(-2);
        const dd = ('0' + date.getDate()).slice(-2);
        return `${yyyy}-${mm}-${dd}`;
    },
    // Smooth scroll to element by selector or element reference
    smoothScrollTo: (target, offset = 0, duration = 500) => {
        let element;
        if (typeof target === 'string') {
            element = document.querySelector(target);
        }
        else if (target instanceof HTMLElement) {
            element = target;
        }
        else {
            console.warn("smoothScrollTo: Invalid target");
            return;
        }
        if (!element)
            return;
        const start = window.pageYOffset;
        const end = element.getBoundingClientRect().top + start - offset;
        const distance = end - start;
        let startTime = null;
        function animation(currentTime) {
            if (!startTime)
                startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            window.scrollTo(0, start + distance * progress);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        requestAnimationFrame(animation);
    },
    // Simple localStorage set item with JSON support
    storageSet: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (e) {
            console.warn("storageSet error:", e);
        }
    },
    // Simple localStorage get item with JSON parse
    storageGet: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
        catch (e) {
            console.warn("storageGet error:", e);
            return null;
        }
    },
    // Simple localStorage remove item
    storageRemove: (key) => {
        try {
            localStorage.removeItem(key);
        }
        catch (e) {
            console.warn("storageRemove error:", e);
        }
    }
};
export default WebUtils;
//# sourceMappingURL=webutils.js.map