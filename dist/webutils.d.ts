/*!
 * WebUtils Library v1.0.0
 * Author: Khin Maung Win
 * License: MIT
 * Standalone utility library for all websites (TypeScript version)
 */
type EventHandler = EventListenerOrEventListenerObject;
declare const WebUtils: {
    $: (selector: string, all?: boolean) => Element | NodeListOf<Element> | null;
    addClass: (el: Element | Element[] | NodeListOf<Element> | null, className: string) => void;
    removeClass: (el: Element | Element[] | NodeListOf<Element> | null, className: string) => void;
    toggleClass: (el: Element | Element[] | NodeListOf<Element> | null, className: string) => void;
    on: (el: Element | Element[] | NodeListOf<Element> | null, event: string, handler: EventHandler) => void;
    off: (el: Element | Element[] | NodeListOf<Element> | null, event: string, handler: EventHandler) => void;
    getCookie: (name: string) => string | null;
    setCookie: (name: string, value: string, days?: number) => void;
    deleteCookie: (name: string) => void;
    getQueryParams: () => Record<string, string>;
    fetchJson: (url: string, options?: RequestInit) => Promise<any>;
    capitalize: (str: string) => string;
    truncate: (str: string, length?: number) => string;
    debounce: <T extends (...args: any[]) => any>(func: T, wait?: number) => (...args: Parameters<T>) => void;
    throttle: <T extends (...args: any[]) => any>(func: T, limit?: number) => (...args: Parameters<T>) => void;
    formatDate: (date: Date | string) => string;
    smoothScrollTo: (target: string | HTMLElement, offset?: number, duration?: number) => void;
    storageSet: (key: string, value: any) => void;
    storageGet: (key: string) => any;
    storageRemove: (key: string) => void;
};
export default WebUtils;
