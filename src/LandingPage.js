import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './logo.svg';
import './App.css';

class LandingPage extends Component {
  render() {
    return (
      <div className="App">
        <div id="cylinder">
          <div className="sculpt one"></div>
          <div className="sculpt two"></div>
          <div className="sculpt three"></div>
          <div className="sculpt four"></div>
          <div className="sculpt five"></div>
          <div className="sculpt six"></div>

          <div className="ring center"></div>

          <div className="chamber one"><div className="bullet"><div className="ring"></div></div></div>
          <div className="chamber two"><div className="bullet"><div className="ring"></div></div></div>
          <div className="chamber three"><div className="bullet"><div className="ring"></div></div></div>
          <div className="chamber four"><div className="bullet"><div className="ring"></div></div></div>
          <div className="chamber five"><div className="bullet"><div className="ring"></div></div></div>
          <div className="chamber six"><div className="bullet"><div className="ring"></div></div></div>
        </div>
        <Link to="/game">Game</Link>
      </div>
    );
  }
}

export default LandingPage;
