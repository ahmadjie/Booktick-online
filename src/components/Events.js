import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../_actions/events';
import { getFavorite } from '../_actions/favorite';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { CardMedia, Button } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { favorite } from '../config/api';

export class Event extends Component {

	componentDidMount() {
		this.props.getEvents();
		this.props.getFavorite();
	}

	handleLikeClick = (id) => {
        const favoriteEvent = {
            eventId: id
        };
        favorite(favoriteEvent).then(res => {
            if (res === undefined) {
                window.location = "/login"
            } else if (res.data === "you already favorite this events") {
                alert("you already favorite this events")
            } else {
                window.location.reload()
            }
        });
    };

	render() {
		const { data, isLoading, error } = this.props.events;
		const { favorites } = this.props.favorite;

        let idEventFavorite = []

		if(favorites.length > 0){
        favorites.map((favorite) => {
            idEventFavorite.push(favorite.eventId)
        })
	}
		if (isLoading) {
			return <div>Mohon Tunggu</div>;
		}

		if (error) {
			return (
				<div>
					<h1>eror</h1>
				</div>
			);
		}

		return (
			<div style={{ marginTop: '3%' }}>
				<h1 style={{ marginTop: '2%', color: '#ff5252' }}>Event</h1>
				<Grid container style={{ marginTop: '2%' }}>
					{data.map((item) => {
						return (
							<Grid item xs={4} style={{ marginBottom: '2%' }}>
								<div style={{ margin: '5px' }}>
									<Card>
										<CardActionArea>
											<Button
												disabled
												style={{
													position: 'absolute',
													top: '10px',
													right: '10px',
													backgroundColor: '#ff5252',
													padding: '10px'
												}}
											>
												<Typography
													variant="h6"
													color="textSecondary"
													style={{
														color: 'white',
														fontSize: '14px'
													}}
												>
													Rp. {item.price}
												</Typography>
											</Button>
											<CardMedia component="img" height="250px" image={item.image} />
											<CardContent>
												<Grid container style={{ display: 'flex' }}>
													<Grid item xs={10}>
														<Link
															to={`/event/${item.id}`}
															style={{ textDecoration: 'none', color: 'black' }}
														>
															<Typography gutterBottom variant="h5" component="h2">
																{item.title.substring(0, 30)}
															</Typography>
														</Link>
													</Grid>
													<Grid item xs={1} style={{ marginTop: '2%' }}>
														<FavoriteIcon
															style={{ color: idEventFavorite.includes(item.id) ? 'salmon' : 'grey' }}
															onClick={() => this.handleLikeClick(item.id)}
														/>
													</Grid>
												</Grid>

												<Typography variant="body2" color="textSecondary" component="p">
													{item.description.substring(0, 60)}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</div>
							</Grid>
						);
					})}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		events: state.events,
		favorite: state.favorite
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEvents: () => {
			dispatch(getEvents());
		},
        getFavorite: () => {
            dispatch(getFavorite());
        }
		// userSetFavoriteEvent: (eventId) => {
		// 	dispatch(userSetFavoriteEvent(eventId));
		// }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
