import React from 'react';
import ScrollBars from 'react-custom-scrollbars';
import { ListGroup } from 'react-bootstrap';
import connect from '../../utilities/connect';


const mapStateToProps = ({ messages, currentChannelId }) => {
  const props = {
    messages,
    currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.shouldScrollBottom = false;
  }

  componentDidMount() {
    this.scrollComponent.scrollToBottom();
  }

  componentWillUpdate() {
    const scroll = this.scrollComponent.getValues();
    this.shouldScrollBottom = (scroll.clientHeight + scroll.scrollTop === scroll.scrollHeight);
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      this.scrollComponent.scrollToBottom();
    }
  }

  renderListOfMessages() {
    const { messages: { byId, allIds }, currentChannelId } = this.props;
    const listGroupItems = allIds.filter(id => byId[id].channelId === currentChannelId).map(id => (
      <ListGroup.Item key={id}>
        <span className="font-weight-bold">
          {byId[id].userName}
          :
        </span>
        {' '}
        {byId[id].text}
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
      <div className="rounded border border-secondary h-100">
        <ScrollBars ref={(c) => { this.scrollComponent = c; }}>
          {this.renderListOfMessages()}
        </ScrollBars>
      </div>
    );
  }
}


export default Messages;
