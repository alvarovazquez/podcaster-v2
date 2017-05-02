import { connect } from 'react-redux';

import EpisodeDetail from '../episode-detail/episode-detail';

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

const getEpisode = (state, podcastId, episodeId) => {
	let episodeIdAsNum = parseInt(episodeId, 10);

	if (state.podcaster.episodes[podcastId] !== undefined && episodeIdAsNum !== undefined) {
		return state.podcaster.episodes[podcastId].data[episodeIdAsNum];
	}
};

const mapStateToProps = (state, ownProps) => {
	return {
		podcast: getPodcast(state, ownProps.params.podcastId),
		episode: getEpisode(state, ownProps.params.podcastId, ownProps.params.episodeId)
	};
};

const EpisodeDetailContainer = connect(
	mapStateToProps
)(EpisodeDetail);

export default EpisodeDetailContainer;