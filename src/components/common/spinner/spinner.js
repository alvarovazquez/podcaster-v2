import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './spinner.css';

class Spinner extends Component {
	loadingClass(loading) {
		if (loading === true) {
			return 'loading';
		}

		return '';
	}

	render() {
		let { loading } = this.props;

		return (
			<div id="loading-indicator" className={this.loadingClass(loading)}>
				<div className="double-bounce1"></div>
				<div className="double-bounce2"></div>
			</div>
		);
	}
}

Spinner.propTypes = {
	loading: PropTypes.bool.isRequired
};

export default Spinner;