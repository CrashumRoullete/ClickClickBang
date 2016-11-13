import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class UsernameModal extends React.Component{
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.textChange = this.textChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      showModal: false,
      textValue: 'Crazy Russian',
    }
  }

  componentDidMount() {
    this.setState({ showModal: true });
  }

  close() {
    var textValue = this.state.textValue
    if (textValue === '') {
      textValue = 'Crazy Russian';
    }
    var thatSocket = this.props.socket[0];
    thatSocket.emit('join room', {
      id: thatSocket.id,
      username: textValue
    })
    this.setState({ showModal: false });
  }

  onFocus() {
    this.setState({ textValue: '' });
  }

  textChange(event){
    this.setState({ textValue: event.target.value });
  }

  render() {
    return(
      <div id="username-modal">
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Input A Username</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Choose your name</h2>
            <input type="text" value={this.state.textValue} onFocus={this.onFocus} onChange={this.textChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.close}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default UsernameModal;
