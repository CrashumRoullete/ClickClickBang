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
      deadlyBullet: 1,
    }
  }

  componentWillMount() {
    this.setState({ deadlyBullet: Math.floor(Math.random() * 6 + 1) });
  }

  getUsername(name) {
    this.setState({ username: name });
  }

  reduceShots() {
    this.setState({ shots: this.state.shots - 1 });
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
        <RouletteButton
        bullet={this.state.deadlyBullet}
        reduceShots={this.reduceShots}
        shot={this.state.shots}
        />
      </div>
    )
  }
}

export default Game;
