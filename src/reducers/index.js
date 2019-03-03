// import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';


const channels = handleActions({
  [actions.addChannel](state, { payload: { channel } }) {
    return [...state, channel];
  },
}, 'none');


export default combineReducers(
  channels,
);
