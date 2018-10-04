const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let endEmbed = new Discord.RichEmbed()
  .setDescription("Wall of Shame")
  .setColor("#15f153")
  .addField("No.1 - Cel for no reason.")
  .addField("No.2 - Neopolitan (0%) damage dealt.")
  .addField("No.3 - Neopolitan (6%) damage dealt.")
  .addField("No.4 - Aegis (6%) damage dealt.")

  //message.channel.send(endEmbed);
   message.channel.send(endEmbed);
  //return message.channel.send(`(█    █    █    █    )`); 4 empty space equals 1 white space?
}
  module.exports.help = {
    name: "wallofshame"
  }
