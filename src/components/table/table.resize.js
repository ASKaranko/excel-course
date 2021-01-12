import {$} from "@core/dom";

export function resizeHanler($root, event) {
	const $resizer = $(event.target);
	// const $parent = $resizer.$el.parentElement; // плохо,
	// так как в будущем верстка может поменяться
	// const $parent = $resizer.$el.closest('.column'); //тоже самое
	const $parent = $resizer.closest('[data-type="resizable"]');
	const coords = $parent.getCoords();
	const type = $resizer.data.resize;
	let value;
	document.onmousemove = e => {
		if (type === 'col') {
			const delta = Math.floor(e.pageX - coords.right);
			value = coords.width + delta;
			$resizer.css({opacity: 1, bottom: '-5000px', right: -delta + 'px'});
		} else {
			const delta = Math.floor(e.pageY - coords.bottom);
			value = coords.height + delta;
			$resizer.css({opacity: 1, right: '-5000px', bottom: -delta + 'px'});
		}
	};
	document.onmouseup = () => {
		document.onmousemove = null;
		document.onmouseup = null;
		if (type === 'col') {
			$parent.css({width: value + 'px'});
			$root.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach(el => el.style.width = value + 'px');
		} else {
			$parent.css({height: value + 'px'});
		}
		$resizer.css({opacity: 0, bottom: 0, right: 0});
	};
}
