import { GET_EVENTS, GET_EVENTS_TODAY, GET_EVENTS_UPCOMING } from '../config/constants';
import axios from 'axios';

export const getEvents = () => {
	return {
		type: GET_EVENTS,
		payload: axios({
			method: 'GET',
			url: 'https://booktick.herokuapp.com/api/v1/events'
		})
	};
};

export const getEventsToday = () => {
	return {
		type: GET_EVENTS_TODAY,
		payload: axios({
			method: 'GET',
			url: 'https://booktick.herokuapp.com/api/v1/today/events'
		})
	};
};

export const getEventsUpComing = () => {
	return {
		type: GET_EVENTS_UPCOMING,
		payload: axios({
			method: 'GET',
			url: 'https://booktick.herokuapp.com/api/v1/upcoming/events'
		})
	};
};
