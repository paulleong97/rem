const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let var1 = playerOnehp;
  let var2 = playerTwohp;
  testEmbed.setTitle(`p1hp ${playerOnehp} p2hp ${playerTwohp}`);

  //var arr =[`${playerOnehp}`, `${playerTwohp}`];
  //testEmbed.fields();
  //.fields("Player 2 hp:", "a");
  // let message = arr;
  // message.embeds(arr)
  message.channel.send(testEmbed);
}

  module.exports.help = {
    name: "testEmbed"
  }
