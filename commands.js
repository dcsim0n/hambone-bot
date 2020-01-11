/*
| Command deffenitions for slack bot
| Dana Simmons 2020
*/

const axios = require('axios');


let weather_url = "http://weather.server.com";

const commands = {
  "/weather": function( client, ...args ) {
    // fetch data from weather api
    client.sendMessage("Ok, im checking the weather now...");
    return axios.get( weather_url )
    .then( resp => {
      client.sendMessage("Looks like the current conditions are:");
      // expecting a json response with these keys
      const { temperature, humidity, pressure, altitude } = resp.data; 
      client.sendMessage('Temperature: ' + temperature + '*C , Humidity: ' + humidity + '%, Barometric pressure: ' + pressure )
    })
    .catch ( error => {
      console.log("Problem fetching data from: " + weather_url );
      console.log( error );
      client.sendMessage("Oh, errm, I hit a snag:" + error );
    })
  },
}
module.exports = commands;