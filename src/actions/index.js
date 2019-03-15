import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';


export const showInfoModal = createAction('INFO_MODAL_SHOWING');
export const hideInfoModal = createAction('INFO_MODAL_HIDING');


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
    throw e;
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
    throw e;
  }
};

export const newMessageReceiving = createAction('NEW_MESSAGE_RECEVEING');
export const newChannelAdding = createAction('NEW_CHANNEL_ADDING');

export const changeCurrentChannelId = createAction('CURRENT_CHANNEL_ID_CHANGING');
