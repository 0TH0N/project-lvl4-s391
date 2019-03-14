import React from 'react';
import _ from 'lodash';
import {
  Form, FormControl, Button, Col,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import Context from '../context';
import connect from '../connect';


const mapStateToProps = (state) => {
  const { currentChannelId, infoModal } = state;
  const props = {
    currentChannelId,
    infoModal,
  };
  return props;
};


@connect(mapStateToProps)
class NewMessage extends React.Component {
  static contextType = Context;


  addMessage = async (values) => {
    const userName = this.context;
    const {
      sendMessage, showInfoModal, currentChannelId, reset,
    } = this.props;
    const message = {
      id: _.uniqueId(),
      channelId: currentChannelId,
      attributes:
      {
        ...values,
        userName,
      },
    };
    try {
      await sendMessage({ message });
      reset();
    } catch (e) {
      showInfoModal({
        title: 'ERROR!!!',
        message: `Error occured: ${e.message}`,
        color: 'danger',
      });
    }
  };


  render() {
    const { handleSubmit, submitting } = this.props;
    const ReduxFormControl = ({ input, meta, ...props }) => <FormControl {...props} {...input} />;

    return (
      <Form onSubmit={handleSubmit(this.addMessage)}>
        <Form.Group>
          <Form.Row>
            <Col sm={10}>
              <Field
                component={ReduxFormControl}
                name="text"
                required
                disabled={submitting}
                autoFocus
              />
            </Col>
            <Col sm={2}>
              <Button variant="primary" type="submit">SEND</Button>
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>
    );
  }
}


export default reduxForm({
  form: 'newMessage',
})(NewMessage);
