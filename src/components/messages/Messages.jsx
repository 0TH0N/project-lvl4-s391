import React from 'react';
import ScrollBars from 'react-custom-scrollbars';
import { ListGroup } from 'react-bootstrap';
import connect from '../../connect';


const mapStateToProps = ({ messages }) => {
  const props = {
    messages,
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
    const listGroupItems = messages.filter(message => message.channelId === tabId).map(message => (
      <ListGroup.Item key={message.id}>
        <span className="font-weight-bold">
          {message.userName}
          :
        </span>
        {' '}
        {message.text}
      </ListGroup.Item>
    ));
    return (
      <ListGroup style={{ wordBreak: 'break-all' }}>
        {listGroupItems}
      </ListGroup>
    );
  }

  render() {
    return (
      <div className="rounded-0" style={{ minHeight: window.screen.height * 0.5 }}>
        <ScrollBars
          className="rounded-0 border border-secondary"
          ref={(c) => { this.scrollComponent = c; }}
          style={{ minHeight: window.screen.height * 0.48 }}
        >
          {this.renderListOfMessages()}
        </ScrollBars>
      </div>
    );
  }
}


export default Messages;
