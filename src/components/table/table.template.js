const CODES = {
	A: 65,
	Z: 90
};

// eslint-disable-next-line no-unused-vars
function toCell(cell) {
	return `
		<div class="cell" contenteditable>${cell}</div>
	`;
}

function toColumn(col) {
	return `
		<div class="column">${col}</div>
	`;
}

function createRow(content, index) {
	return `
	<div class="row">
		<div class="row-info">${index ? index : ''}</div>
		<div class="row-data">${content}</div>
	</div>
	`;
}
// _ placeholder используется, если параметр не используется
function toChar(_, index) {
	return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

	// Способ записи краткий без стрелочной ф-ии
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('');

	const cells = new Array(colsCount)
		.fill('')
		.map(toCell)
		.join('');

	rows.push(createRow(cols));
	for (let i = 0; i < rowsCount; i++) {
		rows.push(createRow(cells, i+1));
	}
	return rows.join('');
}
