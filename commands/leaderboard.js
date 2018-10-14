const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;

  let endEmbed = new Discord.RichEmbed()
  .setDescription("Leaderboard *BETA ver.*")
  .setColor("#15f153")
  .setThumbnail(bicon)
    .addField("No.1(Definitely not cheating)","Not Cel(122%) damage dealt.")
  .addField("No.2 (Perfect Match)", "Wei Chen(100%)damage dealt.")
  .addField("No.3","Su Muqiu T(65%) damage dealt.")
  .addField("No.4","Reign(63%) damage dealt.")
  .addField("No.5","pol(54%) damage dealt.")
  .addField("No.6","Lemni(47%) damage dealt.")
  .addField("No.7","Kadiea(36%) damage dealt.")
  .addField("No.8","Neopolitan(33%) damage dealt.")
  //message.channel.send(endEmbed);
   message.channel.send(endEmbed);
  //return message.channel.send(`(█    █    █    █    )`); 4 empty space equals 1 white space?
}

  module.exports.help = {
    name: "leaderboard"
  }
