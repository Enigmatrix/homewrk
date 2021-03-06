export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export function post(url, body) {
    return fetch(url, {method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
    	body: JSON.stringify(body)});
};

export function get(qurl, params, token) {
    const esc = encodeURIComponent;
    const url = qurl + '?' + Object.keys(params)
			.filter(k => params[k] != undefined)
        	.map(k =>  esc(k) + '=' + esc(params[k]))
        	.join('&');
    console.log(url);
    return fetch(url, {method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
			'x-access-token': token}});
};

