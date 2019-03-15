import React from 'react';
import {
  Modal, Form, Button, Col,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import connect from '../../connect';


const mapStateToProps = ({ editChannelModal }) => editChannelModal;

@connect(mapStateToProps)
class EditChannelModal extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  editChannel = async (values) => {
    const {
      hideEditChannelModal, editChannel, reset, id,
    } = this.props;
    const newChannel = {
      attributes: {
        id,
        ...values,
      },
    };
    try {
      await editChannel(newChannel);
      reset();
      hideEditChannelModal();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e.message);
    }
  }

  handleClose = () => {
    const { hideEditChannelModal } = this.props;
    hideEditChannelModal();
  }

  ReduxFormControl = ({ input, meta, ...props }) => (
    <Form.Control
      {...props}
      {...input}
      ref={this.textInput}
    />
  );

  render() {
    const {
      visibility, handleSubmit, submitting, pristine,
    } = this.props;

    return (
      <Modal show={visibility === 'show'} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing channel.</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(this.editChannel)}>
          <Modal.Body>
            <Form.Group>
              <Form.Row>
                <Col sm={2}>
                  Name:
                </Col>
                <Col sm={10}>
                  <Field
                    component={this.ReduxFormControl}
                    name="name"
                    required
                    disabled={submitting}
                  />
                </Col>
              </Form.Row>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={submitting || pristine}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}


export default reduxForm({
  form: 'editChannelForm',
})(EditChannelModal);