import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import faker from 'faker';
import gon from 'gon';
import Cookies from 'js-cookie';
// import io from 'socket.io-client';
import reducers from './reducers';
import App from './components/App';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */
const initState = state => state;

const store = createStore(
  reducers,
  initState(gon),
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

const userNameFromCookies = Cookies.get('userName');
const userName = userNameFromCookies !== undefined ? userNameFromCookies : faker.name.findName();
Cookies.set('userName', userName);

const UserNameContext = React.createContext();

render(
  <Provider store={store}>
    <UserNameContext.Provider value={userName}>
      <App />
    </UserNameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
