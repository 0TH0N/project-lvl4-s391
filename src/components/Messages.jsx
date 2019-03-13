import React from 'react';
// import { connect } from 'react-redux';
import cn from 'classnames';
import ScrollBars from 'react-custom-scrollbars';
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
  constructor(props) {
    super(props);
    this.scrollbar = React.createRef();
  }

  componentDidMount() {
    this.scrollComponent.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollComponent.scrollToBottom();
  }

  renderListOfMessages() {
    const { messages } = this.props;
    if (messages.length === 0) {
      return null;
    }
    const style = {
      paddingLeft: '10px',
      paddingRight: '10px',
      width: '100%',
      wordBreak: 'break-all',
    };
    return (
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

    const newMessageStyle = {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      margin: '20px',
    };

    return (
      <div className="rounded-0" style={{ height: window.screen.height * 0.7 }}>
        <div className={messagesTitleClasses}>Messages:</div>
        <ScrollBars
          style={{ height: window.screen.height * 0.55 }}
          ref={(c) => { this.scrollComponent = c; }}
        >
          {this.renderListOfMessages()}
        </ScrollBars>
        <div style={newMessageStyle}>
          <NewMessage />
        </div>
      </div>
    );
  }
}


export default Messages;
