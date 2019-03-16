import React from 'react';
import {
  Modal, Button, Alert, Form,
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import connect from '../../utilities/connect';


const mapStateToProps = ({ deleteChannelModal }) => deleteChannelModal;

@connect(mapStateToProps)
class DeleteChannelModal extends React.Component {
  handleClose = () => {
    const { submitting } = this.props;
    if (submitting) {
      return;
    }
    const { hideDeleteChannelModal } = this.props;
    hideDeleteChannelModal();
  }

  handleDeleteChannel = async () => {
    const { deleteChannel, hideDeleteChannelModal, id } = this.props;
    const channel = { attributes: { id } };
    try {
      await deleteChannel(channel);
      hideDeleteChannelModal();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  render() {
    const { name, handleSubmit, submitting } = this.props;
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
          <Form onSubmit={handleSubmit(this.handleDeleteChannel)}>
            <Button variant="secondary" onClick={this.handleClose} disabled={submitting}>
              Cancel
            </Button>
            {' '}
            <Button variant="primary" type="submit" disabled={submitting}>
              Delete
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default reduxForm({
  form: 'deleteModal',
})(DeleteChannelModal);
