import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import gon from 'gon';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import reducers from './reducers';
import App from './components/App';
import Context from './utilities/context';
import * as actions from './actions';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext === undefined ? state => state : ext();
/* eslint-enable */
const initState = (state) => {
  const { channels, messages, currentChannelId } = state;
  const newChannelsById = channels
    .reduce((acc, channel) => ({ ...acc, [channel.id]: channel }), {});
  const newChannelsAllIds = channels.map(channel => channel.id);
  const newMessagesById = messages
    .reduce((acc, message) => ({ ...acc, [message.id]: message }), {});
  const newMessagesAllIds = messages.map(message => message.id);
  return {
    channels: {
      byId: newChannelsById,
      allIds: newChannelsAllIds,
    },
    messages: {
      byId: newMessagesById,
      allIds: newMessagesAllIds,
    },
    currentChannelId,
    mainChannelId: currentChannelId,
  };
};

const store = createStore(
  reducers,
  initState(gon),
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

const userNameFromCookies = cookies.get('userName');
const userName = userNameFromCookies !== undefined ? userNameFromCookies : faker.name.findName();
if (!userNameFromCookies) {
  cookies.set('userName', userName);
}
const socket = io();
socket.on('newMessage', (res) => {
  store.dispatch(actions.newMessageReceiving(res.data));
});
socket.on('newChannel', (res) => {
  store.dispatch(actions.newChannelAdding(res.data));
});
socket.on('renameChannel', (res) => {
  store.dispatch(actions.channelEditing(res.data));
});
socket.on('removeChannel', (res) => {
  store.dispatch(actions.channelDeleting(res.data));
});

const context = {
  userName,
};

render(
  <Provider store={store}>
    <Context.Provider value={context}>
      <App />
    </Context.Provider>
  </Provider>,
  document.getElementById('chat'),
);
