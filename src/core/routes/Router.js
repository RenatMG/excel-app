import {$} from '../dom';
import {ActiveRoute} from '../routes/ActiveRoute';

export class Router {
	constructor(selector, routes) {
		if (!selector) {
			throw new Error('Selector is not provided in Router');
		}
		this.routes = routes;
		this.$placeholder = $(selector);
		this.changePageHandler = this.changePageHandler.bind(this);
		this.page = null;
	}

	init() {
		window.addEventListener('hashchange', this.changePageHandler);
		this.changePageHandler();
	}

	destroy() {
		window.removeEventListener('hashchange', this.changePageHandler);
	}

	changePageHandler() {
		if (this.page) {
			this.page.destroy();
		}
		const Page = ActiveRoute.path.includes('excel')
			? this.routes.excel
			: this.routes.dashboard;
		this.page = new Page(ActiveRoute.param);
		this.$placeholder
			.clear()
			.append(this.page.getRoot());
		this.page.afterRender();
	}
}
