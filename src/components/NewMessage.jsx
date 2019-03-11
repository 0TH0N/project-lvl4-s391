/*

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


const mapStateToProps = (state) => {
  const props = {
    text: state.text,
  };
  return props;
};


class NewMessages extends React.Component {
  addMessage = values => values.text + 1;

  render() {
    const { text, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.addMessage)}>
        New message:
        <div>
          <Field name="text" required component="input" type="text" value={text} />
        </div>
        <input type="submit" value="SEND" />
      </form>
    );
  }
}


const ConnectedNewMessage = connect(mapStateToProps)(NewMessages);

export default reduxForm({
  form: 'newMessage',
})(ConnectedNewMessage);

*/
