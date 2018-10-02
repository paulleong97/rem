const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;

  let reason = args.join(" ").slice(22);

  if(!reason){
    // let helpEmbed = new Discord.RichEmbed()
    // .setDescription("Commands")
    // .setColor("#15f153")
    // .setThumbnail(bicon)
    // .addField("Initiate pk", "`;pk @name (;pk @rem)`")
    // .addField("Use Skill", "``;l <skillname> (;l fr)``")
    // .addField("Win/Loss/Elo record(Beta)", "```;pkrecord```")
    // .addField("Leaderboard(Beta)", ";leaderboard")
    //  message.channel.send(helpEmbed);
    let helpEmbed = new Discord.RichEmbed()
    .setDescription("Commands")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Battle", "`pk` `l` `pkrecord` `leaderboard`")
    .addField("meme", "`badnames` `wallofshame` `ayy` `single?`")
    .addField("Moderation", "`purge` `addrole` `removerole`")
    .addField("Information", " `serverinfo` `botinfo`")
     message.channel.send(helpEmbed);
 }

}

  module.exports.help = {
    name: "help"
  }
