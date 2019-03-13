import React from 'react';
// import { connect } from 'react-redux';
import cn from 'classnames';
import NewMessage from './NewMessage';
import connect from '../connect';


const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
  };
  return props;
};

@connect(mapStateToProps)
class Messages extends React.Component {
  renderListOfMessages() {
    const { messages } = this.props;
    if (messages.length === 0) {
      return null;
    }
    const style = {
      padding: '10px',
    };
    return (
      <div>
        <React.Fragment>
          {messages.map(message => (
            <div key={message.id} style={style}>
              {message.userName}
              :
              {' '}
              {message.text}
            </div>
          ))}
        </React.Fragment>
      </div>
    );
  }

  render() {
    const messagesTitleClasses = cn({
      'list-group-item': true,
      'd-flex': true,
      'flex-row': true,
      'bg-dark': true,
      'font-weight-bold': true,
      'font-italic': true,
      'text-white': true,
      'rounded-0': true,
    });

    return (
      <div className="rounded-0">
        <div className={messagesTitleClasses}>Messages:</div>
        <div>{this.renderListOfMessages()}</div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          margin: '20px',
        }}
        >
          <NewMessage />
        </div>
      </div>
    );
  }
}


export default Messages;
