import React, { Component } from 'react';
import { Link } from 'react-router';

import './podcast-info.css';

class PodcastInfo extends Component {
	renderDescription(podcast) {
		if (podcast.description !== undefined && podcast.description !== "") {
			return (
				<div className="description">
					<h3>Description:</h3>
					
					{podcast.description}
				</div>
			);
		}
		
		return null;
	}

	render() {
		let { podcast } = this.props;

		if (podcast !== undefined) {
			return (
				<section id="podcast-detail">
					<Link to={`/podcast/${podcast.id}`} title="Go back to podcast detail">
						<img src={podcast.image} alt=" Icon" />
					</Link>

					<div className="main-info">
						<Link to={`/podcast/${podcast.id}`} title="Go back to podcast detail">
							<h2>{podcast.title}</h2>
						</Link>
						<span className="author">by {podcast.author}<Link to={`/podcast/${podcast.id}`} title="Go back to podcast detail"></Link></span>
					</div>
					
					{
						this.renderDescription(podcast)
					}
				</section>
		    );
		} else {
			return null;
		}
	}
}

export default PodcastInfo;