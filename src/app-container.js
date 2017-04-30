import { connect } from 'react-redux'

import App from './app';

import store from './store';
import { fetchPodcastsIfNeeded } from './actions/actions';

store.dispatch(fetchPodcastsIfNeeded());

const mapStateToProps = (state) => {
	return {
		podcasts: state.podcaster.podcasts.data
	};
};

const AppContainer = connect(
	mapStateToProps
)(App);

export default AppContainer;