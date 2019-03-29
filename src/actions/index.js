import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utilities/routes';


export const changeCurrentChannelId = createAction('CURRENT_CHANNEL_ID_CHANGING');
export const setMainChannelId = createAction('MAIN_CHANNEL_ID_GETTING');

export const showInfoModal = createAction('INFO_MODAL_SHOWING');
export const hideInfoModal = createAction('INFO_MODAL_HIDING');

export const showEditChannelModal = createAction('EDIT_CHANNEL_MODAL_SHOWING');
export const hideEditChannelModal = createAction('EDIT_CHANNEL_MODAL_HIDING');

export const showDeleteChannelModal = createAction('DELETE_CHANNEL_MODAL_SHOWING');
export const hideDeleteChannelModal = createAction('DELETE_CHANNEL_MODAL_HIDING');


export const sendMessage = (currentChannelId, { message }) => async (dispatch) => {
  const url = routes.messagePostURL(currentChannelId);
  try {
    await axios.post(url, { data: message });
  } catch (e) {
    dispatch(showInfoModal({
      title: 'SEND MESSAGE ERROR!!!',
      message: `Error occured: ${e.message}`,
      color: 'danger',
    }));
  }
};


export const addChannel = channel => async (dispatch) => {
  const url = routes.channelAddURL();
  try {
    await axios.post(url, { data: channel });
  } catch (e) {
    dispatch(showInfoModal({
      title: 'ADD CHANNEL ERROR!!!',
      message: `Error occured: ${e.message}`,
      color: 'danger',
    }));
  }
};


export const editChannel = channel => async (dispatch) => {
  const { id } = channel.attributes;
  const url = routes.channelEditURL(id);
  try {
    await axios.patch(url, { data: channel });
  } catch (e) {
    dispatch(showInfoModal({
      title: 'EDIT CHANNEL ERROR!!!',
      message: `Error occured: ${e.message}`,
      color: 'danger',
    }));
  }
};


export const deleteChannel = (channel, mainChannelId) => async (dispatch) => {
  const { id } = channel.attributes;
  const url = routes.channelDeleteURL(id);
  try {
    await axios.delete(url);
    dispatch(changeCurrentChannelId({ id: `${mainChannelId}` }));
  } catch (e) {
    dispatch(showInfoModal({
      title: 'DELETE CHANNEL ERROR!!!',
      message: `Error occured: ${e.message}`,
      color: 'danger',
    }));
  }
};


export const newMessageReceiving = createAction('NEW_MESSAGE_RECEVEING');
export const newChannelAdding = createAction('NEW_CHANNEL_ADDING');
export const channelEditing = createAction('CHANNEL_ID_EDITING');
export const channelDeleting = createAction('CHANNEL_DELETING');
