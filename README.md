# Ajax Request

Create XMLHttpRequest using `ajax(url, options)` function similar to **$.ajax** in jQuery.

## What’s XMLHttpRequest?
XMLHttpRequest (or shortly, XHR) is an object which is used to interact with servers. It allows to us to retrieve data from URL without having to do a full page refresh. The most common usage of this object is in AJAX programming. XMLHttpRequest can be used to retrieve any type of data, not just XML.

## Installation

### Direct install

Example for how to load UMD module in browser:
```html
<script type="text/javascript" src="/path/to/ajax.js"></script>
```

### Example

```javascript
ajax('http://requexturl.ext', {
    method: 'GET',
    success: function (response) {
        console.log(response);
    },
    progress: function(ev) {
        console.log('loading', ev);
    },
    fail: function (code, message) {
        console.warn(code, message);
    },
    error: function (code, error) {
        console.error(code, error);
    }
});
```

Enjoy ;)
