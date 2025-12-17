# WebUtils Library

**Version:** 1.0.1  
**Author:** Khin Maung Win  
**License:** MIT

Standalone utility library for all websites.  
Provides handy helper functions for DOM manipulation, cookies, localStorage, events, and more.

---

## Features

- DOM selectors and class management
- Event listener helpers
- Cookie get/set/delete
- URL query parameters parser
- Fetch JSON wrapper (GET)
- String utilities: capitalize, truncate
- Debounce and throttle functions
- Date formatting
- Smooth scrolling
- LocalStorage helpers

---

## Usage

Include in your project:

```html
<script src="webutils.js"></script>
```
Or import as a module (Node.js / bundler):
```js
const WebUtils = require('./webutils');
```

---

## Examples
```js
// Select one element
const header = WebUtils.$('header');

// Add class
WebUtils.addClass(header, 'active');

// Get URL query parameters
const params = WebUtils.getQueryParams();

// Fetch JSON data
WebUtils.fetchJson('/api/data').then(data => console.log(data));
```
API Reference

See the source code comments for detailed API descriptions.

---

## License

MIT © Khin Maung Win

---
