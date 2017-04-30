import React, { Component } from 'react';
import sanitizeHtml from 'sanitize-html';

import './episode-info.css';

class EpisodeInfo extends Component {
	getEpisodeDescriptionAsHtml(episode) {
		return {
			__html: sanitizeHtml(episode.description)
		};
	}

	render() {
		const { episode } = this.props;

		if (episode !== undefined)  {
			return (
				<section id="podcast-episode-detail">
					<h2>{episode.title}</h2>

					<div className="podcast-episode-description"
						 dangerouslySetInnerHTML={this.getEpisodeDescriptionAsHtml(episode)} />

					<audio controls>
						<source src={episode.media.url} type={episode.media.type} />
					</audio>
				</section>
			);
		} else {
			return null;
		}
	}
}

export default EpisodeInfo;