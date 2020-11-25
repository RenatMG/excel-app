import {$} from '@core/dom';
import {DASHBOARD_HEADING, DEFAULT_TITLE} from '@/constants';
import {Page} from '@core/page/Page';
import {createRecords} from '@/shared/dashboard.functions';

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
