import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			...options,
		});
	}

	toHTML() {
		return ` <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false" data-id="formula"></div>`;
	}

	init() {
		super.init();
		const input = $(this.$root.find('[data-id="formula"]'));
		this.$on('table:select', ($el) => {
			const value = $el.text();
			input.text(value);
		});
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
