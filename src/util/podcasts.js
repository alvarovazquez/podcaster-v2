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