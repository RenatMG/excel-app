import {DEFAULT_STYLES, DEFAULT_TITLE} from '@/constants';
import {clone} from '@core/utils';

const defaultState = {
	colState: {},
	rowState: {},
	dataState: {},
	stylesState: {},
	title: DEFAULT_TITLE,
	currentText: '',
	currentCell: '',
	currentStyles: {...DEFAULT_STYLES},
};
const normalize = (state) => ({
	...state,
	currentStyles: DEFAULT_STYLES,
	currentText: '',
});

export function normalizeInitialState(state) {
	return state ? normalize(state) : clone(defaultState);
}
