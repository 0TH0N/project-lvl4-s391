import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import faker from 'faker';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import _ from 'lodash';
import reducers from './reducers';
import App from './components/App';
import Context from './context';
import * as actions from './actions';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext === undefined ? state => state : ext();
/* eslint-enable */
const initState = state => state;

const store = createStore(
  reducers,
  initState(window.gon),
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

const userNameFromCookies = Cookies.get('userName');
const userName = userNameFromCookies !== undefined ? userNameFromCookies : faker.name.findName();
Cookies.set('userName', userName);

const socket = io();
socket.on('newMessage', (res) => {
  store.dispatch(actions.newMessageReceiving(res.data));
});


render(
  <Provider store={store}>
    <Context.Provider value={userName}>
      <App />
    </Context.Provider>
  </Provider>,
  document.getElementById('chat'),
);
