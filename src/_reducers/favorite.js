import { GET_FAVORITE } from '../config/constants';

const initialState = {
    favorites: [],
    isLoading: false,
    eror: false,
    empty: false
};

export const favorite = (state = initialState, action) => {
    switch (action.type) {
        case `${GET_FAVORITE}_PENDING`:
            return {
                ...state,
                isLoading: true
            };
        case `${GET_FAVORITE}_FULFILLED`:
            if (action.payload.data.length > 0) {
                return {
                    ...state,
                    favorites: action.payload.data,
                    isLoading: false
                };
            } else {
                return {
                    ...state,
                    favorites: action.payload.data,
                    isLoading: false,
                    empty: true
                };
            }
        case `${GET_FAVORITE}_REJECTED`:
            return {
                ...state,
                isLoading: false,
                eror: true
            };
        default:
            return state;
    }
};
