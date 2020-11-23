import {storage} from '@core/utils';

function toHTML(key) {
	const table = storage(key);
	const tableId = key.split(':')[1];
	const date = new Date(+tableId);
	return `
 		  <li class="db__record">
              <a href="#excel/${tableId}">${table.title}</a>
              <strong>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</strong>
          </li>`;
}

function getAllKeys() {
	const keys = [];
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key.includes('excel')) {
			keys.push(key);
		}
	}
	return keys;
}

export function createRecords() {
	const keys = getAllKeys();
	if (!keys.length) {
		return '<p>Вы пока не создали ни одной таблицы</p>';
	}
	return `<div class="db__table db__view">
				<div class="db__list-header">
					<span>Название</span>
					<span>Дата открытия</span>
				</div>
				<ul class="db__list">
					${keys.map(toHTML).join('')}        
				</ul>
        	</div>`;
}
