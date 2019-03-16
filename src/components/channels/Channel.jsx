import React from 'react';
import {
  Nav, Row, Col, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import connect from '../../utilities/connect';


const mapStateToProps = () => {
  const props = {

  };
  return props;
};


@connect(mapStateToProps)
class Channel extends React.Component {
  // eslint-disable-next-line react/sort-comp
  editChannel = () => {
    const { showEditChannelModal, channel } = this.props;
    showEditChannelModal(channel);
  };

  deleteChannel = () => {
    const { showDeleteChannelModal, channel } = this.props;
    showDeleteChannelModal(channel);
  };

  tooltip = (
    <Tooltip>
      <FontAwesomeIcon icon={faEdit} onClick={this.editChannel} />
      {' '}
      {/* eslint-disable-next-line */}
      {this.props.channel.removable && <FontAwesomeIcon icon={faTrashAlt} onClick={this.deleteChannel} />}
    </Tooltip>
  );


  render() {
    const { channel: { id, name } } = this.props;
    return (
      <Nav.Item key={id} style={{ wordBreak: 'break-all' }}>
        <Nav.Link eventKey={`${id}`}>
          <Row>
            <Col sm={10}>
              {name}
            </Col>
            <Col sm={2}>
              <OverlayTrigger trigger="click" placement="left" overlay={this.tooltip} rootClose show>
                <FontAwesomeIcon icon={faCog} />
              </OverlayTrigger>
            </Col>
          </Row>
        </Nav.Link>
      </Nav.Item>
    );
  }
}


export default Channel;
