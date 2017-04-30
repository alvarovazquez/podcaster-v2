import fetch from 'isomorphic-fetch';

import Podcast from '../model/podcast';
import Episode from '../model/episode';

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

export const receivePodcasts = (podcasts) => ({
	type: actionTypes.RECEIVE_PODCASTS,
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

		return fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
		.then(response => response.json())
		.then(json => {
				let podcasts = [];

				if (json.feed !== undefined &&
					json.feed.entry !== undefined &&
					json.feed.entry.length !== undefined) {

					json.feed.entry.forEach((entryTmp, i) => {
						// Check information integrity
						let id;
						if (entryTmp.id !== undefined &&
							entryTmp.id.attributes !== undefined &&
							entryTmp.id.attributes['im:id'] !== undefined) {
							id = entryTmp.id.attributes['im:id'];
						} else {
							console.error("Couldn't get field 'id' for podcast %O", entryTmp);
						}

						let title;
						if (entryTmp.title !== undefined &&
							entryTmp.title.label !== undefined) {
							title = entryTmp.title.label;
						} else {
							console.warn("Couldn't get field 'title' for podcast %O", entryTmp);
						}

						let author;
						if (entryTmp['im:artist'] !== undefined &&
							entryTmp['im:artist'].label !== undefined) {
							author = entryTmp['im:artist'].label;
						} else {
							console.warn("Couldn't get field 'author' for podcast %O", entryTmp);
						}

						let description;
						if (entryTmp.summary !== undefined &&
							entryTmp.summary.label !== undefined) {
							description = entryTmp.summary.label;
							// Trick to decode HTML entities
							//description = $('<textarea />').html(description).text();
						} else {
							console.warn("Couldn't get field 'description' for podcast %O", entryTmp);
						}

						// TODO Check image size
						let image;
						if (entryTmp['im:image'] !== undefined &&
							entryTmp['im:image'][2] !== undefined &&
							entryTmp['im:image'][2].label !== undefined) {
							image = entryTmp['im:image'][2].label
						} else {
							console.warn("Couldn't get field 'image' for podcast %O", entryTmp);
						}

						if (id !== undefined) {
							// Create podcast object
							let podcast = new Podcast(id, title, author, description, image);

							// Add podcast to the list
							podcasts.push(podcast);
						}
					});

					dispatch(receivePodcasts(podcasts))
				}
			}
		)
		.catch(error => console.error(error));
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

export const receivePodcastEpisodes = (podcastId, episodes) => ({
	type: actionTypes.RECEIVE_EPISODES,
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

		let corsFeedUrl = 'https://cors-anywhere.herokuapp.com/';
		let episodesUrl = `${corsFeedUrl}https://itunes.apple.com/lookup?id=${podcastId}`;

		return fetch(
			episodesUrl,
			{
				mode: 'cors'
			}
		)
		.then(response => response.json())
		.then(data => {
			if (data.results !== undefined && data.results[0].feedUrl !== undefined) {
				// We get the actual feed and parse it to get the episode list
				fetch(`${corsFeedUrl}${data.results[0].feedUrl}?format=xml`)
				.then(response => response.text())
				.then(data => {
					let episodes = [];

					let parser = new DOMParser(),
						xmlDoc = parser.parseFromString(data, "text/xml"),
						items = xmlDoc.getElementsByTagName("item"),
						i = 0;
						
					if (items.length > 0) {
						for (i = 0; i < items.length; i += 1) {
							try {
								let title,
									titles = items[i].getElementsByTagName('title');
								if (titles.length > 0 && titles[0].childNodes.length > 0) {
									title = titles[0].childNodes[0].nodeValue;
									title = title.replace('<![CDATA[', '').replace(']]>', '');
								}

								let publishDate,
									publishDates = items[i].getElementsByTagName('pubDate');
								if (publishDates.length > 0 && publishDates[0].childNodes.length > 0) {
									let publishDateTmp = publishDates[0].childNodes[0].nodeValue;
									publishDateTmp = publishDateTmp.replace('<![CDATA[', '').replace(']]>', '');

									publishDate = new Date(publishDateTmp);
								}

								let description,
									descriptions = items[i].getElementsByTagName('description');
								if (descriptions.length > 0 && descriptions[0].childNodes.length > 0) {
									description = descriptions[0].childNodes[0].nodeValue;
									description = description.replace('<![CDATA[', '').replace(']]>', '');
								} else {
									descriptions = items[i].getElementsByTagName('summary');
									if (descriptions.length > 0 && descriptions[0].childNodes.length > 0) {
										description = descriptions[0].childNodes[0].nodeValue;
										description = description.replace('<![CDATA[', '').replace(']]>', '');
									}
								}

								let duration,
									durations = items[i].getElementsByTagName('duration');
								if (durations.length > 0 && durations[0].childNodes.length > 0) {
									duration = durations[0].childNodes[0].nodeValue;
									duration = duration.replace('<![CDATA[', '').replace(']]>', '');
								}

								let media,
									medias = items[i].getElementsByTagName('enclosure');
								if (medias.length > 0) {
									media = {
										url: medias[0].getAttribute('url'),
										type: medias[0].getAttribute('type')
									};
								}

								let episode = new Episode(i.toString(), title, publishDate, description, duration, media);

								episodes.push(episode);
							} catch (err) {
								console.error("ERROR parsing episode information", err);
							}
						}

						dispatch(receivePodcastEpisodes(podcastId, episodes));
					}
				})
				.catch(error => console.error("Couldn't get episodes information: ", error));
			} else {
				console.error("Unknown data format for podcast id = %s, Data: %O", podcastId, data);
			}
		})
		.catch();
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