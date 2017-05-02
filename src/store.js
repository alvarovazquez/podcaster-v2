import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { saveState, loadState } from './util/cache';

import podcastster from './reducers/reducers';

// Podcaster state initialization
const cachedPodcasterState = loadState();

const defaultState = {
	podcaster: {
		podcasts: {
			data: [],
			updated: undefined,
			loading: false
		},
		episodes: {
			loading: false
		}
	},
	UI: {
		filter: undefined,
		loading: false
	}
};

let initialState = defaultState;
if (cachedPodcasterState !== undefined) {
	initialState.podcaster = cachedPodcasterState;
}

// Create the store
const store = createStore(
	podcastster,
	initialState,
	applyMiddleware(
		thunkMiddleware
	));

// When store changes, save it to cache
store.subscribe(() => {
	saveState(store.getState().podcaster);
});

// Syncronize router with store
export const history = syncHistoryWithStore(browserHistory, store);

export default store;