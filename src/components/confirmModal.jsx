import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router';

class ConfirmModal extends React.Component{
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.state = {
      showModal: false,
    }
  }

  componentDidMount() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    return(
      <div id="confirm-modal">
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>FINAL WARNING</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>This is your last warning. This app intentionally crashes your browser if you lose.</p>
          </Modal.Body>
          <Modal.Footer>
            <Link to="/game">
            <Button bsStyle="danger">No Fear</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ConfirmModal;
