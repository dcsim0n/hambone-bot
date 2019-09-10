//
//
//Hambone Bot Javascript version
//Dana Simmons and Compnay 2019
//


const { RTMClient } = require('@slack/rtm-api');
const { WebClient } = require('@slack/web-api');

//Load Enviornment variables
require('dotenv').config();

const token = process.env.API_TOKEN;
const user_token = process.env.USER_TOKEN;

rtm = new RTMClient(token);
client = new WebClient(user_token);

rtm.on('message', ( e ) => {
  console.log(e);
});
rtm.on('connected', ( e ) => {
  console.log("connected and ready...");
  client.channels.join({"name": "#general" })
});
rtm.start();

