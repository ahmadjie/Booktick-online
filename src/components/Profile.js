import React, { Component } from 'react';
import { Grid, Button, Typography, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProfileComponent extends Component {
	render() {
		const { data, isLoading, eror } = this.props.user;
		if (isLoading) {
			return (
				<div>
					<h1>Mohon Tunggu...</h1>
				</div>
			);
		}
		if (eror) {
			return (
				<div>
					<h1>Something Error</h1>
				</div>
			);
		}

		return (
			<div style={{ width: '100%' }}>
				<div style={{ marginTop: '5%', color: '#ff5252' }}>
					<h1>Profile</h1>
				</div>
				<Grid container justify="flex-start" alignContent="flex-start">
					<Grid item xs={9} style={{ display: 'flex', flexDirection: 'row' }}>
						<div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'row',

									paddingRight: '159px'
								}}
							>
								<h1 style={{ color: '#757575' }}>
									{data.name}
									<Link to="/profile/edit" style={{ textDecoration: 'none', color: 'none' }}>
										<Button
											variant="outlined"
											size="small"
											style={{
												backgroundColor: '#ff5252',
												color: 'white',
												marginLeft: '30px '
											}}
										>
											Edit Profile
										</Button>
									</Link>
								</h1>
							</div>
							<Typography variant="body1" color="textSecondary">
								@{data.username}
							</Typography>
							<Typography variant="body1" color="textSecondary">
								{data.phone}
							</Typography>
							<Typography variant="body1" color="textSecondary">
								{data.email}
							</Typography>
						</div>
					</Grid>
					<Grid item xs={3} style={{ width: 128, height: 128 }}>
						<Avatar
							style={{ width: 128, height: 128, marginTop: '6%', marginLeft: '75%' }}
							src={`${data.image}`}
						/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		//userDetail dari reducer
		//engga ada dispatch karena udah ada di App
		user: state.userDetail
	};
};

export default connect(mapStateToProps)(ProfileComponent);
