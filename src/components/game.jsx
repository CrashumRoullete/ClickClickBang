import React from 'react';
import RouletteButton from './rouletteButton';
import UserList from './userList';

class Game extends React.Component{
  constructor(props) {
    super(props);
    this.reduceShots = this.reduceShots.bind(this);
    this.onMongoData = this.onMongoData.bind(this);
    this.state = {
      users: '',
      shots: 6,
      deadlyBullet: 1,
      dead: false,
    }
  }

  componentWillMount() {
    this.setState({ deadlyBullet: Math.floor(Math.random() * 6 + 1) });
  }

  componentDidMount() {
    const req = new XMLHttpRequest();
    req.addEventListener('load', this.onMongoData);
    req.open('GET', 'http://localhost:5000/data');
    req.send();
  }

  onMongoData(data) {
    let people = JSON.parse(data.currentTarget.response)
    this.setState({ users: people });
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
          <h3>Users</h3>
          <UserList users={this.state.users} />
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
