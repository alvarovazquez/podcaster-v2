import React from 'react';

import Podcast from '../podcast/podcast';
import PodcastFilterContainer from '../podcast-filter-container/podcast-filter-container';

import './podcast-list.css';

const renderPodcasts = (podcasts) => {
	let renderedPodcasts = [];

	podcasts.forEach((podcast, index) => {
		renderedPodcasts.push(
			<li className="podcast" key={index}>
				<Podcast podcast={podcast} />
			</li>
		);

		if (index > 0 && (index + 1) % 4 === 0) {
			renderedPodcasts.push(<li className="separator" key={`sep-${index}`}></li>);
		}
	});

	return renderedPodcasts;
};

const PodcastList = ({ podcasts, onPodcastClick }) => {
	if (podcasts !== undefined && podcasts.length !== undefined) {
		return (
			<section id="podcasts">
				<PodcastFilterContainer />

				<ul className="podcast-list">
					{renderPodcasts(podcasts, onPodcastClick)}
				</ul>
			</section>
		);
	} else {
		return null;
	}
};

export default PodcastList;