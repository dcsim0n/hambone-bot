/*
| Command deffenitions for slack bot
| Dana Simmons 2020
*/

const axios = require('axios');


let weather_url = "http://192.168.5.134/i";

const commands = {
  "/weather": function( client, ...args ) {
    // fetch data from weather api
    client.sendMessage("Ok, im checking the weather now...", args[0].channel);
    return axios.get( weather_url )
    .then( resp => {
      client.sendMessage("Looks like the current conditions are:", args[0].channel);
      // expecting a json response with these keys
      const { temperature, humidity, pressure, altitude } = resp.data; 
      client.sendMessage('Temperature: ' + temperature + '*F , Humidity: ' + humidity + '%, Barometric pressure: ' + pressure, args[0].channel)
    })
    .catch ( error => {
      console.log("Problem fetching data from: " + weather_url );
      console.log( error );
      client.sendMessage("Oh, errm, I hit a snag:" + error, args[0]);
    })
  },

  "/help": function( client, ...args ) {
    client.sendMessage("Looking for help? Here's a list of things I understand..", args[0].channel );
    const helpMsg = `\`/help\` : prints this message
\`/weather\` : get the current temperature and humidity of the shop
for documentation and bug reports visit: https://github.com/dcsim0n/hambone-bot`
    client.sendMessage(helpMsg, args[0].channel)
  }
}
module.exports = commands;