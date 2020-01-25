import React, { Component } from 'react';
//material-ui
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button, CardContent, TextField, Typography } from "@material-ui/core";
//config
import { login } from '../config/api';
//others
import { Link } from 'react-router-dom';

const cardStyles = makeStyles({
	card: {
		minWidth: 275
	}
});

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			message: '',
		};
	}

	clearMessage = () => {
		this.setState({
			message: '',
		})
	}


	onChangeUsername = (e) => {
		this.setState({ username: e.target.value });
	};
	onChangePassword = (e) => {
		this.setState({ password: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();
		const user = {
			username: this.state.username,
			password: this.state.password
		};

		login(user).then(() => {
			if (localStorage.getItem('token')) {
				window.location = '/home';
			} else {
				this.setState({
					username: '',
					password: '',
					message: 'Username atau Password anda salah',
					requiredActive: null,
					errorActive: true
				})
			}
		});
	};

	render() {
		const checkToken = localStorage.getItem('token');
		if (checkToken) {
			window.location = '/home';
		} else {
			return (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#ff5252' }}>
					<Grid item xs={12}>
						<Card className={cardStyles.card} style={{ margin: 'auto', width: '50%' }}>
							<CardContent>
								<Grid container direction="column" justify="center" alignItems="center">
									<div style={{ marginTop: '5%' }}>
										<Typography variant="h4">Welcome</Typography>
									</div>
									<div style={{ height: '2px', width: '130px', margin: 'auto', backgroundColor: '#ff5252' }}></div>
									<form
										onSubmit={this.onSubmit}
										autoComplete="off"
										style={{ justifyContent: 'center', alignItems: 'center', width: '75%', margin: 'auto', display: 'flex', flexDirection: 'column' }}
									>
										<div style={{ color: 'red', fontWeight: 'bold' }}>
											<p>{this.state.message}</p>
										</div>
										<TextField
											id="Username"
											value={this.state.username}
											onChange={this.onChangeUsername}
											label="Username"
											style={{ width: '50%', marginBottom: '2%' }}
											required
											onClick={this.clearMessage}
										/>

										<TextField
											id="Password"
											label="Password"
											required
											type="password"
											value={this.state.password}
											onChange={this.onChangePassword}
											onClick={this.clearMessage}
											style={{ width: '50%' }}
										/>

										<Button
											variant="outlined"
											type="submit"
											style={{ width: '50%', marginTop: '7%', marginBottom: '5%', backgroundColor: '#ff5252', color: 'white' }}
										>
											Login
										</Button>
									</form>
									<Typography variant="body2">Don’t have an account? <Link to='/register' style={{ textDecoration: 'none', color: '#ff5252' }}>Sign Up</Link></Typography>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</div>
			);
		}
	}
}
