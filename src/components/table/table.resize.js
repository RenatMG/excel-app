import {$} from '@core/dom';

export function resizeHandler($root, event) {
	const $resizer = $(event.target);
	const $parent = $($resizer.closest('[data-type="resizable"]'));

	const coords = $parent.getCoords();
	const type = $resizer.data.resize;
	let value;
	const sideProp = type === 'col' ? 'bottom' : 'right';
	$resizer.css({
		[sideProp]: '-5000px',
	});

	document.onmousemove = (e) => {
		if (type === 'col') {
			const delta = e.pageX - coords.right;
			value = coords.width + delta;
			const right = `${-delta}px`;
			$resizer.css({right});
		} else {
			const delta = e.pageY - coords.bottom;
			value = coords.height + delta;
			const bottom = `${-delta}px`;
			$resizer.css({bottom});
		}
	};
	document.onmouseup = () => {
		document.onmousemove = null;
		document.onmouseup = null;
		if (type === 'col') {
			$parent.css({width: `${value}px`});
			const cells = $root.findAll(`[data-col="${$parent.data.col}"]`);
			cells.forEach((el) => {
				$(el).css({width: `${value}px`});
			});
		} else {
			$parent.css({height: `${value}px`});
		}

		$resizer.css({
			bottom: 0,
			right: 0,
		});
	};
}
