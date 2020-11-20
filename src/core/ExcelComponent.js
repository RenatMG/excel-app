import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.store = options.store;
		this.unsubscribers = [];
		this.prepare();
		this.storeSub = null;
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

	$subscribe(fn) {
		this.storeSub = this.store.subscribe(fn);
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
		this.storeSub.unsubscribe();
	}
}
