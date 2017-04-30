import React, { Component } from 'react';

import Header from './components/common/header/header';

import './app.css';

class App extends Component {
  render() {
    return (
      <div id="podcaster-wrapper">
        <Header />

        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;