import React from 'react';
// import { Alert } from 'react-bootstrap';
import ScrollBars from 'react-custom-scrollbars';
import { ListGroup } from 'react-bootstrap';
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
    const { messages, tabId } = this.props;
    if (messages.length === 0) {
      return null;
    }

    return (
      <ListGroup style={{ wordBreak: 'break-all' }}>
        {messages.filter(message => message.channelId === tabId).map(message => (
          <ListGroup.Item key={message.id}>
            {message.userName}
            :
            {' '}
            {message.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  render() {
    const { tabId } = this.props;

    const newMessageStyle = {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      margin: '20px',
    };

    return (
      <div className="rounded-0" style={{ minHeight: window.screen.height * 0.5 }}>
        <ScrollBars
          ref={(c) => { this.scrollComponent = c; }}
          autoHeight
          autoHeightMin={window.screen.height * 0.4}
        >
          {this.renderListOfMessages()}
        </ScrollBars>
        <div style={newMessageStyle}>
          <NewMessage tabId={tabId} />
        </div>
      </div>
    );
  }
}


export default Messages;
