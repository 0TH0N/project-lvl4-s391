import React from 'react';
import {
  Tab, Row, Col, Nav, Alert,
} from 'react-bootstrap';
import Messages from './messages/Messages';
import NewMessage from './messages/NewMessage';
import connect from '../utilities/connect';
import InfoModal from './modals/InfoModal';
import Channels from './channels/Channels';
import NewChannel from './channels/NewChannel';
import EditChannelModal from './modals/EditChannelModal';
import DeleteChannelModal from './modals/DeleteChannelModal';


const mapStateToProps = (state) => {
  const {
    channels, currentChannelId, infoModal, editChannelModal, deleteChannelModal,
  } = state;
  const props = {
    channels,
    currentChannelId,
    titlesColor: 'primary',
    infoModal,
    editChannelModal,
    deleteChannelModal,
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
    const {
      currentChannelId, channels, titlesColor, infoModal, editChannelModal, deleteChannelModal,
    } = this.props;

    const divStyle = { height: window.screen.height * 0.8 };

    const tabPanes = channels.allIds.map(id => (
      <Tab.Pane className="h-100" key={id} eventKey={`${id}`}>
        <Messages tabId={id} />
      </Tab.Pane>
    ));

    return (
      <div style={divStyle}>
        <Tab.Container className="h-100" id="left-tabs-example" activeKey={`${currentChannelId}`} onSelect={() => null}>
          <Row className="h-100">
            <Col sm={3} className="h-100">
              <Alert variant={titlesColor}>Channels:</Alert>
              <Nav variant="pills" className="h-75" onSelect={this.handleChangeCurrentChannelId}>
                <Channels />
              </Nav>
              <br />
              <NewChannel />
            </Col>
            <Col sm={9} className="h-100">
              <Alert variant={titlesColor}>Messages:</Alert>
              <Tab.Content className="h-75">
                {tabPanes}
              </Tab.Content>
              <br />
              <NewMessage />
            </Col>
          </Row>
        </Tab.Container>
        {infoModal.visibility === 'show' ? <InfoModal /> : null}
        {editChannelModal.visibility === 'show' ? <EditChannelModal initialValues={{ name: editChannelModal.name }} /> : null}
        {deleteChannelModal.visibility === 'show' ? <DeleteChannelModal /> : null}
      </div>
    );
  }
}


export default App;
