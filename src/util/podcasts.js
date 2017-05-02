import fetch from 'isomorphic-fetch';

import Podcast from '../model/podcast';
import Episode from '../model/episode';

const PODCAST_CONFIG = {
	PODCASTS_FEED_URL: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
	EPISODES_FEED_URL: 'https://itunes.apple.com/lookup?id=',
	CORS_PROXY_URL: 'https://cors-anywhere.herokuapp.com/'
}

export const getFilteredPodcasts = (podcasts, filter) => {
	let filteredPodcasts = [];

	if (podcasts !== undefined && podcasts.length !== undefined) {
		if (filter !== undefined && filter !== "") {
			podcasts.forEach((podcast) => {
				if (podcast.title.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
					podcast.author.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
					filteredPodcasts.push(podcast);
				}
			});
		} else {
			filteredPodcasts = podcasts;
		}
	}
	
	return filteredPodcasts;
};

export const fetchPodcastsFromFeed = () => {
	return fetch(PODCAST_CONFIG.PODCASTS_FEED_URL)
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
					} else {
						console.warn("Couldn't get field 'description' for podcast %O", entryTmp);
					}

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

				return podcasts;
			} else {
				throw("ERROR parsing podcast information");
			}
		}
	);
};

export const fetchPodcastEpisodesFromFeed = (podcastId) => {
	return fetch(
		`${PODCAST_CONFIG.CORS_PROXY_URL}${PODCAST_CONFIG.EPISODES_FEED_URL}${podcastId}`,
		{
			mode: 'cors'
		}
	)
	.then(response => response.json())
	.then(data => {
		if (data.results !== undefined && data.results[0].feedUrl !== undefined) {
			// We get the actual feed and parse it to get the episode list
			return data.results[0].feedUrl;
		} else {
			throw("ERROR Unknown data format for podcast id = %s, Data: %O", podcastId, data);
		}
	})
	.then(feedUrl => {
		let parameterPrefix = "?";
		if (feedUrl.indexOf("?") > -1) {
			parameterPrefix = "&";
		}

		return fetch(`${PODCAST_CONFIG.CORS_PROXY_URL}${feedUrl}${parameterPrefix}format=xml`);
	})
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
					throw("ERROR parsing episode information", err);
				}
			}

			return {
				podcastId,
				episodes
			};
		} else {
			throw("ERROR parsing podcast episodes information");
		}
	});
};