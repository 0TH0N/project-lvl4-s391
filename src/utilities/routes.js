const host = '/api/v1';


export default {
  messagePostURL: currentChannelId => [host, 'channels', currentChannelId, 'messages'].join('/'),
  channelAddURL: () => [host, 'channels'].join('/'),
  channelEditURL: id => [host, 'channels', `${id}`].join('/'),
  channelDeleteURL: id => [host, 'channels', `${id}`].join('/'),
};
