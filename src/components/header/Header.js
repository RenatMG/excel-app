import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/redux/actions';
import {DEFAULT_TITLE} from '@/constants';
import {debounce, storage} from '@core/utils';
import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
			...options,
		});
	}

	prepare() {
		this.onInput = debounce(this.onInput, 300);
	}

	getTitle() {
		const {title} = this.store.getState();
		return title || DEFAULT_TITLE;
	}

	onInput = (evt) => {
		this.$dispatch(changeTitle(evt.target.value));
	}

	onClick(evt) {
		const $target = $(evt.target);
		if ($target.data.type === 'delete') {
			const decision = window.confirm('Are you sure?');
			if (decision) {
				storage(`excel:${ActiveRoute.param}`, null, true);
			}
		}
		ActiveRoute.navigate();
	}

	toHTML() {
		return `<input type="text" class="input" value="${this.getTitle()}" />
            <div>
                <div class="button" data-type="delete">
                    <span class="material-icons" data-type="delete">delete</span>
                </div>
                <div class="button" data-type="exit">
                    <span class="material-icons" data-type="exit">exit_to_app</span>
                </div>
            </div>`;
	}
}
