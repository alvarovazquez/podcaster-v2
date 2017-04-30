export default class Episode {
	constructor(id, title, publishDate, description, duration, media) {
		this.id = id;
		this.title = title;
		this.publishDate = publishDate;
		this.description = description;
		this.duration = duration;
		this.media = media;
	}
}