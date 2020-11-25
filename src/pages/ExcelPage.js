import {Page} from '@core/page/Page';
import {createStore} from '@core/store/createStore';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {rootReducer} from '@/redux/rootReducer';
import {normalizeInitialState} from '@/redux/initialState';
import {StateProcessor} from '@core/page/StateProcessor';
import {LocalStorageClient} from '@/shared/LocalStorageClient';

export class ExcelPage extends Page {
	constructor(param) {
		super(param);
		this.storeSub = null;
		this.processor = new StateProcessor(
			new LocalStorageClient(this.params),
		);
	}

	async getRoot() {
		// const params = this.params ? this.params : Date.now().toString();
		// const tableName = storageName(params);
		// const localStorageState = storage(tableName);
		// const store = createStore(rootReducer, normalizeInitialState(localStorageState));

		// const stateListener = debounce((state) => {
		// 	storage(tableName, state);
		// 	if (process.env.NODE_ENV === 'development') {
		// 		console.log('APP STORE:', store.getState());
		// 	}
		// }, 300);

		// this.storeSub = store.subscribe(stateListener);
		const localStorageState = await this.processor.get();
		const store = createStore(rootReducer, normalizeInitialState(localStorageState));
		this.storeSub = store.subscribe(this.processor.listen);

		this.excel = new Excel({
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
		this.storeSub.unsubscribe();
	}
}
