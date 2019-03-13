const host = '/api/v1';


export default {
  messagePostURL: currentChannelId => [host, 'channels', currentChannelId, 'messages'].join('/'),
};
