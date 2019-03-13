import React from 'react';
import {
  Tab, Row, Col, Nav, Alert,
} from 'react-bootstrap';
import Messages from './Messages';
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
class Channels extends React.Component {
  render() {
    const { currentChannelId, channels, titlesColor } = this.props;

    const navChannels = channels.map((channel) => {
      const { id, name } = channel;
      return (
        <Nav.Item key={id}>
          <Nav.Link eventKey={`${id}`}>{name}</Nav.Link>
        </Nav.Item>
      );
    });

    const tabPanes = channels.map((channel) => {
      const { id } = channel;
      return (
        <Tab.Pane key={id} eventKey={`${id}`}>
          <Messages tabId={id} />
        </Tab.Pane>
      );
    });

    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey={`${currentChannelId}`}>
        <Row>
          <Col sm={3}>
            <Alert variant={titlesColor}>Channels:</Alert>
            <Nav variant="pills" className="flex-column">
              {navChannels}
            </Nav>
          </Col>
          <Col sm={9}>
            <Alert variant={titlesColor}>Messages:</Alert>
            <Tab.Content>
              {tabPanes}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}


export default Channels;
