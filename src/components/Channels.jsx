import React from 'react';
import _ from 'lodash';
import cn from 'classnames';
// import { connect } from 'react-redux';
// import * as actions from '../actions';
import connect from '../connect';


const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;
  const props = {
    channels,
    currentChannelId,
  };
  return props;
};


@connect(mapStateToProps)
class Channels extends React.Component {
  renderListOfChannels() {
    const { channels, currentChannelId } = this.props;
    if (channels.length === 0) {
      return null;
    }

    const makeCn = id => cn({
      'list-group-item': true,
      'list-group-item-action': true,
      'rounded-0': true,
      'text-white': true,
      'bg-secondary': id !== currentChannelId,
      'bg-primary': id === currentChannelId,
      active: id === currentChannelId,
    });

    return (
      <div className="list-group rounded-0">
        <React.Fragment>
          {channels.map(channel => (
            <button type="button" key={channel.id} className={makeCn(channel.id)}>
              {channel.name}
            </button>
          ))}
        </React.Fragment>
      </div>
    );
  }

  render() {
    const channelsTitleClasses = cn({
      'list-group-item': true,
      'bg-dark': true,
      'font-weight-bold': true,
      'font-italic': true,
      'text-white': true,
      'rounded-0': true,
    });

    return (
      <div className="rounded-0" style={{ height: window.screen.height * 0.7 }}>
        <div className={channelsTitleClasses}>Channels:</div>
        {this.renderListOfChannels()}
      </div>
    );
  }
}


export default Channels;
