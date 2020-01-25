import React, { Component } from 'react';
//components
import Header from '../components/Header';
import Footer from '../components/Footer';
//material-ui
import { Typography, Container, Grid, Button } from '@material-ui/core';
//others
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
export class Payment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: []
		};
	}

	componentDidMount() {
		const getToken = localStorage.getItem('token');
		axios
			.get(`https://booktick.herokuapp.com/api/v1/user/orders?status=pending`, {
				headers: {
					Authorization: 'Bearer ' + getToken
				}
			})
			.then((responses) => {
				if (responses.data.length > 0) {
					this.setState({ orders: responses.data });
				}
			});
	}

	onChangeAttachment = (e) => {
		this.setState({ attachment: e.target.value });
	};
	render() {
		const checkToken = localStorage.getItem('token')
		if (!checkToken) {
			window.location = "/login"
		} else {
			return (
				<div>
					<Header />
					<Container maxWidth="md" style={{ marginTop: '50px' }}>
						<Typography variant="h5" component="p" style={{ backgroundColor: 'rgb(255, 18, 18)', color: '#fff', width: '50%', textAlign: 'center' }}>
							Payment
						</Typography>
						<div style={{ borderTop: '8px solid rgb(255, 18, 18)', backgroundColor: '#fff', padding: '20px' }}>
							{this.state.orders.map((order) => {
								return (
									<div>
										<Container maxWidth="md">
											<div style={{ backgroundColor: '#ff5252', padding: '20px', marginTop: '40px' }}>
												<div style={{ backgroundColor: '#fff' }}>
													<div style={{ backgroundColor: '#ccc', padding: '5px 10px', display: 'flex', justifyContent: 'space-between' }}>
														<Grid item xs={2}>
															<Typography variant="body1">{order.buyer.name}</Typography>
															<Typography variant="body2" component="p" style={{ fontFamily: 'poppins', fontWeight: 'bold' }}>
																{order.buyer.id}
															</Typography>
														</Grid>
														<Grid item xs={3}>
															<Typography
																variant="body2"
																component="p"
																color="textSecondary"
																style={{
																	fontFamily: 'poppins',
																	fontWeight: 'bold'
																}}
															>
																Quantity:{order.quantity} Price :{order.totalPrice}
															</Typography>
															<Typography
																variant="body2"
																component="p"
																color="textSecondary"
																style={{
																	fontFamily: 'poppins',
																	fontWeight: 'bold'
																}}
															>
																Status : {order.status}
															</Typography>
														</Grid>
													</div>
													<div style={{ padding: '10px' }}>
														<Grid container spacing={2}>
															<Grid item sm={9}>
																<Typography variant="h4" style={{ fontWeight: 'bold' }}>
																	{order.event.title}
																</Typography>
																<Typography variant="body1">
																	{order.event.starTime}
																</Typography>
																<Typography variant="body2">
																	{order.event.address}
																</Typography>
															</Grid>
															<Grid
																item
																sm={3}
																justify="center"
																alignItems="center"
																style={{ display: 'flex' }}
															>
																<Link to={`/payment/${order.id}`} style={{ color: 'none', textDecoration: 'none' }}>
																	<Button
																		large
																		variant="contained"
																		style={{
																			backgroundColor: '#ff5252',
																			color: '#fff'
																		}}
																	>
																		Checkout
																	</Button>
																</Link>
															</Grid>
														</Grid>
													</div>
												</div>
											</div>
										</Container>
									</div>
								);
							})}
						</div>
					</Container>
					<Footer />
				</div>
			);
		}
	}
}

export default withRouter(Payment);