export function createStore(rootReducer, initialState = {}) {
	let state = rootReducer({...initialState}, {type: '__INIT__'});
	let listeners = [];

	return {
		subscribe(fn) {
			listeners.push(fn);
			// return () => {
			// listeners = listeners.filter(l => l !== fn);
			// };
			// Сделаем более расширенный return как обертку
			return {
				unsubscribe() {
					listeners = listeners.filter(l => l !== fn);
				}
			};
		},
		dispatch(action) {
			state = rootReducer(state, action);
			listeners.forEach(listener => listener(state));
		},
		getState() {
			// это будет другой объект в памяти и это хак для сравнения потом state
			// позволяет избежать мутирования
			return JSON.parse(JSON.stringify(state));
		}
	};
}
