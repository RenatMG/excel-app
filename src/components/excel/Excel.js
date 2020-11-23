import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';

export class Excel {
	constructor(options) {
		this.components = options.components || [];
		this.store = options.store;
		// подключение класса слушателя
		this.emitter = new Emitter();
		this.subscriber = new StoreSubscriber(this.store);
	}

	getRoot() {
		// создание корневого элемента
		const $root = $.create('div', 'excel');
		// создание опций компонентов, которые будут общими для всех
		// передаем в них слушателя и состояние
		const componentOptions = {
			emitter: this.emitter,
			store: this.store,
		};
		this.components = this.components.map((Component) => {
			// создаем элементы для каждого комонента
			// с классом по умолчанию из статического свойства каждого компонента
			const $el = $.create('div', Component.className);
			// на базе каждого элемента создаем экземпляр класса компонета
			const component = new Component($el, componentOptions);
			// рисуем представление
			$el.html(component.toHTML());
			// добавляем в корневой элемент
			$root.append($el);
			return component;
		});
		return $root;
	}

	init() {
		this.subscriber.subscribeComponents(this.components);
		// каждый компонент проходит инициализацию, в которой добавляются слушатели и события
		this.components.forEach((component) => component.init());
	}

	destroy() {
		this.subscriber.unsubscribeFromStore();
		this.components.forEach((component) => component.destroy());
	}
}
