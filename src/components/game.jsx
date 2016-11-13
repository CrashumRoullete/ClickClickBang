import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import RouletteButton from './rouletteButton';
import io from 'socket.io-client';
import UserList from './userList';
import UsernameModel from './modal';
import './../index.css';

class Game extends React.Component{
  constructor(props) {
    super(props);
    this.reduceShots = this.reduceShots.bind(this);
    this.onMongoData = this.onMongoData.bind(this);
    this.notYourTurn = this.notYourTurn.bind(this);
    this.state = {
      users: '',
      shots: 6,
      deadlyBullet: null,
      dead: false,
      testSocket: '',
      turn: 1,
      gameOn: false,
      player1: null,
      player2: null,
      yourTurn: false,
      winner: false,
    }
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
      that.setState({ player1: socket.username, player2: param.opponentUsername });
      that.setState({ gameOn: true });
      that.setState({ deadlyBullet: param.deadlyBullet });
    })

    socket.on('yourTurn', function(data) {
      that.setState({ yourTurn: true });
      that.setState({ shots: data.bullets });
    })

    socket.on('winner', function(data) {
      that.setState({ gameOn: false });
      that.setState({ yourTurn: false });
      that.setState({ winner: true });
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
      this.state.testSocket[0].emit('rip', { id: this.state.testSocket[0].id });
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
      <UsernameModel socket={this.state.testSocket}/>
      {
        !this.state.gameOn
        ?
        <div id="users">
          <h3>Users</h3>
          <UserList users={this.state.users} />
        </div>
        : null
      }
      {
        this.state.gameOn
        ?
        <div>
          <h2>You are facing off against <span id="player-name">{this.state.player2}</span></h2>
          <div id="shots">
            <p>Bullets Remaining: {this.state.shots}</p>
          </div>
        </div>
        : null
      }
      {
        (this.state.gameOn && !this.state.yourTurn && !this.state.dead)
        ?
        <h2>It is the other players turn</h2>
        : null
      }
        {(this.state.gameOn && this.state.yourTurn)
          ?
          <div>
            <RouletteButton
                socket={this.state.testSocket}
                reduceShots={this.reduceShots}
                notYourTurn={this.notYourTurn}
            />
          </div>
          : null
        }
        {
          (!this.state.gameOn && !this.state.winner)
          ? <h3>Waiting for another player to join...</h3>
          : null
        }
        {
          this.state.dead
          ? <h3>BANG</h3>
          : null
        }
        {
          this.state.winner
          ?
          <div>
            <h3>YOU WIN</h3>
            <img alt="Winner!" src={'http://ichef.bbci.co.uk/childrens-responsive-ichef/r/400/1x/cbeebies/lets-celebrate_brand_logo_bid.png'}/>
            <p>You may now safely close this window to exit the game</p>
            <br />
            <p>or</p>
            <br />
            <Link to="/"><Button bsStyle="danger">Play Again</Button></Link>

          </div>
          : null
        }
      </div>
    )
  }
}

export default Game;
