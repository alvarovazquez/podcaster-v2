import { connect } from 'react-redux';

import PodcastDetail from '../podcast-detail/podcast-detail';

const getPodcast = (state, podcastId) => {
	let currentPodcast;

	if (state.podcaster.podcasts.data !== undefined) {
		state.podcaster.podcasts.data.forEach(podcast => {
			if (podcast.id === podcastId) {
				currentPodcast = podcast;
			}
		});
	}

	return currentPodcast;
};

const getEpisodes = (state, podcastId) => {
	if (state.podcaster.episodes[podcastId]) {
		return state.podcaster.episodes[podcastId].data;
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		podcast: getPodcast(state, ownProps.params.podcastId),
		episodes: getEpisodes(state, ownProps.params.podcastId)
	};
};

const PodcastDetailContainer = connect(
	mapStateToProps
)(PodcastDetail);

export default PodcastDetailContainer;