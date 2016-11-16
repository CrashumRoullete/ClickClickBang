import React from 'react'
import { Button } from 'react-bootstrap'
import revolver from '../revolver.svg'
const click = require('../trigger.wav')
const bang = require('../bang.wav')

class RouletteButton extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    let that = this
    that.props.reduceShots()
    if (this.props.shots === this.props.bullet) {
      const bangSound = new Audio(bang)
      bangSound.play()
    } else {
      const clickSound = new Audio(click)
      clickSound.play()
    }
    that.props.notYourTurn()
    var thatSocket = this.props.socket[0]
    thatSocket.emit('buttonClicked', { id: thatSocket.id })
  }

  render () {
    return (
      <Button bsStyle='danger' onClick={this.onClick}><img alt='revolver' id='revolver-svg' src={revolver} /> Pull the Trigger</Button>
    )
  }
}

export default RouletteButton
