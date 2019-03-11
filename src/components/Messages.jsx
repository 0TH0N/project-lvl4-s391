import React from 'react';
import { connect } from 'react-redux';
// import NewMessage from './NewMessage';


const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
  };
  return props;
};


class Messages extends React.Component {
  renderListOfMessages() {
    const { messages } = this.props;
    if (messages === undefined || messages.length === 0) {
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
        <div>
          messages:
          {this.renderListOfMessages()}
        </div>
      </div>
    );
  }
}


export default connect(mapStateToProps)(Messages);
