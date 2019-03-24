import React from 'react';
import ScrollBars from 'react-custom-scrollbars';
import Channel from './Channel';
import connect from '../../utilities/connect';


const mapStateToProps = ({ channels }) => {
  const props = {
    channels,
  };
  return props;
};

@connect(mapStateToProps)
class Channels extends React.Component {
  renderListOfChannels() {
    const { channels: { byId, allIds } } = this.props;
    const navChannels = allIds.map(id => <Channel key={id} channel={byId[id]} />);
    return navChannels;
  }

  render() {
    return (
      <div className="rounded-0" style={{ minHeight: window.screen.height * 0.437 }}>
        <ScrollBars
          universal
          className="rounded-0 border border-secondary"
          style={{ minHeight: window.screen.height * 0.417 }}
        >
          {this.renderListOfChannels()}
        </ScrollBars>
      </div>
    );
  }
}


export default Channels;
