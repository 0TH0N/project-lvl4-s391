import React from 'react';
import { Nav } from 'react-bootstrap';
import connect from '../connect';


const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;
  const props = {
    channels,
    currentChannelId,
    titlesColor: 'primary',
  };
  return props;
};


@connect(mapStateToProps)
class Channel extends React.Component {
  render() {
    const { id, name } = this.props;
    return (
      <Nav.Item key={id} style={{ wordBreak: 'break-all' }}>
        <Nav.Link eventKey={`${id}`}>{name}</Nav.Link>
      </Nav.Item>
    );
  }
}


export default Channel;
