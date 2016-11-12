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
      dead: false,
    }
  }

  componentWillMount() {
    this.setState({ deadlyBullet: Math.floor(Math.random() * 6 + 1) });
  }

  getUsername(name) {
    this.setState({ username: name });
  }

  reduceShots() {
    if (this.state.deadlyBullet === this.state.shots) {
      this.setState({ dead: true });
    } else {
      this.setState({ shots: this.state.shots - 1 });
    }
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
        {
          this.state.dead
          ? <h3>BANG</h3>
          : null
        }
      </div>
    )
  }
}

export default Game;
