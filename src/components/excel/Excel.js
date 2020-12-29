import {$} from "@core/dom";

export class Excel {
	constructor(selector, options) {
		this.$el = $(selector);
		this.components = options.components || []; // [] - значение по умолчанию
	}

	getRoot() {
		const $root = $.create('div', 'excel');
		this.components = this.components.map(Component => {
			const $el = $.create('div', Component.className);
			const component = new Component($el);
			// // DEBUG
			// if (component.name) {
			// eslint-disable-next-line no-tabs
			// 	window['c' + component.name] = component;
			// }

			$el.html(component.toHTML());
			$root.append($el);
			return component;
		});
		return $root;
	}

	render() {
		this.$el.append(this.getRoot());
		this.components.forEach(component => {
			component.init();
		});
	}
}
