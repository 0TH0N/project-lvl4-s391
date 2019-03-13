import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import Context from '../context';


const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.currentChannelId,
  };
  return props;
};

const actionsCreators = {
  sendMessage: actions.sendMessage,
};


class NewMessage extends React.Component {
  static contextType = Context;

  addMessage = async (values) => {
    const userName = this.context;
    const {
      sendMessage, currentChannelId, reset,
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
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const inputStyle = {
      'padding-right': '30px',
      'padding-left': '30px',
      width: '100%',
    };
    return (
      <form onSubmit={handleSubmit(this.addMessage)}>
        <div className="row" style={inputStyle}>
          <div className="col-10">
            <Field name="text" required disabled={submitting} component="input" type="text" style={{ width: '100%' }} />
          </div>
          <div className="col-2">
            <input type="submit" value="SEND" />
          </div>
        </div>
      </form>
    );
  }
}

const ConnectedNewMessage = connect(mapStateToProps, actionsCreators)(NewMessage);

export default reduxForm({
  form: 'newMessage',
})(ConnectedNewMessage);
