import React from 'react'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'
import RouletteButton from './rouletteButton'
import io from 'socket.io-client'
import UserList from './userList'
import UsernameModel from './modal'
import './../index.css'
const bang = require('../bang.wav')

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.reduceShots = this.reduceShots.bind(this)
    this.onMongoData = this.onMongoData.bind(this)
    this.notYourTurn = this.notYourTurn.bind(this)
    this.playAgain = this.playAgain.bind(this)
    this.openSocket = this.openSocket.bind(this)
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
      winner: false
    }
  }

  componentDidMount () {
    setInterval(() => {
      const req = new XMLHttpRequest()
      req.addEventListener('load', this.onMongoData)
      req.open('GET', 'http://clickclickbang.2016.nodeknockout.com/data')
      req.send()
    }, 1000)
    this.openSocket()
  }
  openSocket () {
    let array = []

    let that = this

    var socket = io('clickclickbang.2016.nodeknockout.com', () => {
      array.push(socket)
      that.setState({ testSocket: array })
    })
    socket.on('join room', function (param) {
      that.setState({ player1: socket.username, player2: param.opponentUsername })
      that.setState({ gameOn: true })
      that.setState({ deadlyBullet: param.deadlyBullet })
    })

    socket.on('yourTurn', function (data) {
      that.setState({ yourTurn: true })
      that.setState({ shots: data.bullets })
    })

    socket.on('winner', function (data) {
      that.setState({ gameOn: false })
      that.setState({ yourTurn: false })
      that.setState({ winner: true })
      socket.disconnect()
    })
  }

  onMongoData (data) {
    let people = JSON.parse(data.currentTarget.response)
    this.setState({ users: people })
  }

  reduceShots () {
    if (this.state.deadlyBullet === this.state.shots) {
      const bangSound = new Audio(bang)
      bangSound.play()
      this.setState({ dead: true })
      this.state.testSocket[0].emit('rip', { id: this.state.testSocket[0].id })
      setTimeout(function () {
        var punishments = [function () {
          var urls = [
            'https://www.youtube.com/watch?v=q6EoRBvdVPQ&list=PL7XlqX4npddfrdpMCxBnNZXg2GFll7t5y',
            'https://www.youtube.com/watch?v=5DqB0hx-H4E',
            'http://superlogout.com/',
            'https://www.youtube.com/watch?v=pw5wR9u_phQ',
            'https://www.youtube.com/watch?v=emsJNFsaZ6s',
            'https://www.youtube.com/watch?v=WFSh6vkwlb8',
            'https://www.youtube.com/watch?v=seKaU-qQuts',
            'https://www.youtube.com/watch?v=MtN1YnoL46Q',
            'https://www.youtube.com/watch?v=OZBWfyYtYQY'
          ]
          window.location.href = urls[Math.floor(Math.random() * urls.length)]
        }, function () {
          var txt = 'goodbye sweet prince'
          while (true) {
            txt = txt += 'abcdefg, I love cats when they go meow'
          }
        }, function () {
          while (true) {
            window.alert('Are you feeling it now Mr. Krabs??')
          }
        }
      ]
        punishments[Math.floor(Math.random() * punishments.length)]()
      }, 2500)
    } else {
      this.setState({ shots: this.state.shots - 1 })
    }
  }

  notYourTurn () {
    this.setState({ yourTurn: false })
  }

  playAgain () {
    this.openSocket()
    var thatSocket = this.props.socket[0]
    thatSocket.emit('join room', {
      id: thatSocket.id,
      username: thatSocket.username
    })
  }

  render () {
    return (
      <div>
        <UsernameModel socket={this.state.testSocket} />
        {
        !this.state.gameOn
        ?
          <div id='users'>
            <h3>Queue</h3>
            <UserList users={this.state.users} />
          </div>
        : null
      }
        {
        this.state.gameOn
        ?
          <div>
            <h2>You are facing off against <span id='player-name'>{this.state.player2}</span></h2>
            <div id='shots'>
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
                shot={this.state.shots}
                bullet={this.state.deadlyBullet}
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
          ? <h3>You have died, your going on the ruse cruise.</h3>
          : null
        }
        {
          this.state.winner
          ?
            <div>
              <h2>YOU WIN</h2>
              <img alt='Winner!' src='https://media.giphy.com/media/1ofR3QioNy264/giphy.gif' />
              <h3>
                <p>You may now safely close this window to exit the game</p>
              </h3>
              <br />
              <p>or</p>
              <br />
              <Link to='/'><Button onClick={this.playAgain} bsStyle='danger'>Play Again</Button></Link>

            </div>
          : null
        }
      </div>
    )
  }
}

export default Game
