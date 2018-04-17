import React, { Component } from 'react';
import './App.css';

import ReactCLI from './components/ReactCLI';

// TODO: Add support for copy and paste without copying the prompt sign

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactCLI />
      </div>
    );
  }
}

export default App;
