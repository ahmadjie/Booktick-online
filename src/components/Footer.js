import React from 'react';
import { Grid } from '@material-ui/core';

const FooterSecondary = () => (
	<div
		style={{
			backgroundColor: '#ff5252',
			color: 'white',
			padding: '40px 60px',
			position: 'static',
			marginTop: '5%',
		}}
	>
		<div>
			<div>
				<Grid container spacing={5}>
					<Grid item sm={4}>
						<h3>Discover Booktick</h3>
						<p>
							<small>
								Welcome to a place where words matter. On Booktick, smart voices and original ideas take
								center stage - with no ads in sight. Watch
							</small>
						</p>
					</Grid>
					<Grid item sm={4}>
						<h3>Makes Booktick yours</h3>
						<p>
							<small>
								Welcome to a place where words matter. On Booktick, smart voices and original ideas take
								center stage - with no ads in sight. Watch
							</small>
						</p>
					</Grid>
					<Grid item sm={4}>
						<h3>Become a Member</h3>
						<p>
							<small>
								Get unlimited access to the best stories on Booktick — and support writers while you’re
								at it. Just $5/month. Upgrade
							</small>
						</p>
					</Grid>
				</Grid>
			</div>
		</div>
	</div>
);

export default FooterSecondary;
