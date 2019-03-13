import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import Context from '../context';
import connect from '../connect';


const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.currentChannelId,
    infoModal: state.infoModal,
  };
  return props;
};


@connect(mapStateToProps)
class NewMessage extends React.Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidUpdate() {
    this.textInput.current.getRenderedComponent().focus();
  }

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
      // eslint-disable-next-line no-console
      console.log(e);
      showInfoModal({
        title: 'ERROR!!!',
        message: `Error occured: ${e.message}`,
        color: 'danger',
      });
    }
  };


  render() {
    const { handleSubmit, submitting } = this.props;
    const inputStyle = {
      paddingRight: '30px',
      paddingLeft: '30px',
      width: '100%',
    };
    return (
      <form className="form" id="form-input" onSubmit={handleSubmit(this.addMessage)}>
        <div className="row" style={inputStyle}>
          <div className="col-9">
            <Field
              className="form-control"
              id="rsslink"
              name="text"
              required
              disabled={submitting}
              component="input"
              type="text"
              style={{ height: '50px' }}
              autoFocus
              forwardRef
              ref={this.textInput}
            />
          </div>
          <div className="col-2">
            <input type="submit" value="SEND" className="btn btn-primary btn-lg" id="button" />
          </div>
        </div>
      </form>
    );
  }
}


export default reduxForm({
  form: 'newMessage',
})(NewMessage);
