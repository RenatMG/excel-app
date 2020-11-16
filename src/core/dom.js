class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector;
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.outerHTML.trim();
	}

	clear() {
		return this.html('');
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}

	append(node) {
		let element = node;
		if (node instanceof Dom) {
			element = node.$el;
		}

		if (Element.prototype.append) {
			this.$el.append(element);
		} else {
			this.$el.appendChild(element);
		}
		return this;
	}

	closest(selector) {
		return this.$el.closest(selector);
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}

	css(styles = {}) {
		Object.keys(styles).forEach((style) => {
			this.$el.style[style] = styles[style];
		});
	}

	get data() {
		return this.$el.dataset;
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes) {
		el.className = classes;
	}
	return $(el);
};
