import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createRecords} from '@/pages/dashboard.functions';
import {DASHBOARD_HEADING, DEFAULT_TITLE} from '@/constants';

export class DashboardPage extends Page {
	constructor() {
		super();
	}

	getRoot() {
		const tableId = Date.now().toString();
		return $.create('div', 'db').html(
			`  <div class="db__header">
            <h1>${DASHBOARD_HEADING}</h1>
        </div>
        <div class="db__new">
            <div class="db__view">
                <a href="/#excel/${tableId}" class="db__create">${DEFAULT_TITLE}</a>
            </div>
        </div>
        ${createRecords()}
       `,
		);
	}
}
