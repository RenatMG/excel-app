import {
	CHANGE_TEXT, CHANGE_STYLES,
	TABLE_RESIZE, APPLY_STYLE, SET_CURRENT_CELL, CHANGE_TITLE,
} from '@/redux/types';

function value(state, field, payload) {
	const val = {...state[field]} || {};
	val[payload.id] = payload.value;
	return {[field]: val};
}

function styleValue(state, field, payload) {
	const val = {...state[field]} || {};
	payload.ids.forEach((id) => {
		val[id] = {...val[id], ...payload.value};
	});
	return {[field]: val, currentStyles: {...state.currentStyles, ...payload.value}};
}

export function rootReducer(state, {type, payload}) {
	switch (type) {
		case TABLE_RESIZE:
			return {
				...state,
				...value(state, `${payload.type}State`, payload),
			};
		case CHANGE_TEXT:
			return {
				...state,
				currentText: payload.value,
				...value(state, 'dataState', payload),
			};
		case CHANGE_STYLES:
			return {
				...state,
				currentStyles: payload,
			};
		case APPLY_STYLE:
			return {
				...state,
				...styleValue(state, 'stylesState', payload),
			};
		case SET_CURRENT_CELL:
			return {
				...state,
				currentCell: payload,
			};
		case CHANGE_TITLE:
			return {
				...state,
				title: payload,
			};
		default:
			return state;
	}
}
