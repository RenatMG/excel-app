export function shouldResize(event) {
	return event.target.dataset.resize;
}

export function isCell(event) {
	return event.target.dataset.type === 'cell';
}

export function range(start, end) {
	const [startCol, endCol] = start > end ? [end, start] : [start, end];
	return new Array(endCol - startCol + 1)
		.fill('')
		.map((_, idx) => startCol + idx);
}

export function matrix($current, $target) {
	const current = $current.id(true);
	const target = $target.id(true);
	const cols = range(current.col, target.col);
	const rows = range(current.row, target.row);

	return cols.reduce((acc, col) => {
		rows.forEach((row) => {
			acc.push(`${row}:${col}`);
		});
		return acc;
	}, []);
}

export function nextSelector(key, {col, row}) {
	function wrap(id) {
		return `[data-id="${id}"]`;
	}

	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			return wrap(`${row + 1}:${col}`);
		case 'Tab':
		case 'ArrowRight':
			return wrap(`${row}:${col + 1}`);
		case 'ArrowUp':
			return wrap(`${row - 1}:${col}`);
		case 'ArrowLeft':
			return wrap(`${row}:${col - 1}`);
		default:
			return wrap(`${row}:${col}`);
	}
}
