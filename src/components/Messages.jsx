import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
  };
  return props;
};


class Messages extends React.Component {
  renderListOfMessages() {
    const { messages } = this.props;
    if (messages.length === 0) {
      return null;
    }
    return (
      <ul>
        <React.Fragment>
          {messages.map(message => <li key={message.id}>{message.attributes}</li>)}
        </React.Fragment>
      </ul>
    );
  }

  render() {
    return (
      <div>
        messages:
        {this.renderListOfMessages()}
      </div>
    );
  }
}


export default connect(mapStateToProps)(Messages);
