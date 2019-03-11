/*

import { createAction } from 'redux-actions';
import axios from 'axios';


export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addChannel = ({ channel }) => async (dispatch) => {
  addChannelRequest();
  try {
    const responce = axios.get('kuda-to tam', channel);
    dispatch(responce);
  } catch (e) {
    throw e;
  }
};


export const removeChannel = ({ id }) => async (dispatch) => {
  try {
    const responce = axios.get('kuda-to tam', id);
    dispatch(responce);
  } catch (e) {
    throw e;
  }
};


export const sendMessage = ({ text }) => async (dispatch) => {
  try {
    const responce = axios.post();
  } catch (e) {
    throw e;
  }
};

*/
