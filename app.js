
/*
| Hambone Bot 
| Dana Simmons and Compnay 2019
*/


const { RTMClient } = require('@slack/rtm-api');
const { IncomingWebhook } = require('@slack/webhook');
const { WebClient } = require('@slack/web-api');
const commands = require('./commands');

//Load Enviornment variables
require('dotenv').config();

const api_token = process.env.API_TOKEN;
const bot_token= process.env.BOT_TOKEN;
const radio_webhook = process.env.RADIO_WEBHOOK;

const rtm = new RTMClient(bot_token);
const client = new WebClient(api_token);


function parseMsg( text ) { // Parse messages with @ mentions
  if(text){
    // We got some data, so parse it
    const msgParts = text.match(/<@(?<to>.*)> (?<msg>.*)$/);
    //build a new object with a 'to' and 'msg' key, 'msg' should be stripped for whitespace
    const msg = { to: msgParts.groups.to, msg: msgParts.groups.msg.trim() } ;
    return msg;
  }else{
    return null
  }
}


rtm.on('message', ( e ) =>{
  console.log( e );
  const parsedMsg = parseMsg( e.text );

  console.log(parsedMsg);

  if(parsedMsg && parsedMsg.to === rtm.activeUserId){
    //They are talking to us, do something
    console.log("Sending reply...");
    if(Object.keys(commands).includes(parsedMsg.msg)){
      commands[parsedMsg.msg]( rtm, e );
    }else{
      rtm.sendMessage(`I haven't learned that yet, try the /help command or ask @Dana KN4BEV about teaching me that`, e.channel );
    }
  }
});

rtm.on('channel_joined', ( e ) =>{
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

