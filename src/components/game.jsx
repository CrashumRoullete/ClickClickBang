import React from 'react';
import UsernameModal from './modal';
import RouletteButton from './rouletteButton';

class Game extends React.Component{
  constructor(props) {
    super(props);
    this.getUsername = this.getUsername.bind(this);
    this.reduceShots = this.reduceShots.bind(this);
    this.state = {
      username: '',
      shots: 6,
    }
  }

  getUsername(name) {
    this.setState({ username: name });
  }

  reduceShots() {
    const shot = this.state.shots;
    this.setState({ shots: shot - 1 });
  }

  render() {
    return(
      <div>
        <div id="users">
          <UsernameModal getUsername={this.getUsername}/>
          <p>Hello {this.state.username}</p>
        </div>
        <div id="shots">
        Shots Remaining: {this.state.shots}
        </div>
        <RouletteButton count={this.state.shots} reduceShots={this.reduceShots} />
      </div>
    )
  }
}

export default Game;
