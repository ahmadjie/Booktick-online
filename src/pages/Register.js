import React, { Component } from 'react';
//material ui
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Button, CardContent, TextField, Typography } from "@material-ui/core";
//config
import { register } from '../config/api';
//others
import { Link } from 'react-router-dom';

const cardStyles = makeStyles({
	card: {
		minWidth: 275
	}
});

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			name: '',
			email: '',
			message: '',
			textErrorEmail: null,
			requiredActiveEmail: true,
			errorActiveEmail: null,
			textErrorUsername: null,
			requiredActiveUsername: true,
			errorActiveUsername: null,
		};
	}

	handleEmail = () => {
		this.setState({
			message: '',
			requiredActiveEmail: true,
			errorActiveEmail: null,
			textErrorEmail: null
		})
	}
	handleUsername = () => {
		this.setState({
			message: '',
			requiredActiveUsername: true,
			errorActiveUsername: null,
			textErrorUsername: null
		})
	}

	onChangeEmail = (e) => {
		this.setState({ email: e.target.value });
	};
	onChangeName = (e) => {
		this.setState({ name: e.target.value });
	};
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
			password: this.state.password,
			name: this.state.name,
			email: this.state.email,
		};

		register(user).then((response) => {
			if (response.data.message === "success") {
				window.location = '/home';
			} else if (response.data === "email already") {
				this.setState({
					email: '',
					requiredActiveEmail: null,
					errorActiveEmail: true,
					textErrorEmail: "Email already taken"
				})
			} else if (response.data === "username already") {
				this.setState({
					username: '',
					requiredActiveUsername: null,
					errorActiveUsername: true,
					textErrorUsername: "Username already taken"
				})
			} else {
				this.setState({ message: 'Something Error' })
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
										<Typography variant="h4">Register</Typography>
									</div>
									<div style={{ height: '2px', width: '122px', margin: 'auto', backgroundColor: '#ff5252' }}></div>
									<div style={{ color: 'red', fontWeight: 'bold' }}>
										<p>{this.state.message}</p>
									</div>
									<form
										onSubmit={this.onSubmit}
										autoComplete="off"
										fullWidth
										style={{ justifyContent: 'center', alignItems: 'center', width: '75%', margin: 'auto', display: 'flex', flexDirection: 'column' }}
									>
										<TextField
											id="Email"
											value={this.state.email}
											onChange={this.onChangeEmail}
											label="Email"
											required={this.state.requiredActiveEmail}
											error={this.state.errorActiveEmail}
											onClick={this.handleEmail}
											helperText={this.state.textErrorEmail}
											style={{ width: '50%', marginBottom : '2%' }}
										/>

										<TextField
											id="Name"
											value={this.state.name}
											onChange={this.onChangeName}
											label="Name"
											required
											style={{ width: '50%', marginBottom : '2%' }}
										/>

										<TextField
											id="Username"
											value={this.state.username}
											onChange={this.onChangeUsername}
											label="Username"
											required={this.state.requiredActiveUsername}
											error={this.state.errorActiveUsername}
											onClick={this.handleUsername}
											helperText={this.state.textErrorUsername}
											style={{ width: '50%', marginBottom : '2%' }}
										/>

										<TextField
											id="Password"
											label="Password"
											required
											type="password"
											value={this.state.password}
											onChange={this.onChangePassword}
											style={{ width: '50%' }}
										/>

										<Button
											variant="outlined"
											type="submit"
											style={{ width: '50%', marginTop: '7%', marginBottom: '5%', backgroundColor: '#ff5252', color: 'white' }}
										>
											Register
										</Button>
									</form>
									<Typography variant="body2">Already have an account?  <Link to='/login' style={{ textDecoration: 'none', color: '#ff5252' }}>Sign in</Link></Typography>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</div>
			);
		}
	}
}
