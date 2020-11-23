// pure functions

export function capitalize(string) {
	if (typeof string !== 'string') {
		return '';
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function storage(key, data, remove = false) {
	if (!data) {
		if (remove) {
			localStorage.removeItem(key);
		}
		return JSON.parse(localStorage.getItem(key));
	}
	localStorage.setItem(key, JSON.stringify(data));
	return true;
}

export function isEqual(a, b) {
	if (typeof a === 'object' && typeof b === 'object') {
		return JSON.stringify(a) === JSON.stringify(b);
	}
	return a === b;
}

export function camelToDashCase(camelCase) {
	return camelCase.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function stylesFromCamelCase(styles = {}) {
	return Object.keys(styles)
		.map((key) => `${camelToDashCase(key)}:${styles[key]}`)
		.join(';');
}

export function debounce(fn, wait) {
	let timeout;
	return (...args) => {
		const later = () => {
			clearTimeout(timeout);
			fn(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export function setCursorToEnd($el) {
	const [r, s] = [document.createRange(), window.getSelection()];
	r.selectNodeContents($el);
	r.collapse(false);
	s.removeAllRanges();
	s.addRange(r);
}

export function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}
