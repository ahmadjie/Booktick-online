import axios from 'axios';

export const login = (user) => {
	return axios
		.post('https://booktick.herokuapp.com/api/v1/login', {
			username: user.username,
			password: user.password
		})
		.then((response) => {
			if (response.data.data.token !== undefined) {
				localStorage.setItem('token', response.data.data.token);
				return response.data;
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export const register = (user) => {
	return axios
		.post('https://booktick.herokuapp.com/api/v1/register', {
			name: user.name,
			email: user.email,
			username: user.username,
			password: user.password,
			image: 'https://reactjs.org/logo-og.png'
		})
		.then((response) => {
			if (response.data.message === "success") {
				localStorage.setItem('token', response.data.token);
				return response
			} else if (response.data === "email already") {
				return response
			} else if (response.data === "username already") {
				return response
			} else {
				return response
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export const favorite = (eventId) => {
	const getToken = localStorage.getItem('token');
	return axios
		.post(
			'https://booktick.herokuapp.com/api/v1/favorite',
			{
				eventId: eventId.eventId
			},
			{
				headers: {
					Authorization: 'Bearer ' + getToken
				}
			}
		)
		.then((response) => {
			if (response) {
				return response
			} else {
				alert('eror');
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export const addEvent = (event) => {
	const getToken = localStorage.getItem('token');
	return axios
		.post(
			'https://booktick.herokuapp.com/api/v1/event/',
			{
				title: event.title,
				categoryId: event.categoryId,
				starTime: event.starTime,
				endTime: event.endTime,
				price: event.price,
				description: event.description,
				address: event.address,
				urlmaps: event.urlmaps,
				image: event.image
			},
			{
				headers: {
					Authorization: 'Bearer ' + getToken
				}
			}
		)
		.then((response) => {
			if (response) {
				window.location = '/home';
			} else {
				alert('eror');
			}
		})
		.catch((err) => {
			alert('Please Login');
		});
};

export const orderEvent = (order) => {
	const getToken = localStorage.getItem('token');
	return axios
		.post(
			'https://booktick.herokuapp.com/api/v1/order',
			{
				quantity: order.quantity,
				totalPrice: order.totalPrice,
				eventId: order.eventId
			},
			{
				headers: {
					Authorization: 'Bearer ' + getToken
				}
			}
		)
		.then((response) => {
			if (response) {
				// localStorage.setItem('token', response.data.data.token);
				// return response.data;
			} else {
				alert('eror');
			}
		})
		.catch((err) => {
			// console.log(err);
		});
};

export const editProfile = (newData) => {
	const getToken = localStorage.getItem('token');
	return axios
		.put(
			'https://booktick.herokuapp.com/api/v1/profile',
			{
				name: newData.name,
				phone: newData.phone,
				email: newData.email,
				image: newData.image
			},
			{
				headers: {
					Authorization: 'Bearer ' + getToken
				}
			}
		)
		.then(() => {
			window.location = '/profile'
		})
		.catch((err) => {
			console.log(err);
		});
};

export const confirmPayment = (confirmStatus) => {
	const getToken = localStorage.getItem('token');
	return axios
		.put(
			'https://booktick.herokuapp.com/api/v1/order',
			{
				id: confirmStatus.id,
				attachment: confirmStatus.attachment
			},
			{
				headers: {
					Authorization: 'Bearer ' + getToken
				}
			}
		)
		.then(() => {
			window.location = '/myticket';
		})
		.catch(() => {
			alert('Something Error');
		});
};
