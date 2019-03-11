// import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

/*

const channelAddingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelSuccess]() {
    return 'finished';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
}, 'none');

*/

const channels = handleActions({
  [actions.addChannelSuccess](state, { payload: { channel } }) {
    return [...state, channel];
  },
}, []);


export default combineReducers({
  channels,
  form: formReducer,
});
