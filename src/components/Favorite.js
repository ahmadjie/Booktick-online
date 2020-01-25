import React, { Component } from 'react';
import { Grid, CardMedia, Button, Typography, Card, CardActionArea, CardContent } from '@material-ui/core';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class FavoriteComponent extends Component {
	render() {
		return (
			<div style={{ width: '100%' }}>
				<Grid container style={{ marginTop: '2%' }}>
					<Grid item xs={4} style={{ marginBottom: '2%' }}>
						{/* <Link to={`/event/?${item.id}`} style={{ textDecoration: 'none', color: 'black' }}> */}
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
										<Typography variant="body1" color="textSecondary" style={{ color: '#ff5252' }}>
											123 harga
										</Typography>
									</Button>
									<CardMedia
										component="img"
										height="250px"
										image="https://pbs.twimg.com/profile_images/1130032650712801280/223KYI_z_400x400.jpg"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											judull...
										</Typography>

										<Typography variant="body2" color="textSecondary" component="p">
											descript
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</div>

						{/* </Link> */}
					</Grid>
					<Grid item xs={4} style={{ marginBottom: '2%' }}>
						{/* <Link to={`/event/?${item.id}`} style={{ textDecoration: 'none', color: 'black' }}> */}
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
										<Typography variant="body1" color="textSecondary" style={{ color: '#ff5252' }}>
											123 harga
										</Typography>
									</Button>
									<CardMedia
										component="img"
										height="250px"
										image="https://pbs.twimg.com/profile_images/1130032650712801280/223KYI_z_400x400.jpg"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											judull...
										</Typography>

										<Typography variant="body2" color="textSecondary" component="p">
											descript
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</div>

						{/* </Link> */}
					</Grid>
					<Grid item xs={4} style={{ marginBottom: '2%' }}>
						{/* <Link to={`/event/?${item.id}`} style={{ textDecoration: 'none', color: 'black' }}> */}
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
										<Typography variant="body1" color="textSecondary" style={{ color: '#ff5252' }}>
											123 harga
										</Typography>
									</Button>
									<CardMedia
										component="img"
										height="250px"
										image="https://pbs.twimg.com/profile_images/1130032650712801280/223KYI_z_400x400.jpg"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											judull...
										</Typography>

										<Typography variant="body2" color="textSecondary" component="p">
											descript
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</div>

						{/* </Link> */}
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default FavoriteComponent;
