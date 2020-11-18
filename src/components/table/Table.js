import {$} from '@/core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {
	isCell, matrix,
	nextSelector, shouldResize,
} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		});
	}

	prepare() {
		this.selector = new TableSelection();
	}

	init() {
		super.init();
		const $cell = $(this.$root.find('[data-id="0:0"]'));
		this.selectCell($cell);

		this.$on('formula:input', (text) => {
			this.selector.current.text(text);
		});

		this.$on('formula:done', () => {
			this.selector.current.focus();
		});
	}

	toHTML() {
		return createTable(20);
	}

	selectCell($cell) {
		this.selector.select($cell);
		this.$emit('table:select', $cell);
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event);
		} else if (isCell(event)) {
			const $target = $(event.target);
			if (event.shiftKey) {
				const $cells = matrix(this.selector.current, $target)
					.map((id) => $(this.$root.find(`[data-id="${id}"]`)));
				this.selector.selectGroup($cells);
			} else {
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
		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault();
			const id = this.selector.current.id(true);
			const $next = this.$root.find(nextSelector(key, id));
			if ($next) {
				this.selector.select($($next));
				this.$emit('table:select', $($next));
			}
		}
	}

	onInput() {
		this.$emit('table:select', this.selector.current);
	}
}
