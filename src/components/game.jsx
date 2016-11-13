import React from 'react';
import RouletteButton from './rouletteButton';
import io from 'socket.io-client';
import UserList from './userList';
import UsernameModel from './modal';

class Game extends React.Component{
  constructor(props) {
    super(props);
    this.reduceShots = this.reduceShots.bind(this);
    this.onMongoData = this.onMongoData.bind(this);
    this.notYourTurn = this.notYourTurn.bind(this);
    this.state = {
      users: '',
      shots: 6,
      deadlyBullet: 1,
      dead: false,
      testSocket: '',
      turn: 1,
      gameOn: false,
      player1: null,
      player2: null,
      yourTurn: false,
    }
  }

  componentWillMount() {
    this.setState({ deadlyBullet: Math.floor(Math.random() * 6 + 1) });
  }

  componentDidMount() {
    setInterval(() => {
      const req = new XMLHttpRequest();
      req.addEventListener('load', this.onMongoData);
      req.open('GET', 'http://localhost:5000/data');
      req.send();
    }, 1000)

    let array = [];

    let that = this;

    var socket = io('http://localhost:5000')
    socket.on('join room', function(param) {
      that.setState({ player1: socket.id, player2: param.opponentId })
      that.setState({ gameOn: true })
    })

    socket.on('yourTurn', function(data) {
      that.setState({ yourTurn: true });
    })

    array.push(socket);
    this.setState({ testSocket: array });
  }

  onMongoData(data) {
    let people = JSON.parse(data.currentTarget.response);
    this.setState({ users: people });
  }

  reduceShots() {
    if (this.state.deadlyBullet === this.state.shots) {
      this.setState({ dead: true });
    } else {
      this.setState({ shots: this.state.shots - 1 });
    }
  }

  notYourTurn() {
    this.setState({ yourTurn: false });
  }

  render() {
    return(
      <div>
        <div id="users">
          <UsernameModel socket={this.state.testSocket}/>
          <h3>Users</h3>
          <UserList users={this.state.users} />
        </div>
        <div id="shots">
          Shots Remaining: {this.state.shots}
        </div>
        {(this.state.gameOn && this.state.yourTurn)
          ?<RouletteButton
              socket={this.state.testSocket}
              reduceShots={this.reduceShots}
              notYourTurn={this.notYourTurn}
              />
          : null
        }
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
