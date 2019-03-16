import React from 'react';
import {
  Tab, Row, Col, Nav, Alert,
} from 'react-bootstrap';
import Messages from './messages/Messages';
import NewMessage from './messages/NewMessage';
import connect from '../connect';
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
        <Tab.Container id="left-tabs-example" activeKey={`${currentChannelId}`} onSelect={() => null}>
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
        {infoModal.visibility === 'show' ? <InfoModal /> : null}
        {editChannelModal.visibility === 'show' ? <EditChannelModal initialValues={{ name: editChannelModal.name }} /> : null}
        {deleteChannelModal.visibility === 'show' ? <DeleteChannelModal /> : null}
      </div>
    );
  }
}


export default App;
