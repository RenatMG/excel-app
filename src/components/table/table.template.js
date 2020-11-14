const CODES = {
	A: 65,
	Z: 90,
};

function toCell() {
	return '<div class="cell" contenteditable></div>';
}

function toColumn(content) {
	return `<div class="column">${content}</div>`;
}

function createRow(content, idx = '') {
	return `<div class="row">
                <div class="row-info">${idx}</div>
                <div class="row-data">${content}</div>
            </div>`;
}

function toChar(_, idx) {
	return String.fromCharCode(CODES.A + idx);
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('');
	rows.push(createRow(cols));

	for (let i = 0; i < rowsCount; i++) {
		const dataCols = new Array(colsCount)
			.fill('')
			.map(toCell)
			.join('');
		rows.push(createRow(dataCols, i + 1));
	}
	return rows.join('');
}
