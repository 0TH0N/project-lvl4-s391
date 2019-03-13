import React from 'react';
import Channels from './Channels';
import InfoModal from './InfoModal';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <div>
        <Channels />
        <InfoModal />
      </div>
    );
  }
}

export default (App);
