import React, { Component } from 'react';

import PodcastInfo from '../podcast-info/podcast-info';
import PodcastEpisodes from '../podcast-episodes/podcast-episodes';

import { fetchPodcastEpisodesIfNeeded } from '../../../actions/actions'
import store from '../../../store';

class PodcastDetail extends Component {
	componentWillMount() {
		store.dispatch(fetchPodcastEpisodesIfNeeded(this.props.params.podcastId));
	}

	render() {
		let { podcast, episodes } = this.props;

		return (
			<div>
				<PodcastInfo podcast={podcast} />
				<PodcastEpisodes podcast={podcast} episodes={episodes} />
			</div>
		);
	}
}

export default PodcastDetail;