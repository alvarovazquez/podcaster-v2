import { connect } from 'react-redux';

import PodcastFilter from '../podcast-filter/podcast-filter';

import { getFilteredPodcasts } from '../../../util/podcasts';

const getPodcastCount = (state) => {
	var filteredPodcasts = getFilteredPodcasts(state.podcaster.podcasts.data, state.UI.filter);

	return filteredPodcasts.length;
};

const mapStateToProps = (state) => {
	return {
		podcastCount: getPodcastCount(state)
	};
};

const PodcastFilterContainer = connect(
	mapStateToProps
)(PodcastFilter);

export default PodcastFilterContainer;