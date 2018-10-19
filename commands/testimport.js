const Discord = require("discord.js");
const Animal = require('../Animal.js');
const Stats = require('../Stats.js')

module.exports.run = async (bot, message, args) => {
  //Animal.js class
  var animal = new Animal("dog");
  message.channel.send(`This animal ${animal.name}`);
  message.channel.send(`${animal.getSpecies()}`);

  //Stats.js class
  var player1Stats = new Stats()
  player1Stats.initializeLevel70BattleMage()
  var propValue;
  for(var propName in player1Stats) {
      propValue = player1Stats[propName]
      message.channel.send(`${propName}: ${propValue}`);
  }
}

  module.exports.help = {
    name: "testimport"
  }
