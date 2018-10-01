const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rAuthor = message.guild.member(message.author);

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("Couldn't find user.");

  let gRolePol = message.guild.roles.find(`name`, "pol");
  if(!gRolePol) return message.reply("This command can only be activated if pol is in this server.");

  if(rAuthor.roles.has(gRolePol.id))   {
    return message.channel.send(`<@${rUser.id}> played not badly. He's worthy of playing with you again.`);
  }
  else{
    message.channel.send("You're not pol. I only act upon pol's command.")
  }
}
  module.exports.help = {
    name: "evaluate"
  }
