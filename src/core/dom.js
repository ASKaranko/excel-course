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

