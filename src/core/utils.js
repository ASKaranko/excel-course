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

