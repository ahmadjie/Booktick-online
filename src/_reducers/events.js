import { GET_EVENTS, GET_EVENTS_TODAY, GET_EVENTS_UPCOMING } from '../config/constants';
const initialState = {
	data: [],
	isLoading: false,
	error: false
};

export const events = (state = initialState, action) => {
	switch (action.type) {
		case `${GET_EVENTS}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_EVENTS}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${GET_EVENTS}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

const initialStateToday = {
	data: [],
	isLoading: false,
	error: false
};

export const eventsToday = (state = initialStateToday, action) => {
	switch (action.type) {
		case `${GET_EVENTS_TODAY}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_EVENTS_TODAY}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${GET_EVENTS_TODAY}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};



const initialStateUpComing = {
	data: [],
	isLoading: false,
	error: false
};

export const eventsUpComing = (state = initialStateUpComing, action) => {
	switch (action.type) {
		case `${GET_EVENTS_UPCOMING}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_EVENTS_UPCOMING}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${GET_EVENTS_UPCOMING}_REJECTED`:
			return {
				...state,
				error: true,
				isLoading: false
			};
		default:
			return state;
	}
};

