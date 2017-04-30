import React, { Component } from 'react';

import { changePodcastTextFilter } from '../../../actions/actions';

import store from '../../../store';

import './podcast-filter.css';

class PodcastDetail extends Component {
	changeFilter(event) {
		store.dispatch(changePodcastTextFilter(event.target.value));
	}

	render() {
		let { podcastCount } = this.props;

		return (
			<div id="podcast-filter">
				<span id="podcast-filter-qty">
					{podcastCount}
				</span>
				
				<input id="podcast-filter-text"
				       type="text"
				       placeholder="Filter podcasts.."
				       onKeyUp={this.changeFilter} />
			</div>
		);
	}
}

export default PodcastDetail;