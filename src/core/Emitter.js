export class Emitter {
	constructor() {
		this.listeners = {};
	}
	// Уведомление слушаетелей, если они есть
	// event - произвольная строка, например, 'event:done'
	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) {
			return false;
		}
		this.listeners[event].forEach(listener => {
			listener(...args); // args разворачиваем - spread
		});
		return true; // необязательно это делать
	}

	// Подписываемся на уведомления
	// Добавляем нового слушаетеля
	// абстрактно: formula.subscribe('table:select', () => {})
	subscribe(event, fn) {
		// добавляем event в массив, если он есть
		// или создаем весь массив
		this.listeners[event] = this.listeners[event] || [];
		this.listeners[event].push(fn);
		// отписываемся, если не нужен event
		return () => {
			this.listeners[event] = this.listeners[event]
				.filter(listener => listener !== fn);
		};
	}
}

// Example
// const emitter = new Emitter();
// const unsub = emitter.subscribe('Andrei', data => console.log('Sub:', data));
// emitter.subscribe('dsdsdsdas', 42);
// setTimeout(() => {
// emitter.emit('Andrei', 'After 2 seconds');
// }, 2000);
// setTimeout(() => {
// unsub();
// }, 3000);
// setTimeout(() => {
// emitter.emit('Andrei', 'After 4 seconds');
// }, 4000);
