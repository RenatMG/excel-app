import {parse} from '@core/parse';
import {stylesFromCamelCase} from '@core/utils';
import {DEFAULT_STYLES} from '@/constants';

const CODES = {
	A: 65,
	Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, idx) {
	return `${(state.colState && state.colState[idx]) ? state.colState[idx] : DEFAULT_WIDTH}px`;
}

function getHeight(state, idx) {
	return `${(state.rowState && state.rowState[idx]) ? state.rowState[idx] : DEFAULT_HEIGHT}px`;
}

function toChar(_, idx) {
	return String.fromCharCode(CODES.A + idx);
}

function toCell(state, row) {
	return (_, col) => {
		const width = getWidth(state, col);
		const id = `${row}:${col}`;
		const content = state.dataState[id] || '';
		const styles = stylesFromCamelCase({
			...DEFAULT_STYLES,
			...state.stylesState[id],
		});
		return `<div class="cell" 
							 contenteditable
 							 data-col="${col}"
  							 data-type="cell"
  						     data-id="${id}"
  						     data-value="${content || ''}"
  						     style="${styles};width:${width}"
  						     > 
							${parse(content)}						     		
						</div>`;
	};
}

function toColumn(state) {
	return (content, idx) => {
		const width = getWidth(state, idx);
		return `<div class="column" 
 			     data-type="resizable"
 			     data-col="${idx}"
 			     style="width:${width}"
 			     >
				${content}
				<div class="col-resize" data-resize="col"></div>				
			</div>`;
	};
}

function createRow(state, content, idx = '') {
	const resize = idx ? '<div class="row-resize" data-resize="row"></div>' : '';
	const height = getHeight(state, idx);
	return `<div class="row" 
			 	 data-type="resizable"
				 data-row="${idx}"
				 style="height:${height}">
                <div class="row-info">
					${idx}
					${resize}				
				</div>
                <div class="row-data">${content}</div>
            </div>`;
}

export function createTable(rowsCount = 15, state = {}) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];

	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn(state))
		.join('');
	rows.push(createRow(state, cols));

	for (let row = 0; row < rowsCount; row++) {
		const dataCols = new Array(colsCount)
			.fill('')
			.map(toCell(state, row))
			.join('');
		rows.push(createRow(state, dataCols, row + 1));
	}
	return rows.join('');
}
