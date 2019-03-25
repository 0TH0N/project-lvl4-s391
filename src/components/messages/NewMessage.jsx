import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Field } from 'redux-form';
import Context from '../../utilities/context';
import connect from '../../utilities/connect';
import { getChannelsIds } from '../../selectors';
import reduxFormConnect from '../../utilities/reduxFormConnect';


const mapStateToProps = (state) => {
  const props = {
    channelsIds: getChannelsIds(state),
    currentChannelId: state.currentChannelId,
  };
  return props;
};


@reduxFormConnect('newMessage')
@connect(mapStateToProps)
class NewMessage extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.focus = this.focus.bind(this);
  }


  // eslint-disable-next-line react/sort-comp
  focus() {
    this.textInput.current.focus();
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
    try {
      await sendMessage(currentChannelId, { message });
      reset();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
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
      handleSubmit, submitting, pristine, currentChannelId, channelsIds,
    } = this.props;
    // eslint-disable-next-line radix
    const currenId = typeof currentChannelId === 'number' ? currentChannelId : parseInt(currentChannelId);
    if (!channelsIds.includes(currenId)) {
      return <Col>Channel was deleted. Please, choose other channel.</Col>;
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
