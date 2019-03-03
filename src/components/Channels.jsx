import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
  };
  return props;
};

class Channels extends React.Component {
  renderListOfChannels() {
    const { channels } = this.props;
    if (channels.length === 0) {
      return null;
    }
    return (
      <ul className="list-group">
        <React.Fragment>
          {channels.map(channel => <li key={channel.id} className="list-group-item">{channel.name}</li>)}
        </React.Fragment>
      </ul>
    );
  }

  render() {
    return (
      <div>
        channels:
        {this.renderListOfChannels()}
      </div>
    );
  }
}


export default connect(mapStateToProps)(Channels);
