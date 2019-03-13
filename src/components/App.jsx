import React from 'react';
import Channels from './Channels';
import Messages from './Messages';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <div className="rounded-0">
        <div className="row">
          <div className="col-3 p-0 bg-secondary rounded-0"><Channels /></div>
          <div className="col-9 p-0 bg-light rounded-0"><Messages /></div>
        </div>
      </div>
    );
  }
}

export default (App);
