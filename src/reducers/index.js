import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';


const channels = handleActions({
  [actions.newChannelAdding](state, { payload: { id, attributes } }) {
    return {
      byId: { ...state.byId, [id]: attributes },
      allIds: [...state.allIds, id],
    };
  },
  [actions.channelEditing](state, { payload: { id, attributes } }) {
    return {
      byId: { ...state.byId, [id]: attributes },
      allIds: state.allIds,
    };
  },
  [actions.channelDeleting](state, { payload: { id } }) {
    return {
      byId: _.omit(state.byId, [id]),
      allIds: state.allIds.filter(channelId => channelId !== id),
    };
  },
}, []);


const messages = handleActions({
  [actions.newMessageReceiving](state, { payload: { id, attributes } }) {
    return {
      byId: { ...state.byId, [id]: attributes },
      allIds: [...state.allIds, id],
    };
  },
  [actions.channelDeleting](state, { payload: { id } }) {
    const { byId, allIds } = state;
    const newMessagesAllIds = allIds.filter(messageId => byId[messageId].channelId !== id);
    return {
      byId: _.pick(byId, newMessagesAllIds),
      allIds: newMessagesAllIds,
    };
  },
}, []);


const currentChannelId = handleActions({
  [actions.changeCurrentChannelId](state, { payload: { id } }) {
    return parseInt(id, 10);
  },
}, 0);


const mainChannelId = handleActions({
  [actions.setMainChannelId](state, { payload: { id } }) {
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
      name: 'none',
    };
  },
}, {
  visibility: 'hide',
  name: 'none',
});


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
}, { visibility: 'hide' });


export default combineReducers({
  channels,
  messages,
  currentChannelId,
  infoModal,
  mainChannelId,
  editChannelModal,
  deleteChannelModal,
  form: formReducer,
});
