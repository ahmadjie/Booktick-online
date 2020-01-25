import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

function Header(props) {
	const { data } = props.user;
	//check token
	const token = localStorage.getItem('token');
	let auth = false;
	if (token !== null) {
		auth = true;
	}

	const classes = useStyles();
	//style menu item
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	//handle click logout
	const onSubmit = () => {
		localStorage.clear();
		window.location.reload();
	};
	return (
		<div>
			<AppBar position="static" style={{ backgroundColor: '#ff5252' }}>
				<Toolbar>
					<Typography variant="h5" className={classes.title} style={{ marginLeft: '11%' }}>
						<Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
							BookTick
						</Link>
					</Typography>
					{auth && (
						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<Avatar src={`${data.image}`} />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right'
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>
									<Link to={`/profile`} style={{ textDecoration: 'none', color: 'black' }}>
										Profile
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link to={`/myticket`} style={{ textDecoration: 'none', color: 'black' }}>
										My Ticket
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link to={`/payment`} style={{ textDecoration: 'none', color: 'black' }}>
										Payment
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link to="/addevent" style={{ textDecoration: 'none', color: 'black' }}>
										Add Event
									</Link>
								</MenuItem>
								<Divider />
								<MenuItem onClick={handleClose}>
									<Link to="/" style={{ textDecoration: 'none', color: 'black' }} onClick={onSubmit}>
										Logout
									</Link>
								</MenuItem>
							</Menu>
						</div>
					)}
					{auth || (
						<div>
							<Link to="/register" style={{ textDecoration: 'none' }}>
								<Button
									variant="contained"
									style={{ marginRight: '10px', backgroundColor: '#ff5252', color: '#fafafa' }}
								>
									Register
								</Button>
							</Link>
							<Link to="/login" style={{ textDecoration: 'none' }}>
								<Button variant="contained" style={{ backgroundColor: '#fafafa', color: '#ff5252' }}>
									Login
								</Button>
							</Link>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

const mapStateToProp = (state) => {
	return {
		//userDetail dari reducer
		user: state.userDetail
	};
};

export default connect(mapStateToProp)(Header);
