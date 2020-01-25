import { GET_CATEGORIES } from '../config/constants';
import axios from 'axios';

export const getCategories = () => {
	return {
		type: GET_CATEGORIES,
		payload: axios({
			method: 'GET',
			url: 'https://booktick.herokuapp.com/api/v1/categories'
		})
	};
};
