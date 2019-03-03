// import { createAction } from 'redux-actions';
import axios from 'axios';


export const addChannel = ({ channel }) => async (dispatch) => {
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
