import {defaultStyles, defaultTitle} from "@/constants";
import {clone} from "@core/utils";

const defaultState = {
	rowState: {},
	colState: {},
	dataState: {}, // {'0:1', 'dsdsasgfhdf3'}
	stylesState: {},
	currentText: '',
	currentStyles: defaultStyles,
	title: defaultTitle,
	openedDate: new Date().toJSON
};

const normalize = state => ({
	...state,
	currentStyles: defaultStyles,
	currentText: ''
});

export function normalizeInitialState(state) {
	return state ? normalize(state) : clone(defaultState);
}
