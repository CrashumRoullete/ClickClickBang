import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import io from 'socket.io-client';

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
    var socket = io('http://localhost:5000')
    socket.on('connect', function() {
      socket.emit('join room', {
        id: socket.id,
        username: textValue
      })
    })
    this.setState({ showModal: false });
    this.props.secondModal();
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
