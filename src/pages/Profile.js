import React, { Component } from 'react';
//components
import Header from '../components/Header';
import ProfileComponent from '../components/Profile';
import EditProfile from '../components/EditProfile';
import Footer from '../components/Footer';
//material ui
import { Grid, CardMedia, Button, Typography, Card, CardActionArea, CardContent } from '@material-ui/core';
//otherss
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { getFavorite } from '../_actions/favorite'
import { connect } from 'react-redux';

class Profile extends Component {

	componentDidMount() {
		this.props.getFavorite();
	}
	render() {
		const checkToken = localStorage.getItem('token')
		if (!checkToken) {
			window.location = "/login"
		} else {

			const { favorites, isLoading, eror, empty } = this.props.favorite;

			if (isLoading) {
				return (
					<div>
						<h1>Mohon Tunggu...</h1>
					</div>
				);
			}
			if (empty) {
				return (
					<div style={{ backgroundColor: '#fbe9e7' }}>
						<Header />
						<div style={{ width: '75%', margin: 'auto' }}>
							<Router>
								<Switch>
									<Route path="/profile/edit" component={EditProfile}>
										<EditProfile />
									</Route>
									<Route path="/profile" component={ProfileComponent}>
										<ProfileComponent />
									</Route>
								</Switch>
							</Router>
							<div style={{ marginTop: '5%', color: '#ff5252' }}>
								<h1>Favorite</h1>
							</div>
						</div>
					</div>
				)

			}
			if (eror) {
				return (
					<div>
						<h1>Something Error</h1>
					</div>
				);
			}

			return (
				<div style={{ backgroundColor: '#fbe9e7' }}>
					<Header />
					<div style={{ width: '75%', margin: 'auto' }}>
						<Router>
							<Switch>
								<Route path="/profile/edit" component={EditProfile}>
									<EditProfile />
								</Route>
								<Route path="/profile" component={ProfileComponent}>
									<ProfileComponent />
								</Route>
							</Switch>
						</Router>

						{/* FAVORITE */}

						<div style={{ marginTop: '5%', color: '#ff5252' }}>
							<h1>Favorite</h1>
						</div>
						<div style={{ width: '100%' }}>
							<Grid container style={{ marginTop: '2%' }}>
								{
									favorites.map((favorite) => {
										return (
											<Grid item xs={4} style={{ marginBottom: '2%' }}>
												<Link
													to={`/event/${favorite.eventId}`}
													style={{ textDecoration: 'none', color: 'black' }}
												>
													<div style={{ margin: '5px' }}>
														<Card>
															<CardActionArea>
																<Button
																	disabled
																	style={{
																		position: 'absolute',
																		top: '10px',
																		right: '10px',
																		backgroundColor: 'white',
																		padding: '10px'
																	}}
																>
																	<Typography
																		variant="body1"
																		color="textSecondary"
																		style={{ color: '#ff5252' }}
																	>
																		{favorite.event.price}
																	</Typography>
																</Button>
																<CardMedia
																	component="img"
																	height="250px"
																	image={`${favorite.event.image}`}
																/>
																<CardContent>
																	<Typography gutterBottom variant="h5" component="h2">
																		{favorite.event.title}
																	</Typography>

																	<Typography
																		variant="body2"
																		color="textSecondary"
																		component="p"
																	>
																		{favorite.event.description.substring(0, 30)}
																	</Typography>
																</CardContent>
															</CardActionArea>
														</Card>
													</div>
												</Link>
											</Grid>
										);

									})}
							</Grid>
						</div>
					</div>
					<Footer />
				</div>
			);
		}
	}
}


const mapStateToProps = (state) => {
	return {
		favorite: state.favorite
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getFavorite: () => {
			dispatch(getFavorite());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);