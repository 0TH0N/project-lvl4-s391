// import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


const messageSendingState = handleActions({
  [actions.sendMessageRequest]() {
    return 'requested';
  },
  [actions.sendMessageSuccess]() {
    return 'successfull';
  },
  [actions.sendMessageFailure]() {
    return 'failed';
  },
}, 'none');


const channels = handleActions({

}, []);


const messages = handleActions({
  [actions.newMessageReceiving](state, { payload: { attributes } }) {
    return [...state, attributes];
  },
}, []);
/*
const data = {
  data: {
    type: 'messages',
    id: message.id,
    attributes: message,
  },
}; */

const currentChannelId = handleActions({

}, 0);


const infoModal = handleActions({
  [actions.showInfoModal](state, { payload: { title, message, color } }) {
    return {
      state: 'show',
      title,
      message,
      color,
    };
  },
  [actions.hideInfoModal]() {
    return {
      state: 'hide',
      title: 'none',
      message: 'none',
      color: 'none',
    };
  },
}, {});


export default combineReducers({
  messageSendingState,
  channels,
  messages,
  currentChannelId,
  infoModal,
  form: formReducer,
});
