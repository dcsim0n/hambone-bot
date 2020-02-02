
/*
| Command test suite
| Dana Simmons 2020
|*/

const axios = require('axios');

const commands = require('../commands');

jest.mock('axios');

//build mock for rtm client
const rtmClientMock =  {sendMessage: jest.fn(text => text) };

describe('Test the /weather command', () => {
  beforeEach(( )=>{
    //Initialize fake data to return from get request
    const weather = {temperature: 20.1, humidity: 50.0, pressure: 900, altitude: 300};
    axios.get.mockResolvedValue( {data: weather });

    //reset client mock data
    rtmClientMock.sendMessage.mockClear();
  })
  test('calls send message on client', async () => {
    await commands['/weather']( rtmClientMock, 'channel-id' ) 
    expect(rtmClientMock.sendMessage).toHaveBeenCalled();
  });

  test('retrieves data from api', async () =>{
    await commands['/weather']( rtmClientMock , 'channel-id' );
    
    expect(rtmClientMock.sendMessage).toHaveBeenCalledTimes(3);
    expect(rtmClientMock.sendMessage.mock.results[1].value).toEqual("Looks like the current conditions are:");
    expect(rtmClientMock.sendMessage.mock.results[2].value).toContain("Temperature");
  })

})
describe('Test the /help command', ( ) => {

  beforeEach(()=>{
    rtmClientMock.sendMessage.mockClear();
  });

  test('/help sends a message to the user', async () =>{ 
    await commands['/help'](rtmClientMock, 'channel-id')
    
    expect(rtmClientMock.sendMessage).toHaveBeenCalled();
  });

  test('the message should have a link to the hambone github', async ( ) =>{
    await commands['/help'](rtmClientMock, 'channel-id');

    expect(rtmClientMock.sendMessage.mock.results[1].value).toContain("https://github.com/dcsim0n/hambone-bot");
  });
})