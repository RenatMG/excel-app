import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {DEFAULT_STYLES} from '@/constants';

export class Toolbar extends ExcelStateComponent {
	static className = 'excel__toolbar';

	constructor($root, options) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
			subscribe: ['currentStyles'],
			...options,
		});
	}

	prepare() {
		const state = {...this.store.getState()};
		const {currentCell} = state;
		const styles = state.stylesState[currentCell];
		this.initState({...DEFAULT_STYLES, ...styles});
	}

	storeChanged(changes) {
		this.setState(changes.currentStyles);
	}

	get template() {
		return createToolbar(this.state);
	}

	toHTML() {
		return this.template;
	}

	onClick(evt) {
		const $target = $(evt.target);
		if ($target.data.type === 'button') {
			const value = JSON.parse($target.data.value);
			this.$emit('toolbar:applyStyle', value);
		}
	}
}
