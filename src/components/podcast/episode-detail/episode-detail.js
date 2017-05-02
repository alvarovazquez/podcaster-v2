import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PodcastInfo from '../podcast-info/podcast-info';
import EpisodeInfo from '../episode-info/episode-info';

import { fetchPodcastEpisodesIfNeeded } from '../../../actions/actions';
import store from '../../../store';

class EpisodeDetail extends Component {
	componentWillMount() {
		store.dispatch(fetchPodcastEpisodesIfNeeded(this.props.params.podcastId));
	}

	render() {
		let { podcast, episode } = this.props;

		return (
			<div>
				<PodcastInfo podcast={podcast} />
				<EpisodeInfo podcast={podcast} episode={episode} />
			</div>
		);
	}
}

EpisodeDetail.propTypes = {
	params: PropTypes.shape({
		podcastId: PropTypes.string.isRequired
	}),
	podcast: PropTypes.object,
	episode: PropTypes.object
};

export default EpisodeDetail;