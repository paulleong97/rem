const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
    let helpEmbed = new Discord.RichEmbed()
    .setDescription("Commands")
    .setColor("#15f153")
    .addField("Battle", "`turnbased` `spampk` `spaml` `pkrecord` `leaderboard`")
    .addField("Moderation", "`prune`")
     message.channel.send(helpEmbed);
}

  module.exports.help = {
    name: "help"
  }
