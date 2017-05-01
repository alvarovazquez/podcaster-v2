import { fetchPodcastsFromFeed, fetchPodcastEpisodesFromFeed } from '../util/podcasts';

export const actionTypes = {
	REQUEST_PODCASTS: 'REQUEST_PODCASTS',
	RECEIVE_PODCASTS: 'RECEIVE_PODCASTS',
	FETCH_PODCASTS: 'FETCH_PODCASTS',

	REQUEST_EPISODES: 'REQUEST_EPISODES',
	RECEIVE_EPISODES: 'RECEIVE_EPISODES',
	FETCH_EPISODES: 'FETCH_EPISODES',

	CHANGE_PODCAST_TEXT_FILTER: 'CHANGE_PODCAST_TEXT_FILTER',

	LOAD_PODCAST: 'LOAD_PODCAST',
	LOAD_PODCAST_EPISODE: 'LOAD_PODCAST_EPISODE'
};

export const changePodcastTextFilter = (text) => ({
	type: actionTypes.CHANGE_PODCAST_TEXT_FILTER,
	text
});

export const requestPodcasts = () => ({
	type: actionTypes.REQUEST_PODCASTS
});

export const receivePodcasts = (success, podcasts) => ({
	type: actionTypes.RECEIVE_PODCASTS,
	success,
	podcasts,
	updated: Date.now()
});

const shouldFetchPodcasts = (state) => {
	const podcasts = state.podcaster.podcasts;

	if (podcasts === undefined ||
		podcasts.data === undefined ||
		podcasts.data.length === 0) {
		return true;
	} else if (podcasts.updated === undefined &&
		new Date() - podcasts.updated <= (24 * 60 * 60 * 1000)) {
		return false;
	} else if (podcasts.loading) {
		return false;
	} else {
		return false
	}
}

const fetchPodcasts = () => {
	return function (dispatch) {
		dispatch(requestPodcasts());

		fetchPodcastsFromFeed()
		.then(podcasts => 
			dispatch(receivePodcasts(true, podcasts))
		)
		.catch(error => {
				console.error(error);

				receivePodcasts(false);
			}
		);
	};
};

export const fetchPodcastsIfNeeded = () => {
	return (dispatch, getState) => {
		if (shouldFetchPodcasts(getState())) {
			return dispatch(fetchPodcasts());
		} else {
			return Promise.resolve()
		}
	}
};

export const loadPodcast = (podcastId) => ({
	type: actionTypes.LOAD_PODCAST,
	id: podcastId
});

export const loadPodcastEpisodes = (podcastId) => ({
	type: actionTypes.LOAD_PODCAST_EPISODES,
	id: podcastId
});

export const requestPodcastEpisodes = (podcastId) => ({
	type: actionTypes.REQUEST_EPISODES
});

export const receivePodcastEpisodes = (success, podcastId, episodes) => ({
	type: actionTypes.RECEIVE_EPISODES,
	success,
	podcastId,
	episodes,
	updated: Date.now()
});

const shouldFetchPodcastEpisodes = (state, podcastId) => {
	const episodes = state.podcaster.episodes;

	if (episodes === undefined ||
		episodes[podcastId] === undefined ||
		episodes[podcastId].data === undefined ||
		episodes[podcastId].data.length === 0) {
		return true;
	} else if (episodes[podcastId].updated === undefined &&
		new Date() - episodes[podcastId].updated <= (24 * 60 * 60 * 1000)) {
		return false;
	} else if (episodes[podcastId].loading) {
		return false;
	} else {
		return false
	}
}

export const fetchPodcastEpisodes = (podcastId) => {
	return function (dispatch) {
		dispatch(requestPodcasts(podcastId));

		fetchPodcastEpisodesFromFeed(podcastId)
		.then(data =>
			dispatch(receivePodcastEpisodes(true, data.podcastId, data.episodes))
		)
		.catch(error => {
				console.error("Couldn't get episodes information: ", error);
				
				dispatch(receivePodcastEpisodes(false))
			}
		);
	};
};

export const fetchPodcastEpisodesIfNeeded = (podcastId) => {
	return (dispatch, getState) => {
		if (shouldFetchPodcastEpisodes(getState(), podcastId)) {
			return dispatch(fetchPodcastEpisodes(podcastId));
		} else {
			return Promise.resolve()
		}
	}
};