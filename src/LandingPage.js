import './App.css';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
// import UsernameModal from './components/modal';
// import ConfirmModal from './components/confirmModal';

class LandingPage extends Component {
  render() {
    return (
      <div className="App">
        <div className="header-title">CRASHUM ROULETTE</div>
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
        <div className="warning">
          <p className="warning-text">WARNING! If you lose then we get to crash your browser. THIS IS YOUR ONLY WARNING. Please make sure that you do not have any important pages open in the background when deciding to play this consequential game... Just hope that you land on an empty chamber.</p>
        </div>
        <Link to="/game"><Button>Enter Game</Button></Link>
      </div>
    );
  }
}

export default LandingPage;
