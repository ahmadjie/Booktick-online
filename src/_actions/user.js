import { GET_USER } from '../config/constants';
import axios from 'axios';

export const getUser = () => {
	let token = localStorage.getItem('token');
	token = 'Bearer ' + token;
	return {
		type: GET_USER,
		payload: axios({
			method: 'GET',
			url: 'https://booktick.herokuapp.com/api/v1/profile/',
			headers: {
				Authorization: token
			}
		})
	};
};
