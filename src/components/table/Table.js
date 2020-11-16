import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export class Table extends ExcelComponent {
	static className = 'excel__table';

	constructor($root) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'mousemove', 'mouseup'],
		});
	}

	toHTML() {
		return createTable(20);
	}

	onClick(event) {
		console.log(event.target);
		console.log('onClick');
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event);
		}
	}

	onMousemove() {

	}

	onMouseup() {

	}
}
