export default class Podcast {
	constructor(id, title, author, description, image) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.description = description;
		this.image = image;
		this.episodes = [];
	}

	addEpisode(episode) {
		if (this.episodes === undefined) {
			this.episodes = [];
		}

		this.episodes.push(episode);
	}

	getEpisode(episodeId) {
		if (this.episodes !== undefined && episodeId !== undefined) {
			this.episodes.forEach((episode) => {
				if (episode.id === episodeId) {
					return episode;
				}
			});
		}
	}
}