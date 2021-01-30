class Dom {
	constructor(selector) {
		// #app
		this.$el = typeof selector === 'string' ?
			document.querySelector(selector) : selector;
	}
	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html; // работает как setter
			return this; // возвращает this, чтобы работал метод clear
			// при цепочке событий
		}
		return this.$el.outerHTML.trim(); // работает как getter, если
		// не переданы параметры
	}

	text(text) {
		if (typeof text !== 'undefined') {
			this.$el.textContent = text;
			return this;
		}
		if (this.$el.tagName.toLowerCase() === 'input') {
			return this.$el.value.trim();
		}
		return this.$el.textContent.trim();
	}

	clear() {
		this.html('');
		return this; // аналогично для цепочки событий
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}

	// Реализуем полифил свой append
	append(node) {
		if (Element.prototype.append) {
			if (node instanceof Dom) {
				node = node.$el;
			}
			this.$el.append(node);
		} else {
			this.$el.appendChild(node);
		}
		return this;
	}

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	get data() {
		return this.$el.dataset;
	}
	// аналог наш querySelectorAll
	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}

	find(selector) {
		return $(this.$el.querySelector(selector));
	}

	css(styles = {}) {
		Object.keys(styles).forEach(key => this.$el.style[key] = styles[key]);
	}

	getStyles(styles = []) {
		return styles.reduce((res, s) => {
			res[s] = this.$el.style[s];
			return res;
		}, {});
	}

	id(parse) {
		if (parse) {
			// рекурсия
			const parsed = this.id().split(':');
			return {
				row: +parsed[0],
				col: +parsed[1]
			};
		}
		return this.data.id;
	}

	focus() {
		this.$el.focus();
		return this;
	}

	attr(name, value) {
		if (value) {
			this.$el.setAttribute(name, value);
			return this;
		}
		return this.$el.getAttribute(name);
	}

	addClass(className) {
		this.$el.classList.add(className);
		return this;
	}

	removeClass(className) {
		this.$el.classList.remove(className);
		return this;
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}
	return $(el);
};

