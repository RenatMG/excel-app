import {Page} from '@core/Page';
import {createStore} from '@core/store/createStore';
import {debounce, storage} from '@core/utils';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {rootReducer} from '@/redux/rootReducer';
import {normalizeInitialState} from '@/redux/initialState';

function storageName(param) {
	return `excel:${param}`;
}

export class ExcelPage extends Page {
	getRoot() {
		const params = this.params ? this.params : Date.now().toString();
		const tableName = storageName(params);
		const localStorageState = storage(tableName);
		const store = createStore(rootReducer, normalizeInitialState(localStorageState));

		const stateListener = debounce((state) => {
			storage(tableName, state);
			if (process.env.NODE_ENV === 'development') {
				console.log('APP STORE:', store.getState());
			}
		}, 300);

		store.subscribe(stateListener);

		this.excel = new Excel({
			// добавление компонентов в приложение #app
			// добавление компонентов в приложение #app
			components: [Header, Toolbar, Formula, Table],
			store,
		});

		return this.excel.getRoot();
	}

	afterRender() {
		this.excel.init();
	}

	destroy() {
		this.excel.destroy();
	}
}
