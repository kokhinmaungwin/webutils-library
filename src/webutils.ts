/*!
 * WebUtils Library v1.0.1
 * Author: Khin Maung Win
 * License: MIT
 * Standalone utility library for all websites (TypeScript version)
 */

type EventHandler = EventListenerOrEventListenerObject;

const WebUtils = {
  // Select element(s) by CSS selector
  $: (selector: string, all: boolean = false): Element | NodeListOf<Element> | null => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
  },

  // Add class to element(s)
  addClass: (el: Element | Element[] | NodeListOf<Element> | null, className: string): void => {
    if (!el) return;
    if (NodeList.prototype.isPrototypeOf(el) || Array.isArray(el)) {
      el.forEach(e => e.classList.add(className));
    } else {
      el.classList.add(className);
    }
  },

  // Remove class from element(s)
  removeClass: (el: Element | Element[] | NodeListOf<Element> | null, className: string): void => {
    if (!el) return;
    if (NodeList.prototype.isPrototypeOf(el) || Array.isArray(el)) {
      el.forEach(e => e.classList.remove(className));
    } else {
      el.classList.remove(className);
    }
  },

  // Toggle class
  toggleClass: (el: Element | Element[] | NodeListOf<Element> | null, className: string): void => {
    if (!el) return;
    if (NodeList.prototype.isPrototypeOf(el) || Array.isArray(el)) {
      el.forEach(e => e.classList.toggle(className));
    } else {
      el.classList.toggle(className);
    }
  },

  // Attach event listener
  on: (el: Element | Element[] | NodeListOf<Element> | null, event: string, handler: EventHandler): void => {
    if (!el) return;
    if (NodeList.prototype.isPrototypeOf(el) || Array.isArray(el)) {
      el.forEach(e => e.addEventListener(event, handler));
    } else {
      el.addEventListener(event, handler);
    }
  },

  // Detach event listener
  off: (el: Element | Element[] | NodeListOf<Element> | null, event: string, handler: EventHandler): void => {
    if (!el) return;
    if (NodeList.prototype.isPrototypeOf(el) || Array.isArray(el)) {
      el.forEach(e => e.removeEventListener(event, handler));
    } else {
      el.removeEventListener(event, handler);
    }
  },

  // Get cookie by name
  getCookie: (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  },

  // Set cookie
  setCookie: (name: string, value: string, days: number = 7): void => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  },

  // Delete cookie
  deleteCookie: (name: string): void => {
    document.cookie = name + '=; Max-Age=0; path=/';
  },

  // Get URL query params as object
  getQueryParams: (): Record<string, string> => {
    return Object.fromEntries(new URLSearchParams(window.location.search));
  },

  // Simple fetch JSON wrapper (GET only)
  fetchJson: async (url: string, options: RequestInit = {}): Promise<any> => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("fetchJson error:", err);
      throw err;
    }
  },

  // Capitalize first letter of string
  capitalize: (str: string): string => {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  // Truncate string to length with ellipsis
  truncate: (str: string, length: number = 100): string => {
    if (typeof str !== 'string') return '';
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
  },

  // Debounce function for optimizing frequent calls
  debounce: function <T extends (...args: any[]) => any>(func: T, wait: number = 300): (...args: Parameters<T>) => void {
    let timeout: number | undefined;
    return function(this: any, ...args: Parameters<T>) {
      if (timeout) clearTimeout(timeout);
      timeout = window.setTimeout(() => func.apply(this, args), wait);
    };
  },

  // Throttle function to limit calls per interval
  throttle: function <T extends (...args: any[]) => any>(func: T, limit: number = 300): (...args: Parameters<T>) => void {
    let inThrottle = false;
    return function(this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Format date to YYYY-MM-DD
  formatDate: (date: Date | string): string => {
    if (!(date instanceof Date)) date = new Date(date);
    const yyyy = date.getFullYear();
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);
    return `${yyyy}-${mm}-${dd}`;
  },

  // Smooth scroll to element by selector or element reference
  smoothScrollTo: (target: string | HTMLElement, offset: number = 0, duration: number = 500): void => {
    let element: HTMLElement | null;
    if (typeof target === 'string') {
      element = document.querySelector(target);
    } else if (target instanceof HTMLElement) {
      element = target;
    } else {
      console.warn("smoothScrollTo: Invalid target");
      return;
    }
    if (!element) return;

    const start = window.pageYOffset;
    const end = element.getBoundingClientRect().top + start - offset;
    const distance = end - start;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (!startTime) startTime = currentTime;
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
  storageSet: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn("storageSet error:", e);
    }
  },

  // Simple localStorage get item with JSON parse
  storageGet: (key: string): any => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.warn("storageGet error:", e);
      return null;
    }
  },

  // Simple localStorage remove item
  storageRemove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("storageRemove error:", e);
    }
  }
};

export default WebUtils;
