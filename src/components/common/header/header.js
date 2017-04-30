import React, { Component } from 'react';
import { Link } from 'react-router';

import SpinnerContainer from '../spinner-container/spinner-container'

import './header.css'

class Header extends Component {
  render() {
    return (
		<header>
			<h1>
				<Link to="/" title="Go to main list">Podcaster</Link>
			</h1>

			<SpinnerContainer />
		</header>
    );
  }
}

export default Header;