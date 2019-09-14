//
//
//Hambone Bot Javascript version
//Dana Simmons and Compnay 2019
//


const { RTMClient } = require('@slack/rtm-api');
const { IncomingWebhook } = require('@slack/webhook');
const { WebClient } = require('@slack/web-api');

//Load Enviornment variables
require('dotenv').config();

const api_token = process.env.API_TOKEN;
const bot_token= process.env.BOT_TOKEN;
const radio_webhook = process.env.RADIO_WEBHOOK;

rtm = new RTMClient(bot_token);
client = new WebClient(api_token);


function parseMsg( text ) { // Parse messages with @ mentions
  if(text){
    return  text.match(/<@(?<to>.*)> (?<msg>.*)$/);
  }else{
    return null
  }
}


rtm.on('message', ( e ) =>{
  console.log( e );
  const parsedMsg = parseMsg( e.text );

  console.log(parsedMsg);

  if(parsedMsg && parsedMsg.groups.to === rtm.activeUserId){
    //They are talking to us, do something
    console.log("Sending reply...");
    rtm.sendMessage(`I haven't learned that yet, ask @Dana KN4BEV about teaching me that`, e.channel );
  }
   
});

rtm.on('channel_joined', ( e  ) =>{
  
  rtm.sendMessage(`Hi I'm Hambone, I don't do much right now, but i'm happy to be here`,e.channel);

});
rtm.on('member_joined_channel', ( e ) => {
  console.log(e);
  rtm.sendMessage(`Welcome to <#${e.channel}> <@${e.user}>, tell us about yourself`,e.channel);
});

rtm.on('member_left_channel', ( e ) =>{

  console.log( e );

});

rtm.on('connected', ( e ) => {
  console.log("connected and ready...");
  //Joining channels not working for some reason
  //client.channels.join({"name": "#general" })
});
rtm.start();

