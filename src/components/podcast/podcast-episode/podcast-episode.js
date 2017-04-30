import React, { Component } from 'react';

import { Link } from 'react-router';

import './podcast-episode.css';

class PodcastEpisode extends Component {
	renderPublishDate(dateAsString) {
		const date = new Date(dateAsString);
		return date.getDate() + "/" + (date.getUTCMonth() + 1) + "/" + date.getFullYear();
	}

	renderDuration(duration) {
		if (duration === undefined || duration === null) {
			return '--:--';
		} else if (duration.length > 0 && isNaN(duration)) {
			let durationElements = duration.split(':'),
				formattedDuration = "",
				i;
			
			if (durationElements.length > 0) {
				for (i = durationElements.length - 1; i >= 0; i -= 1) {
					durationElements[i] = durationElements[i].trim();
					
					if (durationElements.length > 2 && i === 0 && (durationElements[i] === "0" || durationElements[i] === "00")) {
						durationElements.splice(i, 1);
						
						break;
					}
					
					if (durationElements[i].length < 2) {
						durationElements[i] = '0' + durationElements[i];
					}
				}
				
				formattedDuration = durationElements.join(':');
			} else {
				formattedDuration = duration
			}
			
			return formattedDuration;
		} else {
			let hours = Math.floor(duration / 3600),
				minutes = Math.floor(duration % 3600 / 60),
				seconds = Math.floor(duration % 3600 % 60);
			
			return ((hours > 0 ? (hours < 10 ? "0" : "") + hours + ":" : "") + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
		}
	}

	render() {
		let { podcast, episode } = this.props;

		if (podcast !== undefined && episode !== undefined) {
			return (
				<tr>
					<td><Link to={`/podcast/${podcast.id}/episode/${episode.id}`} title={`Listen to ${episode.title}`}>{episode.title}</Link></td>
					<td>{this.renderPublishDate(episode.publishDate)}</td>
					<td className="duration">{this.renderDuration(episode.duration)}</td>
				</tr>
			);
		} else {
			return null;
		}
	}
}

export default PodcastEpisode;