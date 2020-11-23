import {storage} from '@core/utils';
import {DEFAULT_STYLES, DEFAULT_TITLE} from '@/constants';

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

const localStorageState = storage('excel-state');
export const initialState = localStorageState || defaultState;
