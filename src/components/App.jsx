import React from 'react';
import {
  Tab, Row, Col, Nav, Alert,
} from 'react-bootstrap';
import Messages from './messages/Messages';
import NewMessage from './messages/NewMessage';
import connect from '../connect';
import InfoModal from './InfoModal';
import Channels from './channels/Channels';
import NewChannel from './channels/NewChannel';


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
class App extends React.Component {
  handleChangeCurrentChannelId = (id) => {
    const { changeCurrentChannelId } = this.props;
    changeCurrentChannelId({ id });
  }

  render() {
    const { currentChannelId, channels, titlesColor } = this.props;

    const tabPanes = channels.map((channel) => {
      const { id } = channel;
      return (
        <Tab.Pane key={id} eventKey={`${id}`}>
          <Messages tabId={id} />
        </Tab.Pane>
      );
    });

    return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey={`${currentChannelId}`}>
          <Row>
            <Col sm={3}>
              <Alert variant={titlesColor}>Channels:</Alert>
              <Nav variant="pills" className="flex-column" onSelect={this.handleChangeCurrentChannelId}>
                <Channels />
              </Nav>
              <NewChannel />
            </Col>
            <Col sm={9}>
              <Alert variant={titlesColor}>Messages:</Alert>
              <Tab.Content>
                {tabPanes}
              </Tab.Content>
              <NewMessage />
            </Col>
          </Row>
        </Tab.Container>
        <InfoModal />
      </div>
    );
  }
}


export default App;
