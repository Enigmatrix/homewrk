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
