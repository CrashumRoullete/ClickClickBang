import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class UsernameModal extends React.Component{
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.textChange = this.textChange.bind(this);
    this.state = {
      showModal: false,
      textValue: 'Username',
    }
  }

  componentDidMount() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
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
          <input type="text" value={this.state.textValue} onChange={this.textChange} />
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.close}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default UsernameModal;
