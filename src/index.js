import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { Provider } from 'react-redux';

import AppContainer from './app-container';
import PodcastListContainer from './components/podcast/podcast-list-container/podcast-list-container';
import PodcastDetailContainer from './components/podcast/podcast-detail-container/podcast-detail-container';
import EpisodeDetailContainer from './components/podcast/episode-detail-container/episode-detail-container';

import store, { history } from './store';

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={AppContainer}>
				<IndexRoute component={PodcastListContainer} />

				<Route path="podcast/:podcastId" component={PodcastDetailContainer} />
				<Route path="podcast/:podcastId/episode/:episodeId" component={EpisodeDetailContainer} />
			</Route>

			<Redirect from="*" to="/" />
		</Router>
	</Provider>,
	document.getElementById('podcaster-container')
);