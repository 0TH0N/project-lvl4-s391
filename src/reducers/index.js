import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';


const channels = handleActions({
  [actions.newChannelAdding](state, { payload: { attributes } }) {
    return [...state, attributes];
  },
  [actions.channelEditing](state, { payload: { attributes } }) {
    const { id } = attributes;
    const index = state.findIndex(channel => channel.id === id);
    const lastIndex = state.length;
    return [...state.slice(0, index), attributes, ...state.slice(index + 1, lastIndex)];
  },
  [actions.channelDeleting](state, { payload: { id } }) {
    return state.filter(channel => channel.id !== id);
  },
}, []);


const messages = handleActions({
  [actions.newMessageReceiving](state, { payload: { attributes } }) {
    return [...state, attributes];
  },
  [actions.channelDeleting](state, { payload: { id } }) {
    return state.filter(message => message.channelId !== id);
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
    };
  },
}, { visibility: 'hide' });


const editChannelModal = handleActions({
  [actions.showEditChannelModal](state, { payload: channel }) {
    const { id, name } = channel;
    return {
      visibility: 'show',
      id,
      name,
    };
  },
  [actions.hideEditChannelModal]() {
    return {
      visibility: 'hide',
    };
  },
}, { visibility: 'hide' });


const deleteChannelModal = handleActions({
  [actions.showDeleteChannelModal](state, { payload: channel }) {
    const { id, name, removable } = channel;
    return {
      visibility: 'show',
      id,
      name,
      removable,
    };
  },
  [actions.hideDeleteChannelModal]() {
    return {
      visibility: 'hide',
    };
  },
  [actions.blockButtonsDeleteChannelModal](state) {
    return {
      ...state,
      blockedButtons: true,
    };
  },
  [actions.activateButtonsDeleteChannelModal](state) {
    return {
      ...state,
      blockedButtons: false,
    };
  },
}, { visibility: 'hide' });


export default combineReducers({
  channels,
  messages,
  currentChannelId,
  infoModal,
  editChannelModal,
  deleteChannelModal,
  form: formReducer,
});
