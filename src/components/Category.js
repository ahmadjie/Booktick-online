import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../_actions/categories';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

class Category extends Component {
	componentDidMount() {
		this.props.getCategories();
	}

	render() {
		const { data, isLoading, error } = this.props.categories;

		if (isLoading) {
			return (
				<div>
					<h1>ini loading</h1>
				</div>
			);
		}
		if (error) {
			return (
				<div>
					<h1>eror</h1>
				</div>
			);
		}

		return (
			<div>
				<h1 style={{ color: '#ff5252' }}> Category </h1>
				<Grid container>
					{data.map((item) => {
						return (
							<Link to={`/category/${item.id}/events`} style={{ textDecoration: 'none', color: 'black' }}>
								<Grid item xs={3} style={{ margin: '20px' }}>
									{/* <Grid style={{ color: 'white' }}>{item.name}</Grid> */}
									<Button
										variant="contained"
										style={{
											backgroundColor: '#ff5252',
											width: '200px',
											fontSize: '12px',
											color: 'white'
										}}
										size="small"
									>
										<h3>{item.name}</h3>
									</Button>
								</Grid>
							</Link>
						);
					})}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		categories: state.categories
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getCategories: () => {
			dispatch(getCategories());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
