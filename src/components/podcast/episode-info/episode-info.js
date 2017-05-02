import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';

import './episode-info.css';

class EpisodeInfo extends Component {
	getEpisodeDescriptionAsHtml(episode) {
		if (episode.description !== undefined) {
			return {
				__html: sanitizeHtml(episode.description)
			};
		} else {
			return {
				__html: '<p><em>(No description available for this episode)</em></p>'
			};
		}
	}

	render() {
		const { episode } = this.props;

		if (episode !== undefined)  {
			return (
				<section id="podcast-episode-detail">
					<h2>{episode.title || ''}</h2>

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

EpisodeInfo.propTypes = {
	episode: PropTypes.object
};

export default EpisodeInfo;