import React, { Component } from 'react';

import './episode-info.css';

class EpisodeInfo extends Component {
  render() {
  	const { episode } = this.props;

  	if (episode !== undefined)  {
		return (
			<section id="podcast-episode-detail">
				<h2>{episode.title}</h2>

				<div className="podcast-episode-description">
					{episode.description}
				</div>

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