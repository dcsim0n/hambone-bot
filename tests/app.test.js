/*
| App test suite
| Dana Simmons 2020
|*/

const { RTMClient } = require('@slack/rtm-api');

jest.mock('@slack/rtm-api');

const app = require('../app');

describe('RTMClient responds to events',( ) =>{
  test('message handler is called when a message is recieved',( ) =>{
    RTMClient.fire('message',{text:"<@me> My message"} )
    expect(RTMClient.HANDLERS['message']).toHaveBeenCalled();

    RTMClient.fire('message',{text:'<@me> /help '})

  });
  
  test(' responds with a help message', ( ) =>{

    RTMClient.fire('message',{text:'<@me> /help '});

    expect(RTMClient.sendMessage).toHaveBeenCalled();

  })
  test('channel join handler is called on channel join', ( ) => {
    RTMClient.fire('channel_joined', { 'test': 'test' });

    expect(RTMClient.HANDLERS['channel_joined']).toHaveBeenCalled();
  })

  test('member joined handler is called on channel join', ( ) => {
    RTMClient.fire('member_joined_channel', { 'test': 'test' });

    expect(RTMClient.HANDLERS['member_joined_channel']).toHaveBeenCalled();
  });
})