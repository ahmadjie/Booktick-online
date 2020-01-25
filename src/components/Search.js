import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyword: ''
		}
	}

	onChangeKeyword = (e) => {
		this.setState({ keyword: e.target.value })
	}

	handleKeyDown = (e) => {

		if (e.keyCode === 13) {
			window.location = `/search/${this.state.keyword}`
		}
	}

	render() {
		return (
			<div onKeyDown={this.handleKeyDown}>
				<TextField label="Search" type="search" color="Secondary" onChange={this.onChangeKeyword} value={this.state.keyword} fullWidth style={{ width: '95%', margin: 'auto', marginTop: '5%' }} />
			</div>

		);
	}
}

export default Search;
