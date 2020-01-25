import { GET_USER } from '../config/constants';

const initialUserState = {
	data: [],
	isLoading: false,
	eror: false
};

export const userDetail = (state = initialUserState, action) => {
	switch (action.type) {
		case `${GET_USER}_PENDING`:
			return {
				...state,
				isLoading: true
			};
		case `${GET_USER}_FULFILLED`:
			return {
				...state,
				data: action.payload.data,
				isLoading: false
			};
		case `${GET_USER}_REJECTED`:
			return {
				...state,
				isLoading: false,
				eror: true
			};
		default:
			return state;
	}
};
