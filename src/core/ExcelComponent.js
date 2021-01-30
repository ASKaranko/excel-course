import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
	constructor($root, options = {}) {
		super($root, options.listeners);
		this.name = options.name || '';
		this.emitter = options.emitter;
		this.subscribe = options.subscribe || [];
		this.store = options.store;
		// this.storeSub = null;
		this.unsubscribers = [];
		this.prepare();
	}

	// Настраиваем наш компонент до init
	prepare() {}

	// Возвращает шаблон компонента
	toHTML() {
		return '';
	}

	// Уведомляем слушателей про событие
	// Паттерн фасад - мы можем поменять название метода emit
	// но нам не придется его менять во всех компонентах
	$emit(event, ...args) {
		this.emitter.emit(event, ...args);
	}

	// Подписываемся на событие event
	// У нас одна переменная для отписки централизованная
	$on(event, fn) {
		const unsub = this.emitter.subscribe(event, fn);
		this.unsubscribers.push(unsub);
	}

	$dispatch(action) {
		this.store.dispatch(action);
	}
	// Эти подписки заменены одной
	// $subscribe(fn) {
	// this.storeSub = this.store.subscribe(fn);
	// }

	// Сюда приходят изменения по тем полям, на которые мы подписались
	storeChanged() {}

	// На какие ключи store подписаны компоненты
	isWatching(key) {
		return this.subscribe.includes(key);
	}

	// Инициализируем компонент
	// Добавляем DOM слушатели
	init() {
		this.initDOMListeners();
	}

	// Удаляем компонент
	// Чистим слушатели
	// Удаляем подписки
	destroy() {
		this.removeDOMListeners();
		this.unsubscribers.forEach(unsubscriber => unsubscriber());
		// this.storeSub.unsubscribe();
	}
}
