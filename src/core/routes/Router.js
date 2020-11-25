import {$} from '../dom';
import {ActiveRoute} from '../routes/ActiveRoute';
import {Loader} from '../../components/loader/Loader';

export class Router {
	constructor(selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided in Router');
		}
		this.routes = routes;
		this.$placeholder = $(selector);
		this.changePageHandler = this.changePageHandler.bind(this);
		this.page = null;
		this.loader = new Loader();
	}

	init() {
		window.addEventListener('hashchange', this.changePageHandler);
		this.changePageHandler();
	}

	destroy() {
		window.removeEventListener('hashchange', this.changePageHandler);
	}

	async changePageHandler() {
		this.$placeholder
			.clear()
			.append(this.loader);
		if (this.page) {
			this.page.destroy();
		}
		const Page = ActiveRoute.path.includes('excel')
			? this.routes.excel
			: this.routes.dashboard;
		this.page = new Page(ActiveRoute.param);
		const pageRoot = await this.page.getRoot();
		this.$placeholder
			.clear()
			.append(pageRoot);

		this.page.afterRender();
	}
}
