// import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


const channels = handleActions({
  [actions.newChannelAdding](state, { payload: { attributes } }) {
    return [...state, attributes];
  },
}, []);


const messages = handleActions({
  [actions.newMessageReceiving](state, { payload: { attributes } }) {
    return [...state, attributes];
  },
}, []);


const currentChannelId = handleActions({
  [actions.changeCurrentChannelId](state, { payload: { id } }) {
    return id;
  },
}, 0);


const infoModal = handleActions({
  [actions.showInfoModal](state, { payload: { title, message, color } }) {
    return {
      visibility: 'show',
      title,
      message,
      color,
    };
  },
  [actions.hideInfoModal]() {
    return {
      visibility: 'hide',
      title: 'none',
      message: 'none',
      color: 'none',
    };
  },
}, {});


export default combineReducers({
  channels,
  messages,
  currentChannelId,
  infoModal,
  form: formReducer,
});
