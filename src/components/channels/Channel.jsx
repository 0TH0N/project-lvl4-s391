import React from 'react';
import { Nav, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import connect from '../../connect';


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
  handleClickCog = () => {

  }

  render() {
    const { id, name } = this.props;
    return (
      <Nav.Item key={id} style={{ wordBreak: 'break-all' }}>
        <Nav.Link eventKey={`${id}`}>
          <Row>
            <Col sm={9}>
              {name}
            </Col>
            <Col sm={3}>
              <FontAwesomeIcon icon={faCog} onClick={this.handleClickCog(id)} />
            </Col>
          </Row>
        </Nav.Link>
      </Nav.Item>
    );
  }
}


export default Channel;
