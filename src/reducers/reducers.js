import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { actionTypes } from '../actions/actions';

const podcasterReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.REQUEST_PODCASTS:
			return {
				...state,
				podcasts: {
					...state.podcasts,
					loading: true
				},
				loading: true
			};
		case actionTypes.RECEIVE_PODCASTS:
			return {
				...state,
				podcasts: {
					updated: action.updated,
					data: action.podcasts,
					loading: false
				},
				loading: false
			};
		case actionTypes.REQUEST_EPISODES:
			return {
				...state,
				episodes: {
					...state.episodes,
					loading: true
				},
				loading: true
			};
		case actionTypes.RECEIVE_EPISODES:
			return {
				...state,
				episodes: {
					...state.episodes,
					[action.podcastId]: {
						updated: action.updated,
						data: action.episodes
					},
					loading: false
				},
				loading: false
			};
		default:
			return state;
	}
};

const uiReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.REQUEST_PODCASTS:
		case actionTypes.REQUEST_EPISODES:
			return {
				...state,
				loading: true
			};
		case actionTypes.RECEIVE_PODCASTS:
		case actionTypes.RECEIVE_EPISODES:
			return {
				...state,
				loading: false
			};
		case actionTypes.CHANGE_PODCAST_TEXT_FILTER:
			let filterText = action.text;
			if (filterText === "") {
				filterText = undefined;
			}

			return {
				...state,
				filter: filterText
			};
		default:
			return state;
	}
}

const podcaster = combineReducers({
	podcaster: podcasterReducer,
	UI: uiReducer,
	routing: routerReducer
});

export default podcaster;