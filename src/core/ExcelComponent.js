import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.store = options.store;
		this.subscribe = options.subscribe || [];
		this.unsubscribers = [];

		this.prepare();
	}

	// Уведомляем слушателей о событии
	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);
		this.unsubscribers.push(unsub);
	}

	$dispatch(action) {
		this.store.dispatch(action);
	}

	// Сюда приходят только изменения по тем полям, на которые подписались
	storeChanged() {
	}

	isWatching(key) {
		return this.subscribe.includes(key);
	}

	// Настраиваем компонент до init
	prepare() {
	}

	// возвращает шаблон компонента
	toHTML() {
	}

	init() {
		this.initDOMListeners();
	}

	destroy() {
		this.removeDOMListeners();
		this.unsubscribers.forEach((unsub) => unsub());
	}
}
