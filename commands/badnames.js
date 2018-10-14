const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // message.channel.send(`${ayy}`);

  let endEmbed = new Discord.RichEmbed()
  .setDescription("Bad names leaderboard:")
  .setColor("#15f153")
  .addField("No.1","Red Bean Revenge")
  .addField("No.2","Bubble Tea Brotherhood")
  .addField("No.2","Egg Tart Ecstasy")
   message.channel.send(endEmbed);


}
  module.exports.help = {
    name: "badnames"
  }
