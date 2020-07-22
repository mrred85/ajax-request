/**
 * Ajax Request v1.1
 *
 * @function
 * @param {string} url
 * @param {Object=} options
 * @param {string} [options.method=GET] options.method - GET, POST, PUT, PATCH, DELETE
 * @param {string} [options.type='text'] options.type - text, arraybuffer, blob, document, json
 * @param {number} [options.timeout=0] options.timeout - in milliseconds
 * @param {string|Object} [options.data] - The data to be sent.
 * @param {boolean} [options.async=true] options.async
 * @param {Object} [options.headers] - Adds HTTP headers to the request.
 * @param {function(number)=} options.getState - Get readyState property value.
 * @param {function(ProgressEvent<EventTarget>)=} options.progress - The function is called periodically
 *        with information when an XMLHttpRequest before success completely.
 * @param {function(any)=} options.success - The function is called when an XMLHttpRequest transaction
 *        completes successfully.
 * @param {function(number, string)=} options.fail - The function is called when an XMLHttpRequest transaction
 *        does not complete successfully.
 * @param {function(number, string)=} options.error - The function is called when an XMLHttpRequest transaction
 *        fails due to an error.
 * @return {void}
 */
function ajax(url, options) {
    let method = typeof options.method !== 'undefined' ? options.method.toUpperCase() : 'GET',
        type = typeof options.type !== 'undefined' ? options.type : '',
        timeout = typeof options.timeout !== 'undefined' ? options.timeout : 0,
        data = typeof options.data !== 'undefined' ? options.data : null,
        headers = typeof options.headers !== 'undefined' ? options.headers : null,
        async = typeof options.async !== 'undefined' ? options.async : true,
        queryString = null,
        requestHeaders = {'X-Requested-With': 'XMLHttpRequest'};

    if (data) {
        if (typeof data === 'object') {
            let result = [];
            for (let d in data) {
                result.push(encodeURI(d) + '=' + encodeURIComponent(data[d]));
            }
            if (result.length) {
                queryString = result.join('&');
            }
        } else {
            queryString = data.toString();
        }
    }
    if (typeof headers === 'object') {
        for (let header in headers) {
            if (headers[header]) {
                requestHeaders[header] = headers[header];
            }
        }
    }
    if (method === 'POST') {
        requestHeaders['Content-type'] = 'application/x-www-form-urlencoded';
    } else {
        if (queryString) {
            url = url + '?' + queryString;
        }
    }

    const xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.responseType = type;
    xhr.timeout = timeout;
    xhr.onreadystatechange = function () {
        /* READY STATE
         * 0 - UNSENT - request not initialized
         * 1 - OPENED - server connection established, open called
         * 2 - HEADERS_RECEIVED - request received, response headers received
         * 3 - LOADING - processing request, response is loading (a data packed is received)
         * 4 - DONE - request finished and response is ready, complete
         */
        if (typeof options.getState !== 'undefined') {
            options.getState(xhr.readyState);
        }
    };
    for (let requestHeader in requestHeaders) {
        xhr.setRequestHeader(requestHeader, requestHeaders[requestHeader]);
    }
    xhr.send(queryString);
    xhr.onload = function () {
        /* STATUS
         * 100 - 199: means information message
         * 200 - 299: then it is correct and
         * 300 - 399: then exists a redirect
         * 400 - 499: this is a client error (Ex: 404 page not found)
         * 500 - 599: the server had an error
         * @see https://www.w3schools.com/tags/ref_httpmessages.asp
         */
        if (xhr.status >= 200 && xhr.status <= 299) {
            if (typeof options.success !== 'undefined') {
                options.success(xhr.response);
            }
        } else {
            if (typeof options.fail !== 'undefined') {
                options.fail(xhr.status, xhr.statusText);
            }
        }
    };
    xhr.onprogress = function (ev) {
        if  (typeof options.progress !== 'undefined') {
            options.progress(ev);
        }
    };
    xhr.onerror = function () {
        if (typeof options.error !== 'undefined') {
            options.error(xhr.status, xhr.statusText);
        }
    };
}
