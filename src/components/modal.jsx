import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router';

class UsernameModal extends React.Component{
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.textChange = this.textChange.bind(this);
    this.state = {
      showModal: false,
      textValue: 'Crazy Russian',
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
          <Modal.Body>
            <input type="text" value={this.state.textValue} onChange={this.textChange} />
          </Modal.Body>
          <Modal.Footer>
            <Link to="/game">
              <Button bsStyle="primary" onClick={this.close}>Save</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default UsernameModal;
