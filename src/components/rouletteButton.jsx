import React from 'react';
import { Button } from 'react-bootstrap';

class RouletteButton extends React.Component{
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);

  }

  onClick() {
    let that = this;
    that.props.notYourTurn();
    var thatSocket = this.props.socket[0];
    thatSocket.emit('buttonClicked', { id: thatSocket.id })
    }

  render() {
    return(
      <Button bsStyle="danger" onClick={this.onClick}>Pull the Trigger</Button>
    )
  }
}

export default RouletteButton;
