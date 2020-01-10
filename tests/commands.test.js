
/*
| Command test suite
| Dana Simmons 2020
|*/

const axios = require('axios');

const commands = require('../commands');

jest.mock('axios');

//build mock for rtm client
const rtmClientMock =  {sendMessage: jest.fn(text  => text) };

describe('Test the /weather command', () => {
  test('calls send message on client', () => {

    commands['/weather']( rtmClientMock );

    expect(rtmClientMock.sendMessage).toHaveBeenCalled();
    
  })

  test('retrieves data from api', () =>{
    const weather = {temperature: 20.1, humidity: 50.0, pressure: 900, altitude: 300};
    axios.get.mockResolvedValue( {data: weather });

    commands['/weather']( rtmClientMock );
    console.log(rtmClientMock.sendMessage.mock.results)
    expect(reply).toContain('Looks like');
  })

})