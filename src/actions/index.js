import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';


export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');


export const sendMessage = ({ message }) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const url = routes.messagePostURL(message.channelId);
    await axios.post(url, { data: message });
    dispatch(sendMessageSuccess({ message }));
  } catch (e) {
    dispatch(sendMessageFailure());
    throw e;
  }
};


export const newMessageReceiving = createAction('NEW_MESSAGE_RECEVEING');


export const showInfoModal = createAction('INFO_MODAL_SHOWING');
export const hideInfoModal = createAction('INFO_MODAL_HIDING');
