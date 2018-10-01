const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;

  let endEmbed = new Discord.RichEmbed()
  .setDescription("Leaderboard")
  .setColor("#15f153")
  .setThumbnail(bicon)
  .addField("No.1","Not Cel(72%) damage dealt.")
  .addField("No.2","Reign(63%) damage dealt.")
  .addField("No.3","pol(54%) damage dealt.")
  .addField("No.4","Lemni(47%) damage dealt.")
  .addField("No.5","Neopolitan(33%) damage dealt.")
  //message.channel.send(endEmbed);
   message.channel.send(endEmbed);
  //return message.channel.send(`(█    █    █    █    )`); 4 empty space equals 1 white space?
}

  module.exports.help = {
    name: "leaderboard"
  }
