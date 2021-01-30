import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			subscribe: ['currentText'],
			...options
		});
	}

	toHTML() {
		return `
		<div class="info">fx</div>
    <div id="formula" class="input" 
    contenteditable="true" spellcheck="false"></div>
		`;
	}

	init() {
		super.init();
		this.$formula = this.$root.find('#formula');
		this.$on('table:select', $cell => {
			this.$formula.text($cell.data.value);
		});
		// this.$on('table:input', $cell => {
		// this.$formula.text($cell.text());
		// });
		// Заменяем подписку Emitter на подписку redux
		// this.$subscribe(state => {
		// this.$formula.text(state.currentText);
		// });
	}

	storeChanged({currentText}) {
		this.$formula.text(currentText);
	}

	onInput(event) {
		this.$emit(`formula:input`, $(event.target).text());
	}

	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab'];
		const {key} = event;
		if (keys.includes(key)) {
			event.preventDefault();
			this.$emit(`formula:done`);
		}
	}
}
