import {$} from '@/core/dom';
import {parse} from '@core/parse';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {
	isCell, matrix,
	nextSelector, shouldResize,
} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import * as actions from '@/redux/actions';
import {DEFAULT_STYLES} from '@/constants';
import {setCursorToEnd} from '@core/utils';

export class Table extends ExcelComponent {
	// класс по умолчанию
	static className = 'excel__table';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			// все события компонента передаются в массив
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		});
	}

	prepare() {
		// вспомогательный класс TableSelection для организации выделения ячеек
		this.selection = new TableSelection();
	}

	init() {
		super.init();
		const {currentCell} = this.store.getState();
		const cellId = currentCell || '0:0';
		// при старте приложения выделеная ячейка
		const $cell = $(this.$root.find(`[data-id="${cellId}"]`));
		this.selectCell($cell);

		// событие ввода формулы
		this.$on('formula:input', (value) => {
			this.selection.current
				.attr('data-value', value)
				.text(parse(value));
			this.updateTextInStore(value);
		});

		// событие нажатия enter и tab в формуле
		this.$on('formula:done', () => {
			this.selection.current.focus();
		});

		// событие нажатие на иконку стилей
		this.$on('toolbar:applyStyle', (value) => {
			this.selection.applyStyle(value);
			this.$dispatch(actions.applyStyle({
				value, ids: this.selection.selectedIds,
			}));
		});
	}

	toHTML() {
		const state = {...this.store.getState()};
		return createTable(30, state);
	}

	// вспомогательный метод для выделения ячейки
	selectCell($cell) {
		this.selection.select($cell);
		this.$emit('table:select', $cell);
		const styles = $cell.getStyles(Object.keys(DEFAULT_STYLES));
		this.$dispatch(actions.changeStyles(styles));
		this.$dispatch(actions.setCurrentCell($cell.id()));

		setCursorToEnd($cell.$el);
	}

	async resizeTable(event) {
		try {
			const data = await resizeHandler(this.$root, event);
			this.$dispatch(actions.tableResize(data));
		} catch (e) {
			console.warn(e.message);
		}
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			this.resizeTable(event);
		} else if (isCell(event)) {
			const $target = $(event.target);
			if (event.shiftKey) {
				// если нажат shift можно выделить группу ячеек
				const $cells = matrix(this.selection.current, $target)
					.map((id) => $(this.$root.find(`[data-id="${id}"]`)));
				this.selection.selectGroup($cells);
			} else {
				// если одна ячейка
				this.selectCell($target);
			}
		}
	}

	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowRight',
			'ArrowLeft',
			'ArrowUp',
			'ArrowDown',
		];
		const {key} = event;
		// при нажатом shift курсор можно перемещать внутри ячейки
		// если нет, то перемещаемся по ячейкам
		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault();
			const id = this.selection.current.id(true);
			const $next = this.$root.find(nextSelector(key, id));
			if ($next) {
				this.selection.current.text(parse(this.selection.current.text()));
				this.selectCell($($next));
			}
		}
	}

	updateTextInStore(text = '') {
		this.selection.current.attr('data-value', this.selection.current.text());
		this.$dispatch(actions.changeText({
			value: text || this.selection.current.text(),
			id: this.selection.current.id(),
		}));
	}

	onInput(event) {
		// this.$emit('table:select', this.selection.current)
		this.updateTextInStore($(event.target).text());
	}
}
