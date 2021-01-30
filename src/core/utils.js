// Pure Functions
export function capitalize(string) {
	if (typeof string !== 'string') {
		return '';
	}
	return string.charAt(0).toUpperCase() + string.substring(1);
}

export function range(start, end) {
	if (start > end) {
		// деструктуризация
		[end, start] = [start, end];
	}
	return new Array(end - start + 1)
		.fill('')
		.map((_, index) => start + index);
}

export function storage(key, data = null) {
	if (!data) {
		return JSON.parse(localStorage.getItem(key));
	}
	localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
	if (typeof a === 'object' && typeof b === 'object') {
		// это хак, чтобы не сравнивать рекурсивно ключи объектов
		// будет работать, если не использовать в store new Date, Map и другое
		return JSON.stringify(a) === JSON.stringify(b);
	}
	return a === b;
}

export function camelToDashCase(str) {
	return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
	return Object.keys(styles)
		.map(key => `${camelToDashCase(key)}: ${styles[key]}`)
		.join(';');
}

export function debounce(fn, wait) {
	let timeout;
	return function(...args) {
		const later = () => {
			clearTimeout(timeout);
			// fn(...args);
			// Чтобы сохранить контекст this, если в debounce
			// будет вызвана функция через this
			// eslint-disable-next-line no-invalid-this
			fn.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
