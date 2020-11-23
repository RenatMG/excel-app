import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			subscribe: ['currentText'],
			...options,
		});
	}

	toHTML() {
		return ` <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false" data-id="formula"></div>`;
	}

	init() {
		super.init();
		this.$formula = $(this.$root.find('[data-id="formula"]'));
		this.$on('table:select', ($el) => {
			this.$formula.text($el.data.value);
		});
	}

	storeChanged({currentText}) {
		this.$formula.text(currentText);
	}

	onInput(event) {
		this.$emit('formula:input', $(event.target).text());
	}

	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab',
		];
		if (keys.includes(event.key)) {
			event.preventDefault();
			this.$emit('formula:done');
		}
	}
}
