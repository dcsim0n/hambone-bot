/*
| Mock module for Slack RTMClient
| Dana Simmons 2020
*/


const HANDLERS = {};

class RTMClient {
  constructor(token){
    console.log("Using token:", token)
    this.activeUserId = 'me'; //must pass this as part of the even
  }
  on( eventName, handler ){ 
    HANDLERS[eventName] = jest.fn(handler);
  }
  sendMessage( ){
    //not needed right now
  }
  start( ){ console.log("Started client.."); }

}
RTMClient.HANDLERS = HANDLERS;
RTMClient.fire = jest.fn( ( eventName, event )=>{
  console.log("Fire event: ", eventName);
  console.log("Firing with: ", event);

  return HANDLERS[eventName](event);
});

exports.RTMClient = RTMClient;