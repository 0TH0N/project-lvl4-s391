import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import Context from '../../utilities/context';
import connect from '../../utilities/connect';
import { getChannelsIds } from '../../selectors';


const mapStateToProps = (state) => {
  const props = {
    channelsIds: getChannelsIds(state),
    currentChannelId: state.currentChannelId,
    mainChannelId: state.mainChannelId,
  };
  return props;
};


@reduxForm({
  form: 'newMessage',
})
@connect(mapStateToProps)
class NewMessage extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focus = () => this.textInput.current.focus();
  }


  handleAddMessage = async (values) => {
    const { userName } = this.context;
    const {
      sendMessage, currentChannelId, reset,
    } = this.props;
    const message = {
      attributes:
      {
        ...values,
        userName,
      },
    };
    await sendMessage(currentChannelId, { message });
    reset();
    this.focus();
  };

  ReduxFormControl = ({ input, meta, ...props }) => (
    <Form.Control
      {...props}
      {...input}
      ref={this.textInput}
    />
  );

  render() {
    const {
      handleSubmit, submitting, pristine, currentChannelId,
      channelsIds, changeCurrentChannelId, mainChannelId, showInfoModal,
    } = this.props;
    if (!channelsIds.includes(currentChannelId)) {
      changeCurrentChannelId({ id: `${mainChannelId}` });
      showInfoModal({
        title: 'Channel event',
        message: 'Channel was deleted.',
        color: 'warning',
      });
    }
    return (
      <Form onSubmit={handleSubmit(this.handleAddMessage)}>
        <Form.Group>
          <Form.Row>
            <Col sm={10}>
              <Field
                component={this.ReduxFormControl}
                name="text"
                required
                disabled={submitting}
                autoFocus
              />
            </Col>
            <Col sm={2}>
              <Button variant="primary" type="submit" disabled={submitting || pristine} className="btn-block">SEND</Button>
            </Col>
          </Form.Row>
        </Form.Group>
      </Form>
    );
  }
}


export default NewMessage;
