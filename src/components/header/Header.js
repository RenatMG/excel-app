import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/redux/actions';
import {DEFAULT_TITLE} from '@/constants';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
	static className = 'excel__header';

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input'],
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

	toHTML() {
		return `<input type="text" class="input" value="${this.getTitle()}" />
            <div>
                <div class="button">
                    <span class="material-icons">delete</span>
                </div>
                <div class="button">
                    <span class="material-icons">exit_to_app</span>
                </div>
            </div>`;
	}
}
