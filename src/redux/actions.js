import {
	APPLY_STYLE,
	CHANGE_STYLES,
	CHANGE_TEXT, CHANGE_TITLE, SET_CURRENT_CELL,
	TABLE_RESIZE,
} from '@/redux/types';

export function tableResize(data) {
	return {
		type: TABLE_RESIZE,
		payload: data,
	};
}

export function changeText(data) {
	return {
		type: CHANGE_TEXT,
		payload: data,
	};
}

export function changeStyles(data) {
	return {
		type: CHANGE_STYLES,
		payload: data,
	};
}

export function applyStyle(data) {
	return {
		type: APPLY_STYLE,
		payload: data,
	};
}

export function setCurrentCell(data) {
	return {
		type: SET_CURRENT_CELL,
		payload: data,
	};
}

export function changeTitle(data) {
	return {
		type: CHANGE_TITLE,
		payload: data,
	};
}
