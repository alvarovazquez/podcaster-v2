import React, { Component } from 'react';

import PodcastEpisode from '../podcast-episode/podcast-episode';

import './podcast-episodes.css';

class PodcastEpisodes extends Component {
	renderEpisodes(podcast, episodes) {
		let renderedEpisodes = [];

		episodes.forEach((episode, index) => {
			renderedEpisodes.push(<PodcastEpisode podcast={podcast} episode={episode} key={index} />);
		});

		return renderedEpisodes;
	}

	render() {
		let { podcast, episodes } = this.props;

		if (episodes !== undefined && episodes.length > 0) {
			return (
				<section id="podcast-episodes">
					<header><h2>Episodes: {episodes.length}</h2></header>

					<div className="episodes">
						<table className="episode-list">
							<thead>
								<tr>
									<th>Title</th>
									<th>Date</th>
									<th className="duration">Duration</th>
								</tr>
							</thead>

							<tbody>
								{
									this.renderEpisodes(podcast, episodes)
								}
							</tbody>
						</table>
					</div>
				</section>
		    );
		} else {
			return null;
		}
	}
}

export default PodcastEpisodes;