import React from 'react';
import Channels from './Channels';
import Messages from './Messages';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4"><Channels /></div>
          <div className="col-8"><Messages /></div>
        </div>
      </div>
    );
  }
}

export default (App);
