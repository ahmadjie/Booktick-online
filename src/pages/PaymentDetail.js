import React, { Component } from 'react';
//components
import Header from '../components/Header';
import Footer from '../components/Footer';
//material-ui
import { Typography, Container, Grid, Divider, Button, TextField } from '@material-ui/core';
//config
import { confirmPayment } from '../config/api';
//others
import { withRouter } from 'react-router';
import axios from 'axios';
class PaymentDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attachment: '',
			order: {},
			event: {},
			buyer: {},
			isLoading: true
		};
	}

	componentDidMount() {
		const { match } = this.props;
		const getToken = localStorage.getItem('token');

		axios
			.get(`https://booktick.herokuapp.com/api/v1/order/${match.params.id}?status=pending`, {
				headers: {
					Authorization: 'Bearer ' + getToken
				}
			})
			.then((responses) => {
				this.setState({ order: responses.data, isLoading: false });
				this.setState({ event: responses.data.event, isLoading: false });
				this.setState({ buyer: responses.data.buyer, isLoading: false });
			});
	}

	onChangeAttachment = (e) => {
		this.setState({ attachment: e.target.value });
	};

	onSubmit = () => {
		const confirmStatus = {
			id: this.state.order.id,
			attachment: this.state.attachment
		};
		confirmPayment(confirmStatus);
	};
	render() {
		const checkToken = localStorage.getItem('token')
		if (!checkToken) {
			window.location = '/login'
		} else {

			if (this.state.isLoading) {
				return (
					<div>
						<h1>Loading</h1>
					</div>
				);
			}
			const img =
				'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png';
			return (
				<div>
					<Header />
					<Container maxWidth="md" style={{ marginTop: '50px' }}>
						<Typography
							variant="h5"
							component="p"
							color="secondary"
							style={{
								backgroundColor: 'rgb(255, 18, 18)',
								color: '#fff',
								width: '50%',
								textAlign: 'center'
							}}
						>
							Payment
						</Typography>
						<div style={{ borderTop: '8px solid rgb(255, 18, 18)', backgroundColor: '#fff', padding: '20px' }}>
							<div>
								<Container maxWidth="md">
									<div style={{ backgroundColor: '#ff5252', padding: '20px', marginTop: '40px' }}>
										<div style={{ backgroundColor: '#fff' }}>
											<div style={{ backgroundColor: '#ccc', padding: '5px 10px', display: 'flex', justifyContent: 'space-between' }}>
												<Grid item xs={2}>
													<Typography variant="body1">{this.state.buyer.name}</Typography>
													<Typography
														variant="body2"
														component="p"
														style={{
															fontFamily: 'poppins',
															fontWeight: 'bold'
														}}
													>
														{this.state.order.id}
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
														Quantity:{this.state.order.quantity} Price :{this.state.order.totalPrice}
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
														Status : {this.state.order.status}
													</Typography>
												</Grid>
											</div>
											<div style={{ padding: '10px' }}>
												<Grid container spacing={2}>
													<Grid item sm={9}>
														<Typography variant="h4" style={{ fontWeight: 'bold' }}>
															{this.state.event.title}
														</Typography>
														<Typography variant="body1">{this.state.event.starTime}</Typography>
														<Typography variant="body2">{this.state.event.address}</Typography>
													</Grid>
													<Grid
														item
														sm={3}
														justify="center"
														alignItems="center"
														style={{ display: 'flex' }}
													>
														<div style={{ backgroundImage: `url(${img})`, width: '180px', height: '180px', backgroundSize: 'cover' }} />
													</Grid>
												</Grid>
											</div>
										</div>
									</div>
								</Container>
								<Container maxWidth="md" style={{ width: '80%' }}>
									<Grid item xs={12} style={{ marginTop: '10px' }}>
										<Typography variant="h5" style={{ fontWeight: 'bold' }}>
											Shopping summary
										</Typography>
									</Grid>
									<Grid container>
										<Grid item xs={6} style={{ marginTop: '10px' }}>
											<Typography
												variant="body2"
												style={{ fontWeight: 'bold' }}
												color="textSecondary"
											>
												Total Price ({this.state.order.quantity} Item)
											</Typography>
										</Grid>
										<Grid item xs={6} style={{ marginTop: '10px', textAlign: 'end' }}>
											<Typography
												variant="body2"
												style={{ fontWeight: 'bold' }}
												color="textSecondary"
											>
												Rp. {this.state.order.totalPrice}
											</Typography>
										</Grid>
									</Grid>
								</Container>
								<Divider
									light
									style={{ width: '90%', margin: 'auto', marginTop: '3%', marginBottom: '3%' }}
								/>
								<form>
									<Container maxWidth="md" style={{ width: '80%' }}>
										<Grid item xs={12} style={{ marginTop: '10px' }}>
											<Typography variant="h5" style={{ fontWeight: 'bold' }}>
												Prove Payment
										</Typography>
										</Grid>
										<Grid container>
											<Grid item xs={6} style={{ marginTop: '10px' }}>
												<img src={this.state.attachment} style={{ width: '100%' }} />
												<TextField
													id="standard-basic"
													label="Upload Bukti Pembayaran"
													value={this.state.attachment}
													onChange={this.onChangeAttachment}
													required
													style={{ width: '100%' }}
												/>
											</Grid>
											<Grid item xs={6} style={{ marginTop: '10px', textAlign: 'end' }}>
												<Button
													large
													variant="contained"
													style={{ backgroundColor: '#ff5252', color: '#fff' }}
													onClick={this.onSubmit}
												>
													Confirm
											</Button>
											</Grid>
										</Grid>
									</Container>
								</form>
							</div>
						</div>
					</Container>
					<Footer />
				</div>
			);
		}
	}
}

export default withRouter(PaymentDetail);
