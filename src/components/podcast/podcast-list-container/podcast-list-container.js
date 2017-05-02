import { connect } from 'react-redux';

import PodcastList from '../podcast-list/podcast-list';

import { getFilteredPodcasts } from '../../../util/podcasts';

const getVisiblePodcasts = (state) => {
	return getFilteredPodcasts(state.podcaster.podcasts.data, state.UI.filter);
};

const mapStateToProps = (state) => {
	return {
		podcasts: getVisiblePodcasts(state)
	};
};

const PodcastListContainer = connect(
	mapStateToProps
)(PodcastList);

export default PodcastListContainer;