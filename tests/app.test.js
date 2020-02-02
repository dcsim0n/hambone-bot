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
    expect(RTMClient.HANDLERS['message']).toHaveBeenCalled()

  })
})