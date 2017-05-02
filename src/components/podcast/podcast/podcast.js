import React, { Component } from 'react';
import { Link } from 'react-router';

import './podcast.css';

class Podcast extends Component {
	render() {
		const { podcast } = this.props;

		return (
			<Link to={`/podcast/${podcast.id}`} title="Go to podcast detail">
				<img src={podcast.image} alt="icon" />

				<h2>{podcast.title}</h2>
				
				<span className="author">Author: {podcast.author}</span>
			</Link>
		);
	}
}

export default Podcast;