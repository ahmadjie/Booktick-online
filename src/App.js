import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoriesDetails from './pages/CategoriesDetail';
import Profile from './pages/Profile';
import MyTicket from './pages/MyTickets';
import AddEvent from './pages/AddEvent';
import Payment from './pages/Payments';
import PaymentDetail from './pages/PaymentDetail';
import EventsBySearch from './components/EventsBySearch'
import { getUser } from './_actions/user';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.userDetail1();
	}
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route path="/search/:keyword">
							<EventsBySearch />
						</Route>
						<Route path="/payment/:id">
							<PaymentDetail />
						</Route>
						<Route path="/payment">
							<Payment />
						</Route>
						<Route path="/addevent">
							<AddEvent />
						</Route>
						<Route path="/myticket">
							<MyTicket />
						</Route>
						<Route path="/profile">
							<Profile />
						</Route>
						<Route path="/category/:id/events">
							<CategoriesDetails />
						</Route>
						<Route path="/register">
							<Register />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/event/:id">
							<EventDetails />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</Router>
			</div>
		);
	}
}

const mapStateToProp = (state) => {
	return {
		//userDetail dari reducer
		user: state.userDetail
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userDetail1: () => {
			//getUser() dari action
			dispatch(getUser());
		}
	};
};

export default connect(mapStateToProp, mapDispatchToProps)(App);
