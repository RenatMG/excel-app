import {debounce} from '@core/utils';

export class StateProcessor {
	constructor(client, delay = 300) {
		this.client = client;
		this.listen = debounce(this.listen.bind(this), delay);
	}

	listen() {
		this.client.save();
	}

	get() {
		return this.client.get();
	}
}
