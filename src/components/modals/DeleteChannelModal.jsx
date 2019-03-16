import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import connect from '../../connect';


const mapStateToProps = ({ deleteChannelModal }) => deleteChannelModal;

@connect(mapStateToProps)
class DeleteChannelModal extends React.Component {
  handleClose = () => {
    const { hideDeleteChannelModal } = this.props;
    hideDeleteChannelModal();
  }

  handleDeleteChannel = async () => {
    const {
      deleteChannel, hideDeleteChannelModal, id, removable,
      blockButtonsDeleteChannelModal, activateButtonsDeleteChannelModal,
    } = this.props;
    if (!removable) {
      return;
    }
    const newChannel = {
      attributes: {
        id,
      },
    };
    try {
      blockButtonsDeleteChannelModal();
      await deleteChannel(newChannel);
      activateButtonsDeleteChannelModal();
      hideDeleteChannelModal();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      activateButtonsDeleteChannelModal();
    }
  }

  render() {
    const { name, blockedButtons } = this.props;
    return (
      <Modal show onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete channel.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            Do you really want delete
            <span className="font-weight-bold text-danger">
              {' "'}
              {name}
              {'" '}
            </span>
            channel?
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose} disabled={blockedButtons}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleDeleteChannel} disabled={blockedButtons}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default DeleteChannelModal;
