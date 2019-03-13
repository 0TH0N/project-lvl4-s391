import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import connect from '../connect';


const mapStateToProps = (state) => {
  const { infoModal } = state;
  return ({
    state: infoModal.state,
    title: infoModal.title,
    message: infoModal.message,
    color: infoModal.color,
  });
};

@connect(mapStateToProps)
class InfoModal extends React.Component {
  handleClose = () => {
    const { hideInfoModal } = this.props;
    hideInfoModal();
  }

  render() {
    const {
      state, title, message, color,
    } = this.props;

    return (
      <Modal show={state === 'show'} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant={color}>{message}</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default InfoModal;
