import { createSelector } from 'reselect';


export const getChannels = state => state.channels;
export const getChannelsIds = createSelector(
  getChannels,
  channels => channels.allIds,
);
